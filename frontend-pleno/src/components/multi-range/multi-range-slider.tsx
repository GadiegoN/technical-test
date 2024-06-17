import {
    ChangeEvent,
    useCallback,
    useEffect,
    useState,
    useRef
} from "react";
import "./multi-range-slider.css";

interface MultiRangeSliderProps {
    min: number;
    max: number;
    onChange: Function;
}

export default function MultiRangeSlider({
    min,
    max,
    onChange
}: MultiRangeSliderProps) {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef<HTMLInputElement>(null);
    const maxValRef = useRef<HTMLInputElement>(null);
    const range = useRef<HTMLDivElement>(null);

    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(+maxValRef.current.value);

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);

    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, getPercent]);

    useEffect(() => {
        onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal, onChange]);

    return (
        <div className="h-16 flex items-center justify-center">
            <div className="relative w-48">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={minVal}
                    ref={minValRef}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const value = Math.min(+event.target.value, maxVal - 1);
                        setMinVal(value);
                        event.target.value = value.toString();
                    }}
                    className={`thumb absolute h-0 w-48 outline-none pointer-events-none ${minVal > max - 100 ? 'z-50' : 'z-30'}`}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={maxVal}
                    ref={maxValRef}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const value = Math.max(+event.target.value, minVal + 1);
                        setMaxVal(value);
                        event.target.value = value.toString();
                    }}
                    className="thumb bg-primary absolute h-0 w-48 outline-none pointer-events-none z-40"
                />

                <div className="slider relative w-full">
                    <div className="slider__track absolute w-full h-1 bg-yellow-600 rounded z-10"></div>
                    <div ref={range} className="slider__range absolute h-1 bg-primary rounded z-20"></div>
                </div>
            </div>
        </div>
    );
};
