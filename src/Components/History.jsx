import React from "react";
import ExpenseItem from "./ExpenseItem";
function History(props) {
  const expenses = props.expense;
  return (
    <>
      <div className="history">
        <h3>History</h3>
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense._id}
            expense={expense}
            isEditing={props.itemToEdit === expense._id}
            deleteExpense={props.deleteExpense}
            setItemToEdit={props.setItemToEdit}
          />
        ))}
      </div>
    </>
  );
}

export default History;
