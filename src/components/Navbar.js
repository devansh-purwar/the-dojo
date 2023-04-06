import './Navbar.css'

import { Link } from 'react-router-dom'
import Temple from '../assets/temple.svg'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
export default function Navbar() {
    const { user } = useAuthContext()
    const { isPending, logout } = useLogout()
    return (
        <nav className='navbar'>
            <ul>
                <li className='logo'>
                    <img src={Temple} alt="temple" />
                    <span>dojo logo</span>
                </li>
                {!user && (
                    <>
                        <li> <Link to='/login'>Login</Link> </li>
                        <li><Link to='/signup'>Signup</Link> </li>
                    </>
                )}
                {user && (
                    <li>
                        {!isPending && <button className='btn' onClick={logout}> Logout</button>}
                        {isPending && <button className='btn'> Logging out ...</button>}
                    </li>
                )}

            </ul>
        </nav>
    )
}
