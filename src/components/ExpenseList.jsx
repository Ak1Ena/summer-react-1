import { useExpenses } from '../hooks/useExpenses';
import styles from './ExpenseList.module.css';

const COLORS = {
  Food: '#ff9500',
  Transport: '#0077cc',
  Health: '#10b981',
  Entertainment: '#8b5cf6',
  Shopping: '#ec4899',
  Other: '#6b7280',
};

function ExpenseList({ onEdit }) {
  const { filteredExpenses, deleteExpense, filter, setFilter, categories } = useExpenses();

  return (
    <div className={styles.expenseListSection}>
      <div className={styles.tabs}>
        {['All', ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`${styles.tab} ${filter === cat ? styles.active : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className={styles.expenseList}>
        {filteredExpenses.length === 0 ? (
          <p className="no-data">No expenses found</p>
        ) : (
          filteredExpenses.map((exp) => (
            <div key={exp.id} className={styles.expenseItem}>
              <span
                className={styles.categoryIndicator}
                style={{ background: COLORS[exp.category] || '#ccc' }}
              />
              <div className={styles.expenseDetails}>
                <b>{exp.name}</b>
                <span className={styles.expenseDate}>{exp.date}</span>
              </div>
              <span className={styles.expenseAmount}>${exp.amount.toFixed(2)}</span>
              <div className={styles.expenseActions}>
                <button
                  className={styles.editBtn}
                  onClick={() => onEdit(exp)}
                  title="Edit"
                >
                  ✎
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => deleteExpense(exp.id)}
                  title="Delete"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ExpenseList;
