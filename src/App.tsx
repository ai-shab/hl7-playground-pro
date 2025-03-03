
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HL7Editor from '@/components/HL7Editor';
import MessageValidator from '@/components/MessageValidator';
import MessageTypeSelector from '@/components/MessageTypeSelector';
import { ValidationError } from '@/types/hl7.types';
import { parseHL7Message, identifyMessageType, validateHL7Message } from '@/utils/hl7Validator';
import { SAMPLE_MESSAGES } from '@/utils/hl7Definitions';
import { HL7DefinitionsProvider, useHL7Definitions } from '@/contexts/HL7DefinitionsContext';
import './App.css';

const HL7Playground = () => {
  const { segments, triggerEvents, tables } = useHL7Definitions();
  const [message, setMessage] = useState<string>(SAMPLE_MESSAGES['ADT^A01'] || '');
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [selectedMessageType, setSelectedMessageType] = useState<string>('ADT^A01');
  
  useEffect(() => {
    // When selectedMessageType changes, load the sample message
    if (SAMPLE_MESSAGES[selectedMessageType]) {
      setMessage(SAMPLE_MESSAGES[selectedMessageType]);
    }
  }, [selectedMessageType]);
  
  const handleValidation = (errors: ValidationError[]) => {
    setValidationErrors(errors);
  };
  
  const handleMessageChange = (newMessage: string) => {
    setMessage(newMessage);
    
    const parsedMessage = parseHL7Message(newMessage);
    const messageType = identifyMessageType(parsedMessage);
    
    if (messageType && messageType !== selectedMessageType) {
      setSelectedMessageType(messageType);
    }
    
    const errors = validateHL7Message(newMessage, segments, triggerEvents);
    setValidationErrors(errors);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      
      <div className="flex-1 overflow-hidden p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          <div className="lg:col-span-2 flex flex-col bg-white rounded-lg shadow-sm border h-full overflow-hidden">
            <div className="border-b p-4">
              <MessageTypeSelector 
                messageTypes={triggerEvents} 
                selectedType={selectedMessageType} 
                onSelectType={setSelectedMessageType} 
              />
            </div>
            <div className="flex-1 overflow-hidden">
              <HL7Editor 
                message={message} 
                onChange={handleMessageChange} 
                onValidate={handleValidation}
                segments={segments}
                tables={tables}
              />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden p-4">
            <MessageValidator 
              errors={validationErrors} 
              isValid={validationErrors.length === 0} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <HL7DefinitionsProvider>
      <HL7Playground />
    </HL7DefinitionsProvider>
  );
}

export default App;
