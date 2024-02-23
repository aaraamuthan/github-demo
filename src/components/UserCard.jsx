import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import TwitterIcon from "@mui/icons-material/Twitter";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { API_PREFIX, TWITTER_URL } from "../config/constants";

export const UserCard = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { username } = useParams();

  useEffect(() => {
    fetch(`${API_PREFIX}users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setIsLoading(false);
      })
      .catch((err) => console.error("err", err));
  }, []);

  return (
    <Stack
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={"100vh"}
    >
      <Link component={RouterLink} to={"/"}>
        Go Back
      </Link>
      {isLoading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : (
        <Box width="800px" maxWidth="calc(100% - 40px)">
          {userData && (
            <Grid
              container
              sx={{ width: "100%", borderRadius: 2, mt: 3, bgcolor: "#fcfcfc" }}
            >
              <Grid item xs={12} sm={5}>
                <Stack
                  p={2}
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Avatar alt={userData.name} src={userData.avatar_url} />
                  <Typography variant="h5">{userData.name}</Typography>

                  {userData.company && (
                    <Typography
                      variant="body1"
                      display="flex"
                      gap={1}
                      sx={{ textAlign: "center" }}
                    >
                      <BusinessIcon fontSize="small" />
                      {userData.company
                        ?.split(",")
                        .map((it) => it.trim().slice(1))
                        .join(", ")}
                    </Typography>
                  )}

                  {userData.location && (
                    <Typography variant="body1" display="flex" gap={1}>
                      <LocationOnIcon fontSize="small" />
                      {userData.location}
                    </Typography>
                  )}

                  {userData.email && (
                    <Typography variant="body1" display="flex" gap={1}>
                      {userData.email}
                    </Typography>
                  )}

                  {userData.twitter_username && (
                    <Typography variant="body2" display="flex" gap={1}>
                      <TwitterIcon fontSize="small" />
                      <Link
                        href={`${TWITTER_URL}${userData.twitter_username}`}
                        underline="hover"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {userData.twitter_username}
                      </Link>
                    </Typography>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sm={1}>
                <Divider orientation="vertical" />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                  spacing={1}
                  height="100%"
                  px={2}
                >
                  <Typography variant="body1" sx={{ textAlign: "center" }}>
                    {userData.followers} <br /> Followers
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: "center" }}>
                    {userData.following} <br /> Following
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: "center" }}>
                    {userData.public_repos} <br /> Repositories
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          )}
        </Box>
      )}
    </Stack>
  );
};
