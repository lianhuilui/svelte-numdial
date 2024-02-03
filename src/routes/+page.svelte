<script lang="ts">
    import NumDial from "$lib/NumDial.svelte";
    import { onMount } from "svelte";
    let number: number = 0;

    const randomNumber = () => {
        number += Math.floor(Math.random() * 100);
    };

    const run = () => {
        randomNumber();
        setTimeout(run, 2000);
    };

    onMount(() => {
        setTimeout(run, 2000);
    });
</script>

<NumDial
    min_width={6}
    pad_zero={true}
    flash={true}
    {number}

    dial_wrapper_styles=""
    last_dial_wrapper_style=""
    style=""
    last_dial_style=""
/>
