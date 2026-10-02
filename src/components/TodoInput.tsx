import { useState, JSX, ChangeEvent, KeyboardEvent } from 'react';
import { styles } from '../styles';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export const TodoInput: (props: TodoInputProps) => JSX.Element = ({ onAdd }: TodoInputProps): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleAdd: () => void = (): void => {
    const trimmed: string = inputValue.trim();
    if (trimmed === '') {
      return;
    }
    onAdd(trimmed);
    setInputValue('');
  };

  const handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const handleChange: (e: ChangeEvent<HTMLInputElement>) => void = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  return (
    <div style={styles.inputContainer}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Что нужно сделать?"
        style={styles.input}
      />
      <button onClick={handleAdd} style={styles.addButton}>
        Добавить
      </button>
    </div>
  );
};
