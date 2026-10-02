import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoStats } from '../src/components/TodoStats';

describe('TodoStats', () => {
  it('renders all stat labels', () => {
    render(<TodoStats total={5} completed={2} />);

    expect(screen.getByText('Всего')).toBeInTheDocument();
    expect(screen.getByText('Выполнено')).toBeInTheDocument();
    expect(screen.getByText('Осталось')).toBeInTheDocument();
  });

  it('displays correct total count', () => {
    render(<TodoStats total={10} completed={3} />);

    const statNumbers = screen.getAllByText('10');
    expect(statNumbers.length).toBeGreaterThanOrEqual(1);
  });

  it('displays correct completed count', () => {
    render(<TodoStats total={10} completed={7} />);

    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('calculates remaining count correctly', () => {
    render(<TodoStats total={10} completed={4} />);

    // Осталось = total - completed = 10 - 4 = 6
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  it('handles zero todos', () => {
    render(<TodoStats total={0} completed={0} />);

    const zeros = screen.getAllByText('0');
    expect(zeros).toHaveLength(3); // Всего, Выполнено, Осталось - все 0
  });

  it('handles all todos completed', () => {
    render(<TodoStats total={5} completed={5} />);

    const fives = screen.getAllByText('5');
    expect(fives).toHaveLength(2); // Всего и Выполнено

    expect(screen.getByText('0')).toBeInTheDocument(); // Осталось
  });

  it('handles no todos completed', () => {
    render(<TodoStats total={8} completed={0} />);

    const eights = screen.getAllByText('8');
    expect(eights).toHaveLength(2); // Всего и Осталось

    expect(screen.getByText('0')).toBeInTheDocument(); // Выполнено
  });

  it('handles large numbers', () => {
    render(<TodoStats total={1000} completed={500} />);

    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.getAllByText('500')).toHaveLength(2); // Выполнено и Осталось
  });

  it('renders three stat items', () => {
    const { container } = render(<TodoStats total={5} completed={2} />);

    // Проверяем, что есть три блока статистики
    const statItems = container.querySelectorAll('div > div');
    expect(statItems.length).toBeGreaterThanOrEqual(3);
  });
});
