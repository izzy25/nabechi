function CarouselFunction(containerID) {

    let context = this;

    this.container = document.getElementById(containerID) || document.body;

    this.slides = this.container.querySelector('.data-carousel');
    this.dots = this.container.querySelector('.data-carousel-dot');
    this.constX = this.slides.children[0].clientWidth;
    this.count = this.slides.children.length;
    this.current = 0;
    this.x = this.slides.children[0].clientWidth;
    this.slides.style = 'transform: translateX(' + this.x + ');';
    this.played = false;
    this.buttoned = false;
    this.touchStart = undefined;
    this.touchEnd = undefined;
    this.snapX = undefined;

    this.dots.addEventListener('click', function (e) {

        return context.to(parseInt(e.target.dataset.index));

    });

    this.slides.addEventListener('touchstart', function(e) {
        context.stop();
        return context.touchStart = e.changedTouches[0].clientX;
    });

    this.slides.addEventListener('touchend', function(e) {
        context.play(true);
        context.touchEnd = e.changedTouches[0].clientX;
        if(context.touchStart !== undefined && context.touchEnd !== undefined){
            if((context.touchStart - context.touchEnd) >= 200 && (context.current !== context.count-1)){
                return context.next();
            }else if((context.touchStart - context.touchEnd) <= -200 && (context.current !== 0)){
                return context.prev();
            }else{
                //console.log('cancel');
            }
            context.touchStart = undefined;
            context.touchEnd = undefined;
        }else{
            //console.log('cancel');
        }
    });

    this.slides.addEventListener('mouseover', function () {

        return context.stop();

    });

    this.slides.addEventListener('mouseout', function () {

        return context.play(true);

    });

    window.addEventListener('resize', function () {

        return context.renew();

    });

}

CarouselFunction.prototype.renew = function(){

    this.constX = this.slides.children[0].clientWidth;
    this.count = this.slides.children.length;
    this.current = 0;
    this.x = this.slides.children[0].clientWidth;
    this.slides.style = 'transform: translateX(' + this.x + ');';

};


CarouselFunction.prototype.to = function(number){

    this.stop();

    if(number < this.count){

        this.current = number;

        this.x = this.constX * number;

        this.slides.style = 'transform: translateX(-' + this.x + 'px);';

        this.play(true);

    }

};

CarouselFunction.prototype.next = function () {

    this.stop();

    if(this.current !== this.count - 1){

        let current = 1 + this.current;

        this.current += 1;

        this.x = this.constX * current;

    }else{

        this.x = 0;

        this.current = 0;

    }

    this.slides.style = 'transform: translateX(-' + this.x + 'px);';

    this.play(true);

};

CarouselFunction.prototype.prev = function () {

    this.stop();

    if(this.current !== 0){

        let current = 1 + this.current;

        this.current -= 1;

        this.x = this.x - this.constX;

    }else{

        this.current = this.count - 1;

        this.x = this.constX * this.current;

    }

    this.slides.style = 'transform: translateX(-' + this.x + 'px);';

    this.play(true);

};

CarouselFunction.prototype.play = function (resume) {

    let context = this;

    if(resume === false){
        window.setTimeout(function() {
            context.renew();
            }, 2000)
        ;
    }

    context.auto = window.setInterval(function () {
        context.played = true;
        context.next();
        }, 3000)
    ;

};

CarouselFunction.prototype.stop = function () {

    clearInterval(this.auto);

};

export default CarouselFunction;