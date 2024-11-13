import useAxios from "axios-hooks";
import Cookies from "js-cookie";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

// import "mdui/components/circular-progress.js";

// import type { CircularProgress } from "mdui/components/circular-progress.js";
// import "mdui/components/text-field.js";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
// import type { TextField } from "mdui/components/text-field.js";

export interface FormPayloadInterface {
  email: string;
  password: string;
}

const Login = () => {
  /** React hook used for the navigation and page redirects */
  const navigate = useNavigate();

  /** Variable that controls the form errors on the password input */
  const [formErrors, setFormErrors] = useState({ password: "" });

  const [abc, setAbc] = useState<string>("");
  const [def, setDef] = useState<string>("");

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
      <div className="container">
        {loading && <CircularProgress />}

        <h1 className="text-3xl font-bold underline flex">Hello login!</h1>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            placeholder="email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // required
          />
          <TextField
            id="password"
            name="password"
            type="password"
            placeholder="password"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // required
          />

          <Button type="submit" color="secondary" variant="contained">
            Submit
          </Button>
          <Button type="submit" onClick={() => navigate("/signup")} variant="contained">
            Go to signup
          </Button>
          {/* <mdui-text-field
            id="email"
            form="email"
            name="email"
            type="email"
            value={formik.values.email}
            defaultValue={123}
            onChange={formik.handleChange}
            onChangeCapture={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="outlined"
            label="Email"
          ></mdui-text-field>
          <mdui-text-field
            id="password"
            form="password"
            name="password"
            type="password"
            value={formik.values.password}
            defaultValue={456}
            onChange={formik.handleChange}
            onChangeCapture={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="outlined"
            label="Password"
          ></mdui-text-field>
          <mdui-button type="submit">Button</mdui-button> */}
        </form>
        {abc}
        {def}
      </div>
    </>
  );
};

export default Login;
