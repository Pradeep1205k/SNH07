import React, { useState, useEffect } from 'react';

export default function TaskSchedule() {
  
  const [employees, setEmployees] = useState([]);
			  
  useEffect(() => {
    console.log('Fetching employees...');
  
    fetch("http://localhost:5000/fetchEmployees")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Check if the data has changed before updating the state
        if (JSON.stringify(data) !== JSON.stringify(employees)) {
          setEmployees(data); // Update state with fetched employee data
        }
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });
  }, [employees]); // Add employees to the dependency array if setEmployees causes a re-render
  
  // Rest of your component code...
  
  
  let users = ["Pradeep", "Shailu Sharma K", "Karthik Nayak", "Rahul", "Ramesh"];
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Create tasks for each user
  const tasks = [
    ["General Tasks"],
    [ "Plan marketing strategy", "Review project timelines"],
    [ "Develop prototype design", "Test software updates"],
    [ "Lead team meeting", "Create project proposals"],
    [ "Coordinate with vendors", "Prepare client presentations"]
  ];
  

  const handleUserClick = (index) => {
    setSelectedUser(index);
  };

  const handleClosePopup = () => {
    setSelectedUser(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Get the value from the input field
    const taskName = e.target.elements.task.value;
  
    // Check if a user is selected
    if (selectedUser !== null) {
      // Get the username from employees array using selectedUser index
      const selectedUsername = employees[selectedUser].username;
  
      // Prepare the data to be sent in the request body
      const requestData = {
        username: selectedUsername,
        task: taskName // Assuming the input field's name is taskName
      };
  
      fetch("http://localhost:5000/addTask", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            alert(`Task assigned!`);
          } else {
            console.log("Error assigning task");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Please select a user");
    }
  };
  

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='container flex justify-center items-center flex-col'>
        <h1 className='text-3xl font-bold mb-6'>Employees</h1>
        {employees.map((emp, index) => (
          <div
            key={index}
            className='flex items-center justify-between w-[30rem]  bg-indigo-400 rounded-lg p-4 mb-8'
          >
            <div className='text-white font-semibold'>{emp.username}</div>
            <div className='text-white cursor-pointer' onClick={() => handleUserClick(index)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                />
              </svg>
            </div>
          </div>
        ))}
        {selectedUser !== null && (
          <div className='fixed inset-0 z-10 flex items-center justify-center'>
            <div className='fixed inset-0 bg-gray-900 opacity-50'></div>
            <div className='bg-white p-8 rounded-lg shadow-xl z-20'>
              <h2 className='text-2xl mb-4'>Assign task</h2>
              {/* Render tasks for the selected user */}
              <div className='space-y-2'>
              <form onSubmit={handleSubmit}>
              <input
							className="mb-4 mt-2 border rounded-sm h-8 w-64"
							type="text"
              name='task'
						/>
            <button type='submit' className="mt-4 py-1 w-24  text-sm border text-indigo-400 rounded-md self-center hover:text-indigo-300 hover:bg-white hover:shadow-sm font-bold ">
							Assign
						</button>
            </form>
              
                {/* {tasks[selectedUser].map((task, taskIndex) => (
                  <div
                    key={taskIndex}
                    className='bg-gray-100 p-2 rounded-md text-gray-800 cursor-pointer transition duration-300 hover:bg-gray-200 hover:shadow'
                    onClick={() => console.log(`Task Clicked: ${task}`)} // Replace with your click action
                  >
                    {task}
                  </div>
                ))} */}
              </div>
              <button
                onClick={handleClosePopup}
                className='mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300'
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
