import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoList } from '../src/components/TodoList';
import { Todo } from '../src/types';

describe('TodoList', () => {
  const mockTodos: Todo[] = [
    { id: 1, text: 'Первая задача', completed: false },
    { id: 2, text: 'Вторая задача', completed: true },
    { id: 3, text: 'Третья задача', completed: false },
  ];

  it('shows empty state when todos array is empty', () => {
    const onToggle = jest.fn();
    const onDelete = jest.fn();

    render(<TodoList todos={[]} onToggle={onToggle} onDelete={onDelete} />);

    expect(screen.getByText('Список пуст. Добавьте первую задачу!')).toBeInTheDocument();
  });

  it('does not show empty state when todos exist', () => {
    const onToggle = jest.fn();
    const onDelete = jest.fn();

    render(<TodoList todos={mockTodos} onToggle={onToggle} onDelete={onDelete} />);

    expect(screen.queryByText('Список пуст. Добавьте первую задачу!')).not.toBeInTheDocument();
  });

  it('renders all todos', () => {
    const onToggle = jest.fn();
    const onDelete = jest.fn();

    render(<TodoList todos={mockTodos} onToggle={onToggle} onDelete={onDelete} />);

    expect(screen.getByText('Первая задача')).toBeInTheDocument();
    expect(screen.getByText('Вторая задача')).toBeInTheDocument();
    expect(screen.getByText('Третья задача')).toBeInTheDocument();
  });

  it('renders correct number of list items', () => {
    const onToggle = jest.fn();
    const onDelete = jest.fn();

    render(<TodoList todos={mockTodos} onToggle={onToggle} onDelete={onDelete} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
  });

  it('renders as unordered list', () => {
    const onToggle = jest.fn();
    const onDelete = jest.fn();

    render(<TodoList todos={mockTodos} onToggle={onToggle} onDelete={onDelete} />);

    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('passes onToggle to TodoItem correctly', () => {
    const onToggle = jest.fn();
    const onDelete = jest.fn();

    render(<TodoList todos={mockTodos} onToggle={onToggle} onDelete={onDelete} />);

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    expect(onToggle).toHaveBeenCalledWith(1);
  });

  it('passes onDelete to TodoItem correctly', () => {
    const onToggle = jest.fn();
    const onDelete = jest.fn();

    render(<TodoList todos={mockTodos} onToggle={onToggle} onDelete={onDelete} />);

    const deleteButtons = screen.getAllByText('Удалить');
    fireEvent.click(deleteButtons[1]);

    expect(onDelete).toHaveBeenCalledWith(2);
  });

  it('renders checkboxes with correct state', () => {
    const onToggle = jest.fn();
    const onDelete = jest.fn();

    render(<TodoList todos={mockTodos} onToggle={onToggle} onDelete={onDelete} />);

    const checkboxes = screen.getAllByRole('checkbox');

    expect(checkboxes[0]).not.toBeChecked(); // Первая - не выполнена
    expect(checkboxes[1]).toBeChecked();     // Вторая - выполнена
    expect(checkboxes[2]).not.toBeChecked(); // Третья - не выполнена
  });

  it('renders single todo correctly', () => {
    const onToggle = jest.fn();
    const onDelete = jest.fn();
    const singleTodo: Todo[] = [{ id: 1, text: 'Единственная задача', completed: false }];

    render(<TodoList todos={singleTodo} onToggle={onToggle} onDelete={onDelete} />);

    expect(screen.getByText('Единственная задача')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });
});
