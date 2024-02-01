<script lang="ts">
    import NumDial from "$lib/NumDial.svelte";
    import type { ComponentProps } from "svelte";

    let options: ComponentProps<NumDial> = {
        force: true,
        number: 0,
        min_width: 0,
        padZero: false,
        flash: false,
        scroll_duration: 1000,
        flash_duration: 1000,
        flash_up_color: "lightgreen",
        flash_down_color: "orange",
    };
</script>

<main>
    min width:
    <input type="number" name="" id="" bind:value={options.min_width} />
    <br />

    scroll duration:
    <input
        type="number"
        name=""
        id=""
        bind:value={options.scroll_duration}
        min="0"
        max="10000"
    />
    <br />

    flash duration:
    <input
        type="number"
        name=""
        id=""
        bind:value={options.flash_duration}
        min="0"
        max="10000"
    />
    <br />

    padZero:
    <input type="checkbox" name="" id="" bind:checked={options.padZero} />
    <br />

    flash:
    <input type="checkbox" name="" id="" bind:checked={options.flash} />
    <br />

    force:
    <input type="checkbox" name="" id="" bind:checked={options.force} />
    <br />

    <button
        on:click={() => {
            options.number = options.number - 10;
        }}>-10</button
    >
    <button
        on:click={() => {
            options.number = options.number - 5;
        }}>-5</button
    >
    <button
        on:click={() => {
            options.number = options.number - 2;
        }}>-2</button
    >
    <button
        on:click={() => {
            options.number = options.number - 1;
        }}>-1</button
    >
    <br />
    <input
        bind:value={options.number}
        style="width: fit-content"
        type="number"
    />
    <br />
    <button
        on:click={() => {
            options.number = options.number + 1;
        }}>+1</button
    >
    <button
        on:click={() => {
            options.number = options.number + 2;
        }}>+2</button
    >
    <button
        on:click={() => {
            options.number = options.number + 5;
        }}>+5</button
    >
    <button
        on:click={() => {
            options.number = options.number + 10;
        }}>+10</button
    >
    <br />
    <button
        on:click={() => {
            options.number += Math.floor(Math.random() * 100) - 50;
        }}>Random</button
    >
</main>

<div>
    <div style="text-align: center">
        <div class="dialer-wrapper" style="">
            <NumDial
                {...options}
            />
        </div>
    </div>
</div>

<style>
    .dialer-wrapper {
        background-color: lightgray;
        font-size: 30px;
        width: fit-content;
        padding: 4px;
        border-radius: 4px;
        font-family: monospace;
    }
</style>
