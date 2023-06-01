import { useState } from "react";           
import {        
  Box,      
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";    // Formik is a library that helps with forms
import * as yup from "yup";// yup is a library that helps with form validation
import { useNavigate } from "react-router-dom";// useNavigate is a library that helps with navigation
import { useDispatch } from "react-redux";// useDispatch is a library that helps with redux
import { setLogin } from "state";/* setLogin is a function that helps with redux */
import Dropzone from "react-dropzone";/* Dropzone is a library that helps with file uploads */
import FlexBetween from "component/flexBetween";/* FlexBetween is a component that helps with flexbox */

// yup is a library that helps with form validation
const registerSchema = yup.object().shape({// yup.object() is a function that helps with form validation
  firstName: yup.string().required("required"),// yup.string() is a function that helps with form validation
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

// yup is a library that helps with form validation
const loginSchema = yup.object().shape({// yup.object() is a function that helps with form validation
  email: yup.string().email("invalid email").required("required"),// yup.string() is a function that helps with form validation
  password: yup.string().required("required"),
});

// initialValues is a variable that helps with form validation
const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

// initialValues is a variable that helps with form validation
const initialValuesLogin = {
  email: "",
  password: "",
};

// Form is a component that helps with forms
const Form = () => {
  const [pageType, setPageType] = useState("login");// useState is a function that helps with forms
  const { palette } = useTheme();// useTheme is a function that helps with forms
  const dispatch = useDispatch();// useDispatch is a function that helps with redux
  const navigate = useNavigate();// useNavigate is a function that helps with navigation
  const isNonMobile = useMediaQuery("(min-width:600px)");// useMediaQuery is a function that helps with forms
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  // register is a variable that helps with forms
  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();

    for (let value in values) { 
      formData.append(value, values[value]); 
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  const [selectedImage, setSelectedImage] = useState(null);
  
  return (
    <Formik
      onSubmit={handleFormSubmit} 
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                gridColumn="span 4"
                border={`1px solid ${palette.neutral.medium}`}
                borderRadius="5px"
                p="1rem"
                >
                <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                    setSelectedImage(acceptedFiles[0]);
                    setFieldValue("picture", acceptedFiles[0]);
                    }}
                >
                    {({ getRootProps, getInputProps }) => (
                    <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                        <input {...getInputProps()} />
                        {!selectedImage ? (
                        <p>Add Picture Here</p>
                        ) : (
                        <FlexBetween>
                            <Typography>{selectedImage.name}</Typography>
                            <img src={URL.createObjectURL(selectedImage)} alt="Uploaded" style={{ maxWidth: "100%" }} />
                        </FlexBetween>
                        )}
                    </Box>
                    )}
                </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;