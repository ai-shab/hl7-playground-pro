
import { HL7Segment, HL7Field, HL7DataType, HL7Table, HL7TriggerEvent } from '@/types/hl7.types';

const API_BASE_URL = 'https://hl7-definition.caristix.com/v2-api/1/HL7v2.5.1';

export const fetchSegments = async (): Promise<Record<string, HL7Segment>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Segments`, {
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
      }
    });
    
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
    // Return mock data if fetch fails due to CORS
    return getMockSegments();
  }
};

export const fetchDataTypes = async (): Promise<Record<string, HL7DataType>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/DataTypes`, {
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
      }
    });
    
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
    // Return mock data if fetch fails due to CORS
    return getMockDataTypes();
  }
};

export const fetchTables = async (): Promise<Record<string, HL7Table>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Tables`, {
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
      }
    });
    
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
    // Return mock data if fetch fails due to CORS
    return getMockTables();
  }
};

export const fetchTriggerEvents = async (): Promise<Record<string, HL7TriggerEvent>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/TriggerEvents`, {
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
      }
    });
    
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
    // Return mock data if fetch fails due to CORS
    return getMockTriggerEvents();
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

// Mock data functions to provide fallback data when CORS issues prevent API access
const getMockSegments = (): Record<string, HL7Segment> => {
  return {
    'MSH': {
      id: 'MSH',
      name: 'Message Header',
      description: 'Message header segment defines message type, source, destination, etc.',
      fields: [
        {
          name: 'Field Separator',
          description: 'This field contains the separator character',
          required: true,
          dataType: 'ST',
          length: 1,
          values: {}
        },
        {
          name: 'Encoding Characters',
          description: 'This field contains the encoding characters',
          required: true,
          dataType: 'ST',
          length: 4,
          values: {}
        },
        {
          name: 'Sending Application',
          description: 'This field contains the sending application name',
          required: false,
          dataType: 'HD',
          values: {}
        },
        {
          name: 'Sending Facility',
          description: 'This field contains the sending facility',
          required: false,
          dataType: 'HD',
          values: {}
        },
        {
          name: 'Receiving Application',
          description: 'This field contains the receiving application name',
          required: false,
          dataType: 'HD',
          values: {}
        },
        {
          name: 'Receiving Facility',
          description: 'This field contains the receiving facility',
          required: false,
          dataType: 'HD',
          values: {}
        },
        {
          name: 'Date/Time of Message',
          description: 'This field contains the date/time of the message',
          required: false,
          dataType: 'TS',
          values: {}
        },
        {
          name: 'Security',
          description: 'This field contains security information',
          required: false,
          dataType: 'ST',
          values: {}
        },
        {
          name: 'Message Type',
          description: 'This field contains the message type',
          required: true,
          dataType: 'MSG',
          values: {}
        }
      ]
    },
    'PID': {
      id: 'PID',
      name: 'Patient Identification',
      description: 'Patient identification segment',
      fields: [
        {
          name: 'Set ID - PID',
          description: 'This field contains the sequence number',
          required: false,
          dataType: 'SI',
          length: 4,
          values: {}
        },
        {
          name: 'Patient ID',
          description: 'This field contains the patient ID (external)',
          required: false,
          dataType: 'CX',
          values: {}
        },
        {
          name: 'Patient Identifier List',
          description: 'This field contains the patient identifier list',
          required: true,
          dataType: 'CX',
          values: {}
        },
        {
          name: 'Alternate Patient ID - PID',
          description: 'This field contains alternate patient IDs',
          required: false,
          dataType: 'CX',
          values: {}
        },
        {
          name: 'Patient Name',
          description: 'This field contains the patient name',
          required: true,
          dataType: 'XPN',
          values: {}
        }
      ]
    }
  };
};

const getMockDataTypes = (): Record<string, HL7DataType> => {
  return {
    'ST': {
      id: 'ST',
      name: 'String',
      description: 'String data',
      components: []
    },
    'CX': {
      id: 'CX',
      name: 'Extended Composite ID with Check Digit',
      description: 'Used for identifying a patient, subscriber, etc.',
      components: [
        {
          name: 'ID Number',
          description: 'The value of the identifier itself',
          required: true,
          dataType: 'ST',
          values: {}
        },
        {
          name: 'Check Digit',
          description: 'The check digit for the identifier',
          required: false,
          dataType: 'ST',
          values: {}
        },
        {
          name: 'Code Identifying the Check Digit Scheme Employed',
          description: 'Code used to identify the check digit scheme',
          required: false,
          dataType: 'ID',
          table: '61',
          values: {}
        }
      ]
    },
    'XPN': {
      id: 'XPN',
      name: 'Extended Person Name',
      description: 'Extended person name data type',
      components: [
        {
          name: 'Family Name',
          description: 'The family (last) name',
          required: false,
          dataType: 'FN',
          values: {}
        },
        {
          name: 'Given Name',
          description: 'The given (first) name',
          required: false,
          dataType: 'ST',
          values: {}
        },
        {
          name: 'Second and Further Given Names or Initials Thereof',
          description: 'Middle name or initial',
          required: false,
          dataType: 'ST',
          values: {}
        }
      ]
    },
    'HD': {
      id: 'HD',
      name: 'Hierarchic Designator',
      description: 'HD data type',
      components: [
        {
          name: 'Namespace ID',
          description: 'Namespace identifier',
          required: false,
          dataType: 'IS',
          table: '300',
          values: {}
        },
        {
          name: 'Universal ID',
          description: 'Universal identifier',
          required: false,
          dataType: 'ST',
          values: {}
        },
        {
          name: 'Universal ID Type',
          description: 'Universal identifier type',
          required: false,
          dataType: 'ID',
          table: '301',
          values: {}
        }
      ]
    },
    'TS': {
      id: 'TS',
      name: 'Time Stamp',
      description: 'Time stamp data type',
      components: [
        {
          name: 'Time',
          description: 'Time in format YYYYMMDDHHMMSS',
          required: true,
          dataType: 'DTM',
          values: {}
        },
        {
          name: 'Degree of Precision',
          description: 'Degree of precision',
          required: false,
          dataType: 'ID',
          values: {}
        }
      ]
    },
    'MSG': {
      id: 'MSG',
      name: 'Message Type',
      description: 'Message type data type',
      components: [
        {
          name: 'Message Code',
          description: 'Message code',
          required: true,
          dataType: 'ID',
          table: '76',
          values: {}
        },
        {
          name: 'Trigger Event',
          description: 'Trigger event',
          required: true,
          dataType: 'ID',
          table: '3',
          values: {}
        },
        {
          name: 'Message Structure',
          description: 'Message structure',
          required: true,
          dataType: 'ID',
          table: '354',
          values: {}
        }
      ]
    }
  };
};

