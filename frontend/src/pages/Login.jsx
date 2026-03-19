import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import login from "../assets/login.mp4";

export default function Login() {
  const { setIsLoggedIn } = useContext(authContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    let Data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    let response = await axios.post(
      "http://localhost:5500/api/auth/signIn",
      Data,
    );
    localStorage.setItem("token", response.data.token);
    setIsLoggedIn(true);
    navigate("/");
  }
  return (
    <div className="min-h-screen bg-[#ffefd3] flex items-center justify-center">
      <div className="flex h-100 shadow-[0px_0px_10px_2px_rgba(0,0,0,0.2)] rounded-xl overflow-hidden">
        <video src={login} autoPlay muted loop className="h-full hidden md:block"></video>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-around bg-white h-full p-8 gap-4 "
        >
          <h1 className="text-2xl subHeading-font font-bold text-center">
            Welcome Back!
          </h1>

          <div className="flex flex-col gap-6">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="p-2 border rounded placeholder:text-sm "
            />

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="p-2 border rounded placeholder:text-sm "
            />
          </div>
          <button
            type="submit"
            className="bg-[#ff4800] text-white py-2 rounded hover:bg-orange-500"
          >
            Login
          </button>
          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/signUp" className="font-bold underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
