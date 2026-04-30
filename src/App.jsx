import { useState } from 'react';
import { ExpenseProvider } from './context/ExpenseProvider';
import ExpenseSummary from './components/ExpenseSummary';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseChart from './components/ExpenseChart';
import './App.css';

function App() {
  const [editingExpense, setEditingExpense] = useState(null);

  return (
    <ExpenseProvider>
      <div className="app">
        <header>
          <h1>💰 Expense Tracker Pro</h1>
        </header>
        <div className="main-layout">
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
