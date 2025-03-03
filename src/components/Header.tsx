
import React from 'react';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-6 px-6 border-b border-border flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold tracking-tight mr-4">HL7 Playground</h1>
        <span className="text-sm px-2 py-1 bg-secondary rounded-full text-muted-foreground">v2.x</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" className="flex items-center">
          <Info className="h-4 w-4 mr-2" />
          <span>Documentation</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
