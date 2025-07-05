"use client";
import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";

interface Props {
    size?: number;
    isActive?: boolean;
}

const Lord404Icon: React.FC<Props> = ({ size = 24}) => {
    return (
        <Player
            autoplay
            loop
            src="/404notfound.json"
            style={{ height: size, width: size }}
            />
    );
};

export default Lord404Icon;