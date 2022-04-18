<script>
    import { fade } from 'svelte/transition';

    let controlsOpen = false;

    function toggleOpen() {
        controlsOpen = !controlsOpen;
    }
</script>



<div class="wrapper">
    {#if controlsOpen}
    <div class="controls" transition:fade>
        These are the controls
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
        align-items: center;
    }

    .controls {
        flex: 1;
    }

    .showhide {
    }

</style>