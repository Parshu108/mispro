import React from 'react'
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeCart } from "../cartslice";
import { FaRupeeSign } from "react-icons/fa";



const Checkout = () => {
   const product = useSelector((state) => state.mycart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({});

   const proDetail=product;
   let totalPrice=0;
   product.forEach((item)=>{
      totalPrice += item.prize * item.qnty;
   });

  let netAmount = 0;

  const handleChange=(e)=>{
     let name=e.target.name; 
     let value=e.target.value;
     setInput(values=>({...values, [name]:value}));
     console.log(input);
  }

  const handleSubmit=async(e)=>{
          e.preventDefault();
          let api=`http://localhost:3000/costomber`;
          const response = await axios.post(api, {products:proDetail, totalamount:totalPrice, ...input} );
          dispatch(removeCart())
          console.log(response.data);
          navigate("/ordercomplete");
          }  
  return (
    <>
     <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Billing Details */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border rounded-xl shadow-sm p-6"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Billing Details
          </h2>

          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="fullname"

              onChange={handleChange}
              placeholder="Full Name *"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              name="phone"
              onChange={handleChange}
              placeholder="Phone Number *"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              name="address"
              onChange={handleChange}
              placeholder="Full Address *"
              rows="3"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                onChange={handleChange}
                placeholder="City *"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="state"
                onChange={handleChange}
                placeholder="State"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <input
              type="text"
              name="pincode"
              onChange={handleChange}
              placeholder="Pincode *"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Payment */}
            <div className="mt-2">
              <p className="font-semibold text-gray-700 mb-2">
                Payment Method
              </p>

              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                   checked={input.payment === "cod"}
                    onChange={handleChange}
                  />
                  <span>Cash on Delivery</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={input.payment === "online"}
                    onChange={handleChange}
                  />
                  <span>Online Payment</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Place Order
            </button>
          </div>
        </form>

        {/* Order Summary */}
        <div className="bg-white border rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Order Summary
          </h2>

          <div className="space-y-4">
            {product.map((key) => (
               
              <div
                className="flex items-center justify-between border-b pb-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={key.img}
                    alt={key.name}
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{key.name}</p>
                    <p className="text-sm text-gray-500">
                      ₹{key.prize} * {key.qnty}
                    </p>
                  </div>
                </div>

                <p className="font-semibold text-gray-800">
                  ₹{key.prize * key.qnty}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4 flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-700">Total</p>
            <p className="text-lg font-bold text-gray-900 flex items-center gap-1">
              <FaRupeeSign />
              {netAmount}
            </p>
          </div>

          <button
            onClick={() => navigate("/cartdata")}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Back to Cart
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Checkout;