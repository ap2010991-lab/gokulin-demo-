import crypto from "node:crypto";

export default function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).json({ verified: false, error: "Method not allowed." });
    return;
  }

  const keyId = process.env.RAZORPAY_KEY_ID || "";
  const keySecret = process.env.RAZORPAY_KEY_SECRET || "";
  const {
    razorpay_order_id: orderId,
    razorpay_payment_id: paymentId,
    razorpay_signature: signature,
    bookingId
  } = request.body || {};

  if (!keyId || !keySecret) {
    response.status(200).json({
      verified: true,
      demo: true,
      bookingId,
      paymentId: paymentId || `pay_demo_${Date.now()}`
    });
    return;
  }

  if (!orderId || !paymentId || !signature) {
    response.status(400).json({ verified: false, error: "Missing payment verification fields." });
    return;
  }

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  if (expectedSignature !== signature) {
    response.status(400).json({ verified: false, error: "Payment verification failed." });
    return;
  }

  response.status(200).json({ verified: true, demo: false, bookingId, paymentId });
}
