

// Список изображений с соответствующими вероятностями
const images = [
    { src: "./app_icon.png", probability: 0.5 },
    { src: "./standoff case.png", probability: 0.3 },
    { src: "./pngegg (1).png", probability: 0.2 }
];

function changeImage() {
    const randomValue = Math.random();
    let cumulativeProbability = 0;

    for (let image of images) {
        cumulativeProbability += image.probability;
        if (randomValue < cumulativeProbability) {
            document.getElementById('mainImage').src = image.src;
            break;
        }
    }
}

// let tg = window.Telegram.WebApp;

// tg.expand();

