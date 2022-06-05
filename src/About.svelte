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
        <p>
            <span class="title">GutenBard</span> is a tool for improvisational writing.
            It uses a neural network trained on Hemingway's written works to suggest new words based on your inputs.
            With power of computer, please make weird!
        </p>
        <p>
            Built by <a href="http://flatpickles.com">this guy</a>. Dig the code <a href="https://github.com/flatpickles/GutenBard">over here</a>.
        </p>
    </div>
    {/if}
    <span id="icon" class:selected="{aboutOpen}" on:click={toggleOpen}>?!</span>
</div>

<style>
    .title {
        font-weight: bold;
        font-size: 20px;
        padding-right: 2px;
    }

    p {
        font-size: 16px;
        padding: 0;
        margin: 0;
    }

    p + p {
        margin-top: 8px;
    }

    a {
        color: rgb(91, 105, 158);
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
        background-color: #f2f2f2;
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
