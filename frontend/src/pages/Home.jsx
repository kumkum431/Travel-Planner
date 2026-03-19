import heroDesktop from "../assets/mdHero.jpg";
import heroMobile from "../assets/smHero.jpg";
import AboutBee from "../assets/aboutBee.png";
import explore from "../assets/explore.gif";
import explore1 from "../assets/explore1.jpg";
import explore2 from "../assets/explore2.jpg";
import explore3 from "../assets/explore3.jpg";
import explore4 from "../assets/explore4.jpg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/authContext.jsx";

export default function Home() {
  const { isLoggedIn } = useContext(authContext);
  const navigate = useNavigate();
  function handleCreate() {
    if (isLoggedIn) {
      navigate("/create");
    } else {
      navigate("/login");
    }
  }
  return (
    <>
      <div className="relative w-full h-screen">
        <picture>
          <source media="(min-width:768px)" srcSet={heroDesktop} />
          <img
            src={heroMobile}
            className="absolute top-0 left-0 w-full h-full object-cover"
            alt="TravelBee"
          />
        </picture>
      </div>
      <div className="absolute px-5 top-12 left-1/2 -translate-x-1/2 text-center md:top-25 md:left-10 md:translate-x-0 md:text-left">
        <h1 className="text-6xl sm:text-6xl md:text-9xl lg:text-9xl heading-font drop-shadow-lg">
          TravelBee
        </h1>
        <div className="md:hidden text-shadow-[2px_4px_8px_rgba(0,0,0,0.3)] mt-12 text-xl font-bold py-1 ">
          <h1> AI Travel Planner</h1>
        </div>
        <div className="hidden md:block subHeading-font md:first-font tracking-wide">
          <h2 className="mt-6 md:mt-12 font-bold text-[28px]">
            Buzz Into Your Next Adventure 🐝
          </h2>
          <h3 className="md:mt-2 text-[16px] text-zinc-800 font-semibold tracking-wider">
            AI-powered itineraries tailored to your travel style.
          </h3>
          <h3 className="font-semibold text-zinc-800">
            Tell us where you want to go. We'll handle the rest.
          </h3>
        </div>
      </div>
      <button
        onClick={handleCreate}
        className="cursor-pointer absolute bottom-35 left-1/2 -translate-x-1/2 md:left-15 md:translate-x-0 font-medium bg-white px-6 py-3 rounded shadow-[4px_4px_2px_2px_rgba(0,0,0)] hover:bg-gray-100 active:scale-85 transition-all"
      >
        Create Itinerary
      </button>

      {/* about */}
      <div
        id="about"
        className="px-6 py-8 w-full bg-[#F3E5AB] rounded-[0_0_5rem_5rem] overflow-hidden"
      >
        <h1 className="text-6xl font-bold text-[#391702]">About TravelBee🐝</h1>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mt-15 w-full md:w-[60%] text-lg font-semibold second-font leading-8">
            TravelBee is an AI-powered travel planner designed to make trip
            planning simple, fast, and enjoyable. Instead of spending hours
            searching for places, creating schedules, and organizing activities,
            TravelBee helps you generate personalized travel itineraries in
            seconds.
            <br />
            Whether you're planning a weekend getaway, a solo adventure, or a
            family vacation, TravelBee creates smart travel plans tailored to
            your preferences, destinations, and travel style.
            <br />
            Our goal is to remove the stress from travel planning so you can
            focus on what matters most — exploring new places and creating
            unforgettable memories.
          </div>
          <div className="w-[30%]">
            <img
              src={AboutBee}
              alt="TravelBee"
              className="h-5/6 object-cover"
            />
          </div>
        </div>
      </div>

      {/* how works */}
      <div id="work" className="relative mt-8 px-6 py-10">
        <h1 className="text-center underline underline-offset-4 decoration-amber-800 decoration-2 font-bold text-5xl md:text-6xl text-[#391702]">
          How It works
        </h1>
        <div className="mt-15 flex flex-col items-center justify-between ">
          <div className="bg-[#FF7518] px-5 py-3 border-2 shadow-2xl rounded-2xl hover:scale-105 transition-transform duration-300">
            <h1 className="text-lg second-font font-semibold">
              1. Choose Your Destination
            </h1>
            <p className="text-[18px]">
              Select where you want to travel and the duration of your trip.
            </p>
          </div>

          <div className="mt-10 bg-[#D6B588] px-5 py-3 border-2 shadow-2xl rounded-2xl hover:scale-105 transition-transform duration-300">
            <h1 className="text-lg second-font font-semibold">
              2. Customize Your Preferences
            </h1>
            <p className="text-[18px]">
              Add your travel style like adventure, relaxation or sightseeing.
            </p>
          </div>
          <div className="mt-10 bg-[#FF7518] px-5 py-3 border-2 shadow-2xl rounded-2xl hover:scale-105 transition-transform duration-300">
            <h1 className="text-lg second-font font-semibold">
              3. Generate Your AI Itinerary
            </h1>
            <p className="text-[18px]">
              TravelBee creates a smart itinerary based on your interests.
            </p>
          </div>
          <div className="mt-10 bg-[#D6B588] px-5 py-3 border-2 shadow-2xl rounded-2xl hover:scale-105 transition-transform duration-300">
            <h1 className="text-lg second-font font-semibold">
              4. Start Exploring
            </h1>
            <p className="text-[18px]">
              Follow your personalized travel plan by AI and enjoy your trip.
            </p>
          </div>
        </div>
      </div>

      {/* explore */}
      <div
        id="explore"
        className="mt-8 w-full p-4 flex flex-col md:items-center"
      >
        <h1 className="underline underline-offset-4 decoration-amber-800 decoration-2 text-6xl font-bold text-[#391702]">
          Explore Destinations
        </h1>
        <p className="mt-15 text-xl md:text-center second-font font-medium">
          Discover beautiful places around the world and find inspiration for
          your next trip. Explore popular destinations, travel ideas, and start
          planning your perfect journey with TravelBee.
        </p>
        <div className="mt-10 rounded-2xl overflow-hidden">
          <img src={explore} alt="TravelBee" />
        </div>
        <div className="hidden w-full md:flex mt-20 items-center justify-around">
          <div className="text-right">
            <img
              src={explore1}
              alt="travelBee"
              className="h-80 border-20 border-[#faedcd]"
            />
            <p className="mt-2 text-sm font-semibold">
              Taj Mahal (Agra, India)
            </p>
          </div>
          <div className="text-right">
            <img
              src={explore2}
              alt="travelBee"
              className="h-80 border-20 border-[#faedcd]"
            />
            <p className="mt-2 text-sm font-semibold">
              Eiffel Tower (Paris, France)
            </p>
          </div>
          <div className="text-right">
            <img
              src={explore3}
              alt="travelBee"
              className="h-80 border-20 border-[#faedcd]"
            />
            <p className="mt-2 text-sm font-semibold">
              Colosseum (Rome, Italy)
            </p>
          </div>
          <div className="text-right">
            <img
              src={explore4}
              alt="travelBee"
              className="h-80 border-20 border-[#faedcd]"
            />
            <p className="mt-2 text-sm font-semibold">
              Grand Canyon (Arizona, USA)
            </p>
          </div>
        </div>
      </div>

      {/* mission */}
      <div className="text-center mt-15 p-4">
        <h1 className="font-bold underline underline-offset-4 decoration-amber-800 decoration-2 text-6xl text-[#391702]">
          Our Mission
        </h1>
        <p className="mt-10 text-xl second-font font-medium">
          Our mission is to make travel planning effortless. We believe that
          everyone should be able to explore the world without the stress of
          complicated planning. TravelBee uses smart technology to turn your
          travel ideas into a clear and exciting itinerary.
        </p>
      </div>

      {/* footer */}
      <div className="bg-[#F3E5AB] text-center p-5">
      <p className="text-lg tracking-wide underline underline-offset-2">
        Plan your journeys smarter with AI-powered itineraries.
      </p>

      <h1 className="mt-2 font-semibold underline underline-offset-2">Quick Links</h1>

      <p className="space-x-2">
        <a href="#about"> About</a>|
        <a href="#explore"> Explore</a>|
        <a href="#work"> How it Works</a>
      </p>

      <p className="mt-4 text-sm">© 2026 TravelBee. All rights reserved.</p>
    </div>
    </>
  );
}
