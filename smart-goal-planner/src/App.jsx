import React, { useState, useEffect } from "react";
import "./App.css"
import GoalList from "./components/GoalList";
import GoalForm from "./components/GoalForm";
import Overview from "./components/Overview";

function App() {
  const [goals, setGoals] = useState([]);

  // Fetch goals from server
  useEffect(() => {
    fetch("http://localhost:3000/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((error) => console.error("Error fetching goals:", error));
  }, []);

  // Add new goal
  const addGoal = (newGoal) => {
    fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGoal),
    })
      .then((res) => res.json())
      .then((goal) => setGoals((prev) => [...prev, goal]));
  };

  // Update goal
  const updateGoal = (id, updates) => {
    fetch(`http://localhost:3000/goals/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
      .then((res) => res.json())
      .then((updatedGoal) =>
        setGoals((prev) =>
          prev.map((g) => (g.id === id ? updatedGoal : g))
        )
      );
  };

  // Delete goal
  const deleteGoal = (id) => {
    fetch(`http://localhost:3000/goals/${id}`, { method: "DELETE" }).then(() =>
      setGoals((prev) => prev.filter((g) => g.id !== id))
    );
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Smart Goal Planner</h1>
      <Overview goals={goals} />
      <GoalForm onAddGoal={addGoal} />
      <GoalList goals={goals} onUpdateGoal={updateGoal} onDeleteGoal={deleteGoal} />
    </div>
  );
}

export default App;
