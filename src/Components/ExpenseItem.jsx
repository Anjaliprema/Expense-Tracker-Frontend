import React from "react";

function ExpenseItem(props) {
  const { amount, title, _id } = props.expense;
  const type = amount > 0 ? "income" : "expense";
function handleDelete() {
    props.deleteExpense(_id);
  }
  function handleEdit() {
    if (props.setItemToEdit) {
      props.setItemToEdit(props.expense);
    }
  }
  return (
    <>
      <div className={`expense-item ${type}`}>
        <div className="expense-title">{title}</div>
        <div className="expense-amount">${amount}</div>
        <div className="delete-button-overlay">
          <button onClick={handleDelete}>Delete</button> &nbsp;
          <div className="edit-button-overlay">
            <button onClick={handleEdit}>Edit</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ExpenseItem;
