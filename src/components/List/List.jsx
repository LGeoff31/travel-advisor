import React, { useState, useEffect, createRef } from "react";

import {
  CircularProgress,
  Grid,
  Typography,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import useStyles from "./styles";

const List = ({
  places,
  childClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
  pricing,
  setPricing,
}) => {
  const classes = useStyles();
  const [copied, setCopied] = useState(false);
  // const [searchParams, setSearchParams] = useSearchParams();

  // useEffect(() => {
  //   const eid = searchParams.get("elementId")
  //   setEdi(eid);
  // }, [])

  const [elRefs, setElRefs] = useState([]); //element references
  console.log({ childClicked });
  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, idx) => elRefs[idx] || createRef());
    setElRefs(refs);
  }, [places]);
  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotels & Attractions around you
      </Typography>
      <Grid container direction="row" alignItems="center"></Grid>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <Grid container direction="row">
            <FormControl className={classes.formControl}>
              <InputLabel>Type</InputLabel>
              <Select value={type} onChange={(e) => setType(e.target.value)}>
                <MenuItem value="restaurants">Restaurants</MenuItem>
                <MenuItem value="hotels">Hotels</MenuItem>
                <MenuItem value="attractions">Attractions</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Rating</InputLabel>
              <Select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={3}>Above 3.0</MenuItem>
                <MenuItem value={4}>Above 4.0</MenuItem>
                <MenuItem value={4.5}>Above 4.5</MenuItem>
              </Select>
            </FormControl>
            {type === "restaurants" && (
              <FormControl className={classes.formControl}>
                <InputLabel>Pricing</InputLabel>
                <Select
                  value={pricing}
                  onChange={(e) => setPricing(e.target.value)}
                >
                  <MenuItem value={"all"}>All</MenuItem>
                  <MenuItem value={"$"}>$</MenuItem>
                  <MenuItem value={"$$"}>$$</MenuItem>
                  <MenuItem value={"$$$"}>$$$</MenuItem>
                  <MenuItem value={"$$$$"}>$$$$</MenuItem>
                </Select>
              </FormControl>
            )}
          </Grid>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, idx) => (
              <Grid ref={elRefs[idx]} item key={idx} xs={12}>
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked) === idx}
                  refProp={elRefs[idx]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};
export default List;
