import { JSX } from 'react';
import { Todo } from '../types';
import { styles } from '../styles';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoList: (props: TodoListProps) => JSX.Element = ({ todos, onToggle, onDelete }: TodoListProps): JSX.Element => {
  if (todos.length === 0) {
    return (
      <div style={styles.emptyState}>
        Список пуст. Добавьте первую задачу!
      </div>
    );
  }

  return (
    <ul style={styles.todoList}>
      {todos.map((todo: Todo): JSX.Element => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};
