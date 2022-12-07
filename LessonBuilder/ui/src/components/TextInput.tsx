type InputProps = {
  name: string;
  label: string;
  updateState: Function;
  type?: 'text' | 'email' | 'password' | 'textarea';
  placeholder?: string;
  defaultValue?: string;
};

export const TextInput: React.FC<InputProps> = ({
  name,
  label,
  placeholder,
  type,
  updateState,
  defaultValue,
}: InputProps) => {
  const inputId = 'input-' + name;
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <h2>
        <label htmlFor={inputId}>{label}</label>
      </h2>
      {type === 'textarea' ? (
        <textarea
          id={inputId}
          onChange={(e) => updateState(e.target.value)}
          defaultValue={defaultValue}
          rows={4}
        ></textarea>
      ) : (
        <input
          type={type ?? 'text'}
          placeholder={placeholder ?? label}
          id={inputId}
          name={name}
          onChange={(e) => updateState(e.target.value)}
          defaultValue={defaultValue}
        />
      )}

      <span className='errMsg' id={'errMsg-' + name}></span>
    </div>
  );
};
