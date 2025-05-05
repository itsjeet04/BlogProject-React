import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/Auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        // So, authService.logout() is hitting Appwrite’s backend to end the user session.
        // Once the logout is successful, it will then call the logout function from the Redux slice to update the app’s state.
        authService.logout().then(() => {
            dispatch(logout())
            // Once Appwrite confirms the user is logged out, the app then updates the Redux store by dispatching a logout action.
        })
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn