import React from "react";
import { ReactNode } from "react";

interface CardContainerProps {
  children: ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({ children }) => {
  return (
    <div className="bg-white border border-gray rounded-xl p-6 w-full max-w-md">
      {children}
    </div>
  );
};

export default CardContainer;
