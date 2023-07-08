import * as RadixSlider from '@radix-ui/react-slider';
import React, { useEffect } from 'react';

interface SeekbarProps {
    sound: any;
    seconds: number;
    setSeconds: React.Dispatch<React.SetStateAction<number>>;
    songDuration: number;
    setSongDuration: React.Dispatch<React.SetStateAction<number>>;
}

const Seekbar: React.FC<SeekbarProps> = (
    { sound, seconds, setSeconds, songDuration, setSongDuration }
) => {

    useEffect(() => {
        if (sound?.duration()) setSongDuration(sound.duration())
        const interval = setInterval(() => {
            if (sound) setSeconds(sound.seek([]))
        }, 1000);
        return () => clearInterval(interval);
    }, [setSeconds, setSongDuration, sound]);

    const getTime = (time: any) => `
        ${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}
    `

    const handleChange = (newValue: number[]) => {
        sound.seek([newValue[0]]);
    };

    return (
        <div className="flex w-full gap-4 items-center justify-center">
            {/* <button type="button" onClick={() => sound.seek([seconds! - 5])} className="hidden lg:block text-white">-5s</button> */}

            <p className="text-xs font-normal text-[#A6A6A7]">
                {seconds === 0 ? '0:00' : getTime(seconds)}
            </p>

            <div className="w-full">
                <RadixSlider.Root className="group relative flex items-center select-none touch-none w-full"
                    min={0}
                    max={songDuration}
                    defaultValue={[0]}
                    value={[seconds]}
                    onValueChange={handleChange}
                    step={1}
                    aria-label="Seekbar"
                >
                    <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-1">
                        <RadixSlider.Range
                            className="transition absolute bg-white group-hover:bg-[#1CB854] rounded-full h-full" />
                    </RadixSlider.Track>
                    <RadixSlider.Thumb className="hidden group-hover:block w-3 h-3 bg-white rounded-full shadow-[0_2px_3px] shadow-black focus:outline-none" aria-label="Seekbar" />
                </RadixSlider.Root>
            </div>

            <p className="text-xs font-normal text-[#A6A6A7]">
                {songDuration === 0 ? '0:00' : getTime(songDuration)}
            </p>

            {/* <button type="button" onClick={() => sound.seek([seconds! + 5])} className="hidden lg:block text-white">+5s</button> */}
        </div>

    )
}

export default Seekbar