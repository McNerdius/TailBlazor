export function scrollToId(id)
{
    if (id === "")
    {
        const element = document.getElementById("body");
        element.scroll(
            {
                top: 0,
                behavior: "smooth"
            }
        );
    }
    else
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
    }
}