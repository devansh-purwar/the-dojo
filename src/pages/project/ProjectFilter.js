const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales']
export default function ProjectFilter({ currentFilter, changeFilter }) {
    const handleClick = (f) => {
        console.log(currentFilter)
        changeFilter(f)
    }

    return (
        <div className="project-filter">
            <nav>
                <p>Filter by: </p>
                {filterList.map((f) => (
                    <button
                        key={f}
                        onClick={() => handleClick(f)}
                        className={currentFilter === f ? 'active' : ''}
                    >
                        {f}
                    </button>
                ))}
            </nav>
        </div>
    )
}