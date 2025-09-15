let clickCount = 0;
let scrollCount = 0;
let spacebarCount = 0;


document.body.addEventListener('click', () => {
    clickCount++;
    document.getElementById('clickCount').textContent = clickCount;
});

window.addEventListener('scroll', () => {
    scrollCount++;
    document.getElementById('scrollCount').textContent = scrollCount;
});

document.body.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        spacebarCount++;
        document.getElementById('spacebarCount').textContent = spacebarCount;
    }
});

