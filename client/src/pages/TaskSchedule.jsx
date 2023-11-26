import React, { useState } from 'react';

export default function TaskSchedule() {
  let users = ["Pradeep", "Shailu Sharma K", "Karthik Nayak", "Homelander", "Starlight"];
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Create tasks for each user
  const tasks = [
    ["hello world", "eat milk"],
    ["task 1 for Shailu", "task 2 for Shailu"],
    ["task 1 for Karthik", "task 2 for Karthik"],
    ["task 1 for Homelander", "task 2 for Homelander"],
    ["task 1 for Starlight", "task 2 for Starlight"],
  ];

  const handleUserClick = (index) => {
    setSelectedUser(index);
  };

  const handleClosePopup = () => {
    setSelectedUser(null);
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='container flex justify-center items-center flex-col'>
        <h1 className='text-3xl font-bold mb-6'>Employees</h1>
        {users.map((user, index) => (
          <div
            key={index}
            className='flex items-center justify-between w-[30rem] bg-orange-600 rounded-lg p-4 mb-8'
          >
            <div className='text-white font-semibold'>{user}</div>
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
              <h2 className='text-2xl mb-4'>Assign tasks for {users[selectedUser]}</h2>
              {/* Render tasks for the selected user */}
              <div className='space-y-2'>
                {tasks[selectedUser].map((task, taskIndex) => (
                  <div
                    key={taskIndex}
                    className='bg-gray-100 p-2 rounded-md text-gray-800 cursor-pointer transition duration-300 hover:bg-gray-200 hover:shadow'
                    onClick={() => console.log(`Task Clicked: ${task}`)} // Replace with your click action
                  >
                    {task}
                  </div>
                ))}
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
