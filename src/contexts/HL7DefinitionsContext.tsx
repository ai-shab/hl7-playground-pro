
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { HL7Segment, HL7DataType, HL7Table, HL7TriggerEvent } from '@/types/hl7.types';
import { fetchAllHL7Definitions } from '@/services/hl7ApiService';
import { Loader2 } from 'lucide-react';

interface HL7DefinitionsContextType {
  segments: Record<string, HL7Segment>;
  dataTypes: Record<string, HL7DataType>;
  tables: Record<string, HL7Table>;
  triggerEvents: Record<string, HL7TriggerEvent>;
  loading: boolean;
  error: string | null;
}

const HL7DefinitionsContext = createContext<HL7DefinitionsContextType>({
  segments: {},
  dataTypes: {},
  tables: {},
  triggerEvents: {},
  loading: true,
  error: null
});

export const useHL7Definitions = () => useContext(HL7DefinitionsContext);

interface HL7DefinitionsProviderProps {
  children: ReactNode;
}

export const HL7DefinitionsProvider: React.FC<HL7DefinitionsProviderProps> = ({ children }) => {
  const [segments, setSegments] = useState<Record<string, HL7Segment>>({});
  const [dataTypes, setDataTypes] = useState<Record<string, HL7DataType>>({});
  const [tables, setTables] = useState<Record<string, HL7Table>>({});
  const [triggerEvents, setTriggerEvents] = useState<Record<string, HL7TriggerEvent>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDefinitions = async () => {
      try {
        setLoading(true);
        const definitions = await fetchAllHL7Definitions();
        
        setSegments(definitions.segments);
        setDataTypes(definitions.dataTypes);
        setTables(definitions.tables);
        setTriggerEvents(definitions.triggerEvents);
        
        setError(null);
      } catch (err) {
        console.error('Failed to load HL7 definitions:', err);
        setError('Failed to load HL7 definitions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadDefinitions();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium">Loading HL7 v2.5.1 definitions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <div className="max-w-md p-6 bg-destructive/10 rounded-lg border border-destructive text-center">
          <h2 className="text-xl font-semibold text-destructive mb-2">Error</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button 
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <HL7DefinitionsContext.Provider value={{ 
      segments, 
      dataTypes, 
      tables, 
      triggerEvents, 
      loading, 
      error 
    }}>
      {children}
    </HL7DefinitionsContext.Provider>
  );
};
