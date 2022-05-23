<script>
    import { slide } from 'svelte/transition';

    let aboutOpen = false;

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
        aboutOpen = !aboutOpen;
    }
</script>

<div class="wrapper">
    {#if aboutOpen}
    <div class="about" transition:fadeSlide="{{duration: 200}}">
        <h1>
            GutenBard
        </h1>

        <p>
            GutenBard is a tool for improvisational writing.
            It uses a neural network trained on Hemingway's written works to suggest new words based on your inputs.
            As with most tech demos, this could be improved in many ways, but hopefully you'll find some inspiration here nonetheless.
            Git repo <a href="https://github.com/flatpickles/GutenBard">here</a>, if you're into that sort of thing.
        </p>
    </div>
    {/if}
    <span id="icon" class:selected="{aboutOpen}" on:click={toggleOpen}>?!</span>
</div>

<style>
    h1 {
        font-size: 24px;
        padding: 0;
        margin: 0;
        padding-bottom: 8px;
    }

    p {
        font-size: 16px;
        padding: 0;
        margin: 0;
    }

    a {
        color: #777;
    }

    .wrapper {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: top;
    }

    .about {
        flex: 1;
        border-radius: 10px;
        border: 0px solid #000;
        padding: 16px;
        background-color: #eee;
        margin-right: 8px;
        margin-bottom: 16px;
    }

    #icon {
        font-size: 24px;
        cursor: pointer;
        margin: 0;
        padding: 0;
    }

    #icon:not(.selected) {
        animation-duration: 200ms;
        color: #bbb;
        animation-name: fadeFromBlack;
    }

    .selected {
        animation-duration: 200ms;
        color: #000;
        animation-name: fadeToBlack;
    }

    @keyframes fadeToBlack {
        from {
            color: #bbb
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
            color: #bbb
        }
    }
</style>