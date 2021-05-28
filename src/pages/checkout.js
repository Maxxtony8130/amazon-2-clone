import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { groupBy } from "lodash";
import { useSession } from "next-auth/client";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
const stripePromise = loadStripe(process.env.stripe_public_key); // Variable d'environnement définie par le fichier next.config.js, pour le front

function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const [session] = useSession();
  async function createCheckoutSession() {
    const stripe = await stripePromise;
    // Call the backend to create a checkout session...
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items,
      email: session.user.email,
    });
    // After have created a session, redirect the user/customer to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message); // @todo : Improve that!
    }
  }
  const groupedItems = Object.values(groupBy(items, "id"));
  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="flex flex-col p-5 m-4 space-y-50 bg-white">
            <div className="flex items-center">
              <img
                className="w-20"
                src="https://jonmgomes.com/wp-content/uploads/2020/03/Shopping-Cart-with-Gear-Icon.gif"
                alt=""
              />
              <h1
                className={`text-xl flex-grow ${
                  items.length > 0 ? "border-b pb-4" : "pb-2"
                }`}
              >
                {items.length === 0
                  ? "Your Amazon Basket is empty."
                  : `Your Shopping Basket has  ${items.length} items`}
              </h1>
            </div>
            <TransitionGroup>
              {groupedItems.map((group, i) => (
                <CSSTransition
                  key={group[0].image}
                  timeout={500}
                  classNames="item"
                >
                  <CheckoutProduct
                    id={group[0].id}
                    title={group[0].title}
                    rating={group[0].rating}
                    price={group[0].price}
                    description={group[0].description}
                    category={group[0].category}
                    image={group[0].image}
                    hasPrime={group[0].hasPrime}
                    quantity={group.length}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        </div>

        {/* Right */}
        <CSSTransition
          in={items.length > 0}
          timeout={300}
          classNames="disappear"
          unmountOnExit
        >
          <div className="flex flex-col  bg-white p-8 m-5 shadow-md">
            <h2 className="whitespace-nowrap">
              Subtotal ({items.length} items):{" "}
              <span className="font-bold">
                <Currency quantity={total * 72.68} currency="INR" />
              </span>
            </h2>

            <button
              role="link"
              onClick={createCheckoutSession}
              disabled={!session}
              className={`button mt-2 ${
                !session &&
                "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed hover:from-gray-300"
              }`}
            >
              {!session ? "Sign in to checkout" : "Proceed to checkout"}
            </button>
          </div>
        </CSSTransition>
      </main>
    </div>
  );
}

export default Checkout;
