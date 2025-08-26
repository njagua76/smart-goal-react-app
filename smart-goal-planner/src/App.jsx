import React, { useEffect, useState } from "react";
import GoalForm from "./components/GoalForm";
import GoalList from "./components/GoalList";
import Overview from "./components/Overview";

function App() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true); // 🔹 loading state
  const [error, setError] = useState(null); // 🔹 error state

  // 🔹 Fetch goals on load
  useEffect(() => {
    fetch("http://localhost:4000/goals")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch goals");
        return r.json();
      })
      .then((data) => {
        setGoals(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // 🔹 Add new goal
  const handleAddGoal = (newGoal) => {
    fetch("http://localhost:4000/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGoal),
    })
      .then((r) => r.json())
      .then((savedGoal) => setGoals([...goals, savedGoal]))
      .catch((err) => setError("Error adding goal: " + err.message));
  };

  // 🔹 Update goal
  const handleUpdateGoal = (id, updatedFields) => {
    const goalToUpdate = goals.find((g) => g.id === id);
    if (!goalToUpdate) return;

    const updatedGoal = { ...goalToUpdate, ...updatedFields };

    fetch(`http://localhost:4000/goals/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    })
      .then((r) => r.json())
      .then(() =>
        setGoals(goals.map((g) => (g.id === id ? updatedGoal : g)))
      )
      .catch((err) => setError("Error updating goal: " + err.message));
  };

  // 🔹 Delete goal
  const handleDeleteGoal = (id) => {
    fetch(`http://localhost:4000/goals/${id}`, {
      method: "DELETE",
    })
      .then(() => setGoals(goals.filter((g) => g.id !== id)))
      .catch((err) => setError("Error deleting goal: " + err.message));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Smart Goal Planner</h1>

      {/* 🔹 Show messages while loading or error */}
      {loading && <p>Loading goals...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <Overview goals={goals} />
          <GoalForm onAddGoal={handleAddGoal} />
          <GoalList
            goals={goals}
            onUpdateGoal={handleUpdateGoal}
            onDeleteGoal={handleDeleteGoal}
          />
        </>
      )}
    </div>
  );
}

export default App;
