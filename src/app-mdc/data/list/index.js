import ListComic from './_komik.js';

var Node = [
    [],
    []
];

function List(
    dataList = {},
    version = 1,
    target
)
{

    if(version === 3){

        return ListComic(dataList, target);

    }else{

        let
            div = document.createElement('div'),
            parent = div.cloneNode(),
            item = div.cloneNode(),
            image = document.createElement('img'),
            title = document.createElement('span'),
            label = title.cloneNode(),
            rating = document.createElement('i'),
            button = document.createElement('button'),
            aaa1a = document.createElement('a'),
            aaa1b = document.createElement('h6'),
            showmore = button.cloneNode(),
            error = window.imageError.cloneNode()
        ;

        div.className = 'parent';

        if(version === 1){
            parent.className = 'data-list mdc-elevation--z1 animated slideInUp content';
        }else{
            parent.className = 'data-list-v2 content';
        }

        item.className = 'data-list_item';
        if(version === 2){
            item.className += ' mdc-elevation--z3';
        }

        if(target !== 'sidebar'){

            aaa1a.className = 'material-icons mdc-icon-button butBack';
            aaa1a.setAttribute('tittle', 'Back');
            aaa1a.dataset.mdcAutoInit = 'MDCRipple';
            aaa1a.dataset.mdcRippleIsUnbounded = '';
            aaa1a.innerHTML = 'keyboard_backspace';
            aaa1a.setAttribute('href', '#');

        }

        aaa1b.className = 'back-bar_title mdc-typography--headline6';
        aaa1b.innerHTML = 'Back to home';

        image.className = 'data-list_item-img';
        error.className = 'data-list_item-img';
        title.className = 'data-list_item-title';
        label.className = 'data-list_item-label';
        rating.className = 'data-list_item-rating';

        showmore.className = 'data-list_item-show';
        showmore.innerHTML = 'show more';

        if(dataList.length !== 0){
            new Loop(0, parent, div, item, image, error, title, label, rating, dataList, version);
        }else{
            parent.innerHTML = '<p class="mdc-typography--headline6" style="text-align: center;color: var(--mdc-theme-text-disabled-on-light);">Nothing Found... Please try again</p>';
        }

        if(target !== 'sidebar'){
            div.append(aaa1a);
            div.append(aaa1b);
            div.className = 'parent-button content back-bar';
            document.getElementById(target).append(div);
        }

        document.getElementById(target).append(parent);

        return Node;

    }

}

function Loop(loop, parent, div, item, image, error, title, label, rating, dataList, version) {

    if(loop < dataList.length){

        let p_im = div.cloneNode(),
            p_ti = div.cloneNode(),
            it = item.cloneNode(),
            im = image.cloneNode(),
            ti = title.cloneNode(),
            la = label.cloneNode(),
            cl = document.createElement('ul'),
            cl_i = document.createElement('li'),
            ra = rating.cloneNode()
        ;

        if(dataList[loop].chapter_list !== undefined){

            cl.className = 'data_list_item-chapter-list';
            cl_i.className = 'data_list_item-chapter-list-item';

            for(let i = 0; i < dataList[loop].chapter_list.length; i++){

                let copy_i = cl_i.cloneNode();

                copy_i.dataset.id = dataList[loop].chapter_list[i].id_data;
                copy_i.innerHTML = dataList[loop].chapter_list[i].name;

                cl.append(copy_i);

                Node[1][Node[1].length] = copy_i;

            }

        }


        if(dataList[loop].name !== undefined){
            ti.innerHTML = dataList[loop].name;
        }

        if(dataList[loop].id_data !== undefined){
            ti.dataset.id = dataList[loop].id_data;
        }

        if(dataList[loop].data_type !== undefined){

            if(dataList[loop].data_type === 'komik'){
                dataList[loop].data_type = 'Komik';
            }else{
                dataList[loop].data_type = 'Chapter';
            }

            ti.dataset.type = dataList[loop].data_type;
            la.innerHTML = dataList[loop].data_type.substr(0,1);
        }

        if(dataList[loop].image_header !== undefined){
            im.src = dataList[loop].image_header;
        }

        if(dataList[loop].image !== undefined){
            im.src = dataList[loop].image;
        }

        if(dataList[loop].genre !== undefined){
            ti.innerHTML = dataList[loop].genre.toLocaleUpperCase();

            if(dataList[loop].tags !== undefined){

                for(let i = 0; i < dataList[loop].tags.length; i++){
                    la.innerHTML += '#' + dataList[loop].tags[i];

                    if(i < dataList.length - 1){
                        la.innerHTML += ' ';
                    }
                }

            }

        }

        im.addEventListener('load', function() {
            im.parentNode.style.background = 'transparent';
        });

        im.addEventListener('error', function(){
            let l = error.cloneNode();

            this.src = l.src;

            im.parentElement.style.background = 'transparent';

        });

        p_ti.append(ti);

        if(dataList[loop].chapter_list !== undefined) {
            p_ti.append(cl);
        }

        p_im.append(im);
        p_im.append(la);

        it.append(p_im);
        it.append(p_ti);

        parent.append(it);

        Node[0][loop] = ti;

        return new Loop(loop+1, parent, div, item, image, error, title, label, rating, dataList, version);

    }

}

export default List;