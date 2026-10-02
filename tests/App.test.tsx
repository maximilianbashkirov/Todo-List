import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from '../src/App';

describe('App', () => {
  describe('rendering', () => {
    it('renders header with title', () => {
      render(<App />);
      expect(screen.getByText('Todo List')).toBeInTheDocument();
    });

    it('renders subtitle', () => {
      render(<App />);
      expect(screen.getByText('Организуй свой день')).toBeInTheDocument();
    });

    it('renders input component', () => {
      render(<App />);
      expect(screen.getByPlaceholderText('Что нужно сделать?')).toBeInTheDocument();
    });

    it('shows empty state initially', () => {
      render(<App />);
      expect(screen.getByText('Список пуст. Добавьте первую задачу!')).toBeInTheDocument();
    });

    it('does not show stats when no todos', () => {
      render(<App />);
      expect(screen.queryByText('Всего')).not.toBeInTheDocument();
    });
  });

  describe('adding todos', () => {
    it('adds a new todo via button click', () => {
      render(<App />);
      const input = screen.getByPlaceholderText('Что нужно сделать?');
      const addButton = screen.getByText('Добавить');

      fireEvent.change(input, { target: { value: 'Новая задача' } });
      fireEvent.click(addButton);

      expect(screen.getByText('Новая задача')).toBeInTheDocument();
    });

    it('adds a new todo via Enter key', () => {
      render(<App />);
      const input = screen.getByPlaceholderText('Что нужно сделать?');

      fireEvent.change(input, { target: { value: 'Задача через Enter' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(screen.getByText('Задача через Enter')).toBeInTheDocument();
    });

    it('does not add empty todos', () => {
      render(<App />);
      const addButton = screen.getByText('Добавить');

      fireEvent.click(addButton);

      expect(screen.getByText('Список пуст. Добавьте первую задачу!')).toBeInTheDocument();
    });

    it('adds multiple todos', () => {
      render(<App />);
      const input = screen.getByPlaceholderText('Что нужно сделать?');
      const addButton = screen.getByText('Добавить');

      fireEvent.change(input, { target: { value: 'Задача 1' } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: 'Задача 2' } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: 'Задача 3' } });
      fireEvent.click(addButton);

      expect(screen.getByText('Задача 1')).toBeInTheDocument();
      expect(screen.getByText('Задача 2')).toBeInTheDocument();
      expect(screen.getByText('Задача 3')).toBeInTheDocument();
    });
  });

  describe('toggling todos', () => {
    it('toggles todo completion', () => {
      render(<App />);
      const input = screen.getByPlaceholderText('Что нужно сделать?');
      const addButton = screen.getByText('Добавить');

      fireEvent.change(input, { target: { value: 'Тестовая задача' } });
      fireEvent.click(addButton);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();

      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    it('can toggle back to incomplete', () => {
      render(<App />);
      const input = screen.getByPlaceholderText('Что нужно сделать?');
      const addButton = screen.getByText('Добавить');

      fireEvent.change(input, { target: { value: 'Задача' } });
      fireEvent.click(addButton);

      const checkbox = screen.getByRole('checkbox');

      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();

      fireEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });
  });

  describe('deleting todos', () => {
    it('deletes a todo', () => {
      render(<App />);
      const input = screen.getByPlaceholderText('Что нужно сделать?');
      const addButton = screen.getByText('Добавить');

      fireEvent.change(input, { target: { value: 'Задача для удаления' } });
      fireEvent.click(addButton);

      expect(screen.getByText('Задача для удаления')).toBeInTheDocument();

      const deleteButton = screen.getByText('Удалить');
      fireEvent.click(deleteButton);

      expect(screen.queryByText('Задача для удаления')).not.toBeInTheDocument();
    });

    it('shows empty state after deleting last todo', () => {
      render(<App />);
      const input = screen.getByPlaceholderText('Что нужно сделать?');
      const addButton = screen.getByText('Добавить');

      fireEvent.change(input, { target: { value: 'Последняя задача' } });
      fireEvent.click(addButton);

      fireEvent.click(screen.getByText('Удалить'));

      expect(screen.getByText('Список пуст. Добавьте первую задачу!')).toBeInTheDocument();
    });

    it('deletes correct todo from multiple', () => {
      render(<App />);
      const input = screen.getByPlaceholderText('Что нужно сделать?');
      const addButton = screen.getByText('Добавить');

      fireEvent.change(input, { target: { value: 'Задача 1' } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: 'Задача 2' } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: 'Задача 3' } });
      fireEvent.click(addButton);

      const deleteButtons = screen.getAllByText('Удалить');
      fireEvent.click(deleteButtons[1]); // Удаляем вторую задачу

      expect(screen.getByText('Задача 1')).toBeInTheDocument();
      expect(screen.queryByText('Задача 2')).not.toBeInTheDocument();
      expect(screen.getByText('Задача 3')).toBeInTheDocument();
    });
  });

  describe('stats', () => {
    it('shows stats when todos exist', () => {
      render(<App />);
      const input = screen.getByPlaceholderText('Что нужно сделать?');
      const addButton = screen.getByText('Добавить');

      fireEvent.change(input, { target: { value: 'Задача' } });
      fireEvent.click(addButton);

      expect(screen.getByText('Всего')).toBeInTheDocument();
      expect(screen.getByText('Выполнено')).toBeInTheDocument();
      expect(screen.getByText('Осталось')).toBeInTheDocument();
    });

    it('updates stats correctly', () => {
      render(<App />);
      const input = screen.getByPlaceholderText('Что нужно сделать?');
      const addButton = screen.getByText('Добавить');

      fireEvent.change(input, { target: { value: 'Задача 1' } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: 'Задача 2' } });
      fireEvent.click(addButton);

      expect(screen.getAllByText('2')).toHaveLength(2); // Всего и Осталось
      expect(screen.getByText('0')).toBeInTheDocument(); // Выполнено
    });

    it('updates completed count when toggling', () => {
      render(<App />);
      const input = screen.getByPlaceholderText('Что нужно сделать?');
      const addButton = screen.getByText('Добавить');

      fireEvent.change(input, { target: { value: 'Задача 1' } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: 'Задача 2' } });
      fireEvent.click(addButton);

      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[0]);

      // После toggle: Всего=2, Выполнено=1, Осталось=1
      expect(screen.getAllByText('1')).toHaveLength(2); // Выполнено и Осталось
      expect(screen.getByText('2')).toBeInTheDocument(); // Всего
    });

    it('hides stats after deleting all todos', () => {
      render(<App />);
      const input = screen.getByPlaceholderText('Что нужно сделать?');
      const addButton = screen.getByText('Добавить');

      fireEvent.change(input, { target: { value: 'Задача' } });
      fireEvent.click(addButton);

      expect(screen.getByText('Всего')).toBeInTheDocument();

      fireEvent.click(screen.getByText('Удалить'));

      expect(screen.queryByText('Всего')).not.toBeInTheDocument();
    });
  });
});
