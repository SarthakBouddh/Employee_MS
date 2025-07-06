import React from 'react';

const Header = (props) => {
  const username = props.data ? props.data.firstName : 'Sarthak';
  
  const logOut = () => {
    localStorage.setItem('loggedInUser','')
    props.changeUser()
    // window.location.reload()
  }

  return (
    <div className='flex items-end justify-between text-white'>
      <h1 className='text-2xl font-medium'>
        Hello <br />
        <span className='text-3xl font-semibold'>{username}</span>
      </h1>
      <button onClick={logOut} className='bg-red-500 text-lg font-medium text-white px-5 py-2 rounded-lg'>
        Log Out
      </button>
    </div>
  );
};

export default Header;
