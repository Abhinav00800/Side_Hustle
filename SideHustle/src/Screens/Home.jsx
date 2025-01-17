import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Fotter from '../components/Fotter';
import Card from '../components/Card';
import Carousal from '../components/Carousal';
import Testimonial from '../components/Testimonial.jsx'
export default function Home() {
  const [foodCat, setfoodCat] = useState([]);
  const [search, setsearch] = useState("");
  const [foodItems, setfoodItems] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/DisplayData`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setfoodItems(data[0] || []); // Ensure it's always an array
      setfoodCat(data[1] || []); // Ensure it's always an array
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    loadData();
  });

  return (
    <div>
      <Navbar />
      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://www.searchenginejournal.com/wp-content/uploads/2022/03/small-business-marketing-62432218f1319-sej.png" className="d-block w-100" style={{ height: "650px", filter: "brightness(90%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://www.cotton-x.com.au/wp-content/uploads/2023/01/blo-1.jpg" className="d-block w-100" style={{ height: "650px", filter: "brightness(90%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://storeplum-strapi-cms-images.s3.ap-south-1.amazonaws.com/Behind_every_small_business_there_s_a_person_with_a_dream_38c85cf21f.jpg" className="d-block w-100" style={{ height: "650px", filter: "brightness(90%)" }} alt="..." />
          </div>
        </div>
        <div className="carousel-caption d-none d-md-block">
          <form className="d-flex justify-content-center">
            <input className="form-control me-2" type="search" placeholder="Search Products" aria-label="Search" value={search} onChange={(e) => setsearch(e.target.value)} />
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
      <div className='m-3'>
        {foodCat.length > 0 ? foodCat.map((data) => (
          <div className='row mb-3' key={data._id}>
            <div className='fs-1 m-4 text-center' style={{fontFamily:"Bodoni", fontWeight:"bold", color:" rgb(197, 170, 106)"}}>
              {data.CategoryName}
            </div>
            <hr />
            {foodItems.length > 0 ? foodItems.filter((items) => (
              items.CategoryName === data.CategoryName && items.name.toLowerCase().includes(search.toLowerCase())
            )).map(filteritems => (
              <div className='col-12 col-md-6 col-lg-3' key={filteritems._id}>
                <Card email={filteritems.email} item={filteritems} foodname={filteritems.name} foodimg={filteritems.img} desc={filteritems.description} options={filteritems.options} />
              </div>
            )) : ""}
          </div>
        )) : ""}
      </div>
      <Testimonial/>
      <Fotter />
    </div>
  );
}
