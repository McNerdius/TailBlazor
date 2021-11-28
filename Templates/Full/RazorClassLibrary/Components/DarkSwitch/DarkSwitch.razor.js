const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
darkQuery.addEventListener('change', e => listener(e));

export function switchTheme(newTheme)
{
    localStorage.theme = newTheme ?? localStorage.theme ?? "system";

    switch (localStorage.theme)
    {
        case 'system':
            applySystemTheme();
            break;
        case 'light':
            removeClassFromDocument('dark');
            break;
        case 'dark':
            addClassToDocument('dark')
            break;
        default:
            console.log('unsupported theme');
    };

    return localStorage.theme;
}

function addClassToDocument(theme) { document.documentElement.classList.add(theme); }
function removeClassFromDocument(theme) { document.documentElement.classList.remove(theme); }

function applySystemTheme()
{
    if (darkQuery.matches)
    {
        addClassToDocument('dark');
    }
    else
    {
        removeClassFromDocument('dark');
    }
}

function listener(e)
{
    if (localStorage.theme !== 'system') return;

    applySystemTheme();
}