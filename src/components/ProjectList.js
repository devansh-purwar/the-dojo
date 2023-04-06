import { Link } from 'react-router-dom'
import './ProjectList.css'
import Avatar from './Avatar'
export default function ProjectList({ documents }) {
    console.log(documents)
    return (
        <div className='project-list'>
            {documents.length === 0 && <p>No projects yet!</p>}
            {documents.map(doc => (
                <Link to={`projects/${doc.id}`} key={doc.id} >
                    <h4>{doc.name}</h4>
                    <p>Due by {doc.dueDate.toDate().toDateString()}</p>
                    <div className='assigned-to'>
                        <p><strong>Assigned to:</strong></p>
                        <ul>
                            {doc.assignedUserList.map(user => (
                                <li key={user.photoURL}>
                                    <Avatar src={user.photoURL} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </Link>
            ))}
        </div>
    )
}