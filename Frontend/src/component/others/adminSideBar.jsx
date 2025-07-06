import {NavLink} from 'react-router-dom'
import {FaBuilding, FaCalendarAlt, FaMoneyBillWave, FaTachometerAlt, FaUsers} from 'react-icons/fa'

const adminSideBar = () => {
  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
        <div className='bg-teal-600 h-12 flex items-center justify-center'>
            <h3 className='text-wx1 text-center font-pacific'>Employee MS</h3>
        </div>
        <div className='px-4'>
            <NavLink  to='/admin-dashboard'
            className={({isActive}) => `${isActive ? "bg-teal-500 " : ""}flex items-center space-x-4 px-4 py-2.5 rounded`}>
                <FaTachometerAlt/>
                <span>Dashboard</span>
            </NavLink>
            <NavLink to='/admin-dashboard'
            className='flex items-center space-x-4 px-4 py-2.5 rounded'>
                <FaUsers/>
                <span>Employee</span>
            </NavLink>
            <NavLink to='/admin-dashboard'
            className='flex items-center space-x-4 px-4 py-2.5 rounded'>
                <FaBuilding/>
                <span>Departments</span>
            </NavLink>
            <NavLink to='/admin-dashboard'
            className='flex items-center space-x-4 px-4 py-2.5 rounded'>
                <FaCalendarAlt/>
                <span>Leaves</span>
            </NavLink>
            <NavLink to='/admin-dashboard'
            className='flex items-center space-x-4 px-4 py-2.5 rounded'>
                <FaMoneyBillWave/>
                <span>Salary</span>
            </NavLink>
            <NavLink to='/admin-dashboard'
            className='flex items-center space-x-4 px-4 py-2.5 rounded'>
                <FaBuilding/>
                <span>Setting</span>
            </NavLink>
        </div>
    </div>
  )
}

export default adminSideBar