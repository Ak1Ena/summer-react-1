import { useState } from 'react';
import { useExpenses } from '../hooks/useExpenses';

function AddExpenseForm({ editingExpense, clearEditing }) {
  const { addExpense, updateExpense, categories } = useExpenses();
  const [name, setName] = useState(editingExpense?.name || '');
  const [amount, setAmount] = useState(editingExpense?.amount?.toString() || '');
  const [category, setCategory] = useState(editingExpense?.category || categories[0]);
  const [date, setDate] = useState(editingExpense?.date || new Date().toISOString().split('T')[0]);
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
    if (!date) {
      setError('Select date');
      return;
    }

    const expenseData = {
      name: name.trim(),
      amount: parseFloat(amount),
      category,
      date,
    };

    if (editingExpense) {
      updateExpense({ ...expenseData, id: editingExpense.id });
      clearEditing();
    } else {
      addExpense(expenseData);
    }

    setName('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setError('');
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>{editingExpense ? 'Edit Expense' : 'Add New Expense'}</h3>
      {error && <p className="form-error">{error}</p>}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Expense name"
      />
      <input
        type="number"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <div className="form-actions">
        <button type="submit">{editingExpense ? 'Update' : 'Add'}</button>
        {editingExpense && (
          <button type="button" className="cancel-btn" onClick={clearEditing}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default AddExpenseForm;
