<script lang="ts">
    import TitleCard from '../components/titleCard.svelte';
    import DarkModeSwitch from '../components/darkModeSwitch.svelte';
    import Links from '../components/links.svelte';
</script>

<div class="min-h-[100vh] py-4 transition-colors duration-300 bg-[#fff] text-[#444] dark:bg-[#171614] dark:text-[#f2eeee]">
    <div class="mx-auto max-w-300">
        <div class="mx-6 flex flex-col">
            <DarkModeSwitch />
            <section class="min-h-[90vh] flex flex-col justify-center gap-12">
                <TitleCard />
                <Links />
            </section>

            <section class="flex flex-col gap-12">
                <h1 class="text-5xl font-display font-[325] underline">Projects</h1>
                <section class="flex flex-col gap-6">
                    <div class="flex flex-row justify-between">
                        <h2 class="text-4xl font-display font-[250]"><a href="/brevis" class="underline">Brevis</a></h2>
                        <span class="font-display font-[600]">2021 - Present</span>
                    </div>
                    <span>
                        <a href="/brevis" class="underline">Brevis</a> is a concise functional programming language that I designed.
                        The compiler for it is currently written in Rust, and itself can compile Brevis to both C and JavaScript.
                        The compiler's source is hosted on <a href="https://www.github.com/chlomacg/brevis" class="underline">GitHub</a>.
                    </span>
                </section>
            </section>
        </div>
    </div>
</div>