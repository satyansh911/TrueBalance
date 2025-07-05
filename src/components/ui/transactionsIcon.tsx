"use client";
import { Player } from "@lottiefiles/react-lottie-player";
import { LucideProps } from "lucide-react";
import React from "react";

interface Props extends LucideProps {
  size?: number;
  isActive?: boolean;
}

const TransactionsIcon: React.FC<Props> = ({ size = 30 }) => {
  return (
    <Player
      autoplay
      loop
      src="/transactions.json"
      style={{ height: size, width: size }}
    />
  );
};

export default TransactionsIcon;