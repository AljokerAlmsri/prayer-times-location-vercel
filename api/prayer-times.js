const DEFAULT_METHOD = 2;
const ALADHAN_URL = "https://api.aladhan.com/v1/timings";

function parseNumber(value) {
  if (value === undefined) return null;
  const number = Number.parseFloat(value);
  return Number.isFinite(number) ? number : null;
}

module.exports = async (req, res) => {
  const latitude = parseNumber(req.query.lat);
  const longitude = parseNumber(req.query.lon);
  const method = parseNumber(req.query.method) ?? DEFAULT_METHOD;

  if (latitude === null || longitude === null) {
    res.status(400).json({
      error: "Missing or invalid latitude/longitude. Use ?lat=<number>&lon=<number>.",
    });
    return;
  }

  const url = new URL(ALADHAN_URL);
  url.searchParams.set("latitude", latitude.toString());
  url.searchParams.set("longitude", longitude.toString());
  url.searchParams.set("method", method.toString());

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      res.status(response.status).json({
        error: "Upstream prayer times API error.",
      });
      return;
    }

    const data = await response.json();

    res.status(200).json({
      source: "aladhan.com",
      request: {
        latitude,
        longitude,
        method,
      },
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch prayer times.",
    });
  }
};
