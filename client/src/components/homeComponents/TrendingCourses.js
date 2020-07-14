import React, { useEffect, useState } from 'react'
import { getCourses } from '../../apis/apiCourses'
import CourseCard from '../CourseCard'
import * as ReactBootStrap from 'react-bootstrap'

const TrendingCourses = () => {

    const [trendingcourses, setTrendingcourses] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const loadTrendingcourses = () => {
        getCourses('enrolled').then(data => {
            if (data.error) {
                setError(data.error)
                console.log(error)
            }
            else {
                setLoading(true)
                setTimeout(setTrendingcourses(data), 2000)
            }
        })
    }

    useEffect(() => {
        loadTrendingcourses()
    }, [loadTrendingcourses])
    return (
        <div className="row">
            {
                loading ? trendingcourses.map((course, i) => (
                    <div key={i} className="row" style={{ margin: "auto" }}>
                        <div className="col-sm-4 mb-4 mt-4">
                            <CourseCard course={course} />
                        </div>
                    </div>
                )) :
                    <div style={{ marginLeft: "50%" }}> <ReactBootStrap.Spinner variant="light" animation="grow" />
                        <h4 style={{ marginLeft: "-30%", color: "deeppink" }}>Data loading</h4> </div>
            }
        </div>
    )
}

export default TrendingCourses
