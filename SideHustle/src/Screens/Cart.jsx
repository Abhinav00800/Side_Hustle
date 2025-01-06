import React from 'react'
// import Delete from '@material-ui/icons/Delete'
import { useCart,useDispatchCart } from '../components/contextReducer';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  const navigate= useNavigate();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }
  const handleCheckout = async () => {
    let userEmail = localStorage.getItem("userEmail");
    
    try {
      let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/orderData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });
  
      if (response.ok) { 
        dispatch({ type: "DROP" });
        navigate('/myOrder') 
      } else {
        console.error("Failed to checkout:", response.status, await response.text());
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  }
  

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody> 
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0"><img src='https://cdn-icons-png.flaticon.com/512/10319/10319444.png' alt='delete' style={{height:"25px", width:"25px"}} onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td>
                </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckout}  > Check Out </button>
        </div>
      </div>



    </div>
  )
}