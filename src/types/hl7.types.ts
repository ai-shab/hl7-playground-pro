
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

export interface HL7DataType {
  id: string;
  name: string;
  description: string;
  components: HL7Field[];
}

export interface HL7Table {
  id: string;
  name: string;
  description: string;
  values: Record<string, string>;
}

export interface HL7TriggerEvent {
  id: string;
  name: string;
  description: string;
  segments: string[];
  requiredSegments: string[];
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
  dataTypes: Record<string, HL7DataType>;
  tables: Record<string, HL7Table>;
  triggerEvents: Record<string, HL7TriggerEvent>;
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
