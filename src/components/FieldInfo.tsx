
import React, { useState } from 'react';
import { FieldInfo as FieldInfoType } from '@/types/hl7.types';
import { Badge } from '@/components/ui/badge';
import { useHL7Definitions } from '@/contexts/HL7DefinitionsContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FieldInfoProps {
  fieldInfo: FieldInfoType;
}

const FieldInfo: React.FC<FieldInfoProps> = ({ fieldInfo }) => {
  const [expanded, setExpanded] = useState(false);
  const { dataTypes } = useHL7Definitions();
  
  if (!fieldInfo) return null;

  const dataType = dataTypes[fieldInfo.dataType];
  const hasDataTypeComponents = dataType && dataType.components && dataType.components.length > 0;

  return (
    <div className="field-tooltip animate-fade-in shadow-lg border border-border bg-white rounded-md p-3 z-10 min-w-[280px] max-w-[400px]">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-sm">{fieldInfo.name}</h3>
        <Badge variant={fieldInfo.required ? "destructive" : "secondary"} className="text-xs ml-2">
          {fieldInfo.required ? "Required" : "Optional"}
        </Badge>
      </div>
      
      <p className="text-xs text-gray-600 mb-2">{fieldInfo.description}</p>
      
      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
        <div className="text-gray-500">Data Type:</div>
        <div className="font-medium">
          {fieldInfo.dataType}
          {hasDataTypeComponents && (
            <button 
              className="ml-2 inline-flex items-center text-primary"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          )}
        </div>
        
        {fieldInfo.length && (
          <>
            <div className="text-gray-500">Max Length:</div>
            <div className="font-medium">{fieldInfo.length}</div>
          </>
        )}
        
        {fieldInfo.table && (
          <>
            <div className="text-gray-500">Value Table:</div>
            <div className="font-medium">{fieldInfo.table}</div>
          </>
        )}
        
        <div className="text-gray-500">Current Value:</div>
        <div className="font-medium truncate max-w-[150px]" title={fieldInfo.value || 'Empty'}>
          {fieldInfo.value || <span className="text-gray-400 italic">Empty</span>}
        </div>
      </div>
      
      {expanded && hasDataTypeComponents && (
        <div className="mt-3 border-t pt-2">
          <h4 className="text-xs font-medium mb-1">Data Type Components</h4>
          <div className="max-h-[150px] overflow-y-auto">
            {dataType.components.map((component, index) => (
              <div key={index} className="text-xs mb-1 pb-1 border-b border-gray-100 last:border-0">
                <div className="flex justify-between">
                  <span className="font-medium">{component.name}</span>
                  <Badge variant={component.required ? "destructive" : "secondary"} className="text-xs">
                    {component.required ? "Req" : "Opt"}
                  </Badge>
                </div>
                <div className="text-gray-500 text-xs">{component.dataType}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {fieldInfo.tableValues && Object.keys(fieldInfo.tableValues).length > 0 && (
        <div className="mt-3 border-t pt-2">
          <h4 className="text-xs font-medium mb-1">Valid Values</h4>
          <div className="max-h-[150px] overflow-y-auto grid grid-cols-2 gap-1">
            {Object.entries(fieldInfo.tableValues).map(([code, description]) => (
              <div key={code} className="text-xs">
                <span className="font-medium">{code}</span>: {description}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {fieldInfo.validationMessage && (
        <div className="mt-2 p-1 bg-red-50 text-red-600 rounded-sm text-xs">
          {fieldInfo.validationMessage}
        </div>
      )}
    </div>
  );
};

export default FieldInfo;
