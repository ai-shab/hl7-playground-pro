
import { HL7Segment, HL7Field, HL7DataType, HL7Table, HL7TriggerEvent } from '@/types/hl7.types';

const API_BASE_URL = 'https://hl7-definition.caristix.com/v2-api/1/HL7v2.5.1';

export const fetchSegments = async (): Promise<Record<string, HL7Segment>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Segments`);
    if (!response.ok) {
      throw new Error(`Failed to fetch segments: ${response.status}`);
    }
    
    const data = await response.json();
    const segments: Record<string, HL7Segment> = {};
    
    for (const segment of data) {
      const segmentId = segment.id;
      const fields: HL7Field[] = [];
      
      // Process fields
      if (segment.fields && Array.isArray(segment.fields)) {
        for (const field of segment.fields) {
          fields.push({
            name: field.name || '',
            description: field.description || '',
            required: field.required === true,
            dataType: field.dataType || '',
            length: field.length,
            table: field.table,
            values: {} // Will be populated later if needed
          });
        }
      }
      
      segments[segmentId] = {
        id: segmentId,
        name: segment.name || '',
        description: segment.description || '',
        fields
      };
    }
    
    return segments;
  } catch (error) {
    console.error('Error fetching segments:', error);
    return {};
  }
};

export const fetchDataTypes = async (): Promise<Record<string, HL7DataType>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/DataTypes`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data types: ${response.status}`);
    }
    
    const data = await response.json();
    const dataTypes: Record<string, HL7DataType> = {};
    
    for (const dataType of data) {
      const dataTypeId = dataType.id;
      const components: HL7Field[] = [];
      
      // Process components
      if (dataType.components && Array.isArray(dataType.components)) {
        for (const component of dataType.components) {
          components.push({
            name: component.name || '',
            description: component.description || '',
            required: component.required === true,
            dataType: component.dataType || '',
            length: component.length,
            table: component.table,
            values: {} // Will be populated later if needed
          });
        }
      }
      
      dataTypes[dataTypeId] = {
        id: dataTypeId,
        name: dataType.name || '',
        description: dataType.description || '',
        components
      };
    }
    
    return dataTypes;
  } catch (error) {
    console.error('Error fetching data types:', error);
    return {};
  }
};

export const fetchTables = async (): Promise<Record<string, HL7Table>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Tables`);
    if (!response.ok) {
      throw new Error(`Failed to fetch tables: ${response.status}`);
    }
    
    const data = await response.json();
    const tables: Record<string, HL7Table> = {};
    
    for (const table of data) {
      const tableId = table.id;
      const values: Record<string, string> = {};
      
      // Process values
      if (table.values && Array.isArray(table.values)) {
        for (const value of table.values) {
          values[value.id] = value.description || '';
        }
      }
      
      tables[tableId] = {
        id: tableId,
        name: table.name || '',
        description: table.description || '',
        values
      };
    }
    
    return tables;
  } catch (error) {
    console.error('Error fetching tables:', error);
    return {};
  }
};

export const fetchTriggerEvents = async (): Promise<Record<string, HL7TriggerEvent>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/TriggerEvents`);
    if (!response.ok) {
      throw new Error(`Failed to fetch trigger events: ${response.status}`);
    }
    
    const data = await response.json();
    const triggerEvents: Record<string, HL7TriggerEvent> = {};
    
    for (const event of data) {
      const eventId = event.id;
      const segments: string[] = [];
      const requiredSegments: string[] = [];
      
      // Process segments
      if (event.segments && Array.isArray(event.segments)) {
        for (const segment of event.segments) {
          segments.push(segment.id);
          if (segment.required === true) {
            requiredSegments.push(segment.id);
          }
        }
      }
      
      triggerEvents[eventId] = {
        id: eventId,
        name: event.name || '',
        description: event.description || '',
        segments,
        requiredSegments
      };
    }
    
    return triggerEvents;
  } catch (error) {
    console.error('Error fetching trigger events:', error);
    return {};
  }
};

export const fetchAllHL7Definitions = async (): Promise<{
  segments: Record<string, HL7Segment>;
  dataTypes: Record<string, HL7DataType>;
  tables: Record<string, HL7Table>;
  triggerEvents: Record<string, HL7TriggerEvent>;
}> => {
  const [segments, dataTypes, tables, triggerEvents] = await Promise.all([
    fetchSegments(),
    fetchDataTypes(),
    fetchTables(),
    fetchTriggerEvents()
  ]);
  
  return {
    segments,
    dataTypes,
    tables,
    triggerEvents
  };
};
