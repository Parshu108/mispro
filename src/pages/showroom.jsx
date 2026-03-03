import { useState, useEffect } from "react";
// import { motion } from 'framer-motion';
import axios from "axios";
import img1 from "../image/payment-.png";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import { IoStarHalf } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { addtocard } from "../cartslice";

const Productdisplays = () => {
  const [product, setProduct] = useState({});

  const dispatch = useDispatch();
  const { id } = useParams();

  // Sample product data

  const loaddata = async () => {
    const api = `http://localhost:3000/product2/${id}`;
    const res = await axios.get(api);
    setProduct(res.data);
  };

  useEffect(() => {
    loaddata();
  }, [id]);

  return (
    <>
      <section className=" mx-auto p-1">
        <h1 className="text-center p-4 fs-1 bg-gray-200  h-50">Our Product</h1>

        <div className="max-w-6xl rounded m-auto  flex  flex-row items-center justify-center">
          <div className=" w-100 p-4">
            <img className="w-full" src={product.img} alt="Product Image" />
          </div>
          <div className=" w-100 p-4">
            <div className="font-bold text-xl mb-2 ">{product.name}</div>
            <p className="text-muted">
              The Classic Mattress offers the perfect blend of comfort and
              support with its medium-firm feel. Featuring cool gel foam to
              regulate temperature and high resilience foam for lasting
              durability, this affordable mattress ensures a cool, comfortable,
              and restful night's sleep.
            </p>
            <p className="text-gray-700 text-base mb-4 flex gap-2">
              <h6>rating .</h6>
              <IoStar className="text-yellow-500" />
              <IoStar className="text-yellow-500" />
              <IoStar className="text-yellow-500" />
              <IoStar className="text-yellow-500" />
              <IoStarHalf className="text-yellow-500" />
              <h6>4.8</h6>
            </p>
            <div className="pt-2 mb-3 pb-3">
              <h6 className="fw-bold mt-3">
                Size: <span x-text="size"></span>
              </h6>
              <div className="product-color-list size mt-2 gap-3 flex align-items-center">
                <a
                  href="#!"
                  className="inline-block rounded border align-items-center justify-content-center  hover:bg-yellow-500 py-2 px-4 text-black text-decoration-none"
                >
                  King
                </a>
                <a
                  href="#!"
                  className="inline-block rounded border align-items-center justify-content-center  hover:bg-yellow-500 py-2 px-4 text-black text-decoration-none"
                >
                  Single
                </a>
                <a
                  href="#!"
                  className="inline-block rounded border align-items-center justify-content-center  hover:bg-yellow-500 py-2 px-4 text-black text-decoration-none"
                >
                  Double
                </a>
                <a
                  href="#!"
                  className="inline-block rounded border align-items-center justify-content-center  hover:bg-yellow-500 py-2 px-4 text-black text-decoration-none"
                >
                  Queen
                </a>
                <a
                  href="#!"
                  className="inline-block rounded border align-items-center justify-content-center  text-black hover:bg-yellow-500 py-2 px-4 text-decoration-none"
                >
                  Custome Size
                </a>
              </div>
            </div>
            <p className="flex gap-2 fs-4 text-gray-600 dark:text-gray-400 ">
              <span>Price:-</span>
              <span> {product.prize}</span>
            </p>
            <div className="flex gap-4 mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() =>
                  dispatch(
                    addtocard({
                      id: product.id,
                      name: product.name,
                      img: product.img,
                      prize: product.prize,
                      qnty: 1,
                    }),
                  )
                }
              >
                Add to Cart
              </button>
              <button className="text-white rounded font-bold py-2 px-4 bg-blue-500 hover:bg-blue-700 ">
                By It now
              </button>
              <div className=" rounded border border-dark bg-transparent text-center m-1">
                <a href="#" className="fs-2">
                  <CiHeart className="text-red-500 " />
                </a>
              </div>
            </div>
            <div className="mt-4">
              <p className="mb-2">
                <span>Need Custom Size?</span>
                <span className="text-muted">
                  <a href="#" className="text-black fw-semibold">
                    {" "}
                    Enquiry Now
                  </a>
                </span>
              </p>
            </div>
            <div className="mt-4">
              <img src={img1} alt="" className="img-fluid" width="448" />
            </div>
            <div className="mt-4 flex gap-3 text-nowrap flex-wrap row-gap-1">
              <a
                href="#"
                className="text-black fw-semibold text-decoration-none data"
                style={{}}
              >
                Size Guide
              </a>
              <a
                href="#"
                className=" text-black fw-semibold mx-2 text-decoration-none data"
              >
                Delivery and Return
              </a>
              <a
                href="#"
                className="text-black fw-semibold text-decoration-none data"
              >
                Ask a Question
              </a>
            </div>
          </div>
        </div>
      </section>
      <hr className="my-8" />
    </>
  );
};

export default Productdisplays;
