import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addtocards } from "../cartslice"; // Make sure this name matches exactly

const Shop = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // lowercase variable
  const dispatch = useDispatch();

  // Load Data
  const loadData = async () => {
    try {
      const api = "http://localhost:3000/product2";
      const response = await axios.get(api);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Navigate to product page
  const product = (id) => {
    navigate(`/Productdisplays/${id}`);
  };

  return (
    <>
      <div
        className="w-100  d-md-flex align-items-center justify-content-center text-white"
        style={{
          background: "linear-gradient(135deg, #0dcaf0, #0d6efd)",
        }}
      >
        <h1 className="fw-bold text-center text-xl w-100 h-100 p-4">Shop</h1>
      </div>
      <div className="container mx-auto p-4">
        <div className="row">
          {data.map((item) => (
            <div key={item.id} className="col-md-3 mb-4">
              <div className="card h-100 shadow-sm">
                <a href="#" onClick={() => product(item.id)}>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="aspect-square w-full rounded-lg bg-gray-400 object-cover group-hover:opacity-75 xl:aspect-7/8"
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />
                </a>

                <div className="card-body text-center">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">₹{item.prize}</p>

                  <button
                    className="btn btn-primary w-100"
                    onClick={() =>
                      dispatch(
                        addtocards({
                          id: item.id,
                          name: item.name,
                          img: item.img,
                          prize: item.prize,
                        }),
                      )
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Shop;
