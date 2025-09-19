<script lang="ts">
    import DarkModeSwitch from "../../components/darkModeSwitch.svelte";
    import CodePen from "../../components/codePen.svelte";
</script>

<div class="min-h-[100vh] py-4 transition-colors duration-300 bg-[#fff] text-[#444] dark:bg-[#171614] dark:text-[#f2eeee]">
    <div class="mx-4 flex flex-col gap-4">
        
        <div class="flex justify-between">
            <p></p>
            <h1 class="text-5xl font-display font-[250]">
                Brevis
            </h1>
            <DarkModeSwitch />
        </div>

        <CodePen />
	
    </div>
</div>