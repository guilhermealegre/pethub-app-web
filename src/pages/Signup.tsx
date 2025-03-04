import useAxios from "axios-hooks";
import Cookies from "js-cookie";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VerificationInput from "react-verification-input";

import { useFormik } from "formik";
import * as Yup from "yup";

// import "mdui/components/circular-progress.js";

// import type { CircularProgress } from "mdui/components/circular-progress.js";
// import "mdui/components/text-field.js";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { AppleIcon, GoogleIcon, WindowsIcon } from "../components/customIcons";
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
  const [viewMode, setViewMode] = useState<MODE>(MODE.CODE);

  const [code, setCode] = useState("");

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
      handleEmailSubmit(formValue.email as string);
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

  // typing axios
  const [{ loading: SaveEmailLoading }, saveEmail] = useAxios<any>(
    {
      url: "p/auth/email/signup",
      method: "post",
    },
    { manual: true }
  );

  // typing axios
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
      <div className=" m-auto h-full grid grid-cols-2 gap-0">
        {/* {loading && <CircularProgress />} */}
        <section>
          <img src="/dogpic2.png" className="w-full" />
        </section>
        <section className="relative">
          <div className="py-28 px-24">
            <h1 className="text-4xl font-bold flex pb-8">Olá, humans and furry friends!</h1>
            <h2 className="text-lg flex pb-14">Inscreve-te para aceder a todos os serviços ou faz login na tua conta.</h2>

            {viewMode === MODE.EMAIL && (
              <form onSubmit={emailFormik.handleSubmit} noValidate>
                <div className="pb-8">
                  <TextField
                    id="email"
                    name="email"
                    fullWidth
                    type="text"
                    placeholder="email"
                    variant="outlined"
                    value={emailFormik.values.email}
                    onChange={emailFormik.handleChange}
                    onBlur={emailFormik.handleBlur}
                    error={(emailFormik.touched.email && emailFormik.errors.email) as boolean}
                    helperText={emailFormik.touched.email && emailFormik.errors.email ? "Email is invalid!" : ""}
                    required
                  />
                </div>
                {/* checkbox do terms & conditions */}
                {/* <Button type="submit" color="primary" onClick={() => navigate("/login")} variant="contained">
                  Back to login
                </Button> */}
                {/* <Button type="submit" color="secondary" variant="contained" fullWidth>
                  Continua com o e-mail
                </Button> */}
                <Button type="submit" color="primary" variant="contained" fullWidth>
                  Continua com o e-mail
                </Button>

                <Divider className="pt-10 pb-10" variant="middle">
                  Ou
                </Divider>

                <Box sx={{ display: "flex", flexDirection: "row", gap: 2, justifyContent: "space-between" }}>
                  <div style={{ borderWidth: "1px", borderColor: "#00A4EF" }} className="border-black rounded-md w-full flex justify-center">
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
            )}

            {viewMode === MODE.CODE && (
              <form onSubmit={codeFormik.handleSubmit}>
                {/* <div className="pb-8">
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
                  />
                </div> */}
                <div className="pb-8">
                  <VerificationInput
                    placeholder=""
                    onComplete={(value) => {
                      console.log("filled: " + value);
                      setCode(value);
                    }}
                  />
                </div>
                <Button type="submit" onClick={() => handleCodeSubmit(code)} color="primary" disabled={!code} variant="contained">
                  Verificar código
                </Button>
              </form>
            )}
          </div>
          <div className="mt-2 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Login here
              </Link>
            </p>
          </div>
          <div className="absolute bottom-14 left-0 right-0 flex flex-col items-center text-xs">
            <p>Ao inscreveres-te estás a aceitar os</p>
            <Link color="primary" href="http://www.google.pt" target="_blank">
              Termos de utilização e a Politica de privacidade
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Signup;
