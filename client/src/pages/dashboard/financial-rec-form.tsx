import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../context/financial-record-context";

export const FinancialRecForm = () => {
    const[description, setDescription] = useState<string>("")
    const[amount, setAmount] = useState<string>("")
    const[category, setCategory] = useState<string>("")
    const[paymentMethod, setPaymentMethod] = useState<string>("")
    const { addRecord } = useFinancialRecords();

    const { user } = useUser();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!user) {
          alert("User not Signed In, Kindly Log In");
          return;
        }

        const newRecord = {
            userId: user?.id ?? "",
            date: new Date(),
            description: description,
            amount: parseFloat(amount),
            category: category,
            paymentMethod: paymentMethod,
        };

        console.log("User ID:", user?.id);


        addRecord(newRecord);
        setDescription("");
        setAmount("");
        setCategory("");
        setPaymentMethod("");

    };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Description:</label>
          <input type="text" required className="input" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-field">
          <label>Amount:</label>
          <input type="number" required className="input" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <p className="expense-notifier">Enter expenses with a "-" (e.g., -500)</p>
          
        </div>
        <div className="form-field">
          <label>Category:</label>
          <select required className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a Category</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Salary">Salary</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-field">
          <label>Payment Method:</label>
          <select required className="input" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="">Select a Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
        <button type="submit" className="button">
          Add Record
        </button>
      </form>
    </div>
  );
};


