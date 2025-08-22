'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreateWallet } from '@/components/wallet/CreateWallet';
import { UnlockScreen } from '@/components/wallet/UnlockScreen';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Download } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-semibold">Welcome to CredVerse</h1>
          <p className="text-sm text-muted-foreground">Create or unlock your student wallet</p>
        </div>

        <Tabs defaultValue="unlock" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="unlock">Unlock</TabsTrigger>
            <TabsTrigger value="create">Create</TabsTrigger>
          </TabsList>

          <TabsContent value="unlock">
            <UnlockScreen />
          </TabsContent>

          <TabsContent value="create">
            <CreateWallet />
          </TabsContent>
        </Tabs>

        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">Already exported a backup or keystore?</p>
          <Button variant="outline" onClick={() => router.push('/import')} className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Import Existing Wallet
          </Button>
        </div>
      </div>
    </div>
  );
}
