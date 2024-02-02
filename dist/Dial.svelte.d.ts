import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        /**
             * The single digit to show
             */ num?: string | undefined;
        /**
             * Positive means the number is going up, and vice versa.
             * Even when negative number is going LESS, this should be positive
             */ direction?: number | undefined;
        /**
             * forces the dial to scroll even when the number is the same.
             * e.g. when going from 10 -> 20, 0 will do a full loop
             */ force?: boolean | undefined;
        /**
             * If `force` is true, we will use `force_threshold` to determine if we will do spin.
             * You should set this to 10 for the one's place, 100 for the tens' place, and so on.
             * For example: `force_threshold={Math.pow(10, digits.length - i)}`
             */ force_threshold?: number | null | undefined;
        /**
             * Animation duration of scroll in ms.
             */ scroll_duration?: number | undefined;
        /**
             * The full number that we are a part of. We keep track of this to calculate the
             * difference and to calculate if the force threshold is crossed.
             */ fullnum?: number | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type DialProps = typeof __propDef.props;
export type DialEvents = typeof __propDef.events;
export type DialSlots = typeof __propDef.slots;
export default class Dial extends SvelteComponent<DialProps, DialEvents, DialSlots> {
}
export {};
