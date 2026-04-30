import { useExpenses } from '../hooks/useExpenses';

function ExpenseSummary() {
  const { expenses, totalAmount, categories, budget, setBudget, exportToCSV } = useExpenses();

  const byCategory = categories.reduce((acc, cat) => {
    const total = expenses
      .filter((e) => e.category === cat)
      .reduce((s, e) => s + e.amount, 0);
    if (total > 0) acc[cat] = total;
    return acc;
  }, {});

  const percentUsed = Math.min((totalAmount / budget) * 100, 100);
  const isOverBudget = totalAmount > budget;

  return (
    <div className="summary">
      <section className="total-section">
        <h3>Total Spent: ${totalAmount.toFixed(2)}</h3>
        <p>{expenses.length} transactions</p>
      </section>

      <section className="budget-section">
        <div className="budget-header">
          <h4>Monthly Budget</h4>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="budget-input"
          />
        </div>
        <div className="progress-container">
          <div
            className={`progress-bar ${isOverBudget ? 'over' : ''}`}
            style={{ width: `${percentUsed}%` }}
          ></div>
        </div>
        <p className={`budget-status ${isOverBudget ? 'danger' : ''}`}>
          {percentUsed.toFixed(1)}% used
        </p>
      </section>

      <section className="category-breakdown">
        <h4>Breakdown</h4>
        {Object.entries(byCategory).map(([cat, amt]) => (
          <div key={cat} className="category-item">
            <span>{cat}</span>
            <span>${amt.toFixed(2)}</span>
          </div>
        ))}
      </section>

      <button onClick={exportToCSV} className="export-btn">
        📥 Export CSV
      </button>
    </div>
  );
}

export default ExpenseSummary;
