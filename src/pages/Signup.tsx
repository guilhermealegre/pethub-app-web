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
      {/* <div className="container m-auto flex h-full grid grid-rows-2 grid-flow-col gap-0"> */}
      {/* <div className="container m-auto h-full grid grid-cols-2 gap-0"> */}
      <div className=" m-auto h-full grid grid-cols-2 gap-0">
        {/* {loading && <CircularProgress />} */}

        <section>
          <div className="py-28 px-24">
            <h1 className="text-3xl font-bold flex pb-14">Create an account</h1>

            {viewMode === MODE.EMAIL && (
              <form onSubmit={emailFormik.handleSubmit}>
                {/* <TextField
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
              /> */}
                <div className="pb-8">
                  <TextField
                    id="email"
                    name="email"
                    fullWidth
                    type="email"
                    placeholder="email"
                    variant="outlined"
                    value={emailFormik.values.email}
                    onChange={emailFormik.handleChange}
                    onBlur={emailFormik.handleBlur}
                    // required
                  />
                </div>
                {/* checkbox do terms & conditions */}
                <Button type="submit" color="primary" onClick={() => navigate("/login")} variant="contained">
                  Back to login
                </Button>
                <Button type="submit" color="secondary" variant="contained">
                  Continue
                </Button>
              </form>
            )}

            {viewMode === MODE.CODE && (
              <form onSubmit={codeFormik.handleSubmit}>
                {/* <TextField
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
              /> */}
                <div className="pb-8">
                  <TextField
                    id="code"
                    name="code"
                    fullWidth
                    type="code"
                    placeholder="code"
                    variant="outlined"
                    value={codeFormik.values.code}
                    onChange={codeFormik.handleChange}
                    onBlur={codeFormik.handleBlur}
                    // required
                  />
                </div>
                <Button type="submit" color="secondary" variant="contained">
                  Submit code
                </Button>
              </form>
            )}
          </div>
        </section>
        <section>
          <img src="/dogpic2.png" className="w-full" />
        </section>
      </div>
    </>
  );
};

export default Signup;
