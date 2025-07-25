import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-04-10" as any,
  });  

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Customize this depending on your item type
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: body.itemName || "Custom Offer",
              description: body.description || "User-submitted NYOP bid",
            },
            unit_amount: Math.round((body.offerAmount || 10) * 100), // e.g. 10.99 -> 1099 cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.nextUrl.origin}/checkout/success`,
      cancel_url: `${req.nextUrl.origin}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe Checkout error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
