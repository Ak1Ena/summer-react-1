import { useExpenses } from '../hooks/useExpenses';
import styles from './ExpenseSummary.module.css';

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
    <div className={styles.summary}>
      <section className={styles.totalSection}>
        <h3>Total Spent: ${totalAmount.toFixed(2)}</h3>
        <p>{expenses.length} transactions</p>
      </section>

      <section className={styles.budgetSection}>
        <div className={styles.budgetHeader}>
          <h4>Monthly Budget</h4>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className={styles.budgetInput}
          />
        </div>
        <div className={styles.progressContainer}>
          <div
            className={`${styles.progressBar} ${isOverBudget ? styles.over : ''}`}
            style={{ width: `${percentUsed}%` }}
          ></div>
        </div>
        <p className={`${styles.budgetStatus} ${isOverBudget ? styles.danger : ''}`}>
          {percentUsed.toFixed(1)}% used
        </p>
      </section>

      <section className={styles.categoryBreakdown}>
        <h4>Breakdown</h4>
        {Object.entries(byCategory).map(([cat, amt]) => (
          <div key={cat} className={styles.categoryItem}>
            <span>{cat}</span>
            <span>${amt.toFixed(2)}</span>
          </div>
        ))}
      </section>

      <button onClick={exportToCSV} className={styles.exportBtn}>
        📥 Export CSV
      </button>
    </div>
  );
}

export default ExpenseSummary;
