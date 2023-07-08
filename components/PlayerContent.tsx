"use client";

import { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { FaStepBackward, FaStepForward } from "react-icons/fa";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import useSound from "use-sound";

import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";

import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import Seekbar from './Seekbar';
import Slider from "./Slider";


interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
    const player = usePlayer();
    const [volume, setVolume] = useState<number>(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [seconds, setSeconds] = useState<number>(0);
    const [songDuration, setSongDuration] = useState<number>(0)

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

    return (
        <div>
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

                <div className="hidden md:flex flex-col items-center">
                    <div className="h-full flex justify-center items-center w-full max-w-[722px] gap-x-6">
                        <FaStepBackward
                            onClick={onPlayPrevious}
                            size={20}
                            className="text-neutral-400 cursor-pointer hover:text-white transition"
                        />

                        <div onClick={handlePlay} className="flex items-center justify-center h-8 w-8 rounded-full bg-white p-1 cursor-pointer" >
                            <Icon size={25} className="text-black" />
                        </div>

                        <FaStepForward
                            onClick={onPlayNext}
                            size={20}
                            className="text-neutral-400 cursor-pointer hover:text-white transition"
                        />
                    </div>

                    <Seekbar
                        sound={sound}
                        seconds={seconds}
                        setSeconds={setSeconds}
                        songDuration={songDuration}
                        setSongDuration={setSongDuration}
                    />
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
            <div className="md:hidden px-3 mt-1">
                <Seekbar
                    sound={sound}
                    seconds={seconds}
                    setSeconds={setSeconds}
                    songDuration={songDuration}
                    setSongDuration={setSongDuration}
                />
            </div>
        </div>

    );
}

export default PlayerContent;