import { CSSProperties } from 'react';

interface Styles {
  container: CSSProperties;
  wrapper: CSSProperties;
  header: CSSProperties;
  title: CSSProperties;
  subtitle: CSSProperties;
  inputContainer: CSSProperties;
  input: CSSProperties;
  addButton: CSSProperties;
  todoList: CSSProperties;
  todoItem: CSSProperties;
  checkbox: CSSProperties;
  todoText: CSSProperties;
  todoTextCompleted: CSSProperties;
  deleteButton: CSSProperties;
  emptyState: CSSProperties;
  stats: CSSProperties;
  statItem: CSSProperties;
  statNumber: CSSProperties;
  statLabel: CSSProperties;
}

export const styles: Styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    padding: '40px 20px',
    boxSizing: 'border-box',
  },
  wrapper: {
    maxWidth: '520px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    color: '#e94560',
    fontSize: '42px',
    fontWeight: 700,
    margin: 0,
    letterSpacing: '-1px',
    textShadow: '0 4px 20px rgba(233, 69, 96, 0.3)',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '14px',
    marginTop: '8px',
    fontWeight: 400,
  },
  inputContainer: {
    display: 'flex',
    gap: '12px',
    marginBottom: '32px',
  },
  input: {
    flex: 1,
    padding: '16px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.08)',
    color: '#fff',
    outline: 'none',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  },
  addButton: {
    padding: '16px 28px',
    fontSize: '16px',
    fontWeight: 600,
    border: 'none',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #e94560 0%, #ff6b6b 100%)',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(233, 69, 96, 0.3)',
  },
  todoList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  todoItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '18px 20px',
    background: 'rgba(255, 255, 255, 0.06)',
    borderRadius: '14px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    transition: 'all 0.3s ease',
  },
  checkbox: {
    width: '22px',
    height: '22px',
    marginRight: '16px',
    cursor: 'pointer',
    accentColor: '#e94560',
  },
  todoText: {
    flex: 1,
    fontSize: '16px',
    color: '#fff',
    transition: 'all 0.3s ease',
  },
  todoTextCompleted: {
    flex: 1,
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.35)',
    textDecoration: 'line-through',
    transition: 'all 0.3s ease',
  },
  deleteButton: {
    padding: '8px 16px',
    fontSize: '13px',
    fontWeight: 500,
    border: 'none',
    borderRadius: '8px',
    background: 'rgba(233, 69, 96, 0.2)',
    color: '#e94560',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: '16px',
  },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    marginTop: '32px',
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.04)',
    borderRadius: '12px',
  },
  statItem: {
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#e94560',
    display: 'block',
  },
  statLabel: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.4)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
};
