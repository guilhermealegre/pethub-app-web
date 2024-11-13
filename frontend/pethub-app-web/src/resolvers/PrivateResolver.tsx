import useAxios from "axios-hooks";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import * as React from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

type UserDataToken = {
  firstName: string;
  idShop: number;
  idUserExternal: string;
  languageCode: string;
  lastName: string;
  username: string;
  authorizations: string[];
};

const PrivateResolver = ({ children }: { children: JSX.Element }) => {
  const [shopId, setShopId] = useState<number>();
  const userToken = Cookies.get("user");

  useEffect(() => {
    console.log(1);
    // if (userToken && !user?.isAuthenticated) {
    //   const user = jwtDecode<UserDataToken>(userToken);
    //   setUser({
    //     isAuthenticated: true,
    //     firstName: user.firstName,
    //     idUserExternal: user.idUserExternal,
    //     lastName: user.lastName,
    //     userLogin: user.username,
    //     authorizations: user.authorizations,
    //     language: user.languageCode?.toLowerCase() ?? '',
    //   });

    //   switchAllLanguages(`${user.languageCode?.toLowerCase()}-${process.env.REACT_APP_MARKET}`);
    //   setShopId(user.idShop);

    //   getMarketDetails().then(response => {
    //     setMarket(response.data.data);
    //   });
    // }
  }, []);

  if (!userToken) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PrivateResolver;
