import { Link } from "react-router-dom";

function Sidenavbar() {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-5">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Admin</h2>
      </div>

      {/* Navigation Links */}
      <ul className="p-4 space-y-4">
        <li>
          <a
            href="#"
            className="block font-medium text-white text-[18px] text-decoration-none hover:text-blue-500"
          >
            Dashboard
          </a>
        </li>

        <li>
          <a
            href="#"
            className="block font-medium  text-white text-[18px] text-decoration-none hover:text-blue-500"
          >
            Shop
          </a>
        </li>

        <li>
          <a
            href="#"
            className="block font-medium  text-white text-[18px] text-decoration-none hover:text-blue-500"
          >
            Product
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block font-medium  text-white text-[18px] text-decoration-none hover:text-blue-500"
          >
            Find Showroom
          </a>
        </li>

        <li>
          <a
            href="#"
            className="block font-medium  text-white text-[18px] text-decoration-none hover:text-blue-500"
          >
            Blog
          </a>
        </li>
      </ul>

      {/* Account Section */}
      <div className="border-t p-4">
        <p className="font-semibold mb-2">Account</p>
        <a
          href="#"
          className="block text-gray-600  text-xl text-decoration-none hover:text-blue-500 mb-2"
        >
          Login
        </a>
        <a
          href="#"
          className="block text-gray-600   text-xl text-decoration-none hover:text-blue-500"
        >
          Register
        </a>
      </div>
    </div>
  );
}

export default Sidenavbar;
