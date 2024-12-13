import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './AddTaskForm.css';

const AddTaskForm = ({ onAdd }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'To Do',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/todos',
        task
      );

      onAdd(response.data);
      setTask({ title: '', description: '', status: 'To Do' });
      toast.success('Task added successfully!');
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  return (
    <div className="container">
      <p>Add New Task</p>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="form-grid">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={task.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={task.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                className="form-select"
                id="status"
                name="status"
                value={task.status}
                onChange={handleChange}
                required
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;




// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";

// const AddTaskForm = ({ onAdd }) => {
//   const [task, setTask] = useState({
//     title: "",
//     description: "",
//     status: "To Do",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTask({ ...task, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "https://jsonplaceholder.typicode.com/todos",
//         task
//       );

//       onAdd(response.data);
//       setTask({ title: "", description: "", status: "To Do" });
//       toast.success("Task added successfully!");
//     } catch (error) {
//       toast.error("Failed to add task");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <p
//         style={{
//           fontSize: "70px",
//           fontWeight: "bold",
//           textAlign: "center",
//           fontFamily: "serif",
//         }}
//       >
//         Add New Task
//       </p>
//       <form onSubmit={handleSubmit}>
//         <div style={{ display: "flex",marginBottom:"2rem" }}>
//           <div
//             style={{
//               display: "grid",
//               justifyContent: "center",
//               textAlign: "center",
//               alignItems: "center",
//               margin: "auto",
//               gridTemplateColumns: "1fr 1fr 1fr",
//               gap:"13px",
//               "@media (min-width: 1024px) and (max-width: 1434px)": {
//                gridTemplateColumns:"1fr 1fr"
//               },
//               "@media (min-width: 768px) and (max-width: 1023px)": {
//                gridTemplateColumns:"1fr"
//               },
//             }}
//           >
//             <div className="mb-3" style={{display:"flex",textAlign:"center",alignItems:"center",gap:"10px"}}>
//               <label
//                 htmlFor="title"
//                 className="form-label"
//                 style={{ fontSize: "29px", color: "#42526E" }}
//               >
//                 Title
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="title"
//                 name="title"
//                 value={task.title}
//                 onChange={handleChange}
//                 required
//                 style={{
//                   minWidth: "313px",
//                   height: "50px",
//                   background: "#FFFFFF",
//                   border: "1px solid #939393",
//                   borderRadius: "9px",
//                   padding: "10px",
//                   fontSize: "16px",
                  
//                 }}
//               />
//             </div>
//             <div className="mb-3" style={{display:"flex",textAlign:"center",alignItems:"center",gap:"10px"}}>
//               <label
//                 htmlFor="description"
//                 className="form-label"
//                 style={{ fontSize: "29px", color: "#42526E" }}
//               >
//                 Description
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="description"
//                 name="description"
//                 value={task.description}
//                 onChange={handleChange}
//                 style={{
//                   minWidth: "313px",
//                   height: "50px",
//                   background: "#FFFFFF",
//                   border: "1px solid #939393",
//                   borderRadius: "9px",
//                   padding: "10px",
//                   fontSize: "16px",
                
//                 }}
//                 required
//               />
//             </div>
//             <div className="mb-3" style={{display:"flex",textAlign:"center",alignItems:"center",gap:"10px"}}>
//               <label
//                 htmlFor="status"
//                 className="form-label"
//                 style={{ fontSize: "29px", color: "#42526E" }}
//               >
//                 Status
//               </label>
//               <select
//                 className="form-select"
//                 id="status"
//                 name="status"
//                 value={task.status}
//                 onChange={handleChange}
//                 required
//                 style={{
//                   minWidth: "313px",
//                   height: "74px",
//                   background: "#FFFFFF",
//                   border: "1px solid #939393",
//                   borderRadius: "9px",
//                   padding: "10px",
//                   fontSize: "16px",
                 
//                 }}
//               >
//                 <option value="To Do">To Do</option>
//                 <option value="In Progress">In Progress</option>
//                 <option value="Done">Done</option>
//               </select>
//             </div>
//           </div>
//         </div>
//         <button
//           type="submit"
//           className="btn btn-primary"
//           style={{
//             minWidth: "252px",
//             height: "86px",
//             background: "#4562DB 0% 0% no-repeat padding-box",
//             borderRadius: "9px",
//             textTransform: "none",
//             color: "#FFFFFF",
//             fontSize: "26px",
//             marginTop: "2rem",
//             border: "none",
//             margin:"auto",
//             display:"flex",
//             alignItems:"center",
//             justifyContent:"center"

//           }}
//         >
//           Add Task
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddTaskForm;
