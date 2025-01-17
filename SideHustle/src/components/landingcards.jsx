import React from 'react'
import {useNavigate } from 'react-router-dom'; 

export default function Landingcards() {
  
  return (
    <div className="container my-5">
  <div className="row g-4">
    {/* Card 1 */}
    <div className="col-md-6 col-lg-3">
      <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '10px' }}>
        <div className="card-body text-center" style={{ background: 'linear-gradient(135deg, #ff7e5f, #feb47b)', color: '#fff', borderRadius: '10px' }}>
          <i className="bi bi-box-seam fs-1 mb-3"></i>
          <h5 className="card-title fw-bold">Name</h5>
          <h2 className="card-text">SideHustle</h2>
          <p>Provide your Side hustles a better playform</p>
        </div>
      </div>
    </div>

    {/* Card 2 */}
    <div className="col-md-6 col-lg-3">
      <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '10px' }}>
        <div className="card-body text-center" style={{ background: 'linear-gradient(135deg, #6a11cb, #2575fc)', color: '#fff', borderRadius: '10px' }}>
          <i className="bi bi-briefcase fs-1 mb-3"></i>
          <h5 className="card-title fw-bold">What We Do</h5>
          <p className="card-text">
            SideHustle helps to promote small businesses by providing a platform to showcase and sell their products locally.
          </p>
        </div>
      </div>
    </div>

    {/* Card 3 */}
    <div className="col-md-6 col-lg-3">
      <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '10px' }}>
        <div className="card-body text-center" style={{ background: 'linear-gradient(135deg, #ff6a00, #ee0979)', color: '#fff', borderRadius: '10px' }}>
          <i className="bi bi-people fs-1 mb-3"></i>
          <h5 className="card-title fw-bold">Target Audience</h5>
          <p className="card-text">
            Small business owners and local buyers looking for unique products.
          </p>
        </div>
      </div>
    </div>

    {/* Card 4 */}
    <div className="col-md-6 col-lg-3">
      <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '10px' }}>
        <div className="card-body text-center" style={{ background: 'linear-gradient(135deg, #00c9ff, #92fe9d)', color: '#fff', borderRadius: '10px' }}>
          <i className="bi bi-bullseye fs-1 mb-3"></i>
          <h5 className="card-title fw-bold">Goal</h5>
          <p className="card-text">
            Empower sellers to increase their sales and help buyers find local gems.
          </p>
        </div>
      </div>
    </div>

    {/* Card 5 */}
    <div className="col-md-6 col-lg-3">
      <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '10px' }}>
        <div className="card-body text-center" style={{ background: 'linear-gradient(135deg, #11998e, #38ef7d)', color: '#fff', borderRadius: '10px' }}>
          <i className="bi bi-layout-text-sidebar fs-1 mb-3"></i>
          <h5 className="card-title fw-bold">Functionality</h5>
          <p className="card-text">
            Sellers can list their products, and buyers can explore and purchase from various categories.
          </p>
        </div>
      </div>
    </div>

    {/* Card 6 */}
    <div className="col-md-6 col-lg-3">
      <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '10px' }}>
        <div className="card-body text-center" style={{ background: 'linear-gradient(135deg, #ff512f, #dd2476)', color: '#fff', borderRadius: '10px' }}>
          <i className="bi bi-graph-up fs-1 mb-3"></i>
          <h5 className="card-title fw-bold">Advantages for Sellers</h5>
          <p className="card-text">
            Increases sales by reaching a local audience.
          </p>
        </div>
      </div>
    </div>

    {/* Card 7 */}
    <div className="col-md-6 col-lg-3">
      <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '10px' }}>
        <div className="card-body text-center" style={{ background: 'linear-gradient(135deg, #fc4a1a, #f7b733)', color: '#fff', borderRadius: '10px' }}>
          <i className="bi bi-cart-check fs-1 mb-3"></i>
          <h5 className="card-title fw-bold">Advantages for Buyers</h5>
          <p className="card-text">
            Access to unique and locally sourced products.
          </p>
        </div>
      </div>
    </div>

    {/* Card 8 */}
    <div className="col-md-6 col-lg-3">
      <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '10px' }}>
        <div className="card-body text-center" style={{ background: 'linear-gradient(135deg, #00b09b, #96c93d)', color: '#fff', borderRadius: '10px' }}>
          <i className="bi bi-globe fs-1 mb-3"></i>
          <h5 className="card-title fw-bold">Community Impact</h5>
          <p className="card-text">
            Strengthens the local economy by connecting buyers and sellers.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}
