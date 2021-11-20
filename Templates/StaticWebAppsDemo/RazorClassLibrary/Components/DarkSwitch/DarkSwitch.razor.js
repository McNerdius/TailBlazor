const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
darkQuery.addEventListener('change', e => listener(e));

export function switchTheme(newTheme)
{
    if ("theme" in localStorage)
        removeClassFromDocument(localStorage.theme);

    localStorage.theme = newTheme ?? localStorage.theme ?? "system";

    if (localStorage.theme === 'system')
        applySystemTheme();
    else
        addClassToDocument(localStorage.theme);

    return localStorage.theme;
}

function addClassToDocument(theme) { document.documentElement.classList.add(theme); }
function removeClassFromDocument(theme) { document.documentElement.classList.remove(theme); }

function applySystemTheme()
{
    if (darkQuery.matches)
        addClassToDocument('dark');
    else
        removeClassFromDocument('dark');
}

function listener(e)
{
    if (localStorage.theme !== 'system') return;

    applySystemTheme();
}