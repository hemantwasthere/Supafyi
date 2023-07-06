"use client";

import * as RadixSlider from '@radix-ui/react-slider';
interface SlideProps {
    value?: number;
    onChange?: (value: number) => void;
}

const Slider: React.FC<SlideProps> = ({ value = 1, onChange }) => {
    const handleChange = (newValue: number[]) => {
        onChange?.(newValue[0]);
    };

    return (
        <RadixSlider.Root className="group relative flex items-center select-none touch-none w-full"
            defaultValue={[1]}
            value={[value]}
            onValueChange={handleChange}
            max={1}
            step={0.1}
            aria-label="Volume"
        >
            <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-1">
                <RadixSlider.Range
                    className="transition absolute bg-white group-hover:bg-[#1CB854] rounded-full h-full" />
            </RadixSlider.Track>
            <RadixSlider.Thumb className="hidden group-hover:block w-3 h-3 bg-white rounded-full shadow-[0_2px_3px] shadow-black focus:outline-none" aria-label="Volume" />
        </RadixSlider.Root>
    );
}

export default Slider;