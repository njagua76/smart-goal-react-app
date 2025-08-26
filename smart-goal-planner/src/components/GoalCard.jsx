import React, { useState } from "react";
import DepositForm from "./DepositForm";

function GoalCard({ goal, onUpdateGoal, onDeleteGoal }) {
  const [showDeposit, setShowDeposit] = useState(false);

  const handleDeposit = (amount) => {
    onUpdateGoal(goal.id, { savedAmount: goal.savedAmount + amount });
    setShowDeposit(false);
  };

  const progress = Math.min(
    (goal.savedAmount / goal.targetAmount) * 100,
    100
  ).toFixed(1);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <h3>{goal.name}</h3>
      <p>
        Saved: ${goal.savedAmount} / ${goal.targetAmount} ({progress}%)
      </p>
      <p>Category: {goal.category}</p>
      <p>Deadline: {goal.deadline}</p>
      <button onClick={() => setShowDeposit(!showDeposit)}>
        {showDeposit ? "Cancel" : "Deposit"}
      </button>
      <button
        onClick={() => onDeleteGoal(goal.id)}
        style={{ marginLeft: "10px", color: "red" }}
      >
        Delete
      </button>

      {showDeposit && <DepositForm onDeposit={handleDeposit} />}
    </div>
  );
}

export default GoalCard;
