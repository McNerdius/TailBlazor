const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
darkQuery.addEventListener('change', e => listener(e));

export function switchTheme(theme)
{
    if (theme === 'load')
    {
        theme = ('theme' in localStorage)
            ? localStorage.theme
            : 'system';
    }

    localStorage.theme = theme;

    let currentTheme = theme;

    if (currentTheme === 'system')
        currentTheme = darkQuery.matches ? 'dark' : 'light';

    if (currentTheme === 'dark')
        document.documentElement.classList.add('dark');
    else
        document.documentElement.classList.remove('dark');

    return theme;
}

function listener(darkModeSwitch)
{
    if (localStorage.theme !== 'system') return;

    if (darkModeSwitch.matches)
        document.documentElement.classList.add('dark');
    else
        document.documentElement.classList.remove('dark');
}