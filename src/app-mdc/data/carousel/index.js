var Carousel = function (
    dataList = {},
    version = 1,
    target
)
{

    let div = document.createElement('div'),
        parent = div.cloneNode(),
        item = div.cloneNode(),
        image = document.createElement('img'),
        title = document.createElement('span'),
        label = title.cloneNode(),
        rating = document.createElement('div'),
        rate = document.createElement('i'),
        rate_l = title.cloneNode(),
        containerDot = rating.cloneNode(),
        itemDot = rating.cloneNode(),
        error = window.imageError.cloneNode(),
        Node = []
    ;

    div.className = 'parent';

    if(version === 1){
        parent.className = 'data-carousel';
    }else{
        parent.className = 'data-carousel-v2';
    }

    item.className = 'data-carousel_item';

    image.className = 'data-carousel_item-img';
    error.className = 'data-carousel_item-img';
    title.className = 'data-carousel_item-title';
    rating.className = 'data-carousel_item-rating';
    rate.className = 'data-carousel_item-rating-rate';
    rate_l.className = 'data-carousel_item-rating-label';
    rate_l.innerHTML = 'Rating :';

    containerDot.className = 'data-carousel-dot';
    itemDot.className = 'data-carousel-dot_item';

    Loop(0);

    function Loop(loop){

        if(loop < dataList.length){

            let p_im = div.cloneNode(),
                p_ti = div.cloneNode(),
                it = item.cloneNode(),
                im = image.cloneNode(),
                ti = title.cloneNode(),
                ra = rating.cloneNode(),
                cra = rate.cloneNode(),
                lra = rate_l.cloneNode(true),
                id = itemDot.cloneNode()
            ;

            if(dataList[loop].id !== undefined){
                it.dataset.id = dataList[loop].id;
            }

            if(dataList[loop].type !== undefined){

                if(dataList[loop].type === 'komik'){
                    it.className += ' butComic';
                }else{
                    it.className += ' butChapter';
                }

            }

            id.dataset.index = loop;

            containerDot.append(id);

            if(dataList[loop].title !== undefined){
                ti.innerHTML = dataList[loop].title;
            }

            if(dataList[loop].rate !== undefined){
                cra.innerHTML = dataList[loop].rate;
            }

            if(dataList[loop].image !== undefined){
                im.src = dataList[loop].image;
            }
            
            if(im.height > 399){
                im.style = "transform: translateY(-25%);";
            }

            im.addEventListener('error', function() {
                im.remove();
                let l = error.cloneNode(), n = p_im;
                if(l.height > 399){
                    l.style = "transform: translateY(-25%);";
                }
                n.append(l);
            });

            ra.append(lra);
            ra.append(cra);

            p_ti.append(ti);
            p_ti.append(ra);

            p_im.append(im);

            it.append(p_im);
            it.append(p_ti);

            it.dataset.index = loop;

            parent.append(it);

            Node[loop] = ti;

            return Loop(loop+1);
        }

    }

    document.getElementById(target).append(parent);
    document.getElementById(target).append(containerDot);

    return Node;

};

export default Carousel;