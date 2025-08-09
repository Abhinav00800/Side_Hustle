import React from 'react';

export default function Carousel() {
    return (
        <div>
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://hover.blog/wp-content/uploads/2015/08/dot-online-1280x720.png" className="d-block w-100" style={{ height: "650px", width: "30px",filter:"brightness(90%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://cdn.pixabay.com/photo/2019/05/16/20/15/online-4208112_1280.jpg" className="d-block w-100" style={{ height: "650px", width: "30px",filter:"brightness(90%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://instructor-academy.onlinecoursehost.com/content/images/2023/05/How-to-Create-an-Online-Course-For-Free--Complete-Guide--6.jpg" className="d-block w-100" style={{ height: "650px", width: "30px",filter:"brightness(90%)" }} alt="..." />
                    </div>
                </div>

                <div className="carousel-caption d-none d-md-block ">
                    <form className="d-flex">
                        <input className="form-control me-2 " type="search" placeholder="Search Products" aria-label="Search" />
                        <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                    </form>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

