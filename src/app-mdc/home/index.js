import Carousel from '../data/carousel/index.js';
import CarouselFunction from '../data/carousel/_function.js';
import List from '../data/list/index.js';

/**---------------------------------------------------------------------------------
 * Image function
 * image() is function calling in index page or create list with image_header first
 * ---------------------------------------------------------------------------------
 * @param dataList
 * @param classess
 * @param target
 */
function image(
    dataList = [
        {image_header: '../images/touch/icon-128x128.png', name: 'Label....', data_type: 'komik', carousel: undefined}
    ],
    classess = undefined,
    target = undefined
) {

    let middle = document.createElement('section'),
        sidebar = document.createElement('section'),
        parent = document.createElement('ul'),
        item = document.createElement('li'),
        parent2 = document.createElement('div'),
        subhead = parent2.cloneNode(),
        label = document.createElement('span'),
        carousel = parent2.cloneNode(),
        class_element = ['', '', '', '', ''],
        App = {image:[]}
    ;

    middle.className = 'section-middle animated slideInUp content';
    sidebar.className = 'section-sidebar content';
    sidebar.id = 'sidebar';

    for (let i = 0; i < class_element.length; i++) {

        if (classess !== undefined) {
            if (classess[i] !== undefined) {
                class_element[i] = classess[i];
            }
        } else {
            class_element[i] = '';
        }

    }

    carousel.id = 'carousel';
    carousel.className = 'carousel';

    subhead.className = 'subhead-label mdc-elevation--z1';
    subhead.innerHTML = 'Most Popular';

    middle.append(carousel);

    parent.className = 'mdc-image-list content ' + class_element[0];

    item.className = 'mdc-image-list__item butComic mdc-ripple-surface mdc-ripple-surface--primary' + class_element[1];
    item.dataset.mdcAutoInit = 'MDCRipple';

    let parentClone = parent2.cloneNode(false), screen = parent2.cloneNode(false);

    label.className = 'mdc-image-list__label ' + class_element[3];
    parentClone.className = 'mdc-image-list__supporting';

    for (let i = 0; i < dataList.length; i++) {

        item.dataset.id = dataList[i].id_data;

        let img = new Image(), a = document.createElement('div'), j = item.cloneNode(), x = parentClone.cloneNode(true), l = label.cloneNode(true);

        a.className = 'mdc-image-list_image-aspect-container ' + class_element[2];

        img.src = dataList[i].image_header;

        // change this to Tittle Comic or something
        l.innerHTML = dataList[i].name;

        j.append(a);
        x.append(l);
        j.append(x);

        parent.append(j);

        App.image.push([img,a]);

    }

    middle.append(subhead);
    middle.append(parent);

    document.getElementById(target).className = 'flexing';

    document.getElementById(target).append(middle);

    let subhead_list = subhead.cloneNode(true);
    subhead_list.innerHTML = 'Recent Updated';

    sidebar.append(subhead_list);

    document.getElementById(target).append(sidebar);

    if (dataList.list_data !== undefined) {

        App.list = List(dataList.list_data, 1, sidebar.id);

    }

    if (dataList.carousel !== undefined) {

        Carousel(dataList.carousel, 1, carousel.id);

    }

    window.mdc.autoInit(
        document.getElementById(target)
    );

    App.carousel = new CarouselFunction();

    return App;

}

export default function Home(dataList, classess, target) {
    return image(dataList, classess, target);
}