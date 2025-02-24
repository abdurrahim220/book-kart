"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../slice/userSlice";
import { BASE_URL } from "../features/authApi";
import toast from "react-hot-toast";
import BookLoader from "@/components/constant/BookLoader";
const AuthCallback = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDataAndTokens = async () => {
      try {
        const response = await fetch(`${BASE_URL}/user/single-user`, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();

        dispatch(setUser(data.data));

        dispatch(setToken(data.refreshToken));

        toast.success("Google Login Successful");
        router.push("/dashboard");
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Login failed");
        router.push("/");
      }
    };

    fetchUserDataAndTokens();
  }, [dispatch, router]);

  return (
    <div>
      <BookLoader />
    </div>
  );
};

export default AuthCallback;
