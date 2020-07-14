import React from 'react'
const HomeCarousel = () => {
    return (

        <div id="demo" className="carousel slide" data-ride="carousel">

            <ul className="carousel-indicators">
                <li data-target="#demo" data-slide-to="0" className="active"></li>
                <li data-target="#demo" data-slide-to="1"></li>
                <li data-target="#demo" data-slide-to="2"></li>
            </ul>

            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://cdn.eckovation.com/homepage/hm-pg-slider2.png" alt="Los Angeles" />
                </div>
                <div className="carousel-item">
                    <img src="https://cdn.eckovation.com/homepage/hm-pg-slider1.png"
                        alt="Chicago" />
                </div>
                <div className="carousel-item">
                    <img src="https://cdn.eckovation.com/homepage/hm-pg-slider3.png"
                        alt="New York" />
                </div>
            </div>


            <a className="carousel-control-prev" href="#demo" data-slide="prev">
                <span className="carousel-control-prev-icon"></span>
            </a>
            <a className="carousel-control-next" href="#demo" data-slide="next">
                <span className="carousel-control-next-icon"></span>
            </a>
        </div>
    )
}

export default HomeCarousel