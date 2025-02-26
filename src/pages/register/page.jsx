import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "../../components/textInput";
import { registerUser } from "../../server";
import { Snackbar } from "../../components/snackBar";
import './styles.css'

export const Register = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const [errorSnackBarVisible, setErrorSnackBarVisible] = useState(false)

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    password: Yup.string().required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirm_password: "",
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log("Submitted Data:", values);
      handleRegister(values);
    },
  });

  useEffect(() => {
    setIsFormValid(formik.isValid);
  }, [formik.isValid]);

  const handleRegister = async (values) => {
    try {
      const result = await registerUser(values);
      console.log("Registration:", result);
      if (result.status !== 200) {
        setErrorMessage(result.message)
        setErrorSnackBarVisible(true)
      }

      formik.resetForm();
    } catch (error) {
      console.error("Registration Failed:", error);
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
            {"Lengkapi data untuk"}
            <br />
            {"membuat akun"}
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
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="nama depan"
            />
            <TextInput
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="nama belakang"
            />
            <TextInput
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="buat password"
            />
            <TextInput
              type="password"
              name="confirm_password"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="konfirmasi password"
            />

            <button
              type="submit"
              disabled={!isFormValid}
              className={`submit-button ${!isFormValid ? 'disabled' : ''}`}
            >
              {"Registrasi"}
            </button>
          </div>

          <h5 className="login-link">{"Sudah punya akun? Login "}<span onClick={() => { }} style={{ color: 'red' }}>{'disini'}</span></h5>

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