const items = [
                'гифки выпадения/necromancer.gif',
                'гифки выпадения/Famas.gif',
                'гифки выпадения/AWM-Festal-Wrap.gif',
                'гифки выпадения/AKR12-Geometric.gif',
                'гифки выпадения/bubblegum.gif',
                'гифки выпадения/AKR-Tag-King.gif'
];

class Roulette {

    constructor() {
        this.SIZE = 200;
        this.LENGTH = 80;
        this.DURATION = 5000;

        this.progress = 0;

        this.startTime = 0;
        this.lastItem = 0;

        this.level = 0;
        
        this.roulette = document.getElementById("roulette");
        this.items = this.roulette.children;
    }

    init(images) {
        if (!Array.isArray(images)) {
            console.log("You need to pass images as an array!");
        }

        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        for (let i = 0; i < 6; i++) {
            const item = this.items[i];
            
            item.style.position = 'absolute';
            item.style.transform = `translateX(${i * this.SIZE}px)`;
            item.lastChild.src = this.getItem();
        }
    }

    start(lastItem) {
        this.level = 0;
        this.progress = 0;
        this.lastItem = lastItem;
        this.startTime = Date.now();

        for (let i = 0; i < 6; i++) {
            this.items[i].value = 0;
        }

        window.requestAnimationFrame(() => this.update());
    }

    update() {
        this.progress = (Date.now() - this.startTime) / this.DURATION;

        if (this.progress > 1) {
            this.progress = 1;
            this.render();
            return;
        }

        this.render();

        window.requestAnimationFrame(() => this.update());
    }

    render() {
        const off = this.interpolator(this.progress) * this.SIZE * this.LENGTH;
        const WIDTH = this.SIZE * 6;

        for (let i = 0; i < 6; i++) {
            const item = this.items[i];
            const base = (i + 1) * this.SIZE - off;
            const index = -Math.floor(base / WIDTH);
            const value = ((base % WIDTH) + WIDTH) % WIDTH - this.SIZE;
            
            item.style.transform = `translateX(${value}px)`;

            if (item.value != index) {
                this.level += index - item.value;

                item.value = index;
                item.lastChild.src = this.getItem();

                if (this.level == this.LENGTH - 3) {
                    item.lastChild.src = this.getItem(this.lastItem);
                }
            }
        }
    }

    interpolator(val) {
        return Math.pow(Math.sin(val * Math.PI / 2), 2.6);
    }

    getItem(val) {
        val = typeof val !== "undefined" ? val : Math.floor(Math.random() * items.length);
        return items[val];
    }

}
