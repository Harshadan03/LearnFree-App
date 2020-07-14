import React from 'react'
import HomeCarousel from './homeComponents/HomeCarousel'
import "../App.css"
import TrendingCourses from './homeComponents/TrendingCourses'
import Menu from './Menu'
import Footer from './Footer'

const Home = () => {
    return (
        <div>
            <Menu />
            <HomeCarousel />
            <h1 className="text-center mt-5" style={{ color: "rgb(253, 53, 130)", textDecoration: "underline" }}>Trending Courses</h1>

            <div className="trending mt-5">
                <TrendingCourses />
            </div>
            <div style={{ marginTop: "200px" }}>
                <Footer />
            </div>
        </div>
    )
}

export default Home