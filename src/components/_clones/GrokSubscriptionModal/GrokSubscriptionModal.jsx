import "./GrokSubscriptionModal.css";
import ModalTemplate from "../../ModalTemplate/ModalTemplate";
import { useState, useEffect, useRef } from "react";

export default function GrokSubscriptionModal() {
  const [subscriptions, setSubscriptions] = useState([
    {
      plan: "Monthly",
      price: 30.00,
      planDescription: "Get started for $30.00/mo",
    },
    {
      plan: "Yearly",
      price: 300.00,
      planDescription: "Get started for $300.00/yr",
    },
  ]);
  const [selectedSubscription, setSelectedSubscription] = useState(0);
  const subscriptionPlanDescriptionRef = useRef(null);
  const selectionOverlayRef = useRef(null);
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (subscriptionPlanDescriptionRef.current && selectionOverlayRef.current && !isInitialRender.current) {
      const p = subscriptionPlanDescriptionRef.current;
      p.animate(
        [
          { opacity: 0, transform: "translateY(11px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 300,
          iterations: 1,
          easing: "ease-in",
        }
      );
      
      const overlay = selectionOverlayRef.current;
      overlay.style.transition = "transform 300ms ease-in-out";
      overlay.style.transform = selectedSubscription === 0 ? "translateX(0)" : "translateX(100%)";
    }
  }, [selectedSubscription]);

  useEffect(() => {
    // if (isInitialRender.current && selectionOverlayRef.current) {
    //   const overlay = selectionOverlayRef.current;
    //   overlay.style.transform = selectedSubscription === 0 ? "translateX(0)" : "translateX(100%)";
    // }
    isInitialRender.current = false;
  }, []);
  
  return (
    <ModalTemplate >
      <div className="grok-subscription-modal">
        <div className="grok-subscription-modal__image__container">
          <img 
            className="grok-subscription-modal__image"
            alt="upgrad-plan-hole"
            loading="lazy"
            decoding="async" 
            src="https://grok.com//_next/image?url=%2Fupgrade-plan-hole.png&amp;w=3840&amp;q=75"
          />
        </div>
        <div className="grok-subscription-modal__content">
          <header className="grok-subscription-modal__content__header">
            <h1>SuperGrok</h1>
            <p>Explore the entire universe</p>
          </header>
          <div className="grok-subscription-modal__content__body">
            <p>What you get with SuperGrok:</p>
            <ul>
              <li>Increased Grok 3 rate limits</li>
              <li>Access to Grok 3 Thinking</li>
              <li>Access to Grok 3 DeepSearch</li>
              <li>Unlimited Image Generation</li>
            </ul>
          </div>
          <footer className="grok-subscription-modal__content__footer">
            <div className="grok-subscription-modal__content__footer__select-plan">
              <div>
                {subscriptions.map((subscription, index) => (
                  <button
                    key={subscription.plan}
                    onClick={() => setSelectedSubscription(index)}
                  >
                    {subscription.plan}
                  </button>
                ))}
                <div
                  className="grok-subscription-modal__content__footer__select-plan__selected"
                  ref={selectionOverlayRef}
                >
                  <div></div>
                </div>
              </div>
              <p ref={subscriptionPlanDescriptionRef}>{subscriptions[selectedSubscription].planDescription}</p>
            </div>
            <button className="grok-subscription-modal__content__footer__signup-button">
              Sign up for SuperGrok
            </button>
          </footer>
        </div>
      </div>
    </ModalTemplate>
  );
}