const getMockTables = (): Record<string, HL7Table> => {
  return {
    '0001': {
      id: '0001',
      name: 'Administrative Sex',
      description: 'HL7 Administrative Sex Table',
      values: {
        'F': 'Female',
        'M': 'Male',
        'O': 'Other',
        'U': 'Unknown',
        'A': 'Ambiguous',
        'N': 'Not applicable'
      }
    },
    '0003': {
      id: '0003',
      name: 'Event Type',
      description: 'HL7 Event Type Table',
      values: {
        'A01': 'ADT/ACK - Admit/visit notification',
        'A02': 'ADT/ACK - Transfer a patient',
        'A03': 'ADT/ACK - Discharge/end visit',
        'A04': 'ADT/ACK - Register a patient',
        'A05': 'ADT/ACK - Pre-admit a patient',
        'A06': 'ADT/ACK - Change an outpatient to an inpatient',
        'A07': 'ADT/ACK - Change an inpatient to an outpatient',
        'A08': 'ADT/ACK - Update patient information'
      }
    },
    '0076': {
      id: '0076',
      name: 'Message Type',
      description: 'HL7 Message Type Table',
      values: {
        'ACK': 'General acknowledgment message',
        'ADT': 'ADT message',
        'BAR': 'Add/change billing account',
        'DFT': 'Detailed financial transaction',
        'MDM': 'Medical document management',
        'MFN': 'Master files notification',
        'ORM': 'Order message',
        'ORU': 'Observation result/unsolicited',
        'QRY': 'Query, original mode',
        'RAS': 'Pharmacy/treatment administration',
        'RDE': 'Pharmacy/treatment encoded order',
        'RGV': 'Pharmacy/treatment give',
        'SIU': 'Schedule information unsolicited'
      }
    }
  };
};

const getMockTriggerEvents = (): Record<string, HL7TriggerEvent> => {
  return {
    'ADT^A01': {
      id: 'ADT^A01',
      name: 'Admit/Visit Notification',
      description: 'An ADT A01 event is used to communicate information when a patient is admitted to a facility.',
      segments: ['MSH', 'EVN', 'PID', 'PD1', 'NK1', 'PV1', 'PV2', 'DB1', 'OBX', 'AL1', 'DG1', 'PR1', 'GT1', 'IN1', 'IN2', 'IN3', 'ACC', 'UB1', 'UB2'],
      requiredSegments: ['MSH', 'EVN', 'PID', 'PV1']
    },
    'ADT^A02': {
      id: 'ADT^A02',
      name: 'Transfer a Patient',
      description: 'An ADT A02 event is used to communicate information when a patient is transferred from one location to another.',
      segments: ['MSH', 'EVN', 'PID', 'PD1', 'PV1', 'PV2', 'DB1', 'OBX'],
      requiredSegments: ['MSH', 'EVN', 'PID', 'PV1']
    },
    'ADT^A03': {
      id: 'ADT^A03',
      name: 'Discharge/End Visit',
      description: 'An ADT A03 event is used to communicate information when a patient's stay at a healthcare facility has ended.',
      segments: ['MSH', 'EVN', 'PID', 'PD1', 'PV1', 'PV2', 'DB1', 'OBX'],
      requiredSegments: ['MSH', 'EVN', 'PID', 'PV1']
    },
    'ADT^A04': {
      id: 'ADT^A04',
      name: 'Register a Patient',
      description: 'An ADT A04 event is used to communicate information when a patient has arrived or been registered in a healthcare facility.',
      segments: ['MSH', 'EVN', 'PID', 'PD1', 'NK1', 'PV1', 'PV2', 'DB1', 'OBX', 'AL1', 'DG1', 'PR1', 'GT1', 'IN1', 'IN2', 'IN3', 'ACC', 'UB1', 'UB2'],
      requiredSegments: ['MSH', 'EVN', 'PID', 'PV1']
    },
    'ORU^R01': {
      id: 'ORU^R01',
      name: 'Unsolicited Observation Message',
      description: 'An ORU R01 event is used to transmit results of observations and test results.',
      segments: ['MSH', 'PID', 'PD1', 'NK1', 'OBR', 'OBX', 'CTI', 'NTE'],
      requiredSegments: ['MSH', 'PID', 'OBR', 'OBX']
    }
  };
};
