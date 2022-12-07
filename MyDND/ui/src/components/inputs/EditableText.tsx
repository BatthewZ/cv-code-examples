import React, {useState} from 'react';
import {capitalizeAllFirstLetters} from '../../helper/stringFormatters';

type EditableTextProps = {
  fieldName: string;
  value: string;
  confirmEdit: Function;
  inputType?: 'text' | 'textarea' | 'number';
  className?: string;
  title?: string;
};

export const EditableText: React.FC<EditableTextProps> = ({
  fieldName,
  value,
  confirmEdit,
  inputType = 'text',
  className = 'editableText',
  title,
}: EditableTextProps) => {
  const [viewEditField, setViewEditField] = useState(false);
  const [textState, setTextState] = useState(value);

  function toggleEditMode() {
    setViewEditField(!viewEditField);
  }

  function formatParagraphs() {
    if (!value) return <p>Click to set...</p>;
    const paragraphs = value.replaceAll('\n\n', '\n').split('\n');
    return paragraphs.map((paragraph) => <p>{paragraph}</p>);
  }

  return (
    <div className='column centerChildren'>
      <strong>{title ? title + ': ' : ''}</strong>
      {viewEditField ? (
        <>
          {inputType === 'textarea' ? (
            <textarea
              name={fieldName}
              onChange={(e) => {
                setTextState(e.target.value && e.target.value.trim() ? e.target.value : '');
              }}
              defaultValue={value}
              rows={6}
              onKeyDown={(e) => {
                if (e.key === 'Escape') toggleEditMode();
              }}
            ></textarea>
          ) : (
            <input
              type={inputType}
              defaultValue={value}
              name={fieldName}
              onChange={(e) => setTextState(e.target.value && e.target.value.trim() ? e.target.value : '')}
              placeholder={capitalizeAllFirstLetters(title ?? fieldName)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') toggleEditMode();
              }}
            />
          )}
          <div className='row centerChildren'>
            <button
              className='btn'
              onClick={() => {
                confirmEdit(textState);
                toggleEditMode();
              }}
            >
              Update
            </button>
            <button
              className='btn'
              onClick={() => {
                setTextState(value);
                toggleEditMode();
              }}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div
          className={textState ? className : 'editableText'}
          onClick={toggleEditMode}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') toggleEditMode();
          }}
        >
          {formatParagraphs()}
        </div>
      )}
    </div>
  );
};
