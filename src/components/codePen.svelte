<script lang="ts">
    import { onMount } from "svelte";
    import { DropdownMenu, Tabs } from "bits-ui";
    import { basicSetup } from "codemirror";
    import { EditorView, keymap } from "@codemirror/view";
    import { indentWithTab } from "@codemirror/commands";

    import { getExample } from "../compiler/examplePrograms";
    import { wasm_bindgen } from "../compiler/wasm_glue/brevislib";
    import { cPrelude, jsPrelude } from "../compiler/preludes";
    import { prependDeclarations } from "../compiler/fixAwful";

    let editorElement: HTMLElement;
    let editor: EditorView;
    onMount(() => {
        editor = new EditorView({
            doc: 'print("hello" ~ " " ~ "world!");',
            parent: editorElement,
            extensions: [
                basicSetup,
                keymap.of([ indentWithTab ]),
                EditorView.updateListener.of(update => {
                    if(update.docChanged) {
                        compiledYet = false;
                    }
                })
            ],
        });

        wasm_bindgen('/compiler_assets/brevislib_bg.wasm');
    });
    let selectedOutput  = $state("stdout");
    let compilerOutputs = $state({ c: "", js: "", stdout: "" });
    let compiledYet     = $state(false);

    function selectExample(exampleName: string) {
        return () => {
            let newSource = getExample(exampleName);
            setSource(newSource);
        };
    }

    function setSource(source: string) {
        const length = editor.state.doc.length;
        editor.dispatch({
            changes: { from: 0, to: length, insert: source }
        });
    }

    function compile_source() {
        return () => {
            selectedOutput = "stdout";
            let source = editor.state.doc.toString();

            let js = prependDeclarations(wasm_bindgen.compile_js(source, jsPrelude));
            let c  = wasm_bindgen.compile_c(source, cPrelude)
            let stdout = eval(js);

            compilerOutputs = { js, c, stdout };
            compiledYet = true;
        };
    }
</script>

<div>
    <div class="bg-[#444] text-[#fff] rounded-md">
        <div class="flex flex-row bg-gray-600 rounded-t-md">
            <button type="button" class="bg-blue-200 text-[#111] p-2 rounded-tl-md" onclick={compile_source()}>Run &#x25B6;</button>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger class="p-2">Examples &#x25BC;</DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content align="start" class="bg-gray-600 text-white p-2 flex flex-col gap-4">
                        <DropdownMenu.Item textValue="mandelbrot" closeOnSelect={true} onSelect={selectExample("mandelbrot")} class="data-highlighted:bg-gray-500 p-2 rounded-sm">Mandelbrot</DropdownMenu.Item>
                        <DropdownMenu.Item textValue="fizzbuzz" closeOnSelect={true} onSelect={selectExample("fizzbuzz")} class="data-highlighted:bg-gray-500 p-2 rounded-sm">FizzBuzz</DropdownMenu.Item>
                        <DropdownMenu.Item textValue="factors" closeOnSelect={true} onSelect={selectExample("find factors")} class="data-highlighted:bg-gray-500 p-2 rounded-sm">Find Factors</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </div>
        <div bind:this={editorElement} class="rounded-b-md"></div>
    </div>

    

    <Tabs.Root bind:value={selectedOutput} class="my-4 flex flex-col gap-4 {compiledYet ? 'visible' : 'hidden'}">
        <Tabs.List class="flex flex-row gap-4">
            <Tabs.Trigger value="stdout" class="data-[state=active]:bg-[#444] data-[state=active]:text-white p-2 rounded-sm">Stdout</Tabs.Trigger>
            <Tabs.Trigger value="c" class="data-[state=active]:bg-[#444] data-[state=active]:text-white p-2 rounded-sm">C89</Tabs.Trigger>
            <Tabs.Trigger value="js" class="data-[state=active]:bg-[#444] data-[state=active]:text-white p-2 rounded-sm">JavaScript</Tabs.Trigger>
        </Tabs.List>
        
        <Tabs.Content value="stdout" class="bg-[#444] text-[#fff] p-4">
            <code class="whitespace-pre-wrap wrap-anywhere">{compilerOutputs.stdout}</code>
        </Tabs.Content>
        <Tabs.Content value="c" class="bg-[#444] text-[#fff] p-4">
            <code class="whitespace-pre-wrap wrap-anywhere">{compilerOutputs.c}</code>
        </Tabs.Content>
        <Tabs.Content value="js" class="bg-[#444] text-[#fff] p-4">
            <code class="whitespace-pre-wrap wrap-anywhere">{compilerOutputs.js}</code>
        </Tabs.Content>
    </Tabs.Root>
</div>