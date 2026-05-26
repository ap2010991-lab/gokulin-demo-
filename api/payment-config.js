export default function handler(_request, response) {
  const keyId = process.env.RAZORPAY_KEY_ID || "";
  const keySecret = process.env.RAZORPAY_KEY_SECRET || "";

  response.status(200).json({
    keyId,
    liveMode: Boolean(keyId && keySecret)
  });
}
