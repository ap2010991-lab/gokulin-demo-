# Hotel Gokul Inn Website

Premium booking website for Hotel Gokul Inn & Banquet with room selection, guest/date/time inputs, live total calculation, and online payment checkout.

## Run Locally

```bash
npm install
npm start
```

Open `http://localhost:4173`.

## Enable Razorpay

Use your Razorpay dashboard keys:

```bash
RAZORPAY_KEY_ID=rzp_test_your_key_id \
RAZORPAY_KEY_SECRET=your_key_secret \
npm start
```

When both keys are present, the `Pay` button creates a server-side Razorpay order, opens checkout, and verifies the payment signature on `/api/verify-payment`.

Without keys, the site stays fully usable in demo mode so you can test booking UX safely.

## Deploy On Vercel

This project includes Vercel Functions in `api/` for online checkout and keeps `server.js` for local development.

For real payments, set these variables in the Vercel project environment settings and redeploy:

```bash
RAZORPAY_KEY_ID=rzp_live_your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

Until those keys are configured, deployed checkout remains in demo confirmation mode.

## Business Data

`data/hotel-profile.json` stores the extracted hotel profile facts. Replace it with your Apify Google Maps export whenever your Apify token/export is ready.

## Banquet Content

The Banquet page uses the hotel photographs and information supplied in the hotel presentation and event post PDFs. The downloadable menu at `assets/docs/gokul-inn-banquet-menu.pdf` contains the Silver, Gold, and Platinum banquet package information shown on the page.
