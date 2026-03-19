import { useContext, useState } from "react";
import { authContext } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import logo from "../assets/logo.png";

export default function Navbar() {
  let navigate = useNavigate();
  let [isOpen, setIsOpen] = useState(false);
  let { isLoggedIn, setIsLoggedIn } = useContext(authContext);

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  }

  return (
    <nav className="w-full px-5 py-3 bg-transparent text-black font-semibold flex items-center justify-between absolute top-0 left-0 z-50">
      <h2>
        <Link to="/">
          <img src={logo} alt="TravelBee" className="h-16 cursor-pointer" />
        </Link>
      </h2>
      <div className=" hidden md:flex gap-5 items-center justify-between">
        <div>
          {isLoggedIn ? (
            <div className="flex items-center gap-4 cursor-pointer">
              <Link
                to="/create"
                className="bg-white border px-2 py-1 rounded active:scale-90 transition-all shadow-[4px_4px_2px_rgba(0,0,0)] hover:bg-orange-500"
              >
                Create Itinerary
              </Link>
              <Link
                to="/dashboard"
                className="bg-white active:scale-90 transition-all border px-2 py-1 rounded shadow-[4px_4px_2px_rgba(0,0,0)] hover:bg-orange-500"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 active:scale-90 transition-all border cursor-pointer px-2 py-1 rounded shadow-[4px_4px_2px_rgba(0,0,0)] hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/signUp"
              className="inline-block bg-white border active:scale-90 transition-all px-4 py-2 rounded shadow-[4px_4px_2px_rgba(0,0,0)] hover:bg-orange-500"
            >
              Sign Up
            </Link>
          )}
        </div>
      </div>
      <div
        className="md:hidden text-4xl cursor-pointer relative z-999"
        onClick={() => setIsOpen(true)}
      >
        {isOpen ? "" : <IoMenu />}
      </div>
      <div
        className={`fixed top-0 right-0 h-full w-72 backdrop-brightness-30  shadow-lg transform transition-transform duration-300 ease-in-out md:hidden
  ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-end p-6">
          <button
            className="text-4xl text-white/80"
            onClick={() => setIsOpen(false)}
          >
            <IoCloseSharp />
          </button>
        </div>

        <div className="flex flex-col gap-8 px-8 text-xl cursor-pointer font-normal text-white/90">
          {isLoggedIn ? (
            <div className="flex flex-col gap-8 text-xl cursor-pointer font-normal text-white/90">
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
              <Link to="/create" onClick={() => setIsOpen(false)}>
                Create Itinerary
              </Link>
              <button onClick={handleLogout} className="text-left ">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/signup" onClick={() => setIsOpen(false)}>
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
