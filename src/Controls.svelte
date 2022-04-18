<script>
    import { slide } from 'svelte/transition';

    let controlsOpen = false;

    let temperatureInput = 0.5;
    let lengthInput = 20;

    function toggleOpen() {
        controlsOpen = !controlsOpen;
    }
</script>



<div class="wrapper">
    {#if controlsOpen}
    <div class="controls" transition:slide>
        <label for="temperature">Temperature: {temperatureInput}</label><input name="temperature" type=range bind:value={temperatureInput} min=0 max=1 step=0.01>
        <label for="length">Length: {lengthInput}</label><input name="length" type=range bind:value={lengthInput} min=1 max=100>
    </div>
    {/if}
    <button class="showhide" on:click={toggleOpen}>
        {#if controlsOpen}
            Close
        {:else}
            Open
        {/if}
    </button>
</div>

<style>
    .wrapper {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: top;
    }

    .controls {
        flex: 1;
    }

    .showhide {
    }

</style>