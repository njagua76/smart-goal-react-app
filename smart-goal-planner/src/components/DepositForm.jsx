import React, { useState } from "react";

function DepositForm({ onDeposit }) {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onDeposit(parseFloat(amount));
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder="Deposit Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <button type="submit">Deposit</button>
    </form>
  );
}

export default DepositForm;
