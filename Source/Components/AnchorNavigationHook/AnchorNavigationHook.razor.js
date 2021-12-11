export function BlazorScrollToId(id)
{
    const element = document.getElementById(id);
    if (element instanceof HTMLElement)
    {
        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
    }
    return id;
}