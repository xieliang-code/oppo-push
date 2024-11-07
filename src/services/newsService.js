const axios = require("axios");
const constants = require("../config");
const { countryCodes, apiUrls } = constants;
const {
  errorLogger,
  emptyListLogger,
  fallbackLogger,
} = require("../utils/logger");

const getNewsData = async (regions, date) => {
  const body = {
    placements: [
      {
        name: "Editorial Trending 01",
        recCount: "1",
        organicType: "MIX",
        thumbnail: {
          width: 296,
          height: 114,
        },
      },
      {
        name: "Editorial Breaking News",
        recCount: "1",
        organicType: "MIX",
        thumbnail: {
          width: 296,
          height: 114,
        },
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

  const responses = await Promise.all(
    regions
      .flatMap((region) => {
        if (region === "IN") {
          return [
            { region, apiUrl: apiUrls.IN, language: "en" },
            { region, apiUrl: apiUrls.HI, language: "hi" },
          ];
        }

        let apiUrl = apiUrls[region];
        if (!countryCodes.some((country) => country.code === region)) {
          apiUrl = apiUrls.FALLBACK;
          fallbackLogger.warn(`Region: ${region} is using fallback API URL.`);
        }

        return [{ region, apiUrl, language: "en" }];
      })
      .map(async ({ region, apiUrl, language }) => {
        try {
          const response = await axios.post(apiUrl, body, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          return { response, region, language };
        } catch (error) {
          errorLogger.error(
            `Error fetching data from API for region: ${region}. Date: ${date}`,
            error
          );
          return null;
        }
      })
  );

  let formattedData = [];
  for (const item of responses) {
    if (item && item.response && item.response.data) {
      let nonEmptyListPlacement = null;
      for (let placement of item.response.data.placements) {
        if (placement.list && placement.list.length > 0) {
          nonEmptyListPlacement = placement;
          break;
        } else {
          emptyListLogger.warn(
            `In region: ${item.region}, placement: ${placement.name} has an empty list.`
          );
        }
      }

      if (nonEmptyListPlacement) {
        const dataForRegion = nonEmptyListPlacement.list.map((itemInner) => ({
          region: item.region,
          language: item.language,
          source: "Taboola",
          pushTitle: itemInner.name,
          pushSubTitle: itemInner.description,
          pushBannerUrl: itemInner.thumbnail[0].url,
          newsId: itemInner.id,
          newsTag: itemInner.categories[0],
          newsTitle: itemInner.name,
          newsUrl: itemInner.url,
          newsPublishTime: itemInner.created,
          newsContentType: 1,
          newsType:
            nonEmptyListPlacement.name === "Editorial Trending 01"
              ? 0
              : nonEmptyListPlacement.name === "Editorial Breaking News"
              ? 1
              : null,
        }));
        formattedData = formattedData.concat(dataForRegion);
      }
    }
  }

  return formattedData.length > 0
    ? formattedData
    : {
        code: "500",
        msg: "Internal server error. No valid news data retrieved.",
        data: [],
      };
};

module.exports = getNewsData;
