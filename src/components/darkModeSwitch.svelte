<script lang="ts">
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
        );
    }
</script>


<div class="flex flex-row-reverse p-2">
    <button onclick={toggleTheme}>
        <span class="text-[#9f9f9f] dark:text-[#fff]">Dark</span> / <span class="text-[#222] dark:text-[#aaa]">Light</span>
    </button>
</div>

