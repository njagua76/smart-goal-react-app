import React from "react";
import GoalCard from "./GoalCard";

function GoalList({ goals, onUpdateGoal, onDeleteGoal }) {
  if (goals.length === 0) {
    return <p>No goals yet. Add one to get started!</p>;
  }

  return (
    <div>
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onUpdateGoal={onUpdateGoal}
          onDeleteGoal={onDeleteGoal}
        />
      ))}
    </div>
  );
}

export default GoalList;
