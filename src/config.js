module.exports = {
  countryCodes: [
    { code: "IN", isoCode: "en" },
    { code: "HI", isoCode: "hi" },
    { code: "ID", isoCode: "id" },
    { code: "MY", isoCode: "ms" },
    { code: "PH", isoCode: "en" },
    { code: "TH", isoCode: "th" },
  ],
  apiUrls: {
    IN: "https://api.taboola.com/2.0/json/oppo-browser-india-en-push/recommendations.get",
    HI: "https://api.taboola.com/2.0/json/oppo-browser-india-hindi-push/recommendations.get",
    ID: "https://api.taboola.com/2.0/json/oppo-browser-indonesia-push/recommendations.get",
    MY: "https://api.taboola.com/2.0/json/oppo-browser-malaysia-push/recommendations.get",
    PH: "https://api.taboola.com/2.0/json/oppo-browser-philippine-push/recommendations.get",
    TH: "https://api.taboola.com/2.0/json/oppo-browser-thailand-push/recommendations.get",
    FALLBACK:
      "https://api.taboola.com/2.0/json/oppo-browser-fallback-push/recommendations.get",
  },
  apiSecret: "bbdedea82872c8c2f24ca23a64a159dc",
  apiKey: "8f5JoVbbi50CkcgC0gG88Wo0S",
};
