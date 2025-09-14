<svelte:head>
    <script src="../assets/brevislib.js"></script>
    <script src="../assets/playground.js"></script>
</svelte:head>

<script lang="ts">
    import { onMount } from "svelte";

    import { mandelbrot, fizzbuzz, factors } from "./examplePrograms";
    import { compiler } from "../compiler/compiler";
    import { wasm_bindgen } from "../compiler/assets/brevislib";

    let editorElement: HTMLElement;
    let jar: any;
    onMount(() => {
        import("codejar").then(({ CodeJar }) => {
            jar = CodeJar(editorElement, () => {}, {tab: '\t'});
        });

        wasm_bindgen('./assets/brevislib_bg.wasm')
            .then(({ init_wasm }) => {

            });
    });
    let selectedOutput = $state(0);

    function set_source(src: string) {
        return () => {
            jar.updateCode(src);
        };
    }
    function compile_source() {
        return () => {
            selectedOutput = 1;
            let sourceCode = jar.toString();
            // TODO
        };
    }
</script>

<div>
    <div>
        <div class="flex flex-row justify-between">
            <button type="button" class="bg-red-400" onclick={compile_source()}>Run</button>
            <button>Examples &#x25BC;</button>
        </div>
        <div class="hidden">
            <button onclick={set_source(mandelbrot)}>Mandelbrot</button>
            <button onclick={set_source(fizzbuzz)}>FizzBuzz</button>
            <button onclick={set_source(factors)}>Factors</button>
        </div>
    </div>
    <div bind:this={editorElement} class="bg-[#444] text-[#fff] font-mono p-4 border-4 border-purple-300 rounded-full">{mandelbrot}</div>

    <div class="tab-bar" id="output_tabs">
        <button class="tablink" onclick={() => { selectedOutput = 1; }}>Stdout</button>
        <button class="tablink" onclick={() => { selectedOutput = 2; }}>C</button>
        <button class="tablink" onclick={() => { selectedOutput = 3; }}>Javascript</button>
    </div>
    <div id="output">
        <code id="stdout" class="{selectedOutput === 1 ? 'visible' : 'invisible'}"></code>
        <code id="c"  class="{selectedOutput === 2 ? 'visible' : 'invisible'}"></code>
        <code id="js" class="{selectedOutput === 3 ? 'visible' : 'invisible'}"></code>
    </div>
</div>