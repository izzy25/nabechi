import Controller from './_controller.js';

export default function Chapter(
    chapter = {
        data_type : 'komik_chapter',
        media_url_array : {}
    },
    listData = {},
    classess = undefined,
    target = undefined
){

    let
        isValid = true,
        div = document.createElement('div'),
        parent = div.cloneNode(),
        parent_bck = div.cloneNode(),
        parent_but = div.cloneNode(),
        parent_img = div.cloneNode(),
        parent_itm = div.cloneNode(),
        parent_list = div.cloneNode(),
        aaa1a = document.createElement('a'),
        aaa1b = document.createElement('h6'),
        button = document.createElement('a'),
        button_i = document.createElement('i'),
        button_l = document.createElement('span'),
        menu = div.cloneNode(),
        menu_list = document.createElement('ul'),
        menu_list_item = document.createElement('li'),
        menu_list_item_text = button_l.cloneNode(),
        scrim_img = div.cloneNode(),
        parent_cmt = div.cloneNode(),
        img_error = window.imageError.cloneNode()
    ;

    if(chapter.data_type !== 'komik_chapter'){
        isValid = false;
    }

    parent_list.className = 'prt';

    button.className = 'mdc-button mdc-button--raised';
    button.dataset.mdcAutoInit = 'MDCRipple';

    button_i.className = 'material-icons mdc-button__icon';
    button_l.className = 'mdc-button__label';

    menu.className = 'mdc-menu mdc-menu-surface menu-chapter';
    menu.dataset.mdcAutoInit = 'MDCMenu';

    menu_list.className = 'mdc-list';
    menu_list.setAttribute('role', 'menu');
    menu_list.setAttribute('aria-hidden', 'false');
    menu_list.setAttribute('aria-orientation', 'vertical');

    menu_list_item.className = 'mdc-list-item but-chapter';
    menu_list_item.setAttribute('role', 'menuitem');

    menu_list_item_text.className = 'mdc-list-item__text';
    menu_list_item_text.innerHTML = 'some text...';

    aaa1a.className = 'material-icons mdc-icon-button butBack';
    aaa1a.setAttribute('tittle', 'Back');
    aaa1a.dataset.mdcAutoInit = 'MDCRipple';
    aaa1a.dataset.mdcRippleIsUnbounded = '';
    aaa1a.innerHTML = 'keyboard_backspace';
    aaa1a.setAttribute('href', '#');

    aaa1b.className = 'back-bar_title mdc-typography--headline6';
    aaa1b.innerHTML = 'Back to home';

    menu_list_item.append(menu_list_item_text);

    button.append(button_i);
    button.append(button_l);

    let prev = button.cloneNode(true),
        next = button.cloneNode(true),
        list = button.cloneNode(true),
        prtp = parent_list.cloneNode(),
        prtn = parent_list.cloneNode()
    ;

    prev.children[0].innerHTML = 'keyboard_arrow_left';
    prev.children[1].innerHTML = 'PREV';
    prev.className += ' but-chapter';

    next.children[0].innerHTML = 'keyboard_arrow_right';
    next.children[1].innerHTML = 'NEXT';
    next.className += ' but-chapter';

    list.children[0].innerHTML = 'format_list_numbered';
    list.children[1].innerHTML = 'LIST';
    list.className += ' but-list';

    listData.forEach(function (item, index) {
        let o = menu_list_item.cloneNode(true);

        o.dataset.id = item.id_data;
        o.children[0].innerHTML = item.name;

        if(chapter.id_data === item.id_data){
            o.setAttribute('tabindex', '0');
        }

        if(item.id_data === chapter.id_data){

            o.className += ' mdc-list-item--selected';

            if(index !== 0){
                next.dataset.id = listData[index - 1].id_data;
            }else{
                next.className += ' hidden';
            }

            if(index !== listData.length - 1 ){
                prev.dataset.id = listData[index + 1].id_data;
            }else{
                prev.className += ' hidden';
            }

        }

        menu_list.append(o);
    });

    menu.append(menu_list);

    parent_list.className += ' mdc-menu-surface--anchor';

    parent_list.append(list);
    parent_list.append(menu);

    prtp.append(prev);
    prtn.append(next);

    parent_bck.append(aaa1a);
    parent_bck.append(aaa1b);

    parent_but.append(prtp);
    parent_but.append(parent_list);
    parent_but.append(prtn);

    parent.className = 'chapter animated fadeIn content';
    parent_but.className = 'parent-button';
    parent_bck.className = 'parent-back';
    parent_img.className = 'parent-image';
    parent_itm.className = 'parent-item-image';
    parent_cmt.className = 'parent-comment';

    let parent_but2 = parent_but.cloneNode(true);

    parent.append(parent_bck);
    
    let hint = document.createElement('div');

    hint.className = 'parent-hint';
    hint.innerHTML = '*scroll to the bottom for the next image...';

    parent.append(hint);

    parent.append(parent_but);
    parent.append(parent_img);
    parent.append(hint.cloneNode(true));
    parent.append(parent_but2);
    parent.append(parent_cmt);

    document.getElementById(target).append(parent);

    window.mdc.autoInit(
        document.getElementById(target)
    );

    return new Controller(
        chapter,
        parent_itm,
        parent_img,
        img_error
    );

}