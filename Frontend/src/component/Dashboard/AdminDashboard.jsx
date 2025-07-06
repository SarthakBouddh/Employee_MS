import React from 'react'
import '../../App.css'
import CreateTask from '../others/CreateTask'
import AllTask from '../others/AllTask'
import Header from '../others/Header'

const AdminDashboard = (props) => {
  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-hidden no-scrollbar">
      <Header data={props.data} changeUser = {props.changeUser}/>
      <CreateTask/>
      <AllTask/>
    </div>
  )
}

export default AdminDashboard
