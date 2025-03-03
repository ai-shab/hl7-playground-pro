
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { parseHL7Message, validateHL7Message, getFieldInfo } from '@/utils/hl7Validator';
import { FieldInfo as FieldInfoType, HL7Segment, HL7Table } from '@/types/hl7.types';
import FieldInfo from '@/components/FieldInfo';
import { useHL7Definitions } from '@/contexts/HL7DefinitionsContext';

interface HL7EditorProps {
  message: string;
  onChange: (message: string) => void;
  onValidate: (errors: any[]) => void;
  segments: Record<string, HL7Segment>;
  tables: Record<string, HL7Table>;
}

const HL7Editor: React.FC<HL7EditorProps> = ({ 
  message, 
  onChange, 
  onValidate,
  segments,
  tables
}) => {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [hoveredField, setHoveredField] = useState<FieldInfoType | null>(null);
  const [selectedField, setSelectedField] = useState<FieldInfoType | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ line: 0, column: 0 });
  const [highlightedText, setHighlightedText] = useState<React.ReactNode[]>([]);
  
  const { triggerEvents } = useHL7Definitions();
  const parsedMessage = useMemo(() => parseHL7Message(message), [message]);
  
  const errors = useMemo(() => 
    validateHL7Message(message, segments, triggerEvents), 
    [message, segments, triggerEvents]
  );
  
  // Update the validation errors whenever they change
  useEffect(() => {
    onValidate(errors);
  }, [errors, onValidate]);
  
  // Handle editor input
  const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };
  
  // Handle cursor movement to update field highlighting
  const handleEditorMouseMove = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    if (!editorRef.current) return;
    
    const textarea = editorRef.current;
    const { selectionStart } = textarea;
    
    // Get the position in the text based on cursor coordinates
    const textBeforeCursor = textarea.value.substring(0, selectionStart);
    const linesBeforeCursor = textBeforeCursor.split('\n');
    const currentLineIndex = linesBeforeCursor.length - 1;
    const currentLine = parsedMessage[currentLineIndex] || '';
    
    if (!currentLine) {
      setHoveredField(null);
      return;
    }
    
    // Determine the field based on cursor position
    const currentLineBeforeCursor = linesBeforeCursor[currentLineIndex];
    let fieldPosition = 0;
    let currentPosition = 0;
    
    const fields = currentLine.split('|');
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      currentPosition += field.length + 1; // +1 for the separator
      if (currentPosition >= currentLineBeforeCursor.length) {
        fieldPosition = i;
        break;
      }
    }
    
    const fieldInfoData = getFieldInfo(parsedMessage, currentLineIndex, fieldPosition, segments, tables);
    setHoveredField(fieldInfoData);
    setCursorPosition({ line: currentLineIndex, column: fieldPosition });
  };
  
  // Handle editor mouse leaving
  const handleEditorMouseLeave = () => {
    setHoveredField(null);
  };
  
  // Handle field click to select it
  const handleFieldClick = (lineIndex: number, fieldIndex: number) => {
    const fieldInfoData = getFieldInfo(parsedMessage, lineIndex, fieldIndex, segments, tables);
    setSelectedField(fieldInfoData);
    // When a field is clicked, also set its position
    setCursorPosition({ line: lineIndex, column: fieldIndex });
  };
  
  // Render the message with syntax highlighting
  useEffect(() => {
    if (!message) {
      setHighlightedText([]);
      return;
    }
    
    const lines = parseHL7Message(message);
    const renderedLines = lines.map((line, lineIndex) => {
      const fields = line.split('|');
      const segmentId = fields[0];
      
      // Get segment definition to enhance display
      const segmentDefinition = segments[segmentId];
      const segmentName = segmentDefinition ? segmentDefinition.name : '';
      
      // Create a special class for the segment line
      const segmentClass = `hl7-segment ${segmentDefinition ? 'hl7-segment-known' : ''}`;
      
      return (
        <div key={lineIndex} className={segmentClass}>
          {/* Segment identifier with additional info */}
          <div className="hl7-segment-header">
            {segmentId && <span className="hl7-segment-id">{segmentId}</span>}
            {segmentName && <span className="hl7-segment-name">— {segmentName}</span>}
          </div>
          
          {/* Fields with improved styling */}
          <div className="hl7-fields">
            {fields.map((field, fieldIndex) => {
              // Check if this field has validation errors
              const fieldErrors = errors.filter(
                err => err.line === lineIndex && err.field === fieldIndex
              );
              
              const hasError = fieldErrors.length > 0;
              const isHovered = lineIndex === cursorPosition.line && fieldIndex === cursorPosition.column && hoveredField;
              const isSelected = selectedField && selectedField.segment === segmentId && 
                               selectedField.field === fieldIndex && 
                               lineIndex === cursorPosition.line;
              
              // Build field class based on state and validation
              const fieldClass = `hl7-field ${hasError ? 'hl7-field-invalid' : ''} 
                                ${isHovered ? 'bg-blue-100' : ''} ${isSelected ? 'bg-blue-200 ring-2 ring-blue-400' : ''}
                                hover:bg-gray-100 cursor-pointer`;
              
              // Get field definition for tooltip if available
              const fieldName = segmentDefinition && segmentDefinition.fields[fieldIndex - 1] ? 
                              segmentDefinition.fields[fieldIndex - 1].name : '';
              
              return (
                <React.Fragment key={`${lineIndex}-${fieldIndex}`}>
                  <div 
                    className={fieldClass}
                    onClick={() => handleFieldClick(lineIndex, fieldIndex)}
                    title={`${segmentId}-${fieldIndex} ${fieldName ? ': ' + fieldName : ''}`}
                  >
                    {field}
                    {(isHovered || isSelected) && hoveredField && (
                      <div className="absolute z-10 mt-2">
                        <FieldInfo fieldInfo={isSelected ? selectedField! : hoveredField} />
                      </div>
                    )}
                  </div>
                  {fieldIndex < fields.length - 1 && <span className="hl7-field-separator">|</span>}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      );
    });
    
    setHighlightedText(renderedLines);
  }, [message, errors, hoveredField, selectedField, cursorPosition, segments, tables]);
  
  return (
    <div className="hl7-editor-container">
      <div className="flex-1 relative">
        <div 
          className="absolute top-0 left-0 w-full h-full overflow-auto p-4 hl7-editor"
        >
          {highlightedText}
        </div>
        <textarea
          ref={editorRef}
          value={message}
          onChange={handleEditorChange}
          onMouseMove={handleEditorMouseMove}
          onMouseLeave={handleEditorMouseLeave}
          className="absolute top-0 left-0 w-full h-full p-4 bg-transparent resize-none hl7-editor-textarea"
          spellCheck={false}
          placeholder="Enter HL7 message here..."
        />
      </div>
    </div>
  );
};

export default HL7Editor;
