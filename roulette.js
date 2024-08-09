const items = [
                'для рулетки/1.png',
                'для рулетки/2.png',
                'для рулетки/4.png',
                'для рулетки/6.png',
                'для рулетки/7.png',
                'для рулетки/9.png',
                'для рулетки/12.png',
                'для рулетки/8.png',
                'для рулетки/18.png',
                'для рулетки/13.png',
  'для рулетки/3.png',
  'для рулетки/5.png',
  'для рулетки/14.png',
  'для рулетки/10.png',
  'для рулетки/11.png',
  'для рулетки/15.png',
  'для рулетки/16.png',
  'для рулетки/17.png'
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
