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
// import CircularProgress from "@mui/material/CircularProgress";
// import { codeValidator, emailValidator } from "../core/utils";
// import type { TextField } from "mdui/components/text-field.js";

export interface EmailFormPayloadInterface {
  email: string;
}

export interface CodeFormPayloadInterface {
  code: string;
}

export enum MODE {
  EMAIL = "email",
  CODE = "code",
  PASSWORD = "password",
}

const Signup = () => {
  /** React hook used for the navigation and page redirects */
  const navigate = useNavigate();

  /** Variable that controls the form errors on the password input */
  // const [formErrors, setFormErrors] = useState({ password: "" });

  const [email, setEmail] = useState<string>("");
  const [viewMode, setViewMode] = useState<MODE>(MODE.EMAIL);

  const EmailValidationSchema = Yup.object({
    email: Yup.string()
      .required("Field is required!")
      .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]+$/, "Email is invalid!"),
  });

  const CodeValidationSchema = Yup.object({
    code: Yup.string().required("Field is required!"),
  });

  const emailFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: EmailValidationSchema,
    onSubmit: (formValue: EmailFormPayloadInterface) => {
      console.log("email cenas");
      handleEmailSubmit(formValue.email);
    },
  });

  const codeFormik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: CodeValidationSchema,
    onSubmit: (formValue: CodeFormPayloadInterface) => {
      console.log("code cenas");
      handleCodeSubmit(formValue.code);
    },
  });

  const [{ loading: SaveEmailLoading }, saveEmail] = useAxios<any>(
    {
      url: "p/auth/email/signup",
      method: "post",
    },
    { manual: true }
  );

  const [{ loading: SaveCodeLoading }, saveCode] = useAxios<any>(
    {
      url: "p/auth/email/signup/confirmation",
      method: "post",
    },
    { manual: true }
  );

  const handleEmailSubmit = (email: string) => {
    // console.log(email);
    // console.log("submit email");
    console.log(email);
    setEmail(email);
    saveEmail({
      data: {
        email: email,
      },
    })
      .then((response) => {
        //  Cookies.set('user', response.data.data.token, { expires: new Date(new Date().getTime() + 30 * 60 * 1000) });
        // console.log(response);
        setViewMode(MODE.CODE);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCodeSubmit = (code: string) => {
    console.log(code);

    saveCode({
      data: {
        email: email,
        code: code,
      },
    })
      .then((response) => {
        Cookies.set("user", response.data.data.token, { expires: new Date(new Date().getTime() + 30 * 60 * 1000) });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);

        // just for testing purposes
        // Cookies.set("user", "blblblb", { expires: new Date(new Date().getTime() + 30 * 60 * 1000) });
        // navigate("/");
      });
  };

  // useEffect(() => {
  //   formik.setErrors(errors);
  // }, [errors]);

  return (
    <>
      <div className="container">
        {/* {loading && <CircularProgress />} */}

        <h1 className="text-3xl font-bold underline flex">Hello signup!</h1>

        {viewMode === MODE.EMAIL && (
          <form onSubmit={emailFormik.handleSubmit}>
            <TextField
              id="email"
              name="email"
              // type="email"
              placeholder="email"
              variant="outlined"
              value={emailFormik.values.email}
              onChange={emailFormik.handleChange}
              error={emailFormik.errors.email ? true : false}
              helperText={emailFormik.touched.email && emailFormik.errors.email ? emailFormik.errors.email : undefined}
              onBlur={emailFormik.handleBlur}
              required
            />
            <Button type="submit" color="secondary" variant="contained">
              Submit email
            </Button>
          </form>
        )}

        {viewMode === MODE.CODE && (
          <form onSubmit={codeFormik.handleSubmit}>
            <TextField
              id="code"
              name="code"
              placeholder="code"
              variant="outlined"
              value={codeFormik.values.code}
              onChange={codeFormik.handleChange}
              onBlur={codeFormik.handleBlur}
              error={codeFormik.errors.code ? true : false}
              helperText={codeFormik.touched.code && codeFormik.errors.code ? codeFormik.errors.code : undefined}
              required
            />
            <Button type="submit" color="secondary" variant="contained">
              Submit code
            </Button>
          </form>
        )}

        <Button
          type="submit"
          onClick={() => {
            console.log("cenas");
          }}
          color="secondary"
          variant="contained"
        >
          Submit Alegre
        </Button>
      </div>
    </>
  );
};

export default Signup;
