import { createContext, useContext, useReducer, useEffect } from 'react';

const ExpenseContext = createContext();
const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Health', 'Other'];

function expenseReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, expenses: [...state.expenses, action.payload] };
    case 'LOAD':
      return { ...state, expenses: action.payload };
    case 'DELETE':
      return { ...state, expenses: state.expenses.filter((e) => e.id !== action.payload) };
    case 'FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

const initialState = { expenses: [], filter: 'All' };

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  useEffect(() => {
    const s = localStorage.getItem('expenses');
    if (s) dispatch({ type: 'LOAD', payload: JSON.parse(s) });
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(state.expenses));
  }, [state.expenses]);

  const totalAmount = state.expenses.reduce((sum, e) => sum + e.amount, 0);
  const filteredExpenses =
    state.filter === 'All'
      ? state.expenses
      : state.expenses.filter((e) => e.category === state.filter);

  function addExpense(name, amount, category) {
    dispatch({
      type: 'ADD',
      payload: {
        id: Date.now(),
        name,
        amount: parseFloat(amount),
        category,
        date: new Date().toLocaleDateString(),
      },
    });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function setFilter(cat) {
    dispatch({ type: 'FILTER', payload: cat });
  }

  return (
    <ExpenseContext.Provider
      value={{
        expenses: state.expenses,
        filteredExpenses,
        totalAmount,
        filter: state.filter,
        categories: CATEGORIES,
        addExpense,
        deleteExpense,
        setFilter,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  return useContext(ExpenseContext);
}
