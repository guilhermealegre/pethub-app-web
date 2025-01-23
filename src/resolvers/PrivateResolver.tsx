import useAxios from "axios-hooks";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import * as React from "react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

type UserDataToken = {
  user_uuid: string;
  email: string;
}

const PrivateResolver = ({ children }: { children: JSX.Element }) => {
  const userToken = Cookies.get("user");
  const [user, setUser] = useState<UserDataToken & {isAuthenticated: boolean}>({
    user_uuid: "",
    email: "", 
    isAuthenticated: false
  });
  const navigate = useNavigate();


  useEffect(() => {
    const checkAuthentication = () => {
      if (!userToken) {
        setUser({
          user_uuid: "",
          email: "",
          isAuthenticated: false
        });
        return;
      }

      try {
        const decodedUser = jwtDecode<UserDataToken>(userToken);

        // Check if token is expired
        const tokenExp = (decodedUser as any).exp;
        if (tokenExp && Date.now() >= tokenExp * 1000) {
          Cookies.remove("user");
          setUser({
            user_uuid: "",
            email: "",
            isAuthenticated: false
          });
          return;
        }

        console.log("estou aqui4")

        setUser({
          isAuthenticated: true,
          email: decodedUser.email,
          user_uuid: decodedUser.user_uuid
        });
      } catch (error) {
        console.error("Error decoding token:", error);
        Cookies.remove("user");
        setUser({
          user_uuid: "",
          email: "",
          isAuthenticated: false
        });
      }
    };

    checkAuthentication();
    console.log("estou aqui1")

  }, [userToken]);
  console.log("estou aqui")

  if (!user.isAuthenticated) {
    navigate("/login")
  }

  if (window.location.pathname === '/') {
    return <>{children}</>;
  }
  
  console.log("estou aqui")
  navigate("/");

};

export default PrivateResolver;
