const btnChangeColor_click = e => {
    let colorIndex = Math.floor(Math.random() * 10);
    e.target.parentElement.previousElementSibling.style.color = COLORS[colorIndex];
}