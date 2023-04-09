import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import InputMask from "react-input-mask";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../../../redux/reducers/userInfo";
import { validateInput } from "../../../utils/functions";

export const LoginForm = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const email = userInfo.email;
  const nameGoogle = userInfo.name;
  const lastNameGoogle = userInfo.lastName;
  const countryIP = userInfo.country;
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [cellphone, setCellphone] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = async (e) => {
    const uid = localStorage.getItem("uid");
    e.preventDefault();
    if (validateInput(username) != false && validateInput(address) != false) {
      try {
        const res = await axios.post("http://localhost:3001/api/users/", {
          username: username,
          email: email,
          uid: uid,
          name: nameGoogle,
          lastName: lastNameGoogle,
          address: address,
          cellphone: cellphone,
          country: countryIP,
        });
        dispatch(
          setUserInfo({
            email: "",
            fullName: "",
            country: "",
          })
        );
        alert("Successfully Logged In !")
        //toast.success("Successfully Logged In !");
        router.push("http://localhost:3000/home");
      } catch (error) {
        console.log(error);
        //toast.error("Error, please try again !");
      }
    } else {
      alert("Please check that there are no special characters")
      //toast.error("Please verified if there is not special caracters");
    }
  };

 

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          REGISTER FORM
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            defaultValue={email}
            disabled={true}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            type="name"
            id="name"
            autoComplete="current-name"
            defaultValue={nameGoogle}
            disabled={true}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="lastname"
            label="Lastname"
            type="lastname"
            id="lastname"
            autoComplete="current-lastname"
            defaultValue={lastNameGoogle}
            disabled={true}
          />
          <TextField
            margin="normal"
            required={true}
            fullWidth
            name="address"
            label="Address"
            type="address"
            id="address"
            autoComplete="current-address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <InputMask
            mask="+99-999-99999999"
            maskChar=""
            onChange={(e) => setCellphone(e.target.value)}
          >
            {() => (
              <TextField
                id="Cellphone"
                type="text"
                fullWidth
                inputProps={{ maxLength: 16 }}
                placeholder="+54-911-12345678"
                required={true}
              />
            )}
          </InputMask>
          <TextField
            margin="normal"
            required
            fullWidth
            id="country"
            label="Country"
            name="country"
            autoComplete="country"
            autoFocus
            defaultValue={countryIP}
            disabled={true}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={(e) => handleClick(e)}
          >
            Register to GAMBET
          </Button>
        </Box>
      </Box>
    </Container>
  );
};