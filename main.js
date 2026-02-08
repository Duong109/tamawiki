const layers = [
    document.getElementById('orth'),
    document.getElementById('l1'),
    document.getElementById('l2'),
    document.getElementById('l3'),
    document.getElementById('l4'),
    document.getElementById('l5')
];

function hover(event) {
    const target = event.target;
    target.style.transform = "scale(1.1)";
    target.style.transition = "transform 0.4s ease";
    target.style.zIndex = "100";
}

function unhover(event) {
    const target = event.target;
    target.style.transform = "scale(1.0)";
    target.style.zIndex = "auto";
}

layers.forEach(layer => {
    if (layer) { 
        layer.addEventListener("mouseover", hover);
        layer.addEventListener("mouseout", unhover);
    }
});