import { useState } from "react"
import { useAuthContext } from './../../hooks/useAuthContext'
import { timestamp } from "../../firebase/config"
import { useFirestore } from "../../hooks/useFirestore"
import Avatar from "../../components/Avatar"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
export default function ProjectComment({ project }) {
    const { user } = useAuthContext()
    const [comment, setComment] = useState()
    const { response, updateDocument } = useFirestore('projects')
    const handleSubmit = async (e) => {
        e.preventDefault()

        const commentAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            createdAt: timestamp.fromDate(new Date()),
            content: comment,
            id: Math.random()
        }
        await updateDocument(project.id, {
            comments: [...project.comments, commentAdd]
        })
        if (!response.error) {
            setComment('')
        }
    }

    return (
        <div className="project-comments">
            <h2>Project Comment</h2>
            <ul>
                {project.comments.length > 0 && project.comments.map(comment => (
                    <li key={comment.id}>
                        <div className="comment-author">
                            <Avatar src={comment.photoURL} />
                            <p>{comment.displayName}</p>
                        </div>
                        <div className="comment-date">
                            <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })} </p>
                        </div>
                        <div className="comment-content">
                            <p>{comment.content}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <form className="add-comment" onSubmit={handleSubmit}>
                <label>
                    <span>Add Comment</span>
                    <textarea
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                </label>
                <button className="btn">Add Comment</button>
            </form>
        </div>
    )
}
