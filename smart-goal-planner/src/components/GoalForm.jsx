import React, { useState } from "react";

function GoalForm({ onAddGoal }) {
  const [form, setForm] = useState({
    name: "",
    targetAmount: "",
    savedAmount: 0,
    category: "",
    deadline: "",
    createdAt: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddGoal({ ...form, targetAmount: parseFloat(form.targetAmount) });
    setForm({
      name: "",
      targetAmount: "",
      savedAmount: 0,
      category: "",
      deadline: "",
      createdAt: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input name="name" placeholder="Goal Name" value={form.name} onChange={handleChange} required />
      <input name="targetAmount" type="number" placeholder="Target Amount" value={form.targetAmount} onChange={handleChange} required />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
      <input name="deadline" type="date" value={form.deadline} onChange={handleChange} required />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;
