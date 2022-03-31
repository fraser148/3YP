import React from "react";
import { Link, useNavigate } from 'react-router-dom';

const ProjectList = ({projects, client}) => {
    const navigator = useNavigate();

    const colorsForMap = [
        ['Not Started', "#D3E5EF"],
        ['In Progress', "#F5E0E9"],
        ['Completed', "#DBEDDB"]
    ];
    const colors = new Map(colorsForMap);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString(
            'en-gb',
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'utc'
            }
        ); 
    }
    
    const handleRowClick = (row) => {
        navigator("/dashboard/project/" + row)
    }

    if (projects.length > 0) {
        console.log(projects)
        return (
            <>
                <h3>Projects</h3>
                <table>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Start Date</th>
                            <th>Status</th>
                        </tr>
                    
                        {projects.map(project => (
                            <tr key={project.id} onClick={()=> handleRowClick(project.id)}>
                                <td>{project.id}</td>
                                <td>{project.surveyName}</td>
                                <td>{formatDate(project.startDate)}</td>
                                <td><span className="status" style={{backgroundColor: colors.get(project.status)}}>{project.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link className="create" to={"../plan/step1/" + client}>Create a project</Link>
            </>
        )
    } else {
        return(
            <>
                <Link className="create" to={"../plan/step1/" + client}>Create first Project</Link>
            </>
        )
    }
};

export default ProjectList