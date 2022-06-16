export default function createIconWithTooltip(tooltip_description, icon_src) {
    let icon = document.createElement('img');
    icon.className = 'img-fluid';
    icon.dataset.bsToggle = "tooltip";
    icon.dataset.bsPlacement = "top";
    icon.dataset.bsHtml = "true";
    icon.title = tooltip_description;
    icon.src = icon_src;
    icon.draggable = false;
    return icon;
}
