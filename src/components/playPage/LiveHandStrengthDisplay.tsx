import React, { useState, useEffect } from "react";
import { useCardsForHandStrength } from "../../hooks/player/useCardsForHandStrength";
import { usePlayerSeatInfo } from "../../hooks/player/usePlayerSeatInfo";
import { getViewportMode } from "../../config/stageGeometry";

const LiveHandStrengthDisplay: React.FC = () => {
    const { currentUserSeat } = usePlayerSeatInfo();
    const handStrength = useCardsForHandStrength(currentUserSeat);
    const [isMobileLandscape, setIsMobileLandscape] = useState(
        getViewportMode() === "mobile-landscape"
    );

    useEffect(() => {
        const handleResize = () => setIsMobileLandscape(getViewportMode() === "mobile-landscape");
        window.addEventListener("resize", handleResize);
        window.addEventListener("orientationchange", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("orientationchange", handleResize);
        };
    }, []);

    if (!handStrength) {
        return null;
    }

    // On mobile landscape the footer is 80px; on all other viewports it is 160px.
    // Position the display just above the footer so it is always visible.
    const bottomClass = isMobileLandscape ? "bottom-[88px]" : "bottom-[168px]";

    return (
        <div className={`fixed ${bottomClass} right-4 bg-black/80 backdrop-blur-sm p-3 rounded-lg border border-blue-500/20 shadow-lg z-50`}>
            <div className="flex flex-col items-end">
                <div className="text-white font-medium text-sm">{handStrength.descr}</div>
            </div>
        </div>
    );
};

export default LiveHandStrengthDisplay;
