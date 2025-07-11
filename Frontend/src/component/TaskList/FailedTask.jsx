import React from 'react'

const FailedTask = ({ data, failed }) => {
  return (
    <>
      {failed ?
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-red-300 rounded-xl'>
          <div className='flex justify-between items-center'>
            <h3 className='text-sm bg-red-600 px-3 py-1 rounded'>{data.category}</h3>
            <h4 className='text-sm'>{data.assignedDate}</h4>
          </div>
          <h2 className='mt-5 text-2xl font-semibold '>{data.title}</h2>
          <p className='text-sm mt-2'>{data.description}</p>
          <div className='mt-4'>
            <button className='w-[50%] bg-red-600 px-3 py-1 rounded-xl '>Failed</button>
          </div>
        </div>
        : null}
    </>
  )
}

export default FailedTask