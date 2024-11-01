const axios = require("axios");
const constants = require("../config");
const { countryCodes, apiUrls } = constants;

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
      agent: "oppo-push",
      device: "2.255.252.23",
    },
    app: {
      type: "mobile",
      apiKey: "3f86e4f486f744261a8cb01ff3c8731861234b63",
      origin: "SERVER",
      consent: {},
    },
    source: {
      type: "text",
      id: "oppo-push",
      url: "oppo-push",
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
      apiUrl = apiUrls.FALLBACK;
    }
    const response = await axios.post(apiUrl, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response data:", response.data);
    let nonEmptyListPlacement = null;
    for (let placement of response.data.placements) {
      if (placement.list && placement.list.length > 0) {
        nonEmptyListPlacement = placement;
        break;
      }
    }

    if (nonEmptyListPlacement) {
      const formattedData = nonEmptyListPlacement.list.map((item) => ({
        region: item.somePropertyForRegion,
        language: item.somePropertyForLanguage,
        source: "Taboola",
        pushTitle: item.name,
        pushSubTitle: item.description,
        pushBannerUrl: item.thumbnail[0].url,
        newsId: item.id,
        newsTag: item.categories[0],
        newsTitle: item.name,
        newsUrl: item.url,
        newsPublishTime: item.created,
        newsContentType: 1,
        newsType:
          nonEmptyListPlacement.name === "Editorial Trending 01"
            ? 0
            : nonEmptyListPlacement.name === "Editorial Breaking News"
            ? 1
            : null,
      }));

      return formattedData;
    } else {
      if (!response.data || !response.data.placements) {
        return {
          code: "500",
          msg: "Internal server error. The API response is missing 'data' or 'placements' properties.",
          data: [],
        };
      } else if (!response.data.placements[0].list) {
        return {
          code: "400",
          msg: "Bad request. The 'list' property in the API response is empty or not properly populated.",
          data: [],
        };
      }
    }
  } catch (error) {
    console.error("Error fetching data from Taboola API:", error);
    throw error;
  }
};

module.exports = getNewsData;
