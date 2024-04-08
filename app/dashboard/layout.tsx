"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PrivateRoute from "../../components/PrivateRouter";
import Link from "next/link";
import axios from "axios";

interface DashboardLayoutProps {
  children: ReactNode;
}
interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [photoChanged, setPhotoChanged] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/login");
  };

  const isAuthenticate = !!localStorage.getItem("accessToken");
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios
        .get(`${process.env.URL}/auth/userdata`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((err) => {
          setError(err.response.data.message || "Failed to fetch user data");
        });
    } else {
      setError("Access token not found");
    }
  }, [photoChanged]);
  useEffect(() => {
    if (userData && userData.photo !== null) {
      setPhotoChanged((prev) => !prev);
    }
  }, [userData?.photo]);

  return (
    <div>
      <nav className="bg-black text-white py-4 px-5 flex justify-between items-center">
        <h3 className="text-xl  ">Logo</h3>
        <ul className="flex gap-8 ml-auto items-center">
          {isAuthenticate ? (
            <>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/signup">Sign Up</Link>
              <Link href="/login">Login</Link>
            </>
          )}
        </ul>
      </nav>
      <div className="flex">
        <div className="h-screen bg-black w-[20vw] text-white text-2xl">
          <ul className="pt-5 flex flex-col gap-5 px-5 text-center items-center">
            <li>Profile</li>
            {userData?.photo !== null ? (
              <li>
                <img
                  src={`${process.env.URL}/${userData?.photo}`}
                  alt="Profile Avatar"
                  className="h-20 w-20 rounded-full "
                />
              </li>
            ) : (
              <li>
                <img
                  src="/download.png"
                  alt="Default Avatar"
                  className="h-20 w-20 rounded-full "
                />
              </li>
            )}
          </ul>
        </div>
        <div className="p-4"> {children} </div>
      </div>
    </div>
  );
};

export default PrivateRoute(DashboardLayout);
