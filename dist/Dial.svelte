<script>import { tick } from "svelte";
export let num = " ";
export let direction = 0;
export let style = "";
export let wrapper_style = "";
export let force = false;
export let force_threshold = null;
export let scroll_duration = 1e3;
let lastBuffer = -1;
let buffer = -1;
export let fullnum = 0;
let lastFullNum = 0;
$:
  buffer_value = buffer * 10;
let translateY = 0;
$:
  translateY_value = translateY - 1 + buffer_value;
let lastTranslateY = 0;
let special_char = " ";
let disable_animation = false;
let timerRef = -1;
const isNum = (num2) => !isNaN(parseInt(num2));
const minmax = (num2, min, max) => {
  return Math.max(Math.min(num2, max), min);
};
const scheduleReset = () => {
  if (timerRef !== -1) {
    clearTimeout(timerRef);
    timerRef = -1;
  }
  timerRef = setTimeout(resetBuffer, scroll_duration + 20);
};
const resetBuffer = async () => {
  disable_animation = true;
  await tick();
  buffer = -1;
  await tick();
  setTimeout(() => {
    disable_animation = false;
  }, 20);
};
let forced = false;
$: {
  if (isNum(num)) {
    let diff = Math.abs(fullnum - lastFullNum);
    lastFullNum = fullnum;
    translateY = -parseInt(num);
    if (direction > 0) {
      if (translateY === lastTranslateY && force_threshold && diff >= force_threshold && force) {
        let oldbuff = buffer;
        buffer = minmax(buffer - 1, -2, 0);
        forced = buffer !== oldbuff;
      } else if (translateY > lastTranslateY) {
        buffer = minmax(buffer - 1, -2, 0);
      }
    } else if (direction < 0) {
      if (translateY === lastTranslateY && force_threshold && diff >= force_threshold && force) {
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
    translateY = 1;
  }
  if (lastBuffer !== buffer || translateY !== lastTranslateY || forced) {
    scheduleReset();
  }
  lastTranslateY = translateY;
  lastBuffer = buffer;
}
</script>

<div style={wrapper_style}>
    <div
        class="numbers"
        style={`
transform: translateY(${translateY_value}em);
transition-duration: ${disable_animation ? "0s" : scroll_duration + "ms"};
${style}
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
</style>
