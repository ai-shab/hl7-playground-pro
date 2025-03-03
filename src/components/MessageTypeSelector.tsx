
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HL7MessageType } from '@/types/hl7.types';

interface MessageTypeSelectorProps {
  messageTypes: Record<string, HL7MessageType>;
  selectedType: string;
  onSelectType: (messageType: string) => void;
}

const MessageTypeSelector: React.FC<MessageTypeSelectorProps> = ({ 
  messageTypes, 
  selectedType, 
  onSelectType 
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1 text-gray-700">
        Message Type
      </label>
      <Select
        value={selectedType}
        onValueChange={onSelectType}
      >
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder="Select a message type" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(messageTypes).map(([id, messageType]) => (
            <SelectItem key={id} value={id} className="cursor-pointer">
              <div className="flex flex-col">
                <span>{messageType.name}</span>
                <span className="text-xs text-gray-500">{id}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {messageTypes[selectedType] && (
        <p className="mt-1 text-xs text-gray-500">
          {messageTypes[selectedType].description}
        </p>
      )}
    </div>
  );
};

export default MessageTypeSelector;
