import axios from "axios";

const getNewsData = async (source, regions, date) => {
  const apiKey = "3f86e4f486f744261a8cb01ff3c8731861234b63";
  const apiUrl =
    "https://api.taboola.com/2.0/json/oppo-browser-thailand/recommendations.get";

  const body = {
    placements: [
      {
        name: "Editorial Travel",
        recCount: "1",
        organicType: "MIX",
      },
      {
        name: "Editorial Trending",
        recCount: "1",
        organicType: "MIX",
      },
      {
        name: "Editorial News",
        recCount: "1",
        organicType: "MIX",
      },
      {
        name: "Editorial Sports",
        recCount: "1",
        organicType: "MIX",
      },
      {
        name: "Editorial Entertainment",
        recCount: "1",
        organicType: "MIX",
      },
      {
        name: "Editorial Lifestyle",
        recCount: "1",
        organicType: "MIX",
      },
      {
        name: "Editorial Tech",
        recCount: "1",
        organicType: "MIX",
      },
      {
        name: "Editorial Politics",
        recCount: "1",
        organicType: "MIX",
      },
      {
        name: "Editorial Business",
        recCount: "1",
        organicType: "MIX",
      },
      {
        name: "Editorial Health",
        recCount: "1",
        organicType: "MIX",
      },
      {
        name: "Editorial Autos",
        recCount: "1",
        organicType: "MIX",
      },
      {
        name: "Editorial Environment",
        recCount: "1",
        organicType: "MIX",
      },
      {
        name: "Editorial Food",
        recCount: "1",
        organicType: "MIX",
      },
    ],
    user: {
      session: "init",
      realip: "2.255.252.23",
      agent: "oppo - push",
      device: "2.255.252.23",
    },
    app: {
      type: "mobile",
      apiKey,
      origin: "SERVER",
      consent: {},
    },
    source: {
      type: "text",
      id: "oppo - push",
      url: "oppo - push",
    },
  };

  try {
    const response = await axios.post(apiUrl, body, {
      headers: {
        "Content - Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data from Taboola API:", error);
    throw error;
  }
};

export default getNewsData;
