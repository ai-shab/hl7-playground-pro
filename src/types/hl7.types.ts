
export interface HL7Field {
  name: string;
  description: string;
  required: boolean;
  dataType: string;
  length?: number;
  table?: string;
  values?: Record<string, string>;
}

export interface HL7Segment {
  id: string;
  name: string;
  description: string;
  fields: HL7Field[];
}

export interface HL7MessageType {
  id: string;
  name: string;
  description: string;
  segments: string[];
  requiredSegments: string[];
}

export interface HL7Version {
  version: string;
  segments: Record<string, HL7Segment>;
  messageTypes: Record<string, HL7MessageType>;
  dataTables: Record<string, Record<string, string>>;
}

export interface ValidationError {
  line: number;
  segment: string;
  field: number;
  message: string;
  severity: 'error' | 'warning';
}

export interface FieldInfo {
  segment: string;
  field: number;
  name: string;
  description: string;
  required: boolean;
  dataType: string;
  length?: number;
  table?: string;
  tableValues?: Record<string, string>;
  value: string;
  isValid: boolean;
  validationMessage?: string;
}
