import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoInput } from '../src/components/TodoInput';

describe('TodoInput', () => {
  it('renders input field and add button', () => {
    const onAdd = jest.fn();
    render(<TodoInput onAdd={onAdd} />);

    expect(screen.getByPlaceholderText('Что нужно сделать?')).toBeInTheDocument();
    expect(screen.getByText('Добавить')).toBeInTheDocument();
  });

  it('calls onAdd with trimmed text when button is clicked', () => {
    const onAdd = jest.fn();
    render(<TodoInput onAdd={onAdd} />);

    const input = screen.getByPlaceholderText('Что нужно сделать?');
    const button = screen.getByText('Добавить');

    fireEvent.change(input, { target: { value: '  Новая задача  ' } });
    fireEvent.click(button);

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith('Новая задача');
  });

  it('calls onAdd when Enter key is pressed', () => {
    const onAdd = jest.fn();
    render(<TodoInput onAdd={onAdd} />);

    const input = screen.getByPlaceholderText('Что нужно сделать?');

    fireEvent.change(input, { target: { value: 'Задача через Enter' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith('Задача через Enter');
  });

  it('does not call onAdd for other keys', () => {
    const onAdd = jest.fn();
    render(<TodoInput onAdd={onAdd} />);

    const input = screen.getByPlaceholderText('Что нужно сделать?');

    fireEvent.change(input, { target: { value: 'Текст' } });
    fireEvent.keyDown(input, { key: 'Escape' });
    fireEvent.keyDown(input, { key: 'Tab' });

    expect(onAdd).not.toHaveBeenCalled();
  });

  it('clears input after adding todo', () => {
    const onAdd = jest.fn();
    render(<TodoInput onAdd={onAdd} />);

    const input = screen.getByPlaceholderText('Что нужно сделать?') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Задача' } });
    fireEvent.click(screen.getByText('Добавить'));

    expect(input.value).toBe('');
  });

  it('does not call onAdd when input is empty', () => {
    const onAdd = jest.fn();
    render(<TodoInput onAdd={onAdd} />);

    fireEvent.click(screen.getByText('Добавить'));

    expect(onAdd).not.toHaveBeenCalled();
  });

  it('does not call onAdd when input contains only whitespace', () => {
    const onAdd = jest.fn();
    render(<TodoInput onAdd={onAdd} />);

    const input = screen.getByPlaceholderText('Что нужно сделать?');

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(screen.getByText('Добавить'));

    expect(onAdd).not.toHaveBeenCalled();
  });

  it('updates input value on change', () => {
    const onAdd = jest.fn();
    render(<TodoInput onAdd={onAdd} />);

    const input = screen.getByPlaceholderText('Что нужно сделать?') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Тестовый текст' } });

    expect(input.value).toBe('Тестовый текст');
  });
});
