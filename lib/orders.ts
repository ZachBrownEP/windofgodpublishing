import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export interface OrderItem {
  id: string
  name: string
  description?: string
  quantity: number
  amount: number
  currency: string
}

export interface Order {
  id: string
  customer_email: string
  customer_name: string
  total_amount: number
  currency: string
  status: string
  created: number
  items: OrderItem[]
}

export async function getOrder(sessionId: string): Promise<Order | null> {
  try {
    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "line_items.data.price.product"],
    })

    if (!session) {
      return null
    }

    // Map line items to order items
    const items: OrderItem[] =
      session.line_items?.data.map((item) => ({
        id: item.id,
        name: (item.price?.product as Stripe.Product)?.name || "Unknown Product",
        description: (item.price?.product as Stripe.Product)?.description || undefined,
        quantity: item.quantity || 1,
        amount: item.amount_total || 0,
        currency: item.currency || "usd",
      })) || []

    return {
      id: session.id,
      customer_email: session.customer_details?.email || "",
      customer_name: session.customer_details?.name || "",
      total_amount: session.amount_total || 0,
      currency: session.currency || "usd",
      status: session.payment_status || "unknown",
      created: session.created,
      items,
    }
  } catch (error) {
    console.error("Error fetching order:", error)
    return null
  }
}
