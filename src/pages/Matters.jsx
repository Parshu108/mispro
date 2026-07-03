import { Button } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch } from 'react-redux';
import { addtocard } from '../cartSlice';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import m1 from "../image/main/main-grid-01.jpg"
import m2 from "../image/main/main-grid-02.jpeg";
import m3 from "../image/main/main-grid-03.jpeg";
import m4 from "../image/main/main-grid-04.jpg";
import cent from "../image/main/Center-image-grid.png"
import img1 from "../image/slide/Web-Banner-001.png";
import img2 from "../image/slide/Web-Banner-002.png";
import img3 from "../image/slide/Web-Banner-003.png";
// import img4 from "../image/logo/avatar-01.jpg";
// import img5 from "../image/logo/avatar-02.jpg";
// import img6 from "../image/logo/coustomer-02.jpg";
import axios from 'axios';


const Matters = () => {
  // Fetching data from the API
  const [mydata, setdata] = useState([]);
  const Navigate=useNavigate();
  const dispatch=useDispatch();
  const loaddata = async () => {
      const api = "http://localhost:3000/product";
      const res = await axios.get(api);
      setdata(res.data);
  }
  useEffect(() => {
    loaddata();
  }, []);

  const product=(id)=>{
    Navigate(`/productdisplay/${id}`);
  }

  const ans=mydata.map((key)=>{
    return (
      <>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <a href="" onClick={()=>product(key.id)}>
            <img className="aspect-square w-full rounded-lg bg-gray-400 object-cover group-hover:opacity-75 xl:aspect-7/8" src={key.img} alt="Sunset in the mountains"/>
          </a>
          
         <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 ">{key.name}</div>
            <p className="flex gap-2 fs-4 text-orange-600 dark:text-orange-400 ">
              <h5>Price:-</h5>
              <h5> {key.prize}</h5>
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={()=>{dispatch(addtocard({
              id:key.id,
              name:key.name,
              img:key.img,
              prize:key.prize,
            }))
            }}
           >
            Add to Cart
            </button>
          </div>
        </div>
        
      </>
      
    );
  }) 
  return (
    <>
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img src={img1} style={{ height: `600px`, width: `100%` }} />
          <Carousel.Caption>
            <div className="text">
              <h5>Mishu Matters</h5>
              <h1>VINTAGE MATTERS</h1>
              <p style={{ textDecoration: "italick" }}>
                Comfort jo sabhkuch bhulade
              </p>
              <Button>Explore Now</Button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={img2} />
          <Carousel.Caption>
            <div className="text">
              <h5>Mishu Matters</h5>
              <h1>DREAM CATCHER MATTERS</h1>
              <p>neend bhi pyar bhi</p>
              <Button>Explore Now</Button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={img3} />
          <Carousel.Caption>
            <div className="text">
              <h5>Mishu Matters</h5>
              <h1>ASTRON MATTERS</h1>
              <p>jahan neend ho khwabon jaisi</p>
              <Button>Explore Now</Button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="matters">
        <div className="bg-div">
          <h5 className="head">
            <span>FREE SHIPPING</span> ALL ORDER OVER
          </h5>
        </div>
        <div className="bg-div">
          <h5 className="head">
            SUMMER <span>SALE OF</span> TO 50%
          </h5>
        </div>
        <div className="bg-div">
          <h5 className="head">
            WE SUPPORT <span>24 HOURS</span> A DAY
          </h5>
        </div>
      </div>

      <CardGroup className="gap-4">
        {/* LEFT CARD */}
        <Card className="border-0 text-center transition duration-300 hover:scale-105 hover:-translate-y-2">
          <Card.Img
            variant="top"
            src={m1}
            className="w-3/4 mx-auto transition duration-400 hover:scale-100"
          />

          <Card.Body>
            <Card.Title className="d-head transition duration-300 hover:text-blue-500">
              Cozy & snug For that plush feel
            </Card.Title>
          </Card.Body>

          <Card.Img
            variant="top"
            src={m3}
            className="w-3/4 mx-auto transition duration-400 hover:scale-110"
          />

          <Card.Body>
            <Card.Title className="d-head1 transition duration-300 hover:text-blue-500">
              Reversible
            </Card.Title>
          </Card.Body>
        </Card>

        {/* CENTER CARD */}
        <Card className="border-0 ms-3 transition duration-500 hover:scale-105">
          <Card.Img
            variant="top"
            src={cent}
            className="w-full h-100 transition duration-500 hover:scale-100"
          />
        </Card>

        {/* RIGHT CARD */}
        <Card className="border-0 text-center transition duration-300 hover:scale-105 hover:-translate-y-2">
          <Card.Img
            variant="top"
            src={m2}
            className="w-3/4 ml-16 transition duration-400 hover:scale-110"
          />

          <Card.Body>
            <Card.Title className="d-head2 transition duration-300 hover:text-blue-500">
              Back support
            </Card.Title>
          </Card.Body>

          <Card.Img
            variant="top"
            src={m4}
            className="w-3/4 ml-16 transition duration-400 hover:scale-110"
          />

          <Card.Body>
            <Card.Title className="d-head3 transition duration-300 hover:text-blue-500">
              No partner disturbance
            </Card.Title>
          </Card.Body>
        </Card>
      </CardGroup>

      <section>
        <div>
          <h1 className="text-center mt-5 fs-2"> SHOP BY CATEGORY</h1>
          <div className="d-flex justify-content-center">
            <p className="text-center w-50">
              Best Collection of Comfortable Mattress
            </p>
          </div>
        </div>
        <div className="block flex-wrap justify-content-around mt-3">
          <div className="flex justify-content-around mb-3 text-center w-50 ml-auto mr-auto">
            <li className="li-d">
              <button className="li-d-button"> Best Seller</button>
            </li>
            <li className="li-d">
              <button className="li-d1-button">Orth Mattress</button>
            </li>
            <li className="li-d">
              <button className="li-d1-button">New Launches</button>
            </li>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4 p-4">{ans}</div>
        </div>
      </section>
      <section className="bg-gray-200 p-4">
        <div>
          <div className="text-center mb-5 p-4 m-2">
            <h1 style={{ color: "#3e5a7cff" }} className="fs-1 fw-bold">
              Our Premium Mattresses Redefine Sleep Quality
            </h1>
            <p className="text-center w-3xl m-auto fs-5 mt-5 lh-base">
              At Mishu, we believe that a good day begins with a great night's
              sleep. As a premium mattress brand, we are dedicated to redefining
              sleep quality with products that combine comfort, durability, and
              innovation. Whether you're looking to upgrade your home bedroom or
              furnish an entire hotel, our wide range of mattresses caters to
              every need.
            </p>
            <button className="s-button">READ OUR STORY</button>
          </div>
        </div>
      </section>

      <section className="pt-6">
        <div className="max-w-6xl mx-auto px-4">
          {/* Heading */}
          <div className="flex justify-center">
            <div className="w-full lg:w-7/12">
              <div className="text-center">
                <div className="mb-2">
                  <h1 className="text-3xl font-semibold">Happy Customers</h1>
                </div>
                <span className="text-sm uppercase tracking-normal text-gray-500">
                  Real, happy sleepers with real 5-star reviews.
                </span>
              </div>
            </div>
          </div>

          {/* Quotes */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="border rounded-lg p-6 bg-white">
              <p className="text-gray-500 text-sm">
                Love my new mattress! It's so cozy and inviting, I never want to
                get out of bed. It's made my nights so much more relaxing.
              </p>

              <div className="flex items-center gap-3 mt-6 pt-2">
                <img
                  src="https://www.shutterstock.com/image-photo/indoor-photo-smiling-young-handsome-260nw-2624493687.jpg"
                  alt=""
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h6 className="text-sm font-semibold uppercase mb-0">
                    Mr. Suresh
                  </h6>
                  <p className="text-gray-500 text-sm mb-1">Verified Buyer</p>
                  <div className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="border rounded-lg p-6 bg-white">
              <p className="text-gray-500 text-sm">
                This mattress is perfect! It gives just the right amount of
                support without being too firm. I wake up feeling refreshed
                every.
              </p>

              <div className="flex items-center gap-3 mt-6 pt-2">
                <img
                  src="https://www.myperfectresume.com/wp-content/uploads/2020/09/define-excellent-customer-service.jpg?w=550"
                  alt=""
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h6 className="text-sm font-semibold uppercase mb-0">
                    Mr. Ganesh
                  </h6>
                  <p className="text-gray-500 text-sm mb-1">Verified Buyer</p>
                  <div className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="border rounded-lg p-6 bg-white">
              <p className="text-gray-500 text-sm">
                My mattress from Mishu Mattress is incredibly comfortable! It's
                like sleeping on a cloud. Best sleep I've had in ages!
              </p>

              <div className="flex items-center gap-3 mt-6 pt-2">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2n4-Sx5q59DZTNUM_JjCk48hgm93HM1Ze-Q&s"
                  alt=""
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h6 className="text-sm font-semibold uppercase mb-0">
                    Mr. Ramesh Singh
                  </h6>
                  <p className="text-gray-500 text-sm mb-1">Verified Buyer</p>
                  <div className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Matters;