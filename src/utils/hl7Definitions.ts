import { HL7Segment, HL7MessageType, HL7Version } from '@/types/hl7.types';

// Note: This file will be replaced by the API fetching logic
// This is just a fallback with minimal definitions
export const HL7_DEFINITIONS: HL7Version = {
  version: '2.5.1',
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
  dataTypes: {},
  tables: {},
  triggerEvents: {
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
  }
};

// These are real-world examples of HL7 v2.5.1 messages
export const SAMPLE_MESSAGES: Record<string, string> = {
  'ADT^A01': `MSH|^~\\&|SENDING_APPLICATION|SENDING_FACILITY|RECEIVING_APPLICATION|RECEIVING_FACILITY|20230101120000||ADT^A01^ADT_A01|MSG00001|P|2.5.1|||AL|NE||UNICODE UTF-8|||
EVN|A01|20230101120000||ADM_SYSTEM|SMITH^JOHN^T^III^DR^MD|20230101115500
PID|1||10006579^^^FACILITY^MRN^FACILITY|1234^5^M11^AN^MR^FACILITY|SMITH^JOHN^T^III^MR^DR|JONES^BARBARA^K|19781211|M||2106-3^WHITE^CDCREC|123 MAIN ST^APT 3B^ANYTOWN^NY^12345^USA^H^^ORANGE||(555)555-1234^PRN^PH^^^555^5551234||ENG|M|CHR|100-1234^FACILITY|123-45-6789||||N||||20230101|||
NK1|1|SMITH^BARBARA^K|SPO||(555)555-5678|||NK^NEXT OF KIN||||||||||
PV1|1|I|WEST^389^1^FACILITY^^^^WEST WING|3|||004777^ATTEND^AARON^A^^^MD^DR|004888^REFER^RACHEL^R^^^MD^DR|004999^CONSUL^CHARLES^C^^^MD^DR|SUR|||1|||004777^ATTEND^AARON^A^^^MD^DR|IP|1234567|SELF|||||||||||||||||FACILITY|B|||20230101120000||||||`,
  'ADT^A04': `MSH|^~\\&|SENDING_APPLICATION|SENDING_FACILITY|RECEIVING_APPLICATION|RECEIVING_FACILITY|20230102090000||ADT^A04^ADT_A04|MSG00002|P|2.5.1|||AL|NE||UNICODE UTF-8|||
EVN|A04|20230102090000||REG_SYSTEM|DOE^JANE^M^^MS^RN|20230102085500
PID|1||10006580^^^FACILITY^MRN^FACILITY|9876^5^F11^AN^MR^FACILITY|DOE^JANE^M^^MS^RN|SMITH^MARY^L|19820520|F||2106-3^WHITE^CDCREC|456 OAK DR^SUITE 100^ANYTOWN^NY^12345^USA^O^^ORANGE||(555)555-5678^PRN^PH^^^555^5555678||ENG|M|WID|200-2345^FACILITY|987-65-4321||||N||||20230102|||
NK1|1|DOE^JOHN^R|SPO||(555)555-1212|||NK^NEXT OF KIN||||||||||
PV1|1|O|CLINIC^101^1^FACILITY^^^^MAIN CLINIC|2|||004888^REFER^RACHEL^R^^^MD^DR||004777^ATTEND^AARON^A^^^MD^DR|MED|||1|||004888^REFER^RACHEL^R^^^MD^DR|OP|2345678|SELF|||||||||||||||||FACILITY|A|||20230102090000||||||`,
  'ORU^R01': `MSH|^~\\&|SENDING_APPLICATION|SENDING_FACILITY|RECEIVING_APPLICATION|RECEIVING_FACILITY|20230103140000||ORU^R01^ORU_R01|MSG00003|P|2.5.1|||AL|NE||UNICODE UTF-8|||
PID|1||10006581^^^FACILITY^MRN^FACILITY|5678^5^L11^AN^MR^FACILITY|JONES^BOB^B^^MR^TECH|WILLIAMS^ANN^C|19900715|M||2106-3^WHITE^CDCREC|789 PINE LN^BLDG 2^ANYTOWN^NY^12345^USA^H^^ORANGE||(555)555-9012^PRN^PH^^^555^5559012||ENG|M|CHR|300-3456^FACILITY|123-45-6789||||N||||20230101|||
ORC|RE||GHH-5624-1^FACILITY|LAB12345^FACILITY|||||20230103140000|||SMITH^JOHN^T^III^DR^MD|||||
OBR|1||LAB12345^FACILITY|CBC^COMPLETE BLOOD COUNT^L|||20230103130000|20230103135000|||||||20230103135500||004777^ATTEND^AARON^A^^^MD^DR|||||20230103140000|||F|||||||
OBX|1|NM|6690-2^LEUKOCYTES^LN||8.0|10*9/L|4.0-11.0||||F|||20230103140000||
OBX|2|NM|789-8^ERYTHROCYTES^LN||4.5|10*12/L|4.2-5.8||||F|||20230103140000||
OBX|3|NM|718-7^HEMOGLOBIN^LN||14.0|g/dL|13.0-17.0||||F|||20230103140000||
OBX|4|NM|4544-3^HEMATOCRIT^LN||42.0|%|39.0-50.0||||F|||20230103140000||
OBX|5|NM|787-2^MCV^LN||90.0|fL|80.0-100.0||||F|||20230103140000||`,
  'MDM^T02': `MSH|^~\\&|SENDING_APPLICATION|SENDING_FACILITY|RECEIVING_APPLICATION|RECEIVING_FACILITY|20230104150000||MDM^T02^MDM_T02|MSG00004|P|2.5.1|||AL|NE||UNICODE UTF-8|||
EVN|T02|20230104150000||DOC_SYSTEM|MILLER^SUSAN^E^^DR^MD|20230104145500
PID|1||10006582^^^FACILITY^MRN^FACILITY|1122^5^G11^AN^MR^FACILITY|BROWN^ROBERT^J^^MR^TECH|DAVIS^LINDA^S|19850325|M||2106-3^WHITE^CDCREC|123 ELM ST^APT 5C^ANYTOWN^NY^12345^USA^H^^ORANGE||(555)555-3456^PRN^PH^^^555^5553456||ENG|S|JEW|400-4567^FACILITY|222-33-4444||||N||||20230104|||
PV1|1|O|CLINIC^102^1^FACILITY^^^^NEUROLOGY CLINIC|2|||004999^CONSUL^CHARLES^C^^^MD^DR||004888^REFER^RACHEL^R^^^MD^DR|NEU|||1|||004999^CONSUL^CHARLES^C^^^MD^DR|OP|3456789|SELF|||||||||||||||||FACILITY|A|||20230104145000||||||
TXA|1|CN|TEXT|20230104150000|20230104150000|20230104150000|20230104150000||004999^CONSUL^CHARLES^C^^^MD^DR|004999^CONSUL^CHARLES^C^^^MD^DR|Final|DICTATED|20230104^FACILITY|||AU||DO|Electronic|Neurology Consult Note||^^FACILITY|
OBX|1|TX|CONSULTATION REPORT^REPORT||Patient presents with headache and dizziness. Headache started 3 days ago and is described as throbbing. Dizziness is intermittent.||||||F|||20230104150000||`,
  'SIU^S12': `MSH|^~\\&|SENDING_APPLICATION|SENDING_FACILITY|RECEIVING_APPLICATION|RECEIVING_FACILITY|20230105100000||SIU^S12^SIU_S12|MSG00005|P|2.5.1|||AL|NE||UNICODE UTF-8|||
SCH|12345|12345|12345||||CHECKUP|ROUTINE|60|MIN|^^^20230110100000|||||123^SMITH^JOHN^T^III^DR^MD|OFFICE|123-4567|123 MAIN ST^^ANYTOWN^NY^12345|123-4567||SMITH^JOHN^T^III^DR^MD|20230105100000|||||BOOKED|OFFICE|
PID|1||10006583^^^FACILITY^MRN^FACILITY|3344^5^H11^AN^MR^FACILITY|JOHNSON^MICHAEL^R^^MR^TECH|WILSON^BETTY^T|19700630|M||2106-3^WHITE^CDCREC|456 MAPLE AVE^^ANYTOWN^NY^12345^USA^H^^ORANGE||(555)555-7890^PRN^PH^^^555^5557890||ENG|D|AGN|500-5678^FACILITY|333-44-5555||||N||||20230105|||
PV1|1|O|CLINIC^103^1^FACILITY^^^^PRIMARY CARE CLINIC|2|||123^SMITH^JOHN^T^III^DR^MD||004999^CONSUL^CHARLES^C^^^MD^DR|GEN|||1|||123^SMITH^JOHN^T^III^DR^MD|OP|4567890|SELF|||||||||||||||||FACILITY|A|||20230105095500||||||
RGS|1|A
AIS|1||CPT^99213^CHECKUP|20230110100000|20230110110000||123^SMITH^JOHN^T^III^DR^MD|||||OFFICE^^MAIN`
};

// These are simplified helper functions - they won't be used when we fetch from API
export const getSegmentDefinition = (segmentId: string): HL7Segment | undefined => {
  return HL7_DEFINITIONS.segments[segmentId];
};

export const getMessageTypeDefinition = (messageType: string): HL7MessageType | undefined => {
  return HL7_DEFINITIONS.triggerEvents[messageType];
};

export const getTableValues = (tableId: string): Record<string, string> | undefined => {
  return HL7_DEFINITIONS.tables[tableId];
};

// The API fetching will replace this
export const fetchHL7Definitions = async (): Promise<HL7Version> => {
  return HL7_DEFINITIONS;
};
