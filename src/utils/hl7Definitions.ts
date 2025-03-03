
import { HL7Segment, HL7MessageType, HL7Version } from '@/types/hl7.types';

// This is a simplified version of the HL7 definitions
// In a real application, this would be much more comprehensive
export const HL7_DEFINITIONS: HL7Version = {
  version: '2.5',
  segments: {
    'MSH': {
      id: 'MSH',
      name: 'Message Header',
      description: 'Defines the intent, source, destination, and some specifics of the syntax of a message.',
      fields: [
        { name: 'Field Separator', description: 'This field contains the separator character.', required: true, dataType: 'ST' },
        { name: 'Encoding Characters', description: 'This field contains the encoding characters.', required: true, dataType: 'ST' },
        { name: 'Sending Application', description: 'This field uniquely identifies the sending application.', required: false, dataType: 'HD' },
        { name: 'Sending Facility', description: 'This field identifies the sending facility.', required: false, dataType: 'HD' },
        { name: 'Receiving Application', description: 'This field uniquely identifies the receiving application.', required: false, dataType: 'HD' },
        { name: 'Receiving Facility', description: 'This field identifies the receiving facility.', required: false, dataType: 'HD' },
        { name: 'Date/Time of Message', description: 'This field contains the date and time that the sending system created the message.', required: true, dataType: 'TS' },
        { name: 'Security', description: 'This field is reserved for implementation-specific usage.', required: false, dataType: 'ST' },
        { name: 'Message Type', description: 'This field contains the message type, trigger event, and message structure ID.', required: true, dataType: 'MSG' },
        { name: 'Message Control ID', description: 'This field contains a number or other identifier that uniquely identifies the message.', required: true, dataType: 'ST' },
        { name: 'Processing ID', description: 'This field is used to decide whether to process the message as defined in HL7 Application (level 7) Processing Rules.', required: true, dataType: 'PT' },
        { name: 'Version ID', description: 'This field contains the version ID of the HL7 standard.', required: true, dataType: 'VID' },
        { name: 'Sequence Number', description: 'A non-negative integer that represents the sequence of messages sent by the sender.', required: false, dataType: 'NM' },
        { name: 'Continuation Pointer', description: 'This field contains the continuation pointer.', required: false, dataType: 'ST' },
        { name: 'Accept Acknowledgment Type', description: 'This field contains the accept acknowledgment type.', required: false, dataType: 'ID', table: '0155' },
        { name: 'Application Acknowledgment Type', description: 'This field contains the application acknowledgment type.', required: false, dataType: 'ID', table: '0155' },
        { name: 'Country Code', description: 'This field contains the country code.', required: false, dataType: 'ID', table: '0399' },
        { name: 'Character Set', description: 'This field contains the character set.', required: false, dataType: 'ID', table: '0211' },
        { name: 'Principal Language of Message', description: 'This field contains the principal language of message.', required: false, dataType: 'CE' },
        { name: 'Alternate Character Set Handling Scheme', description: 'This field contains the alternate character set handling scheme.', required: false, dataType: 'ID', table: '0356' }
      ]
    },
    'PID': {
      id: 'PID',
      name: 'Patient Identification',
      description: 'The PID segment is used by all applications as the primary means of communicating patient identification information.',
      fields: [
        { name: 'Set ID - PID', description: 'This field contains the sequence number of this PID segment.', required: false, dataType: 'SI' },
        { name: 'Patient ID', description: 'This field has been retained for backward compatibility only.', required: false, dataType: 'CX' },
        { name: 'Patient Identifier List', description: 'This field contains the list of identifiers (one or more) used by the healthcare facility to uniquely identify a patient.', required: true, dataType: 'CX' },
        { name: 'Alternate Patient ID - PID', description: 'This field has been retained for backward compatibility only.', required: false, dataType: 'CX' },
        { name: 'Patient Name', description: 'This field contains the names of the patient.', required: true, dataType: 'XPN' },
        { name: 'Mother\'s Maiden Name', description: 'This field contains the mother\'s maiden (unmarried) name.', required: false, dataType: 'XPN' },
        { name: 'Date/Time of Birth', description: 'This field contains the date and time of the patient\'s birth.', required: false, dataType: 'TS' },
        { name: 'Administrative Sex', description: 'This field contains the patient\'s sex.', required: false, dataType: 'IS', table: '0001' },
        { name: 'Patient Alias', description: 'This field has been retained for backward compatibility only.', required: false, dataType: 'XPN' },
        { name: 'Race', description: 'This field refers to the patient\'s race.', required: false, dataType: 'CE', table: '0005' },
        { name: 'Patient Address', description: 'This field contains the mailing address of the patient.', required: false, dataType: 'XAD' },
        { name: 'County Code', description: 'This field has been retained for backward compatibility only.', required: false, dataType: 'IS' },
        { name: 'Phone Number - Home', description: 'This field contains the patient\'s home phone numbers.', required: false, dataType: 'XTN' },
        { name: 'Phone Number - Business', description: 'This field contains the patient\'s business phone numbers.', required: false, dataType: 'XTN' },
        { name: 'Primary Language', description: 'This field contains the patient\'s primary language.', required: false, dataType: 'CE', table: '0296' },
        { name: 'Marital Status', description: 'This field contains the patient\'s marital status.', required: false, dataType: 'CE', table: '0002' },
        { name: 'Religion', description: 'This field contains the patient\'s religion.', required: false, dataType: 'CE', table: '0006' },
        { name: 'Patient Account Number', description: 'This field contains the patient\'s account number.', required: false, dataType: 'CX' },
        { name: 'SSN Number - Patient', description: 'This field has been retained for backward compatibility only.', required: false, dataType: 'ST' },
        { name: 'Driver\'s License Number - Patient', description: 'This field contains the patient\'s driver\'s license number.', required: false, dataType: 'DLN' }
      ]
    },
    'EVN': {
      id: 'EVN',
      name: 'Event Type',
      description: 'The EVN segment is used to communicate necessary trigger event information to receiving applications.',
      fields: [
        { name: 'Event Type Code', description: 'This field contains the code for the event that triggered this message.', required: false, dataType: 'ID', table: '0003' },
        { name: 'Recorded Date/Time', description: 'This field contains the date and time that the event was recorded.', required: true, dataType: 'TS' },
        { name: 'Date/Time Planned Event', description: 'This field contains the date and time that the event was planned to occur.', required: false, dataType: 'TS' },
        { name: 'Event Reason Code', description: 'This field contains the reason for the event.', required: false, dataType: 'IS', table: '0062' },
        { name: 'Operator ID', description: 'This field contains the ID of the operator who recorded the event.', required: false, dataType: 'XCN' },
        { name: 'Event Occurred', description: 'This field contains the date and time that the event occurred.', required: false, dataType: 'TS' },
        { name: 'Event Facility', description: 'This field contains the facility where the event occurred.', required: false, dataType: 'HD' }
      ]
    },
    'PV1': {
      id: 'PV1',
      name: 'Patient Visit',
      description: 'The PV1 segment is used by Registration/Patient Administration applications to communicate information on an account or visit-specific basis.',
      fields: [
        { name: 'Set ID - PV1', description: 'This field contains the sequence number of this PV1 segment.', required: false, dataType: 'SI' },
        { name: 'Patient Class', description: 'This field indicates the patient\'s status or class.', required: true, dataType: 'IS', table: '0004' },
        { name: 'Assigned Patient Location', description: 'This field contains the patient\'s assigned location.', required: false, dataType: 'PL' },
        { name: 'Admission Type', description: 'This field contains the admission type.', required: false, dataType: 'IS', table: '0007' },
        { name: 'Preadmit Number', description: 'This field contains the preadmit number.', required: false, dataType: 'CX' },
        { name: 'Prior Patient Location', description: 'This field contains the prior patient location.', required: false, dataType: 'PL' },
        { name: 'Attending Doctor', description: 'This field contains the attending doctor for the patient.', required: false, dataType: 'XCN' },
        { name: 'Referring Doctor', description: 'This field contains the referring doctor for the patient.', required: false, dataType: 'XCN' },
        { name: 'Consulting Doctor', description: 'This field contains the consulting doctor for the patient.', required: false, dataType: 'XCN' },
        { name: 'Hospital Service', description: 'This field contains the hospital service.', required: false, dataType: 'IS', table: '0069' },
        { name: 'Temporary Location', description: 'This field contains the temporary location.', required: false, dataType: 'PL' },
        { name: 'Preadmit Test Indicator', description: 'This field contains the preadmit test indicator.', required: false, dataType: 'IS', table: '0087' },
        { name: 'Re-admission Indicator', description: 'This field contains the re-admission indicator.', required: false, dataType: 'IS', table: '0092' },
        { name: 'Admit Source', description: 'This field contains the admit source.', required: false, dataType: 'IS', table: '0023' },
        { name: 'Ambulatory Status', description: 'This field contains the ambulatory status.', required: false, dataType: 'IS', table: '0009' },
        { name: 'VIP Indicator', description: 'This field contains the VIP indicator.', required: false, dataType: 'IS', table: '0099' },
        { name: 'Admitting Doctor', description: 'This field contains the admitting doctor.', required: false, dataType: 'XCN' },
        { name: 'Patient Type', description: 'This field contains the patient type.', required: false, dataType: 'IS', table: '0018' },
        { name: 'Visit Number', description: 'This field contains the visit number.', required: false, dataType: 'CX' },
        { name: 'Financial Class', description: 'This field contains the financial class.', required: false, dataType: 'FC', table: '0064' }
      ]
    }
  },
  messageTypes: {
    'ADT^A01': {
      id: 'ADT^A01',
      name: 'Admit/Visit Notification',
      description: 'An ADT^A01 message is sent when a patient is admitted to a healthcare facility.',
      segments: ['MSH', 'EVN', 'PID', 'PV1'],
      requiredSegments: ['MSH', 'PID', 'PV1']
    },
    'ADT^A02': {
      id: 'ADT^A02',
      name: 'Transfer a Patient',
      description: 'An ADT^A02 message is sent when a patient is transferred from one location to another within a healthcare facility.',
      segments: ['MSH', 'EVN', 'PID', 'PV1'],
      requiredSegments: ['MSH', 'PID', 'PV1']
    },
    'ADT^A03': {
      id: 'ADT^A03',
      name: 'Discharge/End Visit',
      description: 'An ADT^A03 message is sent when a patient leaves a healthcare facility.',
      segments: ['MSH', 'EVN', 'PID', 'PV1'],
      requiredSegments: ['MSH', 'PID', 'PV1']
    },
    'ADT^A04': {
      id: 'ADT^A04',
      name: 'Register a Patient',
      description: 'An ADT^A04 message is sent when a patient is registered as an outpatient or a pre-admitted patient.',
      segments: ['MSH', 'EVN', 'PID', 'PV1'],
      requiredSegments: ['MSH', 'PID', 'PV1']
    },
    'ORU^R01': {
      id: 'ORU^R01',
      name: 'Unsolicited Observation Message',
      description: 'An ORU^R01 message is sent to transmit results of observations.',
      segments: ['MSH', 'PID', 'PV1'],
      requiredSegments: ['MSH', 'PID']
    }
  },
  dataTables: {
    '0001': {
      'F': 'Female',
      'M': 'Male',
      'O': 'Other',
      'U': 'Unknown',
      'A': 'Ambiguous',
      'N': 'Not applicable'
    },
    '0003': {
      'A01': 'ADT/ACK - Admit/visit notification',
      'A02': 'ADT/ACK - Transfer a patient',
      'A03': 'ADT/ACK - Discharge/end visit',
      'A04': 'ADT/ACK - Register a patient',
      'A05': 'ADT/ACK - Pre-admit a patient',
      'A06': 'ADT/ACK - Change an outpatient to an inpatient',
      'A07': 'ADT/ACK - Change an inpatient to an outpatient',
      'A08': 'ADT/ACK - Update patient information',
      'A09': 'ADT/ACK - Patient departing - tracking',
      'A10': 'ADT/ACK - Patient arriving - tracking'
    },
    '0004': {
      'E': 'Emergency',
      'I': 'Inpatient',
      'O': 'Outpatient',
      'P': 'Preadmit',
      'R': 'Recurring patient',
      'B': 'Obstetrics',
      'C': 'Commercial Account',
      'N': 'Not Applicable',
      'U': 'Unknown'
    }
  }
};

