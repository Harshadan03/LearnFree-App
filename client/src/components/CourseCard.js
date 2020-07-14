
import React from 'react'
import { Link } from 'react-router-dom'

const CourseCard = ({ course }) => {


    return (
        <Link to={`/view-course/${course._id}`} style={{ color: "black" }}>

            <div className="card coursecard" style={{ width: "18rem" }} >
                <img className="card-img-top" src={`/api/course/photo/${course._id}`} alt="course" style={{ maxHeight: "150px", maxWidth: "300px " }} />
                <div className="card-img-overlay">
                    <h5 className="card-title" style={{ color: "white" }}>{course.name}</h5>
                </div>
                <div className="card-body">
                    <p className="card-text">{course.description.substring(0, 60)}... </p>
                    <p><i className="fas fa-clock"></i> {course.duration.substring(0, 25)}</p>
                    <p><i className="fas fa-graduation-cap"></i> {course.enrolled} Learners</p>
                    <p className="text-right" style={{ color: "blue" }}>Learn More > </p>
                </div>
            </div>
        </Link>
    )
}

export default CourseCard