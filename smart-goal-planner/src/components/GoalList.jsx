import React from "react";
import GoalCard from "./GoalCard";

function GoalList({ goals, onUpdateGoal, onDeleteGoal }) {
  return (
    <div>
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} onUpdateGoal={onUpdateGoal} onDeleteGoal={onDeleteGoal} />
      ))}
    </div>
  );
}

export default GoalList;
