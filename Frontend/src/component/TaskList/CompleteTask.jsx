import React from 'react'

const CompleteTask = ({ data, completed }) => {
  return (
    <>
      {completed ?
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-red-300 rounded-xl'>
          <div className='flex justify-between items-center'>
            <h3 className='text-sm bg-red-600 px-3 py-1 rounded'>{data.category}</h3>
            <h4 className='text-sm'>{data.assignedDate}</h4>
          </div>
          <h2 className='mt-5 text-2xl font-semibold '>{data.title}</h2>
          <p className='text-sm mt-2'>{data.description}</p>
          <div className='mt-2'>
            <button className='bg-green-500 py-1 px-2 text-sm'>Completed</button>
          </div>
        </div>
        : null}
    </>
  )
}

export default CompleteTask