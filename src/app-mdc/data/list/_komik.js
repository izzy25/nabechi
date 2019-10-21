export default function ListComic(
    dataList = {},
    target
){

    let div = document.createElement('div'),
        parent = div.cloneNode(),
        item = div.cloneNode(),
        title = document.createElement('span'),
        aaa1a = document.createElement('a'),
        aaa1b = document.createElement('h6'),
        Node = []
    ;

    parent.className = 'list-comic animated slideInUp content';
    item.className = 'list-comic_item';
    title.className = 'list-comic_item-title';

    aaa1a.className = 'material-icons mdc-icon-button butBack';
    aaa1a.setAttribute('tittle', 'Back');
    aaa1a.dataset.mdcAutoInit = 'MDCRipple';
    aaa1a.dataset.mdcRippleIsUnbounded = '';
    aaa1a.innerHTML = 'keyboard_backspace';
    aaa1a.setAttribute('href', '#');

    aaa1b.className = 'back-bar_title mdc-typography--headline6';
    aaa1b.innerHTML = 'Back to home';

    dataList.forEach(function (o, j) {

        let i = item.cloneNode(), t = title.cloneNode();

        t.innerHTML = o.name;

        i.dataset.id = o.id_data;
        i.append(t);

        parent.append(i);

        Node[j] = i;

    });

    div.append(aaa1a);
    div.append(aaa1b);
    div.className = 'parent-button content back-bar';

    document.getElementById(target).append(div);
    document.getElementById(target).append(parent);

    return Node;

}