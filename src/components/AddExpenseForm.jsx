import { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';

function AddExpenseForm() {
  const { addExpense, categories } = useExpenses();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setError('Enter name');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setError('Enter amount');
      return;
    }
    addExpense(name.trim(), amount, category);
    setName('');
    setAmount('');
    setError('');
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Expense name"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

export default AddExpenseForm;
