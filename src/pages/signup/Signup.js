import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import './Signup.css'

export default function Signup() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState("")
    const { isPending, error, signup } = useSignup()

    const handleSubmit = (e) => {
        e.preventDefault()
        signup(email, password, displayName, thumbnail)
    }

    const handleSelect = (e) => {
        setThumbnail(null)
        let selected = e.target.files[0]
        console.log(selected)
        if (!selected) {
            setThumbnailError("Please select an image")
            return
        }

        if (!selected.type.includes('image')) {
            setThumbnailError("Only image type file is valid")
            return
        }

        if (selected.size > 100000) {
            setThumbnailError("Select image under 100kb size")
            return
        }

        setThumbnailError(null)
        setThumbnail(selected)
        console.log('thumbnail updated')

    }

    return (
        <form onSubmit={handleSubmit} className='auth-form'>
            <h2>Signup</h2>
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
            <label>
                <span>display name:</span>
                <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
            </label>
            <label>
                <span>thumbnail:</span>
                <input
                    type="file"
                    onChange={handleSelect}
                    required
                />
                {thumbnailError && <div className='error'>{thumbnailError}</div>}
            </label>
            {!isPending && <button className='btn'>Submit</button>}
            {isPending && <button className='btn'>loading</button>}
            {error && <div className='error'> {error}</div>}
        </form>
    )
}
