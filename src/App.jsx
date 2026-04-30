import { useState } from 'react';
import { ExpenseProvider } from './context/ExpenseProvider';
import ExpenseSummary from './components/ExpenseSummary';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseChart from './components/ExpenseChart';
import ThemeToggle from './components/ThemeToggle';
import Weather from './components/Weather';
import styles from './assets/App.module.css';

function App() {
  const [editingExpense, setEditingExpense] = useState(null);
  const title = import.meta.env.VITE_APP_APP_TITLE || 'Expense Tracker';

  return (
    <ExpenseProvider>
      <div className={styles.app}>
        <header className={styles.header}>
          <ThemeToggle />
          <h1>💰 {title}</h1>
          <Weather />
        </header>
        <div className={styles.mainLayout}>
          <aside>
            <ExpenseSummary />
          </aside>
          <main>
            <ExpenseChart />
            <AddExpenseForm 
              key={editingExpense ? editingExpense.id : 'new'}
              editingExpense={editingExpense} 
              clearEditing={() => setEditingExpense(null)} 
            />
            <ExpenseList onEdit={setEditingExpense} />
          </main>
        </div>
      </div>
    </ExpenseProvider>
  );
}

export default App;
