
$(document).ready(function ()
{
    $("#collapseButton").click(function ()
    {
        var navbar = document.getElementById("navbar");

        collapsed = navbar.classList.contains("show")

        if (!collapsed)
            navbar.classList.add("show");
        else
            navbar.classList.remove("show");
    });
});