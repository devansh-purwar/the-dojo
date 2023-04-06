import './Create.css'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useFirestore } from '../../hooks/useFirestore'
import Select from 'react-select'
import { timestamp } from '../../firebase/config'
import { useHistory } from 'react-router-dom'
export default function Create() {
    const history = useHistory()
    const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])
    const [formError, setFormError] = useState(null)
    const { documents } = useCollection('users')
    const { user } = useAuthContext()
    const { addDocument, response } = useFirestore('projects')
    useEffect(() => {
        if (documents) {
            const options = documents.map(user => {
                return { label: user.displayName, value: user }
            })
            setUsers(options)
        }
    }, [documents])

    const createdBy = {
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL
    }

    const assignedUserList = assignedUsers.map(u => {
        return {
            displayName: u.value.displayName,
            photoURL: u.value.photoURL,
            id: u.value.id
        }
    })

    const project = {
        name,
        details,
        category: category.value,
        dueDate: timestamp.fromDate(new Date(dueDate)),
        comments: [],
        createdBy,
        assignedUserList
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)
        if (!category) {
            setFormError("Select Category Field")
            return
        }
        if (assignedUsers.length === 0) {
            setFormError('Select Assigned Users Field')
            return
        }
        await addDocument(project)
        if (!response.error) {
            history.push('/')
        }
    }

    const categories = [
        { value: 'development', label: 'Development' },
        { value: 'design', label: 'Design' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'sales', label: 'Sales' },
    ]

    return (
        <div className='create-form'>
            <h2 className="page-title">Create a new project </h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Project name: </span>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        required
                    />
                </label>

                <label>
                    <span>Project Details: </span>
                    <textarea
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <span>Project Due Date: </span>
                    <input
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        type="date"
                        required
                    />
                </label>
                <label>
                    <span>Project category: </span>
                    <Select
                        onChange={(option) => setCategory(option)}
                        options={categories}
                    />
                </label>
                <label>
                    <span> Assigned to: </span>
                    <Select
                        onChange={(option) => setAssignedUsers(option)}
                        options={users}
                        isMulti
                    />
                </label>
                <button className="btn">Create</button>
                {formError && <p className='error'>{formError}</p>}
            </form>
        </div>
    )
}
