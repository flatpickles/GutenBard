<script>
    import { slide } from 'svelte/transition';

    let controlsOpen = false;

    let generatorLength = 30;
    let seedLength = 30;

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
        <div>
            <label for="length">Seed Length: {seedLength}</label>
            <input name="length" type=range bind:value={seedLength} min=1 max=100>
        </div>
        <div>
            <label for="length">Gen Length: {generatorLength}</label>
            <input name="length" type=range bind:value={generatorLength} min=1 max=100>
        </div>
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
        display: flex;
        justify-content: space-around;
        flex-flow: row wrap;
        align-items: stretch;
    }

    input {
        margin-bottom: 0;
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