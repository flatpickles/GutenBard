<script>
    import { slide } from 'svelte/transition';

    let controlsOpen = false;

    let temperatureInput = 0.5;
    let lengthInput = 20;

    function fadeSlide(node, options) {
		const slideTrans = slide(node, options)
		return {
			duration: options.duration,
			css: t => `
				${slideTrans.css(t)}
				opacity: ${t};
			`
		};
	}

    function toggleOpen() {
        controlsOpen = !controlsOpen;
    }
</script>

<div class="wrapper">
    {#if controlsOpen}
    <div class="controls" transition:fadeSlide="{{duration: 200}}">
        <label for="temperature">Temperature: {temperatureInput}</label><input name="temperature" type=range bind:value={temperatureInput} min=0 max=1 step=0.01>
        <label for="length">Length: {lengthInput}</label><input name="length" type=range bind:value={lengthInput} min=1 max=100>
    </div>
    {/if}
    <span id="controlsGlyph" class:selected="{controlsOpen}" on:click={toggleOpen}>&#9881;</span>
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
        border-radius: 10px;
        border: 1px solid #000;
        padding: 10px;
        margin-bottom: 20px;
        margin-right: 10px;
    }

    #controlsGlyph {
        font-size: 2em;
        cursor: pointer;
        margin: 0;
        padding: 0;
    }

    #controlsGlyph:not(.selected) {
        animation-duration: 200ms;
        color: #C0C0C0;
        animation-name: fadeFromBlack;
    }

    .selected {
        animation-duration: 200ms;
        color: #000;
        animation-name: fadeToBlack;
    }

    @keyframes fadeToBlack {
        from {
            color: #C0C0C0
        }

        to {
            color: #000;
        }
    }

    @keyframes fadeFromBlack {
        from {
            color: #000;
        }

        to {
            color: #C0C0C0
        }
    }
</style>