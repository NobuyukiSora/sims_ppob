import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "../../components/textInput";
import { loginUser, UserProfile } from "../../server/dispatchApi";
import { Snackbar } from "../../components/snackBar";
import './styles.css'
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const [errorSnackBarVisible, setErrorSnackBarVisible] = useState(false)

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log("Submitted Data:", values);
      handleLogin(values);
    },
  });

  useEffect(() => {
    setIsFormValid(formik.isValid);
  }, [formik.isValid]);

  const handleLogin = async (values) => {
    try {
      const result = await dispatch(loginUser(values)).unwrap();

      if (result.status !== 0) {
        setErrorMessage(result.message);
        setErrorSnackBarVisible(true);
      } else {
        console.log("Login Successful:", result);
        dispatch(UserProfile(values))
        navigate("/Dashboard")
      }

    } catch (error) {
      console.error("Login Failed:", error);
      setErrorMessage(error?.message || "Something went wrong");
      setErrorSnackBarVisible(true);
    }
  };

  return (
    <div className="registration-container">
      <div className="form-wrapper">
        <form onSubmit={formik.handleSubmit} className="registration-form">
          <div className="logo-title">
            <img src={"/assets/Logo.png"} alt="logo" className="logo" />
            <h2>{"SIMS PPOB"}</h2>
          </div>

          <h2 className="form-title">
            {"Masuk atau buat akun"}
            <br />
            {"untuk memulai"}
          </h2>

          <div className="input-container">
            <TextInput
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="masukkan email anda"
            />
            <TextInput
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="masukkan password anda"
            />
            <button
              type="submit"
              disabled={!isFormValid}
              className={`submit-button ${!isFormValid ? 'disabled' : ''}`}
            >
              {"Masuk"}
            </button>
          </div>

          <h5 className="login-link">{"Belum punya akun? Registrasi "}<Link to={"/"} className="no-underline"><span className="text-red-500">{'disini'}</span></Link></h5>

        </form>

        <div className="snackbar-container">
          <Snackbar
            message={errorMessage}
            visible={errorSnackBarVisible}
            type={"error"}
            onDismiss={() => setErrorSnackBarVisible(false)}
          />
        </div>
      </div>

      <div className="image-container">
        <img src="/assets/Illustrasi_Login.png" alt="img" className="registration-image" />
      </div>
    </div>
  );
};