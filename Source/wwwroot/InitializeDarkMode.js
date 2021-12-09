var theme =
    localStorage.getItem("theme") ??
    (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

switch (theme)
{
    case "light":
        document.documentElement.classList.remove("dark");
        break;
    case "dark":
        document.documentElement.classList.add("dark");
        break;
    default:
        console.log("unsupported theme: " + theme);
        localStorage.removeItem("theme");
        document.documentElement.classList.remove("dark");
        break;
}

localStorage.theme = theme;