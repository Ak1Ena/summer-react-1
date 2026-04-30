import { useExpenses } from '../context/ExpenseContext';

const COLORS = {
  Food: '#ff9500',
  Transport: '#0077cc',
  Health: '#10b981',
  Entertainment: '#8b5cf6',
  Shopping: '#ec4899',
  Other: '#6b7280',
};

function ExpenseList() {
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
        {filteredExpenses.map((exp) => (
          <div key={exp.id} className="expense-item">
            <span
              className="category-indicator"
              style={{ background: COLORS[exp.category] || '#ccc' }}
            />
            <b>{exp.name}</b>
            <span>${exp.amount.toFixed(2)}</span>
            <button
              className="delete-btn"
              onClick={() => deleteExpense(exp.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;
