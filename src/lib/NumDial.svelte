<script lang="ts">
    import Dial from "$lib/Dial.svelte";

    /**
     * The number to show
     */
    export let number: number;

    /**
     * CSS style 
     */
    export let style: string = "";

    /**
     * CSS style for individual dials
     */
    export let dial_styles: string ="";

    /**
     * CSS style for the last dial
     */
    export let last_dial_style: string ="";

    /**
     * dial wrapper CSS styles
     */
    export let dial_wrapper_styles: string = "";

    /**
     * dial wrapper CSS styles
     */
    export let last_dial_wrapper_style: string = "";

    /**
     * Whether to flash updates with a different background
     */
    export let flash: boolean = false;

    /**
     * If flash is true, the color to flash the background when value goes up.
     */
    export let flash_up_color: string = "white";

    /**
     * If flash is true, the color to flash the background when value goes down.
     */
    export let flash_down_color: string = "white";

    /**
     * How long the flash animation is in ms.
     */
    export let flash_duration: number = 1000;

    /**
     * How long the scroll animation is in ms.
     */
    export let scroll_duration: number = 1000;

    /**
     * forces the dials to scroll even when the number is the same.
     * e.g. when going from 10 -> 20, 0 will do a full loop
     */
    export let force: boolean = true;

    /**
     * How many digits should we should even if the number is less than this.
     */
    export let min_width = 1;

    /**
     * Only if `min_width` is set.
     * true: pad left with '0'
     * false: pad left with ' '
     */
    export let pad_zero: boolean = false;

    let lastnumber: number;
    let direction = 0;
    let delta = 0;
    let tokens: string[] = [];
    let bgElement: HTMLElement;

    $: {
        if (pad_zero) {
            if (number > 0) {
                tokens = number?.toString().padStart(min_width, "0").split("");
            } else if (number < 0){
                tokens = [
                    "-",
                    ...Math.abs(number)
                        ?.toString()
                        .padStart(min_width - 1, "0")
                        .split(""),
                ];
            } else {
                tokens = [
                    "0",
                    ...Math.abs(number)
                        ?.toString()
                        .padStart(min_width - 1, "0")
                        .split(""),
                ];
            }
        } else {
            tokens = number?.toString().padStart(min_width, " ").split("");
        }
    }

    $: {
        direction = Math.abs(number) - Math.abs(lastnumber);
        delta = number - lastnumber;

        lastnumber = number;

        if (flash) {
            if (delta < 0) {
                bgElement.classList.remove("up");
                bgElement.classList.add("down");

                setTimeout(() => {
                    bgElement.classList.remove("down");
                }, 20);
            } else if (delta > 0) {
                bgElement.classList.remove("down");
                bgElement.classList.add("up");

                setTimeout(() => {
                    bgElement.classList.remove("up");
                }, 20);
            }
        }
    }
</script>

<div
    class="bgElement"
    bind:this={bgElement}
    style="--flash_up_color: {flash_up_color}; --flash_down_color: {flash_down_color}; --flash_duration: {flash_duration}; {style}"
>
        {#each tokens as token, i (tokens.length - i)}
            <Dial
                style={`${dial_styles} ${i === tokens.length-1 ? last_dial_style : ''}`}
                wrapper_style={`${dial_wrapper_styles} ${i === tokens.length-1 ? last_dial_wrapper_style : ''}`}
                force_threshold={Math.pow(10, tokens.length - i)}
                fullnum={number}
                num={token}
                {direction}
                {force}
                {scroll_duration}
            />
        {/each}

    <div style="display: none">
        <!-- prevent css preprocess from removing -->
        <div class="up down"></div>
    </div>
</div>

<style>
    .bgElement {
        display: flex;
        width: fit-content;
        transition-property: background-color;
        transition-duration: calc(var(--flash_duration) * 1ms);
        overflow: hidden;
    }
    .up {
        background-color: var(--flash_up_color, white);
        transition: background-color 0s;
    }
    .down {
        background-color: var(--flash_down_color, white);
        transition: background-color 0s;
    }
</style>
