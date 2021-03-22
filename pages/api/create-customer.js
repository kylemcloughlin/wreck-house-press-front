import Stripe from "stripe";
const stripe = new Stripe("sk_test_51IUb2THPabCG8MNSyPy9fyXnVGlZpTI2KzNcv4RYCR4BkRTeO7feInzzMAEaooFPk3bMmr7Uq4n3d6J4Ets0W03f00sYWaxYd3");

export default async (req, res) => {
  if (req.method === "POST") {
    const {
      paymentMethodId
    } = JSON.parse(req.body);
    try {
      const customer = await stripe.customers.create({
        payment_method: paymentMethodId,
        phone: "555-555-5555",
        email: "janedoe@example.com",
        invoice_settings: {
          default_payment_method: paymentMethodId
        }
      });
      console.log(
        `create-customer:: Successfully created customer: ${JSON.stringify(
          customer
        )}`
      );
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{
          plan: "your_plan_id_here"
        }],
        expand: ["latest_invoice.payment_intent"]
      });

      console.log(
        `create-customer:: Successfully created subscription: ${JSON.stringify(
          subscription
        )}`
      );
      res.status(200).json(subscription);
    } catch (e) {
      console.log(`create-customer:: Error: ${e.message}`);
      res.status(500).json({
        statusCode: 500,
        message: e.message
      });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};