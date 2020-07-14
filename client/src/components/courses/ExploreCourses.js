import React from 'react'
import Courses from './Courses'
import caro from '../../img/caro.jpg'
import Menu from '../Menu'

const ExploreCourses = () => {

    return (
        <div>
            <Menu />
            <div>
                <img src={caro} className="explore" />
            </div>
            <div className="mt-5">
                <Courses />
            </div>
        </div>
    )

}

export default ExploreCourses