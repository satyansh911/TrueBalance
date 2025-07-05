"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])
    if (!mounted) {
        return (
        <div className="relative inline-block w-[60px] h-[34px]">
            <div className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#2196f3] transition-all duration-[0.4s] rounded-[34px] overflow-hidden z-0">
            <div className="absolute h-[26px] w-[26px] left-1 bottom-1 bg-yellow-400 transition-all duration-[0.4s] rounded-full"></div>
            </div>
        </div>
        )
    }
    const isDark = theme === "dark"
    const handleToggle = () => {
        setTheme(isDark ? "light" : "dark")
    }
    return (
        <div className="relative inline-block w-[60px] h-[34px]">
        <label className="switch">
            <input id="input" type="checkbox" checked={isDark} onChange={handleToggle} className="opacity-0 w-0 h-0" />
            <div
            className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 transition-all duration-[0.4s] z-0 overflow-hidden rounded-[34px] ${
                isDark ? "bg-black" : "bg-[#2196f3]"
            } ${isDark ? "shadow-[0_0_1px_#2196f3]" : ""}`}
            >
            <div
                className={`absolute h-[26px] w-[26px] left-1 bottom-1 transition-all duration-[0.4s] rounded-full ${
                isDark
                    ? "translate-x-[26px] bg-white animate-[rotate-center_0.6s_ease-in-out_both]"
                    : "translate-x-0 bg-yellow-400"
                }`}
            >
                <svg
                id="moon-dot-1"
                className={`absolute left-[10px] top-[3px] w-[6px] h-[6px] z-[4] transition-opacity duration-[0.4s] fill-gray-500 ${
                    isDark ? "opacity-100" : "opacity-0"
                }`}
                viewBox="0 0 100 100"
                >
                <circle cx={50} cy={50} r={50} />
                </svg>
                <svg
                id="moon-dot-2"
                className={`absolute left-[2px] top-[10px] w-[10px] h-[10px] z-[4] transition-opacity duration-[0.4s] fill-gray-500 ${
                    isDark ? "opacity-100" : "opacity-0"
                }`}
                viewBox="0 0 100 100"
                >
                <circle cx={50} cy={50} r={50} />
                </svg>
                <svg
                id="moon-dot-3"
                className={`absolute left-[16px] top-[18px] w-[3px] h-[3px] z-[4] transition-opacity duration-[0.4s] fill-gray-500 ${
                    isDark ? "opacity-100" : "opacity-0"
                }`}
                viewBox="0 0 100 100"
                >
                <circle cx={50} cy={50} r={50} />
                </svg>
                <svg
                id="light-ray-1"
                className={`absolute left-[-8px] top-[-8px] w-[43px] h-[43px] z-[-1] fill-white ${
                    isDark ? "opacity-0" : "opacity-[0.1]"
                }`}
                viewBox="0 0 100 100"
                >
                <circle cx={50} cy={50} r={50} />
                </svg>
                <svg
                id="light-ray-2"
                className={`absolute left-[-50%] top-[-50%] w-[55px] h-[55px] z-[-1] fill-white ${
                    isDark ? "opacity-0" : "opacity-[0.1]"
                }`}
                viewBox="0 0 100 100"
                >
                <circle cx={50} cy={50} r={50} />
                </svg>
                <svg
                id="light-ray-3"
                className={`absolute left-[-18px] top-[-18px] w-[60px] h-[60px] z-[-1] fill-white ${
                    isDark ? "opacity-0" : "opacity-[0.1]"
                }`}
                viewBox="0 0 100 100"
                >
                <circle cx={50} cy={50} r={50} />
                </svg>
                <svg
                id="cloud-1"
                className="absolute left-[30px] top-[15px] w-[40px] fill-[#ccc] animate-[cloud-move_6s_infinite_1s]"
                viewBox="0 0 100 100"
                >
                <circle cx={50} cy={50} r={50} />
                </svg>
                <svg
                id="cloud-2"
                className="absolute left-[44px] top-[10px] w-[20px] fill-[#ccc] animate-[cloud-move_6s_infinite_1s]"
                viewBox="0 0 100 100"
                >
                <circle cx={50} cy={50} r={50} />
                </svg>
                <svg
                id="cloud-3"
                className="absolute left-[18px] top-[24px] w-[30px] fill-[#ccc] animate-[cloud-move_6s_infinite_1s]"
                viewBox="0 0 100 100"
                >
                <circle cx={50} cy={50} r={50} />
                </svg>
                <svg
                id="cloud-4"
                className="absolute left-[36px] top-[18px] w-[40px] fill-[#eee] animate-[cloud-move_6s_infinite]"
                viewBox="0 0 100 100"
                >
                <circle cx={50} cy={50} r={50} />
                </svg>
                <svg
                id="cloud-5"
                className="absolute left-[48px] top-[14px] w-[20px] fill-[#eee] animate-[cloud-move_6s_infinite]"
                viewBox="0 0 100 100"
                >
                <circle cx={50} cy={50} r={50} />
                </svg>
                <svg
                id="cloud-6"
                className="absolute left-[22px] top-[26px] w-[30px] fill-[#eee] animate-[cloud-move_6s_infinite]"
                viewBox="0 0 100 100"
                >
                <circle cx={50} cy={50} r={50} />
                </svg>
            </div>
            <div
                className={`transition-all duration-[0.4s] ${
                isDark ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
                }`}
            >
                <svg
                id="star-1"
                className="absolute w-[20px] top-[2px] left-[3px] fill-white transition-all duration-[0.4s] animate-[star-twinkle_2s_infinite] [animation-delay:0.3s]"
                viewBox="0 0 20 20"
                >
                <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
                </svg>
                <svg
                id="star-2"
                className="absolute w-[6px] top-[16px] left-[3px] fill-white transition-all duration-[0.4s] animate-[star-twinkle_2s_infinite]"
                viewBox="0 0 20 20"
                >
                <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
                </svg>
                <svg
                id="star-3"
                className="absolute w-[12px] top-[20px] left-[10px] fill-white transition-all duration-[0.4s] animate-[star-twinkle_2s_infinite] [animation-delay:0.6s]"
                viewBox="0 0 20 20"
                >
                <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
                </svg>
                <svg
                id="star-4"
                className="absolute w-[18px] top-0 left-[18px] fill-white transition-all duration-[0.4s] animate-[star-twinkle_2s_infinite] [animation-delay:1.3s]"
                viewBox="0 0 20 20"
                >
                <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
                </svg>
            </div>
            </div>
        </label>
        </div>
    )
}