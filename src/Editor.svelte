<script>
    import { onMount } from "svelte";
    import { CursorHandler } from "./CursorHandler.js";
    import { Generator } from "./Generator.js";

    let editorDiv;
    let textContent;
    let generator = new Generator();

    $: cursorHandler = new CursorHandler(editorDiv);

    onMount(async () => {
        textContent = "Once upon a time ";
        editorDiv.focus();
        updateEditor();

        generator.loadModel("Hemingway").then(() => {
            console.log(generator.generate("snack atack "));
        });
    });

    function updateEditor() {
        const caretOffset = cursorHandler.getCurrentCursorPosition();

        const primaryText = textContent.substring(0, caretOffset);
        const secondaryText = textContent.substring(
            caretOffset,
            textContent.length
        );
        const primaryTextHTML =
            "<span class='primaryText'>" + primaryText + "</span>";
        const secondaryTextHTML =
            "<span class='secondaryText'>" + secondaryText + "</span>";
        editorDiv.innerHTML = primaryTextHTML + secondaryTextHTML;

        cursorHandler.setCurrentCursorPosition(caretOffset);
    }

    function updateDelayed() {
        // Update delayed for keydown, so that the cursor can move w/ arrow keys
        setTimeout(updateEditor, 50);
    }
</script>

<div
    contenteditable="true"
    bind:this={editorDiv}
    bind:textContent
    on:keydown={updateDelayed}
    on:click={updateEditor}
/>

<style>
    [contenteditable]:focus {
        outline: none;
    }

    :global(.primaryText) {
        color: #000;
    }

    :global(.secondaryText) {
        color: #bbb;
    }
</style>
