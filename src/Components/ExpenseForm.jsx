import {useEffect, useState} from 'react';
const ExpenseForm=(props)=>{
    const {itemToEdit}=props;
    const [title,setTitle]=useState("");
    const [amount,setAmount]=useState("");
    const [error,setError]=useState();
    useEffect(()=>{
        if (itemToEdit){
            setTitle(itemToEdit.title)
            setAmount(itemToEdit.amount)
        }
    },[itemToEdit])
    const isEdit=props.itemToEdit
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(amount)
        if(!title){
            setError('Title is needed');
            return;
        }
        if(!amount){
            setError('Amount is needed');
            return;
        }
        if(isEdit){
            //console.log("edit", itemToEdit.id, title, amount)
            props.editExpense(itemToEdit._id,title,amount);
        }else{
            props.addExpense(title,amount);
        }
        setError("");
        setTitle("");
        setAmount("");
    }
    const handleTitleChange=(e)=>{
        setTitle(e.target.value)
    }
    const handleAmountChange=(e)=>{
        setAmount(e.target.value);
    }
    const clearForm=()=>{
        props.setItemToEdit(null);
        setTitle("");
        setAmount("");
    }
    return(
        <div className="Expense-Form">
            <h3> {isEdit?"EditExpense":"Add Expense"}
            {isEdit?<button className="small-button"onClick={clearForm}>Clear</button>:null}</h3>
            <form onSubmit={handleSubmit}>
                {error && <div className="error" >{error}</div>}
                <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={title} onChange={handleTitleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount:</label>
                    <input type="number" id="amount" name="amount" value={amount} onChange={handleAmountChange}/>
                </div>
                <button type="submit">{isEdit?"EditExpense":"Add Expense"}</button>
            </form>
        </div>
    )
}
export default ExpenseForm;