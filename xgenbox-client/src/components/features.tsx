import React from "react";
import { FaTruck } from "react-icons/fa6";
import { IoPricetagOutline } from "react-icons/io5";
import { MdCo2, MdDynamicFeed } from "react-icons/md";

const features = [
  {
    title: "Cost Reduction",
    description: "Maximizing Savings, Minimizing Expenses.",
    icon: <IoPricetagOutline className="h-12 w-auto " />,
  },
  {
    title: "Dynamic Routing",
    description: "Streamlining Paths: The Power of Adaptive Navigation.",
    icon: <MdDynamicFeed className="h-12 w-auto " />,
  },
  {
    title: "CO2 Reduction",
    description: "Towards a Greener Future: Cutting Carbon Emissions.",
    icon: <MdCo2 className="h-12 w-auto " />,
  },
  {
    title: "Improved Cleanlines",
    description: "Enhancing Hygiene and Neatness.",
    icon: <FaTruck className="h-12 w-auto " />,
  },
];
function FeatureCard({ title, description, icon }: any) {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-300 text-blue-800">
        {icon}
      </div>
      <div className="w-5/6">
        <h4 className="font-semibold text-lg text-gray-700 dark:text-indigo-300">
          {title}
        </h4>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
}
function Features() {
  return (
    <div className="flex flex-wrap">
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  );
}

export default Features;
