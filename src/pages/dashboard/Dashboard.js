import './Dashboard.css'
import { useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import ProjectList from '../../components/ProjectList'
import ProjectFilter from '../project/ProjectFilter'
import { useAuthContext } from '../../hooks/useAuthContext'
export default function Dashboard() {
    const [currentFilter, setCurrentFilter] = useState('all')
    const { documents, error } = useCollection('projects')
    const { user } = useAuthContext()
    const changeFilter = (filter) => {
        setCurrentFilter(filter)
    }

    const projects = documents ? documents.filter((doc) => {
        switch (currentFilter) {
            case 'all':
                return true
            case 'mine':
                let assignedToMe = false
                doc.assignedUserList.forEach((u) => {
                    if (user.uid === u.id) {
                        assignedToMe = true
                    }
                })
                return assignedToMe
            case 'design':
            case 'sales':
            case 'marketing':
            case 'development':
                return doc.category === currentFilter
            default:
                return true
        }
    }) : null

    return (
        <div>
            <h2 className="page-title">Dashboard</h2>
            {error && <p className='error'>{error}</p>}
            {documents && (
                <ProjectFilter
                    currentFilter={currentFilter}
                    changeFilter={changeFilter}
                />
            )}
            {documents && <ProjectList documents={projects} />}
        </div>
    )
}
