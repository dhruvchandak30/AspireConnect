import React from "react";

type ServiceCardProps = {
  img: string;
  text: string;
  desc: string;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ img, text, desc }) => {
  return (
    <div className=" shadow-xl rounded-lg">
      <img src={img} alt="Service" className="w-full p-8 " />
      <div className="p-4">
        <div className="text-xl font-bold mb-2  font-sans">{text}</div>
        <p className="text-gray-700">{desc}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
