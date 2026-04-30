import { useExpenses } from '../hooks/useExpenses';

const COLORS = {
  Food: '#ff9500',
  Transport: '#0077cc',
  Health: '#10b981',
  Entertainment: '#8b5cf6',
  Shopping: '#ec4899',
  Other: '#6b7280',
};

function ExpenseChart() {
  const { expenses, categories } = useExpenses();

  const data = categories.map((cat) => {
    const total = expenses
      .filter((e) => e.category === cat)
      .reduce((s, e) => s + e.amount, 0);
    return { category: cat, amount: total };
  }).filter(d => d.amount > 0);

  const maxAmount = Math.max(...data.map((d) => d.amount), 1);

  return (
    <div className="chart-section">
      <h3>Spending by Category</h3>
      <div className="chart-container">
        {data.length === 0 ? (
          <p className="no-data">No data to display</p>
        ) : (
          data.map((d) => (
            <div key={d.category} className="bar-wrapper">
              <div
                className="bar"
                style={{
                  height: `${(d.amount / maxAmount) * 150}px`,
                  backgroundColor: COLORS[d.category] || '#ccc',
                }}
                title={`${d.category}: $${d.amount.toFixed(2)}`}
              >
                <span className="bar-value">${d.amount.toFixed(0)}</span>
              </div>
              <span className="bar-label">{d.category}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ExpenseChart;
