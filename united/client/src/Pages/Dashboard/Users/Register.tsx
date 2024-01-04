import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Container, Grid, Paper } from "@mui/material";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Register = () => {
  const toastId = "registertoast";
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    givenName: Yup.string().required("Full Name is required").min(10),
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string().required("Username is required").min(7),
    password: Yup.string().required("Password is required").min(8),
  });

  const formik = useFormik({
    initialValues: {
      givenName: "",
      email: "",
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      toast.loading("Please wait", { id: toastId });
      // Perform your registration logic here
      axios
        .post("http://localhost:2000/api/user/register", values)
        .then((response) => {
          toast.success("Registered Successfully", { id: toastId });
          navigate("/login");
        })
        .catch((error) => {
          toast.error("Registration failed", { id: toastId });
        });
    },
  });

  return (
    <Container className="mt-32 mb-8 w-[20px]" maxWidth="xs" sx={{}}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Registration
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="givenName"
                label="Full Name"
                value={formik.values.givenName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.givenName && Boolean(formik.errors.givenName)}
                helperText={formik.touched.givenName && formik.errors.givenName}
                type="text"
                placeholder="Enter your Namemohamed nuur salmaan"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                type="email"
                placeholder="mohamed@gmail.com"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
                type="text"
                placeholder="mohamed0089"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                type="password"
                placeholder="********"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                // color="info"
                style={{background:'blue'}}
                fullWidth
                
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Loading..." : "Register"}
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link className="bg-blue-500 text-white p-2 hover:bg-blue-600 rounded-md" to="/login" sx={{ color: "primary.main", textDecoration: "underline" }}>
            Log in
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;