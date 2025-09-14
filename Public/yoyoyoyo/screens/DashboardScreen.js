import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import RingProgress from '../components/RingProgress';
import { listMealsToday } from '../utils/meals';

const DAILY_TARGET = { kcal: 2200, protein: 150, carbs: 250, fat: 70 };

export default function DashboardScreen({ navigation }) {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    const unsub = setInterval(async () => setMeals(await listMealsToday()), 1000);
    (async () => setMeals(await listMealsToday()))();
    return () => clearInterval(unsub);
  }, []);

  const totals = useMemo(() => computeTotals(meals), [meals]);
  const remaining = Math.max(0, DAILY_TARGET.kcal - totals.kcal);
  const progress = Math.min(1, totals.kcal / DAILY_TARGET.kcal);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Snapshot</Text>
      <View style={styles.cardRow}>
        <View style={styles.ringBox}>
          <RingProgress size={140} stroke={12} progress={progress} />
          <View style={styles.ringCenter}>
            <Text style={styles.big}>{remaining}</Text>
            <Text style={styles.sub}>kcal left</Text>
          </View>
        </View>
        <View style={styles.macrosBox}>
          <Macro label="Protein" used={totals.protein} target={DAILY_TARGET.protein} />
          <Macro label="Carbs" used={totals.carbs} target={DAILY_TARGET.carbs} />
          <Macro label="Fat" used={totals.fat} target={DAILY_TARGET.fat} />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Recent Meals</Text>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.mealCard}>
            {item.photoUri ? <Image source={{ uri: item.photoUri }} style={styles.thumb} /> : <View style={[styles.thumb,{backgroundColor:'#ddd'}]} />}
            <View style={{ flex: 1 }}>
              <Text style={styles.mealTitle}>{Math.round(item.totals?.kcal || 0)} kcal</Text>
              <Text style={styles.mealSub}>{Math.round(item.totals?.protein||0)}P · {Math.round(item.totals?.carbs||0)}C · {Math.round(item.totals?.fat||0)}F</Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Scanner')}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

function computeTotals(meals) {
  return meals.reduce((acc, m) => {
    acc.kcal += m.totals?.kcal || 0;
    acc.protein += m.totals?.protein || 0;
    acc.carbs += m.totals?.carbs || 0;
    acc.fat += m.totals?.fat || 0;
    return acc;
  }, { kcal: 0, protein: 0, carbs: 0, fat: 0 });
}

function Macro({ label, used, target }) {
  const over = used > target;
  const left = Math.max(0, Math.round(target - used));
  const pct = Math.min(1, used / target);
  return (
    <View style={styles.macroRow}>
      <View style={styles.macroHeader}>
        <Text style={styles.macroLabel}>{label}</Text>
        <Text style={[styles.macroValue, over && { color: '#ff3b30' }]}>{over ? `${Math.round(used-target)} over` : `${left} left`}</Text>
      </View>
      <View style={styles.macroBarBg}><View style={[styles.macroBarFg, { width: `${pct*100}%` }]} /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  cardRow: { flexDirection: 'row', marginBottom: 16 },
  ringBox: { width: 160, height: 160, alignItems: 'center', justifyContent: 'center' },
  ringCenter: { position: 'absolute', alignItems: 'center' },
  big: { fontSize: 20, fontWeight: '800' },
  sub: { color: '#666' },
  macrosBox: { flex: 1, paddingLeft: 12, justifyContent: 'space-around' },
  macroRow: { marginBottom: 8 },
  macroHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  macroLabel: { fontWeight: '700', color: '#333' },
  macroValue: { color: '#333' },
  macroBarBg: { height: 8, backgroundColor: '#eee', borderRadius: 6, overflow: 'hidden', marginTop: 4 },
  macroBarFg: { height: 8, backgroundColor: '#007AFF' },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  mealCard: { flexDirection: 'row', backgroundColor: '#f8f8f8', borderRadius: 10, padding: 10, alignItems: 'center' },
  thumb: { width: 56, height: 56, borderRadius: 8, marginRight: 10 },
  mealTitle: { fontWeight: '700' },
  mealSub: { color: '#666' },
  fab: { position: 'absolute', bottom: 24, right: 24, backgroundColor: '#007AFF', width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', elevation: 3 },
  fabText: { color: '#fff', fontSize: 28, lineHeight: 28 },
});
