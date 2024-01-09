import axios from "axios"; //help make api cals

export const getPlacesData = async (type, sw, ne) => {
  try {
    //request
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        url: URL,
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          // "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_TRAVEL_KEY,
          "X-RapidAPI-Key":
            "11355dc5camsh2c8678b7b5fa435p1faeb5jsn8c35a7b8f1aa",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
