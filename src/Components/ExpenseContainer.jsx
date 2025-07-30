import { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm.jsx";
import "../index.css";
// import { v4 as uid } from "uuid";
import History from "./History.jsx";
import BalanceContainer from "./BalanceContainer.jsx";
// import { Link } from "react-router-dom";

function ExpenseContainer() {
  const [expense, setExpense] = useState([]);
  const [loading, setLoading] = useState(true); //loading - To manage fetch
  const [itemToEdit,setItemToEdit] = useState(null)

  //Fetch code
  const fetchExpense = async () => {
    setLoading(true); //if it is false then it only give the old data not a new added data
    try {
      const response = await fetch("http://localhost:3000/expense"); //fetch dackend data
      const data = await response.json();
      setExpense(data);
    } catch (error) {
      console.error("Failed to fech", error);
    }
    setLoading(false);
  };
  console.log(expense);
  useEffect(() => {
    //useeffect means sideeffect like api fetch
    fetchExpense();
  }, []);
  //   const EXPENSE = [
  //     {
  //       id: uid(),
  //       title: "Expense1",
  //       amount: 100,
  //     },
  //     {
  //       id: uid(),
  //       title: "Expense2",
  //       amount: 500,
  //     },
  //   ];

  // const [expense, setExpense] = useState(EXPENSE);
  // function addExpense(title, amount) {
  //   setExpense([...expense, { id: uid(), title, amount }]);
  // }

  const addExpense = async (title, amount) => {
    try {
      const response = await fetch("http://localhost:3000/expense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, amount }), //to convert JSON to string of title, amount
      });
      if (response.ok) {
        const newItem = await response.json();
        setExpense((prev) => [...prev, newItem]);
      } else {
        console.error("Failed to add expense");
      }
    } catch (error) {
      console.log("Error adding expense", error);
    }
  };

  // function deleteExpense(_id) {
  //   setExpense(expense.filter((exp) => exp._id != _id));
  // }

  const deleteExpense = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/expense/${id}`, {
        //${id} is used to delete a specific item used this id .
        method: "DELETE",
      });
      if (response.ok) {
        setExpense(expense.filter((exp) => exp._id !== id));
      } else {
        console.error("Failed to delete expense");
      }
    } catch (error) {
      console.error("Failed to delete expense", error);
    }
  };
  // console.log(expense);



// const editExpense=(id,title,amount)=>{
    //     //console.log(id)
    //     setExpenses(expenses.map((exp)=>{if(exp.id===id){
    //         return {id,title,amount}
    //     }else{
    //         return exp
    //     }
    // }))
    // setItemToEdit(null)
    // }




//backend to frontend fetch data 
  const editExpense = async (id, title, amount) => {
    try {
      const response = await fetch(`http://localhost:3000/expense/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, amount }),
      });
      if (response.ok) {
        const updatedItem = await response.json();
        setExpense((prev) =>
          prev.map((exp) => (exp._id === id ? updatedItem : exp)));
      } else {
        console.error("Failed to edit expense");
      }
    } catch (error) {
      console.error("Failed to edit expense", error);
    }
  };

  return (
    <div className="expense-container">
      <h1>Expense Tracker</h1>
      <BalanceContainer expense={expense} />
      <History expense={expense} deleteExpense={deleteExpense} editExpense={editExpense} setItemToEdit={setItemToEdit}/>
      <ExpenseForm addExpense={addExpense} itemToEdit={itemToEdit} editExpense={editExpense} setItemToEdit ={setItemToEdit}/>
      {loading && <p> Loading...</p>}
    </div>
    // {/* <Link to={"/"}>
    //   <button>Click to Home</button>
    // </Link> */}
  );
}
export default ExpenseContainer;
