var Image = function (newImage) {

    if(newImage !== undefined){

        if(this.list !== undefined){

            let length = this.list.length;

            this.list[length] = newImage;

        }else{

            this.list = [newImage];

        }

    }

};

Image.prototype.setSrc = function (src) {

    return this.src = src;

};

Image.prototype.onError = function (callback) {

    return this.addEventListener('error', callback);

};

Image.prototype.onFinish = function (callback) {

    return this.addEventListener('load', callback);

};

export default Image;