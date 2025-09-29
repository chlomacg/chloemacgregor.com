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

<div class="mx-4">
    <div class="flex flex-col justify-between lg:flex-row gap-[5vw]">
        <div class="flex-1 bg-[#444] text-[#fff] rounded-md">
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

        <div class="flex-1">
            <section class="mb-4">
                <h2 class="text-2xl font-display font-[600]">Declarations</h2>
                <p>A variable x can be declared with <code class="text-nowrap p-0.5 bg-gray-600 text-[#fff]">let x = definition;</code>. Functions have no special syntax for declaration.</p>
            </section>
            <section class="mb-4">
                <h2 class="text-2xl font-display font-[600]">Functions</h2>
                <p>Functions are always anonymous, are:</p>
                <ul class="list-disc ml-8 text-base/8">
                    <li>Declared as <code class="text-nowrap p-0.5 bg-gray-600 text-[#fff]">fn(x, y, z) {"{ body }"}</code></li>
                    <li>First-class values that can be passed as arguments to other functions</li>
                    <li>Able to capture their arguments</li>
                    <li>Called with the syntax <code class="text-nowrap p-0.5 bg-gray-600 text-[#fff]">fn(x, y, z)</code></li>
                </ul>
            </section>
            <h2 class="text-2xl font-display font-[600]">Conditionals</h2>
            <p>Currently, only the <code class="text-nowrap p-0.5 bg-gray-600 text-[#fff]">if</code> conditional is supported, via the syntax <code class="text-nowrap p-0.5 bg-gray-600 text-[#fff]">if cond {"{ body }"} else {"{ body }"}</code>, where the else part is optional. If-expressions are value expressions, so code such as <code class="text-nowrap p-0.5 bg-gray-600 text-[#fff]">if b {"{ true }"} else {"{ false }"}</code> can be used to stringify booleans.</p>
        </div>
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