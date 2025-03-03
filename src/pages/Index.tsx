
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import HL7Editor from '@/components/HL7Editor';
import MessageValidator from '@/components/MessageValidator';
import { HL7TriggerEvent, ValidationError } from '@/types/hl7.types';
import { fetchHL7Definitions, SAMPLE_MESSAGES } from '@/utils/hl7Definitions';
import { validateHL7Message } from '@/utils/hl7Validator';
import Header from '@/components/Header';
import MessageTypeSelector from '@/components/MessageTypeSelector';
import { useHL7Definitions } from '@/contexts/HL7DefinitionsContext';

const Index = () => {
  const { toast } = useToast();
  const [hl7Message, setHL7Message] = useState('');
  const [selectedMessageType, setSelectedMessageType] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
  
  // Use the context instead of direct API calls
  const { triggerEvents, segments, tables } = useHL7Definitions();
  
  // Load a default message type and sample message on component mount
  useEffect(() => {
    if (Object.keys(triggerEvents).length > 0) {
      const defaultType = Object.keys(triggerEvents)[0];
      setSelectedMessageType(defaultType);
      setHL7Message(SAMPLE_MESSAGES[defaultType] || '');
    }
  }, [triggerEvents]);
  
  // Handle message type selection
  const handleMessageTypeChange = (messageType: string) => {
    setSelectedMessageType(messageType);
    const sampleMessage = SAMPLE_MESSAGES[messageType] || '';
    if (sampleMessage) {
      setHL7Message(sampleMessage);
      toast({
        title: 'Sample Message Loaded',
        description: `Loaded sample message for ${messageType}`,
      });
    }
  };
  
  // Handle message changes
  const handleMessageChange = (newMessage: string) => {
    setHL7Message(newMessage);
  };
  
  // Handle validation
  const handleValidate = (errors: ValidationError[]) => {
    setValidationErrors(errors);
    setIsValid(errors.filter(e => e.severity === 'error').length === 0);
  };
  
  // Force a validation run
  const runValidation = () => {
    const errors = validateHL7Message(hl7Message, segments, triggerEvents);
    setValidationErrors(errors);
    setIsValid(errors.filter(e => e.severity === 'error').length === 0);
    
    toast({
      title: isValid ? 'Validation Passed' : 'Validation Failed',
      description: isValid 
        ? 'No errors found in your HL7 message' 
        : `Found ${errors.filter(e => e.severity === 'error').length} errors`,
      variant: isValid ? 'default' : 'destructive',
    });
    
    setActiveTab('validator');
  };
  
  // Handle clearing the message
  const handleClearMessage = () => {
    setHL7Message('');
    toast({
      title: 'Message Cleared',
      description: 'The editor has been cleared',
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 px-6 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-end gap-6">
          <div className="flex-1">
            <MessageTypeSelector 
              messageTypes={triggerEvents}
              selectedType={selectedMessageType}
              onSelectType={handleMessageTypeChange}
            />
          </div>
          
          <div className="flex space-x-3">
            <Button 
              variant="default" 
              onClick={runValidation}
              className="transition-all hover:shadow-md"
            >
              Validate Message
            </Button>
            <Button 
              variant="outline" 
              onClick={handleClearMessage}
            >
              Clear Editor
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="col-span-1 lg:col-span-2 shadow-subtle border-editor-border h-[70vh] overflow-hidden animate-entrance">
            <CardContent className="p-0 h-full">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                <div className="p-4 border-b border-editor-border">
                  <TabsList className="grid grid-cols-2 bg-muted/50">
                    <TabsTrigger value="editor">Editor</TabsTrigger>
                    <TabsTrigger value="validator">Validation</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="editor" className="flex-1 m-0 p-0 h-full data-[state=active]:flex data-[state=active]:flex-col overflow-hidden">
                  <div className="p-4 bg-editor-background flex-1 h-full overflow-auto">
                    <HL7Editor
                      message={hl7Message}
                      onChange={handleMessageChange}
                      onValidate={handleValidate}
                      segments={segments}
                      tables={tables}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="validator" className="flex-1 m-0 p-4 overflow-auto">
                  <MessageValidator 
                    errors={validationErrors}
                    isValid={isValid}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="col-span-1 space-y-6 animate-entrance" style={{ animationDelay: '0.1s' }}>
            <Card className="shadow-subtle border-editor-border">
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-3">Message Information</h2>
                
                {selectedMessageType && triggerEvents[selectedMessageType] ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Message Type</h3>
                      <p className="font-mono">{selectedMessageType}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Description</h3>
                      <p className="text-sm">{triggerEvents[selectedMessageType].description}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Required Segments</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {triggerEvents[selectedMessageType].requiredSegments.map(segment => (
                          <Badge key={segment} variant="secondary" className="font-mono">
                            {segment}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Optional Segments</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {triggerEvents[selectedMessageType].segments
                          .filter(segment => !triggerEvents[selectedMessageType].requiredSegments.includes(segment))
                          .map(segment => (
                            <Badge key={segment} variant="outline" className="font-mono">
                              {segment}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Select a message type to see details</p>
                )}
              </CardContent>
            </Card>
            
            <Card className="shadow-subtle border-editor-border">
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-3">Validation Status</h2>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${isValid ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="font-medium">{isValid ? 'Valid' : 'Invalid'}</span>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    {validationErrors.length === 0 ? (
                      <p>No issues detected</p>
                    ) : (
                      <p>
                        {validationErrors.filter(e => e.severity === 'error').length} errors, {' '}
                        {validationErrors.filter(e => e.severity === 'warning').length} warnings
                      </p>
                    )}
                  </div>
                  
                  {!isValid && (
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-sm"
                      onClick={() => setActiveTab('validator')}
                    >
                      View details
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
