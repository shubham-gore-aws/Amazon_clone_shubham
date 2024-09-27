import { info } from "autoprefixer";
import React from "react";

const Yourproduct = () => {
  const accountItems = [
    { title: "Your Orders", description: "Track, return, or buy things again", icon: "📦" },
    { title: "Login & security", description: "Edit login, name, and mobile number", icon: "🔒" },
    { title: "Prime", description: "View benefits and payment settings", icon: "📦" },
    { title: "Your Addresses", description: "Edit addresses for orders and gifts", icon: "📍" },
    { title: "Your business account", description: "Sign up to save up to 28% with GST invoice", icon: "💼" },
    { title: "Payment options", description: "Edit or add payment methods", icon: "💳" },
    { title: "Amazon Pay balance", description: "Add money to your balance", icon: "💰" },
    { title: "Contact Us", description: "Contact customer service via phone or chat", icon: "☎️" },
  ];
  let Info =[
    {
        title: "Digital content and devices",
        items: ["Apps and more", "Content Library", "Devices", "Digital gifts you've received"],
      },
      {
        title: "Email alerts, messages, and ads",
        items: [
          "Advertising preferences",
          "Communication preferences",
          "SMS alert preferences",
          "Message Centre",
          "Alexa shopping notifications",
        ],
      },
      {
        title: "More ways to pay",
        items: ["Default Purchase Settings", "Amazon Pay", "Coupons"],
      },
      {
        title: "Ordering and shopping preferences",
        items: [
          "Leave packaging feedback",
          "Lists",
          "Manage saved IDs",
          "Profile",
          "Language settings",
          "Recalls and Product Safety Alerts",
        ],
      },
      {
        title: "Other accounts",
        items: ["Account Linking", "Seller account", "Amazon Web Services"],
      },
      {
        title: "Shopping programs and rentals",
        items: ["Manage Your Amazon Family", "Subscribe & Save", "Shop the Kids' Store by age"],
      },
      {
        title: "Subscriptions",
        items: ["Email", "Memberships & Subscriptions"],
      },
      {
        title: "Manage your data",
        items: [
          "Request your data",
          "Manage apps and services with data access",
          "Close Your Amazon Account",
          "Privacy Notice",
        ],
      },

  ]
  return (

    <div className="p-8 flex flex-col items-center  ">
      < >
      <div className="w-[60%]">
      <h1 className="text-2xl font-semibold mb-8">Your Account</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {accountItems.map((item, index) => (
          <div
            key={index}
            className=" w-60border rounded-lg p-6 flex items-start gap-4 shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl">{item.icon}</div>
            <div>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      </div>

      </>
      <br />
      <hr />
      <br />
      <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {Info.map((section, index) => (
          <div
            key={index}
            className="border rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow"
          >
            <h2 className="text-lg font-semibold mb-4">{section.title}</h2>
            <ul className="text-gray-700">
              {section.items.map((item, i) => (
                <li key={i} className="mb-1 hover:text-blue-500 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      </>
    </div>
  );
};

export default Yourproduct;
