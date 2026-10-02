import { JSX } from 'react';
import { styles } from '../styles';

interface TodoStatsProps {
  total: number;
  completed: number;
}

export const TodoStats: (props: TodoStatsProps) => JSX.Element = ({ total, completed }: TodoStatsProps): JSX.Element => {
  const remaining: number = total - completed;

  return (
    <div style={styles.stats}>
      <div style={styles.statItem}>
        <span style={styles.statNumber}>{total}</span>
        <span style={styles.statLabel}>Всего</span>
      </div>
      <div style={styles.statItem}>
        <span style={styles.statNumber}>{completed}</span>
        <span style={styles.statLabel}>Выполнено</span>
      </div>
      <div style={styles.statItem}>
        <span style={styles.statNumber}>{remaining}</span>
        <span style={styles.statLabel}>Осталось</span>
      </div>
    </div>
  );
};
