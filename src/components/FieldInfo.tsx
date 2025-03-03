
import React from 'react';
import { FieldInfo as FieldInfoType } from '@/types/hl7.types';
import { Badge } from '@/components/ui/badge';

interface FieldInfoProps {
  fieldInfo: FieldInfoType;
}

const FieldInfo: React.FC<FieldInfoProps> = ({ fieldInfo }) => {
  if (!fieldInfo) return null;

  return (
    <div className="field-tooltip animate-fade-in">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-sm">{fieldInfo.name}</h3>
        <Badge variant={fieldInfo.required ? "destructive" : "secondary"} className="text-xs ml-2">
          {fieldInfo.required ? "Required" : "Optional"}
        </Badge>
      </div>
      
      <p className="text-xs text-gray-600 mb-2">{fieldInfo.description}</p>
      
      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
        <div className="text-gray-500">Data Type:</div>
        <div className="font-medium">{fieldInfo.dataType}</div>
        
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
      
      {fieldInfo.validationMessage && (
        <div className="mt-2 p-1 bg-red-50 text-red-600 rounded-sm text-xs">
          {fieldInfo.validationMessage}
        </div>
      )}
    </div>
  );
};

export default FieldInfo;
