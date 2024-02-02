import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        /**
             * The number to show
             */ number: number;
        /**
             * Whether to flash updates with a different background
             */ flash?: boolean | undefined;
        /**
             * If flash is true, the color to flash the background when value goes up.
             */ flash_up_color?: string | undefined;
        /**
             * If flash is true, the color to flash the background when value goes down.
             */ flash_down_color?: string | undefined;
        /**
             * How long the flash animation is in ms.
             */ flash_duration?: number | undefined;
        /**
             * How long the scroll animation is in ms.
             */ scroll_duration?: number | undefined;
        /**
             * forces the dials to scroll even when the number is the same.
             * e.g. when going from 10 -> 20, 0 will do a full loop
             */ force?: boolean | undefined;
        /**
             * How many digits should we should even if the number is less than this.
             */ min_width?: number | undefined;
        /**
             * Only if `min_width` is set.
             * true: pad left with '0'
             * false: pad left with ' '
             */ pad_zero?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type NumDialProps = typeof __propDef.props;
export type NumDialEvents = typeof __propDef.events;
export type NumDialSlots = typeof __propDef.slots;
export default class NumDial extends SvelteComponent<NumDialProps, NumDialEvents, NumDialSlots> {
}
export {};
