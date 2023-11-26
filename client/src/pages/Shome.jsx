import React, { useState, useEffect } from 'react';

export default function SlaveHome() {
  let [tasks, setTasks] = useState([
    
  ]);
  useEffect(() => {
    // Fetch tasks when the component mounts
    fetch('http://localhost:5000/fetchTasks', {
      method: 'GET',
      credentials: 'include', // Add credentials if needed for authentication
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched tasks:', data);
        setTasks(data); // Update state with fetched tasks
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  

  const handleTaskComplete = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task, i) => i !== index);
      return updatedTasks;
    });
  };

  return (
    <div className='flex justify-center items-center h-screen mt-28'>
      <div className='container flex justify-center items-center flex-col'>
        <h1 className='text-3xl font-bold mb-6'>Your Tasks</h1>
        {tasks.map((task, index) => (
          <div
            key={index}
            className='flex flex-col items-center justify-center w-[30rem] bg-cyan-500 rounded-lg p-4 mb-8'
          >
            <div className='text-white font-semibold mb-2'>{task}</div>
            <div className='text-white cursor-pointer'>
              <p className='text-xs mb-2'>View details</p>
              <div>ETA: 7hrs</div>
            </div>
            <div className='slider-container'>
              {/* Your slider content goes here */}
              {/* Example slider: */}
              <input type='range' min='1' max='100' className='slider' />
            </div>
            <button
              className='w-20 h-9 text-white shadow-lg mt-3 mb-1 bg-green-600 rounded-md'
              onClick={() => handleTaskComplete(index)}
            >
              Complete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
