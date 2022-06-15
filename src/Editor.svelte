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
        generator.loadModel();
    });

    function generate(fullInput) {
        generator.generate(fullInput, (generatedText) => {
            if (generatedText) displayText(fullInput, generatedText);
        });
    }

    function updateEditor(forceGeneration, forceDisplayUpdate) {
        console.log(window.getSelection());
        const caretPosition = caretHandler.getCurrentCaretPosition();
        let textBeforeCursor = editorDiv.innerText.substring(0, caretPosition);
        let triggerGeneration = caretPosition > lastCaretPosition || (forceGeneration === true);
        
        if (!triggerGeneration || forceDisplayUpdate === true) {
            generator.cancelGeneration();
            // Make sure style is updated
            const primaryText = editorDiv.innerText.substring(0, caretPosition);
            const secondaryText = triggerGeneration ? "" : editorDiv.innerText.substring(caretPosition, editorDiv.innerText.length);
            displayText(primaryText, secondaryText, caretPosition);
        } 
    
        if (triggerGeneration) {
            // Generate if need be, which will trigger another editor update
            generate(textBeforeCursor);
            console.log("generating");
        } 
    }

    function displayText(primaryText, secondaryText, caretPosition) {
        if (!caretPosition) {
            caretPosition = caretHandler.getCurrentCaretPosition();
        }
        const primaryTextHTML = primaryText ? "<span id='primaryText'>" + primaryText + "</span>" : "";
        const secondaryTextHTML = secondaryText ? "<span id='secondaryText'>" + secondaryText + "</span>" : "";
        editorDiv.innerHTML = primaryTextHTML + secondaryTextHTML;
        caretHandler.setCurrentCaretPosition(caretPosition);
        lastCaretPosition = caretPosition;
    }

    function delayed(fn) {
        // Some things need to happen after text input is resolved
        setTimeout(fn, 100);
    }

    function clearSecondaryText() {
        const secondaryTextEl = document.getElementById("secondaryText");
        if (secondaryTextEl) secondaryTextEl.remove();
    }

    function onKeyDown(event) {
        // Don't allow enter keys
        if (event.key === "Enter") {
            event.preventDefault();
            return;
        }

        // Don't allow changing selected text (too hard)
        const selection = window.getSelection();
        if (selection.anchorOffset != selection.focusOffset) {
            event.preventDefault();
            return;
        }

        // Ignore modified inputs
        if (event.metaKey) {
            return;
        }

        // Ignore non-input key presses
        if (event.keyCode == "9" || event.keyCode =="16" || event.keyCode =="17" || event.keyCode =="18" || event.keyCode == "91") {
            return;
        }

        // Handle different types of allowed input
        if (event.keyCode == "37" || event.keyCode == "38" || event.keyCode == "39" || event.keyCode == "40") { // Arrow keys
            // Wait for cursor to move, then update the display
            delayed(() => { updateEditor(false, true); });
        } else if (event.keyCode == "8" || event.keyCode == "46") { // Backspace or Delete
            // Clear then generate new text
            clearSecondaryText();
            delayed(() => { updateEditor(true, false); });
        } else { // Text input (or I've forgotten something)
            // Clear, then update
            clearSecondaryText();
            delayed(updateEditor);
        }
    }

    function onClick(event) {
        const selection = window.getSelection();
        if (selection.anchorOffset == selection.focusOffset) {
            updateEditor(false, true); // no need to delay!
        }
    }
</script>

<div
    contenteditable="true"
    bind:this={editorDiv}
    on:click={onClick}
    on:keydown={onKeyDown}
    on:paste={(event) => { event.preventDefault(); }}
>
    <span id="secondaryText">{Generator.defaultString}</span>
</div>

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
        font-size: 24px;
    }

    :global(#primaryText) {
        color: #000;
    }

    :global(#secondaryText) {
        color: #bbb;
    }
</style>
