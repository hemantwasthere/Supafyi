"use client";

import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";

interface MediaItemProps {
    data: Song;
    onClick?: (id: string) => void;
}

const getCurrentViewportSize = () => {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
    const player = usePlayer();
    const imageUrl = useLoadImage(data);
    const [vw, setVw] = useState(window.innerWidth < 444);

    const updateVw = () => {
        setVw(window.innerWidth < 444);
    };

    useEffect(() => {
        window.addEventListener("resize", updateVw);
        return () => window.removeEventListener("resize", updateVw);
    });

    const handleClick = () => {
        if (onClick) {
            return onClick(data.id);
        }
        return player.setId(data.id);
    };

    return (
        <div onClick={handleClick} className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md">
            <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
                <Image
                    className="object-cover"
                    src={imageUrl || "/images/music-placeholder.png"}
                    alt="MediaItem"
                    fill
                />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="text-white truncate">
                    {vw && data.title.length > 20 ? data.title.slice(0, 12) + "..." : data.title}
                </p>
                <p className="text-neutral-400 text-sm truncate">
                    By {vw && data.author.length > 20 ? data.author.slice(0, 12) + "..." : data.author}
                </p>
            </div>
        </div>
    );
}

export default MediaItem;