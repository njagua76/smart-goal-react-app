import React from "react";
import DepositForm from "./DepositForm";

function GoalCard({ goal, onUpdateGoal, onDeleteGoal }) {
  const progress = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100);

  const handleDeposit = (amount) => {
    onUpdateGoal(goal.id, { savedAmount: goal.savedAmount + amount });
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "15px" }}>
      <h3>{goal.name}</h3>
      <p>Target: ${goal.targetAmount} | Saved: ${goal.savedAmount}</p>
      <p>Category: {goal.category}</p>
      <p>Deadline: {goal.deadline}</p>
      <progress value={progress} max="100" style={{ width: "100%" }}></progress>
      <DepositForm onDeposit={handleDeposit} />
      <button onClick={() => onDeleteGoal(goal.id)} style={{ marginTop: "10px", color: "red" }}>Delete Goal</button>
    </div>
  );
}

export default GoalCard;
