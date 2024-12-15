// How did you handle inline editing in the table?

// We used Tabulator.js for inline editing. Title and Description fields have "input" editors, and Status has a "select" editor with options like 'To Do', 'In Progress', and 'Done'. The dataEdited event updates the tasks state and recalculates status counts when a cell is edited.

// How did you fetch and process the data from the dummy API?

// We fetched data from https://jsonplaceholder.typicode.com/todos using axios in a useEffect hook. We took the first 20 tasks, mapped the completed field to a status field ('Done' or 'To Do'), and set this processed data in the state with setTasks.

// What approach did you use to filter tasks based on status?

// We used a dropdown filter. When a status is selected, we used Tabulator's setFilter method to filter tasks by the chosen status and display them in the table.

// How did you manage the state of tasks when adding or editing them?

// We managed the state with the useState hook. Adding a task updates the state by appending it to the existing tasks array. Inline editing triggers the dataEdited event in Tabulator, which updates the state with the edited data using setTasks.

// What challenges did you face during development, and how did you overcome them?

// Integrating Tabulator.js: Managed with useRef and useEffect to handle the table's lifecycle.
// State Management: Ensured data consistency by appropriately calling setTasks.
// Error Handling: Used try-catch blocks and react-toastify for user feedback during API calls and form submissions.





