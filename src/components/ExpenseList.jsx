import { useExpenses } from '../hooks/useExpenses';

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
    <div className="expense-list-section">
      <div className="tabs">
        {['All', ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={filter === cat ? 'tab active' : 'tab'}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="expense-list">
        {filteredExpenses.length === 0 ? (
          <p className="no-data">No expenses found</p>
        ) : (
          filteredExpenses.map((exp) => (
            <div key={exp.id} className="expense-item">
              <span
                className="category-indicator"
                style={{ background: COLORS[exp.category] || '#ccc' }}
              />
              <div className="expense-details">
                <b>{exp.name}</b>
                <span className="expense-date">{exp.date}</span>
              </div>
              <span className="expense-amount">${exp.amount.toFixed(2)}</span>
              <div className="expense-actions">
                <button
                  className="edit-btn"
                  onClick={() => onEdit(exp)}
                  title="Edit"
                >
                  ✎
                </button>
                <button
                  className="delete-btn"
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
