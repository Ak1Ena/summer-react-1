import { useReducer, useEffect } from 'react';
import { ExpenseContext } from './context';

const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Health', 'Other'];

function expenseReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, expenses: [...state.expenses, action.payload] };
    case 'LOAD':
      return { ...state, ...action.payload };
    case 'DELETE':
      return { ...state, expenses: state.expenses.filter((e) => e.id !== action.payload) };
    case 'UPDATE':
      return {
        ...state,
        expenses: state.expenses.map((e) => (e.id === action.payload.id ? action.payload : e)),
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_BUDGET':
      return { ...state, budget: action.payload };
    default:
      return state;
  }
}

const initialState = { expenses: [], filter: 'All', budget: 1000 };

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState, (initial) => {
    const s = localStorage.getItem('expense_tracker_data');
    return s ? { ...initial, ...JSON.parse(s) } : initial;
  });

  useEffect(() => {
    localStorage.setItem(
      'expense_tracker_data',
      JSON.stringify({ expenses: state.expenses, budget: state.budget })
    );
  }, [state.expenses, state.budget]);

  const totalAmount = state.expenses.reduce((sum, e) => sum + e.amount, 0);

  const sortedExpenses = [...state.expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredExpenses =
    state.filter === 'All'
      ? sortedExpenses
      : sortedExpenses.filter((e) => e.category === state.filter);

  function addExpense(expense) {
    dispatch({
      type: 'ADD',
      payload: { ...expense, id: Date.now() },
    });
  }

  function updateExpense(expense) {
    dispatch({ type: 'UPDATE', payload: expense });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function setFilter(cat) {
    dispatch({ type: 'SET_FILTER', payload: cat });
  }

  function setBudget(amount) {
    dispatch({ type: 'SET_BUDGET', payload: parseFloat(amount) || 0 });
  }

  const exportToCSV = () => {
    const headers = ['Date', 'Name', 'Amount', 'Category'];
    const rows = state.expenses.map((e) => [e.date, e.name, e.amount, e.category]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers, ...rows].map((r) => r.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'expenses.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses: state.expenses,
        filteredExpenses,
        totalAmount,
        filter: state.filter,
        budget: state.budget,
        categories: CATEGORIES,
        addExpense,
        updateExpense,
        deleteExpense,
        setFilter,
        setBudget,
        exportToCSV,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}
