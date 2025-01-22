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
import { TextField, Button } from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";

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
        //  Cookies.set('user', response.data.data.token, { expires: new Date(new Date().getTime() + 30 * 60 * 1000) });
        console.log(response);
        // navigate('/');

        // storeData(response.data);
        // navigation.navigate("Dashboard");

        // handleSaveTokenAndRedirect(response.data.data.access_token);
      })
      .catch((error) => {
        console.error(error);
        // navigation.navigate("Dashboard");
        // setFormErrors({
        //   password: t('ERRORS.' + error?.response.data.errors[0]?.code, t('ERRORS.SOMETHING_WENT_WRONG')),
        // });
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
        <section>
          <div className="py-28 px-24">
            {loading && <CircularProgress />}

            <h1 className="text-7xl font-bold">Hi there!</h1>
            <h3 className="text-lg font-bold ">Welcome to Pet Hub</h3>

            <div>
              <div className="flex justify-center items-center">
                <Google color="info" />
                <p>Google</p>
              </div>
              <GoogleLogo color="#0E5ABE" weight="light" size={20} />
              <FacebookLogo color="#0E5ABE" weight="fill" size={20} />
              <Facebook />
              {/* <Button variant="outlined" startIcon={<Google />}>
              Google
            </Button>
            <Button variant="outlined" color="error" startIcon={<Facebook />}>
              Facebook
            </Button>
            <Button variant="outlined" color="inherit" startIcon={<Facebook />}>
              Facebook
            </Button>
            <Button variant="outlined" color="primary" startIcon={<Facebook />}>
              Facebook
            </Button>
            <Button variant="outlined" color="secondary" startIcon={<Facebook />}>
              Facebook
            </Button>
            <Button variant="outlined" color="warning" startIcon={<Facebook />}>
              Facebook
            </Button>
            <Button variant="outlined" style={{ borderColor: "#0063cc" }} startIcon={<Facebook />}>
              Basic
            </Button> */}
            </div>

            <Divider>or</Divider>

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

              <Button fullWidth type="submit" color="secondary" variant="contained">
                Login
              </Button>

              <p>
                Don't have an account? <Link href="/signup">Sign in</Link>
              </p>
              {/* <Button type="submit" onClick={() => navigate("/signup")} variant="contained">
              Go to signup
            </Button> */}
            </form>
          </div>
        </section>
        {/* <section style={{ width: "50%" }}> */}
      </div>
    </>
  );
};

export default Login;
