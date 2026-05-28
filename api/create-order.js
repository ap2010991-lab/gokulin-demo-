import Razorpay from "razorpay";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed." });
    return;
  }

  const amount = Number(request.body?.paymentAmount || request.body?.amount);
  const bookingId = String(request.body?.bookingId || `GIN-${Date.now()}`);
  const keyId = process.env.RAZORPAY_KEY_ID || "";
  const keySecret = process.env.RAZORPAY_KEY_SECRET || "";

  if (!Number.isFinite(amount) || amount < 100) {
    response.status(400).json({ error: "Invalid payment amount." });
    return;
  }

  if (!keyId || !keySecret) {
    response.status(200).json({
      demo: true,
      order: {
        id: `order_demo_${bookingId}`,
        amount: Math.round(amount * 100),
        currency: "INR",
        receipt: bookingId
      }
    });
    return;
  }

  try {
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: bookingId,
      notes: {
        hotel: "Hotel Gokul Inn",
        bookingId
      }
    });

    response.status(200).json({ demo: false, order });
  } catch {
    response.status(500).json({ error: "Unable to create Razorpay order." });
  }
}
