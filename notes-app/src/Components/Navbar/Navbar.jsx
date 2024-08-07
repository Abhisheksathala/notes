import React, { useEffect, useState } from "react";
import ProfileInfo from "./../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/Search";
import axiosInstance from "../../axiosInstance";

const Navbar = () => {
  const navigate = useNavigate();

  const Logout = async () => {
    console.log("Logout clicked"); // Debug log
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [userinfo, setUserinfo] = useState(null);
  const [error, setError] = useState(null);

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/api/user/getprofile");

      if (response.data.success) {
        setUserinfo(response.data.user);
      } else {
        throw new Error(response.data.message || "Failed to fetch user info");
      }
    } catch (error) {
      setError(error.message || "An error occurred. Please try again.");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <div className="bg-blue-500 p-4 flex items-center justify-between shadow-md">
        <div className="flex-1 flex items-center">
          <h2 className="text-white text-2xl font-semibold cursor-pointer">
            Notes
          </h2>
        </div>
        <div className="">
          <SearchBar />
        </div>
        <div className="flex-1 flex justify-end">
          <ProfileInfo Logout={Logout} userinfo={userinfo} error={error} />
        </div>
      </div>

      <div className="flex flex-wrap p-10 items-center "></div>
    </>
  );
};

export default Navbar;
