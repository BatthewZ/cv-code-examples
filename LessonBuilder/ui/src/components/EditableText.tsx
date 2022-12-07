import React, {useState} from 'react';
import {capitalizeAllFirstLetters} from '../helper/helpers';

type EditableTextProps = {
  fieldName: string;
  value: string;
  confirmEdit: Function;
  inputType?: 'text' | 'textarea' | 'number';
  className?: string;
};

export const EditableText: React.FC<EditableTextProps> = ({
  fieldName,
  value,
  confirmEdit,
  inputType = 'text',
  className = 'editableText',
}: EditableTextProps) => {
  const [viewEditField, setViewEditField] = useState(false);
  const [textState, setTextState] = useState(value);

  function toggleEditMode() {
    setViewEditField(!viewEditField);
  }

  return (
    <div className='column centerChildren'>
      {/* <strong>{capitalizeAllFirstLetters(fieldName)}:</strong> */}
      {viewEditField ? (
        <>
          {inputType === 'textarea' ? (
            <textarea
              name={fieldName}
              onChange={(e) => {
                setTextState(e.target.value && e.target.value.trim() ? e.target.value : '');
              }}
              defaultValue={value}
              rows={4}
            ></textarea>
          ) : (
            <input
              type={inputType}
              defaultValue={value}
              name={fieldName}
              onChange={(e) => setTextState(e.target.value && e.target.value.trim() ? e.target.value : '')}
              placeholder={capitalizeAllFirstLetters(fieldName)}
            />
          )}
          <div className='row'>
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
            {/* <button className='btn' onClick={() => console.log(desc)}>
              Check Description State
            </button> */}
          </div>
        </>
      ) : (
        <p className={className} onClick={toggleEditMode}>
          {value ? value : 'Click to add a ' + fieldName.toLowerCase() + '...'}
        </p>
      )}
    </div>
  );
};
