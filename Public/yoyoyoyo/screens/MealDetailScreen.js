import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { addMeal } from '../utils/meals';

export default function MealDetailScreen({ route, navigation }) {
  const { photoUri, analysis } = route.params || {};
  const totals = useMemo(() => computeTotals(analysis), [analysis]);

  const onSave = async () => {
    const entry = {
      photoUri,
      totals,
      items: analysis?.items || [],
      date: new Date().toISOString(),
    };
    await addMeal(entry);
    Alert.alert('Saved', 'Meal added to your log.');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {photoUri && <Image source={{ uri: photoUri }} style={styles.photo} />}
      <View style={styles.cards}>
        <Card title="Calories"><Text style={styles.big}>{Math.round(totals.kcal)} kcal</Text></Card>
        <Card title="Protein"><Text style={styles.big}>{Math.round(totals.protein)} g</Text></Card>
        <Card title="Carbs"><Text style={styles.big}>{Math.round(totals.carbs)} g</Text></Card>
        <Card title="Fat"><Text style={styles.big}>{Math.round(totals.fat)} g</Text></Card>
      </View>
      {analysis?.note && (
        <View style={styles.note}><Text style={styles.noteText}>{analysis.note} (±{Math.round((analysis.uncertainty_pct || 0)*100)}%)</Text></View>
      )}
      <View style={styles.rowBtns}>
        <TouchableOpacity style={[styles.btn, styles.secondary]} onPress={() => Alert.alert('Edit', 'Manual edits coming soon')}>
          <Text style={styles.btnText}>Fix Results</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.primary]} onPress={onSave}>
          <Text style={[styles.btnText, { color: '#fff' }]}>Done</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function computeTotals(analysis) {
  const items = analysis?.items || [];
  return items.reduce((acc, it) => {
    const m = it.macros || {};
    acc.kcal += it.kcal || 0;
    acc.protein += it.protein || 0;
    acc.carbs += m.carbs_g || 0;
    acc.fat += m.fat_g || 0;
    return acc;
  }, { kcal: 0, protein: 0, carbs: 0, fat: 0 });
}

function Card({ title, children }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  photo: { width: '100%', height: 240 },
  cards: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 12 },
  card: { width: '48%', backgroundColor: '#f8f8f8', borderRadius: 12, padding: 12, marginBottom: 12 },
  cardTitle: { fontSize: 14, color: '#666' },
  big: { fontSize: 22, fontWeight: '800', marginTop: 6 },
  note: { paddingHorizontal: 12, paddingBottom: 12 },
  noteText: { color: '#666' },
  rowBtns: { flexDirection: 'row', justifyContent: 'space-between', padding: 12 },
  btn: { flex: 1, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  secondary: { backgroundColor: '#eee', marginRight: 8 },
  primary: { backgroundColor: '#007AFF', marginLeft: 8 },
  btnText: { fontWeight: '700' },
});

