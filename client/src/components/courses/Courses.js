import React, { useState, useEffect } from 'react'
import { getAllCategories, getFilteredCourses } from '../../apis/apiCourses'
import Checkbox from './Checkbox'
import { Prices } from './fixedPrices'
import RadioBox from './RadioBox'
import CourseCard from '../CourseCard'
import Footer from '../Footer'

const Courses = () => {

    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [limit, setLimit] = useState(6)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [filteredResult, setFilteredResult] = useState([])
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    })


    //load categories and set form data
    const init = () => {
        getAllCategories().then(data => {
            if (data.error) {
                setError(data.error)
            }
            else {
                setCategories(data)
            }
        })
    }

    const loadFilteredResults = (SearchFilters) => {
        //console.log(SearchFilters)
        getFilteredCourses(skip, limit, SearchFilters).then(data => {
            if (data.error) {
                setError(data.error)
            }
            else {
                setFilteredResult(data.data)
                setSize(data.size)
                setSkip(0)
            }
        })
    }


    const loadMore = () => {

        let toSkip = skip + limit

        getFilteredCourses(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error)
            }
            else {
                setFilteredResult([...filteredResult, ...data.data])
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5" >Load More</button>
            )
        )
    }

    useEffect(() => {
        init()
        loadFilteredResults(skip, limit, myFilters.filters)
    }, [])

    const handleFilters = (filters, filterBy) => {
        //console.log(filters, filterBy)
        const newFilters = { ...myFilters }
        newFilters.filters[filterBy] = filters

        if (filterBy == "price") {
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues
        }
        loadFilteredResults(myFilters.filters)
        setMyFilters(newFilters)
    }

    const handlePrice = value => {
        const data = Prices
        let array = []
        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }
        return array
    }


    return (
        <div>
            <div>
                <h1 className="text-center mb-5">Courses</h1>
                <div className="row courses ">
                    <div className="col-sm-3">
                        <div style={{ color: "white" }} className="m-5">
                            <h4>Filter By Categories</h4>
                            <ul>
                                <Checkbox categories={categories}
                                    handleFilters={filters => handleFilters(filters, "category")} />
                            </ul>
                        </div>
                        <div style={{ color: "white" }} className="m-5">
                            <h4>Filter By Price Range</h4>
                            <ul>
                                <RadioBox prices={Prices}
                                    handleFilters={filters => handleFilters(filters, "price")} />
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-9 mt-5" >
                        <div className="row ">
                            {filteredResult.map((course, i) => (

                                <div key={i} className="my-3" style={{ margin: "auto" }}>
                                    <CourseCard course={course} />
                                </div>
                            ))}
                        </div>
                        <hr />
                        {loadMoreButton()}
                    </div>
                </div>
            </div>

            <div style={{ marginTop: "200px" }}>
                <Footer />
            </div>
        </div>
    )
}

export default Courses