const axios = require("axios");
const constants = require("../constants");
const { countryCodes, apiUrls, apiKey } = constants;

const getNewsData = async (regions, date) => {
  const body = {
    placements: [
      {
        name: "Editorial Trending 01",
        recCount: "1",
        organicType: "MIX",
      },
      {
        name: "Editorial Breaking News",
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
    let apiUrl;
    for (let region of regions) {
      if (countryCodes.includes(region)) {
        apiUrl = apiUrls[region];
        break;
      }
    }
    if (!apiUrl) {
      throw new Error("Invalid region code");
    }
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

module.exports = getNewsData;
