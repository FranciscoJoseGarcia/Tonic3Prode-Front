import React, { useEffect, useState } from "react";
import axios from "axios";
import TournamentCard from "@/commons/TournamentCard";
import { Box, Grid } from "@mui/material";
import Link from "next/link";

const home = ({ width }) => {
  const [tournaments, setTournaments] = useState([]);
  const [uid, setUid] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    async function searchTournaments() {
      const uid = localStorage.getItem("uid");
      const response = await axios.get(
        `http://localhost:3001/api/tournaments/all/${uid}`
      );
      return response.data;
    }
    searchTournaments().then((data) => setTournaments(data));
    setUid(localStorage.getItem("uid"));
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/users/search/${uid}`
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [uid]);

  const isMobile = width === "xs" || width === "sm";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px",
      }}
    >
      <Box sx={{ maxWidth: "1000px", width: "100%" }}>
        <Grid
          container
          spacing={2}
          sx={{ display: isMobile ? "column" : "row" }}
        >
          {tournaments.map((tournament) => {
            return (
              <Grid item key={tournament._id} xs={12} sm={6} md={4}>
                <TournamentCard tournament={tournament} userId={user._id} userUid={uid}/>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default home;
