function data_detail(
    data = {},
    chapter = {},
    classess = undefined,
    target = undefined
) {

    let
        div = document.createElement('div'),
        layoutGrid = div.cloneNode(),
        layoutGrid_inner = div.cloneNode(),
        layoutGrid_cell = div.cloneNode(),
        listGroup = div.cloneNode(),
        listGroup_subhead = document.createElement('h5'),
        list = document.createElement('ul'),
        list_item = document.createElement('li'),
        class_element = ['', '', '', '', '']
    ;

    for(let i = 0; i < class_element.length; i++){

        if(classess !== undefined){
            if(classess[i] !== undefined){
                class_element[i] = classess[i];
            }
        }else{
            class_element[i] = '';
        }

    }

    layoutGrid.className = 'mdc-layout-grid';
    layoutGrid_inner.className = 'mdc-layout-grid_inner';
    layoutGrid_cell.className = 'mdc-layout-grid__cell';
    listGroup.className = 'mdc-list-group mdc-elevation--z1 style-chapter-list';
    listGroup_subhead.className = 'mdc-list-group__subheader mdc-typography--headline5';
    list.className = 'mdc-list';
    list_item.className = 'mdc-list-item chapter-item';
    list_item.dataset.mdcAutoInit = 'MDCRipple';

    let
        a = layoutGrid.cloneNode(),
        aa = layoutGrid_inner.cloneNode(),
        aaa = layoutGrid_cell.cloneNode(),
        aaa1 = layoutGrid_cell.cloneNode(),
        aaa1a = document.createElement('a'),
        aaa1b = document.createElement('h6'),
        aaaa = document.createElement('img'),
        aab = layoutGrid_cell.cloneNode(),
        aaba = layoutGrid.cloneNode(),
        aabaa = layoutGrid_inner.cloneNode(),
        aabaaa = layoutGrid_cell.cloneNode(),
        aabaaaa = document.createElement('h4'),
        aabaaab = document.createElement('a'),
        aabaaac = aabaaab.cloneNode(),
        aabaab = layoutGrid_cell.cloneNode(),
        aac = layoutGrid_cell.cloneNode(),
        ab = layoutGrid_inner.cloneNode(),
        aba = layoutGrid_cell.cloneNode(),
        abaa = listGroup.cloneNode(),
        abaaa = listGroup_subhead.cloneNode(),
        abaab = list.cloneNode(),
        abaaba = list_item.cloneNode(),
        abaabaa = document.createElement('i'),
        abaabab = document.createElement('a'),
        abaabac = document.createElement('button')
    ;

    //adding custom class
    a.className += ' content';
    aa.className += ' ';
    aaa.className += '--span-4-desktop mdc-layout-grid__cell--span-3-tablet mdc-layout-grid__cell--span-4-phone animate slideInUp image-parent';
    aaa1.className += '--span-4-desktop mdc-layout-grid__cell--span-3-tablet mdc-layout-grid__cell--span-4-phone back-bar';

    aaa1a.className = 'material-icons mdc-icon-button butBack';
    aaa1a.setAttribute('tittle', 'Back');
    aaa1a.dataset.mdcAutoInit = 'MDCRipple';
    aaa1a.dataset.mdcRippleIsUnbounded = '';
    aaa1a.innerHTML = 'keyboard_backspace';
    aaa1a.setAttribute('href', '#');

    aaa1b.className = 'back-bar_title mdc-typography--headline6';
    aaa1b.innerHTML = 'Back to home';

    aaa1.append(aaa1a);
    aaa1.append(aaa1b);

    aaaa.src = data.image_header;

    aaaa.className = 'mdc-elevation--z4 animate fadeIn image-header';

    aaaa.addEventListener('load', function () {

        aaa.append(aaaa);

    });

    aaaa.addEventListener('error', function(){

        let error = window.imageError.cloneNode(true);

        error.className = 'mdc-elevation--z4 image-header';

        aaa.append(error);

    });


    aab.className += '--span-6-desktop mdc-layout-grid__cell--span-5-tablet mdc-layout-grid__cell--span-4-phone';

    aabaaa.className += '--span-12 detail-head';
    aabaaaa.className = 'komik-title mdc-typography--headline4';
    aabaaaa.innerHTML = data.name;
    aabaaab.className = 'material-icons mdc-icon-button';
    aabaaab.setAttribute('title', 'Share');
    aabaaab.dataset.mdcAutoInit = 'MDCRipple';
    aabaaab.dataset.mdcRippleIsUnbounded = '';
    aabaaab.innerHTML = 'share';
    aabaaab.setAttribute('href', '#');
    aabaaac.className = 'material-icons mdc-icon-button';
    aabaaac.setAttribute('title', 'Edit');
    aabaaac.dataset.mdcAutoInit = 'MDCRipple';
    aabaaac.dataset.mdcRippleIsUnbounded = '';
    aabaaac.innerHTML = 'edit';
    aabaaac.setAttribute('href', '#');
    aabaab.className += '--span-12 description';
    aabaab.innerHTML = data.description;

    aba.className += '--span-12';

    abaaa.innerHTML = 'Chapter List';
    abaaa.id = 'chapter-list';
    abaab.dataset.mdcAutoInit = 'MDCList';

    //This is icon for bookmarks user
    abaabaa.className = 'material-icons mdc-list-item__graphic';
    abaabaa.setAttribute('aria-hidden', 'true');
    abaabaa.innerHTML = "turned_in_not";

    //This is title of chapter
    abaabab.className = 'mdc-list-item__text mdc-typography--headline6';
    abaabab.setAttribute('href', '#chapter-list');

    //Button Edit Chapter
    abaabac.className = 'material-icons mdc-icon-button account-restricted';
    abaabac.setAttribute('tittle', 'Edit Comic');
    abaabac.innerHTML = "edit";

    if(chapter.length > 0 || chapter.length !== undefined) {

        for(let i = 0; i < chapter.length; i++) {

            let
                item = abaaba.cloneNode(),
                icon = abaabaa.cloneNode(true),
                head = abaabab.cloneNode()
            ;

            item.dataset.id = chapter[i]['id_data'];
            head.innerHTML = chapter[i]['name'];

            item.append(icon);
            item.append(head);

            abaab.append(item);

        }

    }else{

        abaabab.innerHTML = '----Not Have Chapter----';

        abaaba.append(abaabaa);
        abaaba.append(abaabab);
        //abaaba.append(abaabac);

        abaab.append(abaaba);

    }

    aabaaa.append(aabaaaa);
    aabaaa.append(aabaaab);
    aabaaa.append(aabaaac);

    aabaa.append(aabaaa);
    aabaa.append(aabaab);

    aaba.append(aabaa);

    aab.append(aaba);

    abaa.append(abaaa);
    abaa.append(abaab);

    aba.append(abaa);

    ab.append(aba);

    aa.append(aaa1);
    aa.append(aaa);
    aa.append(aab);
    aa.append(aac);

    a.append(aa);
    a.append(ab);

    document.getElementById(target).append(a);

    window.mdc.autoInit(
        document.getElementById(target)
    );

}

export default function Detail(data, chapter, classess, target) {
    return data_detail(data, chapter, classess, target);
}