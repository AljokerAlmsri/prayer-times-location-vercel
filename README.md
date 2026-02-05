# Prayer Times API (Vercel)

This project exposes a simple API that returns accurate prayer times based on latitude and longitude. It is designed to run on Vercel as a serverless function.

## API

`GET /api/prayer-times?lat=<latitude>&lon=<longitude>&method=<method>`

- `lat` (required): Latitude as a number.
- `lon` (required): Longitude as a number.
- `method` (optional): Calculation method (default: 2). See Aladhan API docs for options.

### Example

```
GET /api/prayer-times?lat=24.7136&lon=46.6753
```

### Response

Returns the upstream response from Aladhan along with the request metadata.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import it in Vercel.
3. Deploy. The API will be available at `/api/prayer-times`.
