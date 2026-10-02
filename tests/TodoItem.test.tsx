import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoItem } from '../src/components/TodoItem';
import { Todo } from '../src/types';

describe('TodoItem', () => {
  const incompleteTodo: Todo = {
    id: 1,
    text: 'Тестовая задача',
    completed: false,
  };

  const completedTodo: Todo = {
    id: 2,
    text: 'Выполненная задача',
    completed: true,
  };

  it('renders todo text', () => {
    const onToggle = jest.fn();
    const onDelete = jest.fn();

    render(<TodoItem todo={incompleteTodo} onToggle={onToggle} onDelete={onDelete} />);

    expect(screen.getByText('Тестовая задача')).toBeInTheDocument();
  });

  it('renders checkbox unchecked for incomplete todo', () => {
    const onToggle = jest.fn();
    const onDelete = jest.fn();

    render(<TodoItem todo={incompleteTodo} onToggle={onToggle} onDelete={onDelete} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('renders checkbox checked for completed todo', () => {
    const onToggle = jest.fn();
    const onDelete = jest.fn();

    render(<TodoItem todo={completedTodo} onToggle={onToggle} onDelete={onDelete} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('renders delete button', () => {
    const onToggle = jest.fn();
    const onDelete = jest.fn();

    render(<TodoItem todo={incompleteTodo} onToggle={onToggle} onDelete={onDelete} />);

    expect(screen.getByText('Удалить')).toBeInTheDocument();
  });

  it('calls onToggle with todo id when checkbox is clicked', () => {
    const onToggle = jest.fn();
    const onDelete = jest.fn();

    render(<TodoItem todo={incompleteTodo} onToggle={onToggle} onDelete={onDelete} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith(1);
  });

  it('calls onDelete with todo id when delete button is clicked', () => {
    const onToggle = jest.fn();
    const onDelete = jest.fn();

    render(<TodoItem todo={incompleteTodo} onToggle={onToggle} onDelete={onDelete} />);

    const deleteButton = screen.getByText('Удалить');
    fireEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it('applies different style for completed todo text', () => {
    const onToggle = jest.fn();
    const onDelete = jest.fn();

    const { rerender } = render(
      <TodoItem todo={incompleteTodo} onToggle={onToggle} onDelete={onDelete} />
    );

    const incompleteText = screen.getByText('Тестовая задача');
    expect(incompleteText).not.toHaveStyle({ textDecoration: 'line-through' });

    rerender(<TodoItem todo={completedTodo} onToggle={onToggle} onDelete={onDelete} />);

    const completedText = screen.getByText('Выполненная задача');
    expect(completedText).toHaveStyle({ textDecoration: 'line-through' });
  });

  it('renders as a list item', () => {
    const onToggle = jest.fn();
    const onDelete = jest.fn();

    render(<TodoItem todo={incompleteTodo} onToggle={onToggle} onDelete={onDelete} />);

    expect(screen.getByRole('listitem')).toBeInTheDocument();
  });
});
