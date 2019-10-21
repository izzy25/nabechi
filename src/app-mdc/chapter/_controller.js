let Glob;

function Controller(
    chapter,
    parent_itm,
    parent_img,
    imageError
)
{

    window.scrollTo(0, 0);

    this.chapter = chapter;
    this.stop = false;
    this.currentLoop = 0;
    this.scrolled = false;
    this.waitScroll = undefined;

    this.parent_itm = parent_itm;
    this.parent_img = parent_img;
    this.imageError = imageError;
    this.imageRequest = [];

    this.detectScroll;
    this.nextImage();

    Glob = this;

}

Controller.prototype.finish = function (callback) {

    return callback;

};

Controller.prototype.nextImage = function () {

    let context = this;

    if(this.currentLoop <= this.chapter.media_url_array.length-1 && this.stop === false){

        let img = document.createElement('img'), parent_itm = this.parent_itm.cloneNode(true);

        img.dataset.number = this.currentLoop;

        img.onerror = function(){

            img.remove();

            let err = context.imageError.cloneNode(true);

            err.dataset.number = context.currentLoop;

            parent_itm.append(err);

        };

        img.src = context.chapter.media_url_array[context.currentLoop];

        parent_itm.append(img);

        context.parent_img.append(parent_itm);

        this.imageRequest.push(img);

        this.currentLoop+=1;

    }else{

        window.removeEventListener('scroll', scroll, true);
        window.removeEventListener('touchmove', scroll, true);
        this.stop = true;
        return this.finish;

    }

    if(this.currentLoop < 4){
        this.nextImage();
    }else{
        window.addEventListener('scroll', scroll, true);
        window.addEventListener('touchmove', scroll, true);
    }

};

Controller.prototype.detectScroll = function (callback) {
    return callback;
};

Controller.prototype.stopChapter = function () {
    window.removeEventListener('scroll', scroll, true);
    window.removeEventListener('touchmove', scroll, true);
    return this.stop = true;
};

function scroll(){

    if(window.scrollY >= (document.body.scrollHeight - window.innerHeight) - 1500 && Glob.scrolled === false){
    	Glob.scrolled = true;
    	Glob.nextImage();
    }
    
    if(Glob.waitScroll === undefined){
        Glob.waitScroll = setTimeout(function(){
            Glob.waitScroll = undefined;
            Glob.scrolled = false;
        }, 200);
    }
    

}

export default Controller;