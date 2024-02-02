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

<div
    style="padding: 2px; border-radius: 4px; background-color: lightgray; width: fit-content;"
>
    <NumDial {number} min_width={6} pad_zero={true} />
</div>
