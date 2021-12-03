export function switchTheme(newTheme)
{
    if ("theme" in localStorage)
        removeClassFromDocument(localStorage.theme);

    localStorage.theme = newTheme;

    addClassToDocument(localStorage.theme);
}

function addClassToDocument(theme) { document.documentElement.classList.add(theme); }
function removeClassFromDocument(theme) { document.documentElement.classList.remove(theme); }