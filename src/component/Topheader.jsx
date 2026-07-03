// import from "../css/index.css";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Svg from "../image/Logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Topheader = () => {
  const product=useSelector((state)=>state.mycart.cart);  
  console.log(product);
  const navigate=useNavigate();
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary headerdata">
        <Container fluid>
          <Navbar.Brand
            href="#"
            style={{ color: `green`, fontSize: `18px`, fontWeight: `600` }}
          >
            <img
              src={Svg}
              style={{
                width: "150px",
                height: "60px",
                fontfamily: "Libre Baskervilleserif",
                fontWeight: "400",
                fontstyle: "italic",
              }}
            ></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px", margin: `auto`, gap: `10px` }}
              navbarScroll
            >
              <Nav.Link
                href="#action1"
                as={Link}
                to="matter"
                style={{ color: `black`, fontSize: `18px`, fontWeight: `600` }}
                className="headnav"
              >
                Matters
              </Nav.Link>
              <Nav.Link
                href="#action2"
                as={Link}
                to="shop"
                style={{ color: `black`, fontSize: `18px`, fontWeight: `600` }}
                className="headnav"
              >
                Shop
              </Nav.Link>
              <Nav.Link
                href="#action2"
                as={Link}
                to="product"
                style={{ color: `black`, fontSize: `18px`, fontWeight: `600` }}
                className="headnav"
              >
                Product
              </Nav.Link>
              <Nav.Link
                href="#action2"
                as={Link}
                to="showroom"
                style={{ color: `black`, fontSize: `18px`, fontWeight: `600` }}
                className="headnav"
              >
                Showroom
              </Nav.Link>
              <Nav.Link
                href="#action2"
                as={Link}
                to="blog"
                style={{ color: `black`, fontSize: `18px`, fontWeight: `600` }}
                className="headnav"
              >
                Blog
              </Nav.Link>
            </Nav>
            <Form className="d-flex ">
              <CiSearch style={{ fontSize: "24px" }} />
              <a href="/login">
                <CiUser style={{ fontSize: "24px" }} />
              </a>
              <a href="/wishlist">
                <CiHeart style={{ fontSize: "24px" }} />
              </a>
              <a
                href="#"
                onClick={() => {
                  navigate("/cartdata");
                }}
              >
                <CiShoppingCart style={{ fontSize: "24px" }} />
              </a>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Topheader