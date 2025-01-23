import useAxios from "axios-hooks";
import Cookies from "js-cookie";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogo, FacebookLogo } from "@phosphor-icons/react";

import { Google, Facebook } from "@mui/icons-material";

import { useFormik } from "formik";
import * as Yup from "yup";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import { TextField, Button, Box, IconButton } from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import { AppleIcon, GoogleIcon, WindowsIcon } from "../components/customIcons";


export interface FormPayloadInterface {
  email: string;
  password: string;
}

const Login = () => {
  /** React hook used for the navigation and page redirects */
  const navigate = useNavigate();

  /** Variable that controls the form errors on the password input */
  const [formErrors, setFormErrors] = useState({ password: "" });

  const validationSchema = Yup.object({
    email: Yup.string().required("Field is required!"),
    password: Yup.string().required("Field is required!"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (formValue: FormPayloadInterface) => {
      console.log("cenas");
      handleSubmit(formValue.email, formValue.password);
    },
  });

  const [{ loading }, authenticate] = useAxios<any>(
    {
      url: "p/auth/email/login",
      method: "post",
    },
    { manual: true }
  );

  const handleSubmit = async (email: string, password: string) => {
    console.log(email);
    console.log(password);
    authenticate({
      data: {
        email: email,
        password: password,
      },
    })
      .then((response) => {
        Cookies.set('user', response.data.data.access_token, { 
          expires: new Date(new Date().getTime() + 30 * 60 * 1000),
          //httpOnly: true, 
          //secure: true, 
        });

        console.log(response);
        navigate('/');
      })
      .catch((error) => {
        console.error('Login error:', error);
        setFormErrors({
          password: error?.response?.data?.message || 'Invalid email or password',
        });
      });
  };

  return (
    <>
      {/* <div className="container flex h-screen"> */}
      {/* <div className="container m-auto flex h-full"> */}
      {/* <div className="container m-auto h-full grid grid-cols-2 gap-0"> */}
      <div className=" m-auto h-full grid grid-cols-2 gap-0">
        <section>
          <img src="/dogpic.png" className="w-full" />
        </section>
        {/* <section style={{ width: "50%" }}> */}
        <section className="relative">
          <div className="py-28 px-24">
            {loading && <CircularProgress />}
            <h1 className="text-7xl font-bold">Hi there!</h1>
            <h2 className="text-lg flex pb-14 ">Welcome to Pet Hub</h2>

            <form onSubmit={formik.handleSubmit}>
              <div className="pb-8">
                <TextField
                  id="email"
                  name="email"
                  fullWidth
                  type="email"
                  placeholder="email"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  // required
                />
              </div>

              <div className="pb-8">
                <TextField
                  id="password"
                  name="password"
                  fullWidth
                  type="password"
                  placeholder="password"
                  variant="outlined"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  // required
                />
              </div>

              <Button fullWidth type="submit" color="primary" variant="contained">
                Login
              </Button>
            

              <Divider className="pt-10 pb-10" variant="middle" textAlign="center" style={{ color: '#696969' }}>
                Ou
              </Divider>

              <Box sx={{ display: "flex", flexDirection: "row", gap: 2, justifyContent: "space-between" }}>
                <div style={{ borderWidth: "1px", borderColor: "#D8D8D8" }} className="border-black rounded-md w-full flex justify-center">
                  <IconButton onClick={() => alert("Sign in with Google")}>
                    <GoogleIcon />
                  </IconButton>
                </div>
                <div style={{ borderWidth: "1px", borderColor: "#D8D8D8" }} className="border-black rounded-md w-full flex justify-center">
                  <IconButton onClick={() => alert("Sign in with Apple")}>
                    <AppleIcon />
                  </IconButton>
                </div>
                <div style={{ borderWidth: "1px", borderColor: "#D8D8D8" }} className="border-black rounded-md w-full flex justify-center">
                  <IconButton onClick={() => alert("Sign in with Microsoft")}>
                    <WindowsIcon />
                  </IconButton>
                </div>
              </Box>
            </form>
          </div>
          <div className="mt-2 text-center">
          <p className="text-sm">
          Don't have an account? {" "}
          <Link 
           href="/signup" 
           className="text-blue-600 hover:text-blue-800 font-medium"
            >Sign up </Link>
         </p>
      </div>
        </section>
        {/* <section style={{ width: "50%" }}> */}
      </div>
    </>
  );
};

export default Login;
function storeData(data: any) {
  throw new Error("Function not implemented.");
}

