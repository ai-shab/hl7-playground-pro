
import { ValidationError, FieldInfo } from '@/types/hl7.types';
import { getSegmentDefinition, getMessageTypeDefinition } from './hl7Definitions';

export const parseHL7Message = (message: string): string[] => {
  if (!message || message.trim() === '') {
    return [];
  }
  return message.split('\n').filter(line => line.trim() !== '');
};

export const identifyMessageType = (message: string[]): string | null => {
  if (!message || message.length === 0) {
    return null;
  }

  // Find MSH segment
  const mshSegment = message.find(segment => segment.startsWith('MSH'));
  if (!mshSegment) {
    return null;
  }

  const fields = mshSegment.split('|');
  if (fields.length < 10) {
    return null;
  }

  // Extract message type from MSH-9
  const messageType = fields[8];
  return messageType;
};

export const validateHL7Message = (message: string): ValidationError[] => {
  const errors: ValidationError[] = [];
  const segments = parseHL7Message(message);
  
  if (segments.length === 0) {
    errors.push({
      line: 0,
      segment: '',
      field: 0,
      message: 'Empty message',
      severity: 'error'
    });
    return errors;
  }

  // Validate MSH segment exists
  if (!segments.some(segment => segment.startsWith('MSH'))) {
    errors.push({
      line: 0,
      segment: '',
      field: 0,
      message: 'Missing MSH segment',
      severity: 'error'
    });
    return errors;
  }

  const messageType = identifyMessageType(segments);
  if (!messageType) {
    errors.push({
      line: 0,
      segment: 'MSH',
      field: 9,
      message: 'Invalid or missing message type',
      severity: 'error'
    });
    return errors;
  }

  const messageTypeDefinition = getMessageTypeDefinition(messageType);
  if (!messageTypeDefinition) {
    errors.push({
      line: 0,
      segment: 'MSH',
      field: 9,
      message: `Unknown message type: ${messageType}`,
      severity: 'warning'
    });
    // Continue validation with basic checks
  } else {
    // Validate required segments
    const requiredSegments = messageTypeDefinition.requiredSegments;
    const presentSegments = segments.map(segment => {
      const parts = segment.split('|');
      return parts[0];
    });

    requiredSegments.forEach(requiredSegment => {
      if (!presentSegments.includes(requiredSegment)) {
        errors.push({
          line: 0,
          segment: requiredSegment,
          field: 0,
          message: `Required segment ${requiredSegment} is missing`,
          severity: 'error'
        });
      }
    });
  }

  // Validate each segment
  segments.forEach((segment, lineIndex) => {
    const fields = segment.split('|');
    const segmentId = fields[0];
    const segmentDefinition = getSegmentDefinition(segmentId);

    if (!segmentDefinition) {
      errors.push({
        line: lineIndex,
        segment: segmentId,
        field: 0,
        message: `Unknown segment: ${segmentId}`,
        severity: 'warning'
      });
      return;
    }

    // Validate required fields
    segmentDefinition.fields.forEach((fieldDef, fieldIndex) => {
      // In HL7, field indices start at 1, but arrays start at 0
      const fieldValue = fields[fieldIndex + 1]; // +1 to skip segment id

      if (fieldDef.required && (!fieldValue || fieldValue.trim() === '')) {
        errors.push({
          line: lineIndex,
          segment: segmentId,
          field: fieldIndex + 1,
          message: `Required field ${segmentId}-${fieldIndex + 1} (${fieldDef.name}) is missing`,
          severity: 'error'
        });
      }
    });
  });

  return errors;
};

export const getFieldInfo = (message: string[], line: number, position: number): FieldInfo | null => {
  if (line < 0 || line >= message.length) {
    return null;
  }

  const segment = message[line];
  if (!segment) {
    return null;
  }

  const fields = segment.split('|');
  const segmentId = fields[0];
  
  if (position < 0 || position >= fields.length) {
    return null;
  }

  const segmentDefinition = getSegmentDefinition(segmentId);
  if (!segmentDefinition) {
    return null;
  }

  // Adjust position to match field definition index (subtract 1 to account for segmentId)
  const fieldIndex = position - 1;
  if (fieldIndex < 0 || fieldIndex >= segmentDefinition.fields.length) {
    return null;
  }

  const fieldDef = segmentDefinition.fields[fieldIndex];
  const fieldValue = fields[position] || '';
  
  // Simple validation: just check if required fields have values
  const isValid = !fieldDef.required || (fieldValue && fieldValue.trim() !== '');
  const validationMessage = !isValid 
    ? `Required field ${segmentId}-${fieldIndex + 1} (${fieldDef.name}) is missing` 
    : undefined;

  return {
    segment: segmentId,
    field: fieldIndex + 1,
    name: fieldDef.name,
    description: fieldDef.description,
    required: fieldDef.required,
    dataType: fieldDef.dataType,
    length: fieldDef.length,
    table: fieldDef.table,
    tableValues: fieldDef.table ? {} : undefined, // In a real app, we would look up the table values
    value: fieldValue,
    isValid,
    validationMessage
  };
};
