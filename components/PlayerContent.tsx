"use client";

import * as RadixSlider from '@radix-ui/react-slider';
import { useEffect, useState } from "react";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import useSound from "use-sound";

import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";

import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import Slider from "./Slider";


interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [seconds, setSeconds] = useState<number>(0);
    const [songDuration, setSongDuration] = useState(0)

    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;


    const onPlayNext = () => {
        if (player.ids.length === 0) return

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const nextSong = player.ids[currentIndex + 1];

        if (!nextSong) return player.setId(player.ids[0])

        player.setId(nextSong);
    }

    const onPlayPrevious = () => {
        if (player.ids.length === 0) return

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const previousSong = player.ids[currentIndex - 1];

        if (!previousSong) return player.setId(player.ids[player.ids.length - 1])

        player.setId(previousSong);
    }

    const [play, { pause, sound }] = useSound(
        songUrl,
        {
            volume: volume,
            onplay: () => setIsPlaying(true),
            onend: () => {
                setIsPlaying(false);
                onPlayNext();
            },
            onpause: () => setIsPlaying(false),
            format: ['mp3']
        }
    );

    useEffect(() => {
        sound?.play();

        return () => {
            sound?.unload();
        }
    }, [sound]);

    const handlePlay = () => {
        if (!isPlaying) play()
        else pause()
    }

    const toggleMute = () => {
        if (volume === 0) setVolume(1)
        else setVolume(0)
    }

    useEffect(() => {
        if (sound?.duration()) setSongDuration(sound.duration())
        const interval = setInterval(() => {
            if (sound) setSeconds(sound.seek([]))
        }, 1000);
        return () => clearInterval(interval);
    }, [sound]);

    const getTime = (time: any) => `
        ${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}
    `;

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <MediaItem data={song} />
                    <LikeButton songId={song.id} />
                </div>
            </div>

            <div className="flex md:hidden col-auto w-full justify-end items-center">
                <div onClick={handlePlay} className=" h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer">
                    <Icon size={30} className="text-black" />
                </div>
            </div>

            <div className="flex flex-col gap-1 items-center">
                <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
                    <AiFillStepBackward
                        onClick={onPlayPrevious}
                        size={30}
                        className="text-neutral-400 cursor-pointer hover:text-white transition"
                    />

                    <div onClick={handlePlay} className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer" >
                        <Icon size={30} className="text-black" />
                    </div>

                    <AiFillStepForward
                        onClick={onPlayNext}
                        size={30}
                        className="text-neutral-400 cursor-pointer hover:text-white transition"
                    />
                </div>

                {/* Seekbar  */}
                <div className="hidden sm:flex flex-row items-center">
                    <button type="button" onClick={() => sound.seek([seconds! - 5])} className="hidden lg:mr-4 lg:block text-white">
                        -
                    </button>
                    <p className="text-white">
                        {seconds === 0 ? '0:00' : getTime(seconds)}
                    </p>
                    <input
                        type="range"
                        min={0}
                        max={songDuration}
                        defaultValue={0}
                        value={seconds}
                        className="select-none md:block bg-[#4C4C4D] w-24 md:w-56 2xl:w-96 h-1 mx-4 2xl:mx-6 rounded-lg"
                        onChange={(e) => {
                            sound.seek([e.target.value]);
                        }}

                    />
                    <p className="text-white">
                        {songDuration === 0 ? '0:00' : getTime(songDuration)}
                    </p>
                    <button type="button" onClick={() => sound.seek([seconds! + 5])} className="hidden lg:ml-4 lg:block text-white">
                        +
                    </button>
                </div>
            </div>

            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon
                        onClick={toggleMute}
                        className="cursor-pointer"
                        size={34}
                    />
                    <Slider
                        value={volume}
                        onChange={(value) => setVolume(value)}
                    />
                </div>
            </div>

        </div>
    );
}

export default PlayerContent;