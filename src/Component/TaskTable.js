import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TaskTable.css';

const TaskTable = ({ tasks, setTasks }) => {
  const [statusCounts, setStatusCounts] = useState({});
  const tableRef = useRef(null);
  const tabulatorRef = useRef(null);  

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        const taskData = response.data.slice(0, 20).map(task => ({
          id: task.id,
          title: task.title,
          description: task.title,
          status: task.completed ? 'Done' : 'To Do',
        }));
        setTasks(taskData); 
        updateStatusCounts(taskData);

        const table = new Tabulator(tableRef.current, {
          data: taskData,
          layout: "fitColumns", 
          columns: [
            { title: "Task ID", field: "id" },
            { title: "Title", field: "title", editor: "input" },
            { title: "Description", field: "description", editor: "input" },
            {
              title: "Status", field: "status", editor: "select", editorParams: {
                values: ['To Do', 'In Progress', 'Done'],
              },
            },
            {
              title: "Action",
              field: "action",
              formatter: () => '<button class="btn-delete">Delete</button>',
              cellClick: deleteTask,
            },
          ],
        });

        tabulatorRef.current = table; 

        table.on("dataEdited", (newData) => {
          setTasks(newData);
          updateStatusCounts(newData);
        });
      });
  }, [setTasks]);

  const updateStatusCounts = (tasks) => {
    const counts = { 'To Do': 0, 'In Progress': 0, 'Done': 0 };
    tasks.forEach(task => counts[task.status]++);
    setStatusCounts(counts);
  };

  const deleteTask = (e, cell) => {
    const row = cell.getRow();
    const rowData = row.getData();
    row.delete();
    const newTasks = tasks.filter(task => task.id !== rowData.id);
    setTasks(newTasks);
    updateStatusCounts(newTasks);
    toast.success('Task deleted successfully!');
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (tabulatorRef.current) {
      tabulatorRef.current.setFilter([
        { field: "title", type: "like", value: query },
        { field: "description", type: "like", value: query },
      ]);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <h2>Task List Manager</h2>
      <div className="row mb-3">
        <div className="col-md-6" style={{display:"flex",margin:"auto"}}>
          <input
            type="text"
            className="form-control input-search"
            placeholder="Search by title or description"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="row mb-3 status-counts">
        <div className="col-md-4">
          <h5>To Do: {statusCounts['To Do']}</h5>
        </div>
        <div className="col-md-4">
          <h5>In Progress: {statusCounts['In Progress']}</h5>
        </div>
        <div className="col-md-4">
          <h5>Done: {statusCounts['Done']}</h5>
        </div>
      </div>
      <div ref={tableRef} id="task-table" className="table table-bordered table-striped" />
    </div>
  );
};

export default TaskTable;







// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { TabulatorFull as Tabulator } from 'tabulator-tables';
// import 'tabulator-tables/dist/css/tabulator.min.css'; 
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const TaskTable = ({ tasks, setTasks }) => {
//   const [statusCounts, setStatusCounts] = useState({});
//   const tableRef = useRef(null);
//   const tabulatorRef = useRef(null);  

//   useEffect(() => {
//     axios.get('https://jsonplaceholder.typicode.com/todos')
//       .then(response => {
//         const taskData = response.data.slice(0, 20).map(task => ({
//           id: task.id,
//           title: task.title,
//           description: task.title,
//           status: task.completed ? 'Done' : 'To Do',
//         }));
//         setTasks(taskData); 
//         updateStatusCounts(taskData);

//         const table = new Tabulator(tableRef.current, {
//           data: taskData,
//           layout: "fitColumns", 
//           columns: [
//             { title: "Task ID", field: "id" },
//             { title: "Title", field: "title", editor: "input" },
//             { title: "Description", field: "description", editor: "input" },
//             {
//               title: "Status", field: "status", editor: "select", editorParams: {
//                 values: ['To Do', 'In Progress', 'Done'],
//               },
//             },
//             {
//               title: "Action",
//               field: "action",
//               formatter: () => '<button class="btn-delete">Delete</button>',
//               cellClick: deleteTask,
//             },
//           ],
//         });

//         tabulatorRef.current = table; 

//         table.on("dataEdited", (newData) => {
//           setTasks(newData);
//           updateStatusCounts(newData);
//         });
//       });
//   }, [setTasks]);

//   const updateStatusCounts = (tasks) => {
//     const counts = { 'To Do': 0, 'In Progress': 0, 'Done': 0 };
//     tasks.forEach(task => counts[task.status]++);
//     setStatusCounts(counts);
//   };

//   const deleteTask = (e, cell) => {
//     const row = cell.getRow();
//     const rowData = row.getData();
//     row.delete();
//     const newTasks = tasks.filter(task => task.id !== rowData.id);
//     setTasks(newTasks);
//     updateStatusCounts(newTasks);
//     toast.success('Task deleted successfully!');
//   };

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     if (tabulatorRef.current) {
//       tabulatorRef.current.setFilter([
//         { field: "title", type: "like", value: query },
//         { field: "description", type: "like", value: query },
//       ]);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <ToastContainer />
//       <h2 style={{fontSize:"65px",textAlign:"center"}}>Task List Manager</h2>
//       <div className="row mb-3">
//         <div className="col-md-6" style={{display:"flex",margin:"auto"}}>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search by title or description"
//             onChange={handleSearch}
//             style={{
//                 width:"31rem",
//                 height:"3rem",
//                 borderRadius:"30px",
//                 display:"flex",
//                 margin:"auto",
//                 paddingLeft:"2rem",
//                 "@media (min-width: 425px) and (max-width: 766px)": {
//                  width:"19rem"
//                   },
//             }}
//           />
//         </div>
//       </div>
//       <div className="row mb-3" style={{display:"flex",justifyContent:"center",gap:"1rem"}}>
//         <div className="col-md-4">
//           <h5>To Do: {statusCounts['To Do']}</h5>
//         </div>
//         <div className="col-md-4">
//           <h5>In Progress: {statusCounts['In Progress']}</h5>
//         </div>
//         <div className="col-md-4">
//           <h5>Done: {statusCounts['Done']}</h5>
//         </div>
//       </div>
//       <div ref={tableRef} id="task-table" className="table table-bordered table-striped" />
//       <style>
//         {`
//           .btn-delete {
//             background-color: red;
//             color: white;
//             border: none;
//             padding: 5px 10px;
//             cursor: pointer;
//             border-radius: 4px;
//           }
//           .btn-delete:hover {
//             background-color: darkred;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default TaskTable;
