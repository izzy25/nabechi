function ImageInput(idResult) {

    this.result = document.getElementById(idResult) || null;
    this.input = document.querySelector('.input-image');
    this.images = [];
    this.files = [];
    this.filesCache = undefined;
    this.names = [];
    this.config = {
        border: '5px dashed grey',
        withStyle: false
    };

    this.result.style = 'border: ' + this.config.border + ';';

    return this;

}

ImageInput.prototype.config = function(config) {

    if(config !== null || config !== undefined){

        for(let i = 0; i < this.config.length; i++){
            if(this.config[i] === config[i]){
                this.config[i] = config[i];
            }
        }

    }

    this.result.style = 'border: ' + this.config.border;

};

ImageInput.prototype.init = function () {

    let context = this;

    //perbedaannya hanya beberapa detik duluan input event
        this.input.addEventListener('change', function (e) {
            context.fileSaver(this.files);
            context.thumbing(this.files);
        });

        this.input.addEventListener('input', function (e) {
            context.removeThumb();
        });

};

ImageInput.prototype.refresh = function () {
    this.removeThumb();

    this.thumbing(this.files);
};

ImageInput.prototype.fileSaver = function(files) {
    this.files = [].slice.call(files);
}

ImageInput.prototype.thumbing = function (files) {

    let context = this;

    for (let i = 0; i < files.length; i++) {
        let file = files[i], dragp = document.createElement('div'), img = document.createElement("img"), reader = new FileReader();

        dragp.className = 'image-result_parent';
        dragp.dataset.index = i;

        if (!file.type.startsWith('image/')){ continue }

        img.classList.add("image-result_thumb");
        img.file = file;

        if(this.config.withStyle){
            dragp.style = 'height: 200px';
            img.style = 'height: 100%';
        }

        let name = document.createElement('label');

        name.innerHTML = file.name;

        dragp.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.
        dragp.appendChild(name);

        /**
        dragp.setAttribute('draggable', true);

        dragp.addEventListener('dragstart', function(event) {
            
            if(event.target.className == 'image-result_parent'){
                context.dragged = event.target;
            }else{
                context.dragged = false;
            }

        }, false);

        dragp.addEventListener('dragover', function(event){
            event.preventDefault();

            if(event.target.className == 'image-result_parent'){
                event.target.style.background = 'rgba(0,255,0,0.1)';
            }else{
                event.target.parentNode.style.background = 'rgba(255,0,0,0.4)';
                context.result.style.cursor = 'not-allowed';
            }

        }, false);

        dragp.addEventListener('dragenter', function(event){
            event.preventDefault();

        }, false);

        dragp.addEventListener('dragleave', function(event){
            event.preventDefault();

            if(event.target.className == 'image-result_parent'){
                event.target.style.background = 'none';
            }else{
                event.target.parentNode.style.background = 'none';
                context.result.style.cursor = 'default';
            }

        }, false);

        dragp.addEventListener('drop', function(event) {
            event.preventDefault();

            context.result.style.cursor = 'default';

            if(event.target.className == 'image-result_parent' && context.dragged !== false && event.target !== context.dragged){
                context.dragged.parentNode.removeChild(context.dragged);

                context.dragged.style.background = 'none';

                event.target.after(context.dragged);

            }else{
                event.target.style.background = 'none';
                event.target.parentNode.style.background = 'none';
                context.result.style.cursor = 'default';
            }

        }, false);
         */

        this.result.appendChild(dragp);

        this.images[i] = img;
        this.names[i] = name;

        reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(file);

    }

    //this.functioning();

};

ImageInput.prototype.functioning = function () {

    let context = this;

    this.names.forEach(function (item, index) {

        item.addEventListener('dblclick', function () {
            context.modalName(item, index);
        });

    });

};

ImageInput.prototype.modalName = function (item, index) {

    let
        scrim = document.createElement('div'),
        container = document.createElement('div'),
        input = document.createElement('input'),
        context = this
    ;

    scrim.className = 'image-input_modal-scrim';

    container.className = 'image-input_modal-container';

    input.className = 'image-input_modal-input';

    input.type = 'text';
    input.value = item.innerHTML;

    container.append(input);
    scrim.append(container);

    document.body.append(scrim);

    input.addEventListener('keyup', function (e) {
        if(e.target.className === 'image-input_modal-input'){

            item.innerHTML = e.target.value;
            context.names[index] = e.target.value;

        }
    });

    scrim.addEventListener('click', function (e) {
        if(e.target.className === 'image-input_modal-scrim'){

            e.target.remove();

        }
    });

};

ImageInput.prototype.removeThumb = function () {

    document.querySelectorAll('.image-result_parent').forEach(function (item) {
        item.remove();
    });

};

ImageInput.prototype.getFiles = function (callback) {

    return this.images;

};

ImageInput.prototype.SortController = function (state) {

    // d,null,g,null,i
    let items = this.files, caches = [], itemMove = [], x = 0, y =0, process = true;

    console.log(this.files);

    state.selected.sort(function(a,b){ return a -b; });

    console.log(state.selected);

    if(process == true){
        // grab array with different place
        for(let i = 0; i < items.length; i++){

            if(i >= state.selected[0]){

                if( i == state.selected[x]){
                    itemMove.push(items[i]);
                    x+=1;
                }else if(i <= state.selected[state.selected.length-1]){
                    itemMove.push(undefined);
                }
            
            }

        }

        console.log(itemMove);

        x = 0;

        for(let i = 0; i < items.length; i++){

            if(i !== state.selected[y]){

                if(i >= state.target){

                    if(itemMove[x] !== undefined){
                        caches.push(itemMove[x]);
                        i-=1;
                    }else{
                        caches.push(items[i]);
                    }

                    x+=1;
                    
                }else{
                    caches.push(items[i]);
                }

            }else{
                y+=1;
            }

        }
    }

    console.log(caches);

    this.files = caches;

    this.refresh();

}

export default ImageInput;