import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";

import Map from "./components/Map/Map";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";
import { Grid } from "@material-ui/core";
import CssBaseLine from "@mui/material/CssBaseline";
import List from "./components/List/List";
import { getPlacesData } from "./api";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [pricing, setPricing] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  useEffect(() => {
    const filteredPlaces = places?.filter((place) => {
      const ratingFilter = place.rating > rating;
      const pricingFilter = place.price_level?.includes(pricing);

      return ratingFilter && pricingFilter;
    });
    setFilteredPlaces(filteredPlaces);
    console.log("rating changed");
  }, [rating, pricing, places]);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);

      // console.log(coordinates, bounds.ne.lat, bounds.sw.lat);
      // console.log(coordinates, bounds.sw, bounds.ne);

      getPlacesData(type, bounds?.sw, bounds?.ne).then((data) => {
        console.log("data", data);
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        // setFilteredPlaces([]);
        setIsLoading(false);
      });
    }
  }, [bounds, type]);

  return (
    <div style={{ background: "rgb(225 246 255)" }}>
      <CssBaseLine />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces?.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            pricing={pricing}
            setPricing={setPricing}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces?.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
