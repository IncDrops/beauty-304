const functions = require("firebase-functions");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createStripeCheckout = functions.https.onRequest(async (req, res) => {
  try {
    const { name, email, amount } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: name || "Custom NYOP Offer",
            },
            unit_amount: Math.round(Number(amount) * 100),
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      success_url: "https://yourdomain.com/success",
      cancel_url: "https://yourdomain.com/cancel",
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).send("Stripe checkout failed.");
  }
});
