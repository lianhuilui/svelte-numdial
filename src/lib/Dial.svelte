<script lang="ts">
    import { tick } from "svelte";

    /**
     * The single digit to show
     */
    export let num: string = " ";

    /**
     * Positive means the number is going up, and vice versa.
     * Even when negative number is going LESS, this should be positive
     */
    export let direction: number = 0;

    /**
     * Positive means the number is going up, and vice versa.
     * When a negative number is going LESS, this should be negative.
     */
    export let delta: number = 0;

    /**
     * forces the dial to scroll even when the number is the same.
     * e.g. when going from 10 -> 20, 0 will do a full loop
     */
    export let force: boolean = false;

    /**
     * If `force` is true, we will use `force_threshold` to determine if we will do spin.
     * You should set this to 10 for the one's place, 100 for the tens' place, and so on.
     * For example: `force_threshold={Math.pow(10, digits.length - i)}`
     */
    export let force_threshold: null | number = null;

    /**
     * Animation duration of scroll in ms.
     */
    export let scroll_duration: number = 1000;

    let lastBuffer = -1;
    let buffer = -1;

    /**
     * The full number that we are a part of. We keep track of this to calculate the 
     * difference and to calculate if the force threshold is crossed.
     */
    export let fullnum: number = 0;
    let lastFullNum: number = 0;

    $: buffer_value = buffer * 10;

    let translateY = 0;
    $: translateY_value = translateY - 1 + buffer_value;

    let lastTranslateY = 0;
    let special_char = " ";

    let disable_animation = false;

    let timerRef: number = -1;

    /* helper functions */
    const isNum = (num: string) => !isNaN(parseInt(num));
    const minmax = (num: number, min: number, max: number) => {
        return Math.max(Math.min(num, max), min);
    };

    /* schedule reset function */
    const scheduleReset = () => {
        if (timerRef !== -1) {
            clearTimeout(timerRef);
            timerRef = -1;
        }
        timerRef = setTimeout(resetBuffer, scroll_duration + 20); // 20 ms for good measure
    };

    const resetBuffer = async () => {
        // disable transition animations
        disable_animation = true;
        
        // wait for DOM to update
        await tick();

        // reset the buffer to original place
        buffer = -1;

        // wait for DOM to update again
        await tick();

        // schedule to re-enable animation
        setTimeout(() => {
            disable_animation = false;
        }, 20);

        // 20 ms for good measure. there is a chance the number is changed
        // during this period when animation is disabled. we can't help it.
    };

    let forced = false;

    $: {
        if (isNum(num)) {
            let diff = Math.abs(fullnum - lastFullNum);

            lastFullNum = fullnum;
            translateY = -parseInt(num);

            // going up
            if (direction > 0) {
                if (
                    translateY === lastTranslateY &&
                    force_threshold &&
                    diff >= force_threshold &&
                    force
                ) {
                    let oldbuff = buffer;
                    buffer = minmax(buffer - 1, -2, 0);
                    forced = buffer !== oldbuff;
                } else if (translateY > lastTranslateY) {
                    buffer = minmax(buffer - 1, -2, 0);
                }
            } else if (direction < 0) {
                if (
                    translateY === lastTranslateY &&
                    force_threshold &&
                    diff >= force_threshold &&
                    force
                ) {
                    let oldbuff = buffer;
                    buffer = minmax(buffer + 1, -2, 0);
                    forced = buffer !== oldbuff;
                } else if (translateY < lastTranslateY) {
                    buffer = minmax(buffer + 1, -2, 0);
                }
            }
        } else {
            buffer = 0;
            special_char = num;
            translateY = 1; // special char?
        }

        if (lastBuffer !== buffer || translateY !== lastTranslateY || forced) {
            scheduleReset();
        }

        lastTranslateY = translateY;
        lastBuffer = buffer;
    }
</script>

<div class="container">
    <div class="bgElement">
        <div
            class="numbers"
            style={`
transform: translateY(${translateY_value}em);
transition-duration: ${disable_animation ? "0s" : scroll_duration + "ms"};
`}
        >
            <span>{@html special_char === " " ? "&nbsp;" : special_char}</span>
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
        </div>
    </div>
</div>

<style>
    .numbers {
        height: fit-content;
        transition-property: transform;
        height: 1em;
        line-height: 1em;
        display: flex;
        flex-direction: column;
        width: 0.68em;
        justify-items: center;
        align-items: center;
        align-self: center;
        align-items: center;
    }
    .container {
        height: 1em;
        line-height: 1em;
        overflow: hidden;
    }

    .container.debug {
        overflow: visible;
    }
</style>
