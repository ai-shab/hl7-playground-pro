
import React, { useMemo } from 'react';
import { ValidationError } from '@/types/hl7.types';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MessageValidatorProps {
  errors: ValidationError[];
  isValid: boolean;
}

const MessageValidator: React.FC<MessageValidatorProps> = ({ errors, isValid }) => {
  const errorCount = useMemo(() => 
    errors.filter(e => e.severity === 'error').length, 
    [errors]
  );
  
  const warningCount = useMemo(() => 
    errors.filter(e => e.severity === 'warning').length, 
    [errors]
  );

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-lg font-medium mb-3">Validation Results</h2>
      
      {isValid ? (
        <Alert className="bg-green-50 border-green-200 text-green-800">
          <CheckCircle className="h-4 w-4 mr-2" />
          <AlertTitle>Message is valid</AlertTitle>
          <AlertDescription>Your HL7 message passes all validation checks.</AlertDescription>
        </Alert>
      ) : (
        <>
          <Alert className="bg-red-50 border-red-200 text-red-800 mb-3">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertTitle>Validation Issues</AlertTitle>
            <AlertDescription>
              Found {errorCount} error{errorCount !== 1 ? 's' : ''} and {warningCount} warning{warningCount !== 1 ? 's' : ''}.
            </AlertDescription>
          </Alert>
          
          <ScrollArea className="flex-1 bg-white rounded-md border">
            <div className="p-3">
              {errors.map((error, index) => (
                <div 
                  key={index}
                  className={`mb-2 p-2 rounded ${
                    error.severity === 'error' ? 'bg-red-50' : 'bg-amber-50'
                  }`}
                >
                  <div className="flex items-start">
                    <div 
                      className={`mr-2 h-5 w-5 flex items-center justify-center rounded-full ${
                        error.severity === 'error' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                      }`}
                    >
                      <span className="text-xs font-medium">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        error.severity === 'error' ? 'text-red-800' : 'text-amber-800'
                      }`}>
                        {error.segment ? `${error.segment}${error.field > 0 ? `-${error.field}` : ''}` : 'Message'}
                      </p>
                      <p className="text-xs">
                        {error.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {errors.length === 0 && (
                <p className="text-sm text-gray-500 italic">No validation issues found.</p>
              )}
            </div>
          </ScrollArea>
        </>
      )}
    </div>
  );
};

export default MessageValidator;
