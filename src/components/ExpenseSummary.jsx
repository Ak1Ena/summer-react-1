import { useExpenses } from '../context/ExpenseContext';

function ExpenseSummary() {
  const { expenses, totalAmount, categories } = useExpenses();

  const byCategory = categories.reduce((acc, cat) => {
    const total = expenses
      .filter((e) => e.category === cat)
      .reduce((s, e) => s + e.amount, 0);
    if (total > 0) acc[cat] = total;
    return acc;
  }, {});

  return (
    <div className="summary">
      <h3>Total: ${totalAmount.toFixed(2)}</h3>
      <p>{expenses.length} transactions</p>
      {Object.entries(byCategory).map(([cat, amt]) => (
        <div key={cat}>
          {cat}: ${amt.toFixed(2)}
        </div>
      ))}
    </div>
  );
}

export default ExpenseSummary;
