import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Fotter from '../components/Fotter';
import Card from '../components/Card';
import Carousal from '../components/Carousal';
import Testimonial from '../components/Testimonial.jsx'

export default function Categories() {
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

  return (
    <div>
      <Navbar />
      <div>
      <form className="d-flex justify-content-center m-3 " >
            <input className="form-control me-2" type="search" placeholder="Search Products" aria-label="Search" value={search} onChange={(e) => setsearch(e.target.value)} />
          </form>
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
                <Card item={filteritems} foodname={filteritems.name} foodimg={filteritems.img} desc={filteritems.description} options={filteritems.options} />
              </div>
            )) : ""}
          </div>
        )) : ""}
      </div>
    </div>
  );
}
