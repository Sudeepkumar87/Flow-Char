import React, { useState } from 'react';
import TaskTable from '../src/Component/TaskTable';
import AddTaskForm from '../src/Component/AddTaskForm';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div className="App">
      <AddTaskForm onAdd={addTask} />
      <TaskTable tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default App;




