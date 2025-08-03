import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { seedDatabase } from '@/lib/seedData';
import { Loader2, Database } from 'lucide-react';

export function SeedButton() {
  const [loading, setLoading] = useState(false);
  const [seeded, setSeeded] = useState(false);

  const handleSeed = async () => {
    setLoading(true);
    const success = await seedDatabase();
    setLoading(false);
    if (success) {
      setSeeded(true);
    }
  };

  if (seeded) {
    return (
      <Button disabled variant="outline" size="sm" className="text-green-600">
        <Database className="mr-2 h-4 w-4" />
        Sample Data Added ✓
      </Button>
    );
  }

  return (
    <Button 
      onClick={handleSeed} 
      disabled={loading}
      variant="outline" 
      size="sm"
      className="text-blue-600 hover:text-blue-700"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Adding Sample Data...
        </>
      ) : (
        <>
          <Database className="mr-2 h-4 w-4" />
          Add Sample Posts
        </>
      )}
    </Button>
  );
}
