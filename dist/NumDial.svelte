<script>import Dial from "./Dial.svelte";
export let number;
export let style = "";
export let dial_styles = "";
export let last_dial_style = "";
export let dial_wrapper_styles = "";
export let last_dial_wrapper_style = "";
export let flash = false;
export let flash_up_color = "white";
export let flash_down_color = "white";
export let flash_duration = 1e3;
export let scroll_duration = 1e3;
export let force = true;
export let min_width = 1;
export let pad_zero = false;
let lastnumber;
let direction = 0;
let delta = 0;
let tokens = [];
let bgElement;
$: {
  if (pad_zero) {
    if (number > 0) {
      tokens = number?.toString().padStart(min_width, "0").split("");
    } else if (number < 0) {
      tokens = [
        "-",
        ...Math.abs(number)?.toString().padStart(min_width - 1, "0").split("")
      ];
    } else {
      tokens = [
        "0",
        ...Math.abs(number)?.toString().padStart(min_width - 1, "0").split("")
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
    aria-label={number.toString()}
    class="bgElement"
    bind:this={bgElement}
    style="--flash_up_color: {flash_up_color}; --flash_down_color: {flash_down_color}; --flash_duration: {flash_duration}; {style}"
    on:copy={function(e) {e.preventDefault(); navigator.clipboard.writeText(number.toString());}}
>
    {#each tokens as token, i (tokens.length - i)}
        <Dial
            style={`${dial_styles} ${
                i === tokens.length - 1 ? last_dial_style : ""
            }`}
            wrapper_style={`${dial_wrapper_styles} ${
                i === tokens.length - 1 ? last_dial_wrapper_style : ""
            }`}
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
