import React, { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { authContext } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";
import signUp from "../assets/signUp.mp4";

export default function SignUp() {
  const { setIsLoggedIn } = useContext(authContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    let Data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    let response = await axios.post(
      "http://localhost:5500/api/auth/signUp",
      Data,
    );

    localStorage.setItem("token", response.data.token);
    setIsLoggedIn(true);
    navigate("/");

    console.log(response.data);
  }

  return (
    <div className="min-h-screen bg-[#ffefd3] flex items-center justify-center">
      <div className="flex h-100 shadow-[0px_0px_10px_2px_rgba(0,0,0,0.2)] rounded-xl overflow-hidden">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-around bg-white h-full p-8 gap-4"
        >
          <h1 className="text-2xl subHeading-font font-bold text-center">
            Get Started!
          </h1>
          <div className="flex flex-col gap-6">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="p-2 border rounded placeholder:text-sm"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="p-2 border rounded placeholder:text-sm"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="p-2 border rounded placeholder:text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-[#ff4800] text-white py-2 rounded hover:bg-orange-500"
          >
            Sign up
          </button>
          <p className="text-center">
            Already have an account?
            <Link to="/login" className="font-bold underline">
              Login
            </Link>
          </p>
        </form>
        <video
          src={signUp}
          autoPlay
          muted
          loop
          className="hidden md:block h-full"
        ></video>
      </div>
    </div>
  );
}
