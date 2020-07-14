import React from 'react'
import LOGOIMG from '../img/logo123.png'

const Footer = () => {

    return (
        <div className="container-fluid footer footimg" >
            <div className="container">
                <div className="pt-3">
                    <div className="text-center">
                        <span className="navbar-brand mb-2">
                            <i><img src={LOGOIMG} width="60" height="60" alt="NA" /></i><b style={{ fontSize: "45px" }}>LearnFree</b>
                        </span>
                        <br /><br />
                    </div>
                </div>
            </div>
            <br />
            <div className="container text-center">
                <h6 className="mt-2 text-dark">© 2020 LearnFree Private Limited</h6>
                <h6 className="mt-2 text-dark">Terms of Service  Privacy Policy</h6>
                <br />
                <h6 className="mt-2 text-dark"><mark>Developed By: Harshada</mark></h6>
            </div><br />
        </div>
    )
}

export default Footer;