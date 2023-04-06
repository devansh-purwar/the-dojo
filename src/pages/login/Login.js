import './Login.css'
import { useLogin } from '../../hooks/useLogin'
import { useState } from 'react'
export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isPending, error } = useLogin()
    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }
    return (
        <form onSubmit={handleSubmit} className='auth-form'>
            <h2>Login</h2>
            <label>
                <span>email:</span>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                <span>password:</span>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            {!isPending && <button className='btn'>Login</button>}
            {isPending && <button className='btn'>loading</button>}
            {console.log(error)}
            {error && <div className='error'> {error}</div>}
        </form>
    )
}