export const getSegmentDefinition = (segmentId: string): HL7Segment | undefined => {
  return HL7_DEFINITIONS.segments[segmentId];
};

export const getMessageTypeDefinition = (messageType: string): HL7MessageType | undefined => {
  return HL7_DEFINITIONS.messageTypes[messageType];
};

export const getTableValues = (tableId: string): Record<string, string> | undefined => {
  return HL7_DEFINITIONS.dataTables[tableId];
};

// This function would fetch the full HL7 definitions from a server
// For now, we'll just return the simplified version
export const fetchHL7Definitions = async (): Promise<HL7Version> => {
  return HL7_DEFINITIONS;
};

// In a real application, this would be much more comprehensive
export const SAMPLE_MESSAGES: Record<string, string> = {
  'ADT^A01': `MSH|^~\\&|SENDING_APPLICATION|SENDING_FACILITY|RECEIVING_APPLICATION|RECEIVING_FACILITY|20230101120000||ADT^A01|MSG00001|P|2.5|||AL|NE||
EVN|A01|20230101120000||
PID|1||10006579^^^1^MRN^1||SMITH^JOHN^M||19781211|M||1|123 MAIN ST^^ANYTOWN^NY^12345||555-555-1234|||S|MRN-12345|123-45-6789||||
PV1|1|I|WARD^ROOM^BED|1|||004777^ATTEND^AARON^A|||SUR||||1|A0`,
  'ADT^A04': `MSH|^~\\&|SENDING_APPLICATION|SENDING_FACILITY|RECEIVING_APPLICATION|RECEIVING_FACILITY|20230102090000||ADT^A04|MSG00002|P|2.5|||AL|NE||
EVN|A04|20230102090000||
PID|1||10006580^^^1^MRN^1||DOE^JANE^M||19820520|F||1|456 OAK DR^^ANYTOWN^NY^12345||555-555-5678|||M|MRN-12346|987-65-4321||||
PV1|1|O|CLINIC||||004888^REFER^RACHEL^R|||MED||||1|A0`,
  'ORU^R01': `MSH|^~\\&|SENDING_APPLICATION|SENDING_FACILITY|RECEIVING_APPLICATION|RECEIVING_FACILITY|20230103140000||ORU^R01|MSG00003|P|2.5|||AL|NE||
PID|1||10006581^^^1^MRN^1||JONES^BOB^B||19900715|M||1|789 PINE LN^^ANYTOWN^NY^12345||555-555-9012|||M|MRN-12347|123-45-6789||||
PV1|1|O|LABOR|||GENERAL||||PHY||||1|A0`
};
