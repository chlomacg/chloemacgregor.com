<script lang="ts">
    import TitleCard from './components/titleCard.svelte';
    import Links from './components/links.svelte';
    import { useTheme } from 'svelte-themes';

    const theme = useTheme();
    function toggleTheme() {
        if(theme.theme === 'dark')
            theme.theme = 'light';
        else
            theme.theme = 'dark';
        setTheme();
    }
    function setTheme() {
        document.documentElement.classList.toggle(
            'dark',
            localStorage.theme === 'dark'
        )
    }
</script>

<div class="min-h-[100vh] transition-colors duration-300 bg-[#fff] text-[#444] dark:bg-[#444] dark:text-[#f2eeee]">
    <div class="mx-4 flex flex-col">
        <div class="flex flex-row-reverse p-2">
            <button onclick={toggleTheme}>
                <span class="text-[#9f9f9f] dark:text-[#fff]">Dark</span> / <span class="text-[#222] dark:text-[#aaa]">Light</span>
            </button>
        </div>
        <section class="min-h-[90vh] flex flex-col justify-center gap-12">
            <TitleCard />
            <Links />
        </section>

        <section class="flex flex-col gap-12">
            <h1 class="text-5xl font-display font-[325]"><u>Projects</u></h1>
            <section class="flex flex-col gap-6">
                <div class="flex flex-row justify-between">
                    <h2 class="text-4xl font-display font-[250]"><u>Brevis</u></h2>
                    <span class="font-display font-[600]">2021 - Present</span>
                </div>
                <span>
                    Brevis is a concise functional programming language that I designed.
                    The compiler for it is currently written in Rust, and itself can compile Brevis to both C and JavaScript.
                    The compiler's source is hosted on <a href="https://www.github.com/chlomacg/brevis" style="hover:overline">GitHub</a>.
                </span>
            </section>
        </section>
    </div>
</div>