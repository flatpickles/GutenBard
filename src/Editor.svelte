<script>
    import { onMount } from "svelte";
    import { CaretHandler } from "./CaretHandler.js";
    import { Generator } from "./Generator.js";

    // Svelte Props
    let editorDiv;
    $: caretHandler = new CaretHandler(editorDiv);

    // Instance variables
    let generator = new Generator();
    let lastCaretPosition = 0;

    onMount(async () => {
        editorDiv.focus();
        editorDiv.innerText = "Once upon a time ";
        updateEditor();

        generator.loadModel("Hemingway");
    });

    function generate(fullInput) {
        generator.generate(fullInput, (generatedText) => {
            if (generatedText) displayText(fullInput, generatedText);
        });
    }

    function updateEditor() {
        const caretPosition = caretHandler.getCurrentCaretPosition();
        let textBeforeCursor = editorDiv.innerText.substring(0, caretPosition);

        let triggerGeneration = caretPosition > lastCaretPosition;
        if (triggerGeneration) {
            generate(textBeforeCursor);
        }

        const primaryText = editorDiv.innerText.substring(0, caretPosition);
        const secondaryText = triggerGeneration ? "" : editorDiv.innerText.substring(caretPosition, editorDiv.innerText.length);
        displayText(primaryText, secondaryText, caretPosition);
    }

    function displayText(primaryText, secondaryText, caretPosition) {
        if (!caretPosition) {
            caretPosition = caretHandler.getCurrentCaretPosition();
        }
        const primaryTextHTML = primaryText ? "<span class='primaryText'>" + primaryText + "</span>" : "";
        const secondaryTextHTML = secondaryText ? "<span class='secondaryText'>" + secondaryText + "</span>" : "";
        editorDiv.innerHTML = primaryTextHTML + secondaryTextHTML;
        caretHandler.setCurrentCaretPosition(caretPosition);
        lastCaretPosition = caretPosition;
    }

    function updateDelayed() {
        // Update delayed for keydown, so that the caret can move w/ arrow keys
        setTimeout(updateEditor, 1);
    }
</script>

<div
    contenteditable="true"
    bind:this={editorDiv}
    on:keydown={updateDelayed}
    on:click={updateEditor}
/>

<style>
    [contenteditable]:focus {
        outline: none;
    }

    [contenteditable] {
        white-space: pre-wrap;       /* css-3 */
        white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
        white-space: -pre-wrap;      /* Opera 4-6 */
        white-space: -o-pre-wrap;    /* Opera 7 */
        word-wrap: break-word;       /* Internet Explorer 5.5+ */
    }

    div {
        font-size: 22px;
    }

    :global(.primaryText) {
        color: #000;
    }

    :global(.secondaryText) {
        color: #bbb;
    }
</style>
