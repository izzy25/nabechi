import ImageInput from "./_image.js";
import Progress from "../_progress.js";

let haveInit = false,
    currentTabs = 'addContent',
    currentData = [],
    currentClass = undefined,
    Elemen = {};

/**
 * Admin page class ES2015
 */
class AdminPage {

    /**
     * Construct AdminPage
     * @param {Object} args 
     * @param {Object} callback 
     * @param {String} target 
     */
    constructor(args, callback, target) {
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'content';
        this.data = {
            folder: args[0],
            parentFolder: args[1]
        };
        this.ElementCallback = callback;

        this.topAppBar = document.querySelector('.mdc-top-app-bar');
        this.topAppFixed = document.getElementById('top');
        this.action = {
            upload: [],
            selected: [],
        };

        this.target = document.createElement('div');
        this.target.className = "content";
        this.target.id = 'content_tabs';

        this.parentTarget = target;

        document.getElementById(this.parentTarget).append(this.target);

        this.topAppFixed.style = 'padding-top: 128px';

        let context = this;

        //add some button in topAppBar
        if(haveInit == false){

            this.topAppBar.insertAdjacentHTML('beforeend',
                '<div class="mdc-top-app-bar__row top-menu">' +
                '<div class="mdc-tab-bar" data-mdc-auto-init="MDCTabBar" role="tablist">' +
                '  <div class="mdc-tab-scroller">' +
                '    <div class="mdc-tab-scroller__scroll-area">' +
                '      <div class="mdc-tab-scroller__scroll-content">' +
                '        <button class="mdc-tab mdc-tab--active" id="file-manager" role="tab" aria-selected="true" tabindex="0" data-tabs="fileManager">' +
                '          <span class="mdc-tab__content">' +
                '            <span class="mdc-tab__icon material-icons mdc-theme--on-primary" aria-hidden="true">favorite</span>' +
                '            <span class="mdc-tab__text-label mdc-theme--on-primary">File Manager</span>' +
                '          </span>' +
                '          <span class="mdc-tab-indicator mdc-tab-indicator--active">' +
                '            <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline" style="background-color: white;"></span>' +
                '          </span>' +
                '          <span class="mdc-tab__ripple"></span>' +
                '        </button>' +
                '        <button class="mdc-tab" role="tab" id="add-content" aria-selected="true" tabindex="1" data-tabs="addContent">' +
                '          <span class="mdc-tab__content">' +
                '            <span class="mdc-tab__icon material-icons mdc-theme--on-primary" aria-hidden="true">add_box</span>' +
                '            <span class="mdc-tab__text-label mdc-theme--on-primary">Create Comic</span>' +
                '          </span>' +
                '          <span class="mdc-tab-indicator">' +
                '            <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline" style="background-color: white;"></span>' +
                '          </span>' +
                '          <span class="mdc-tab__ripple"></span>' +
                '        </button>' +
                '        <button class="mdc-tab" role="tab" id="add-child-content" aria-selected="true" tabindex="2" data-tabs="addChildContent">' +
                '          <span class="mdc-tab__content">' +
                '            <span class="mdc-tab__icon material-icons mdc-theme--on-primary" aria-hidden="true">add_to_photos</span>' +
                '            <span class="mdc-tab__text-label mdc-theme--on-primary">Create Chapter</span>' +
                '          </span>' +
                '          <span class="mdc-tab-indicator">' +
                '            <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline" style="background-color: white;"></span>' +
                '          </span>' +
                '          <span class="mdc-tab__ripple"></span>' +
                '        </button>' +
                '      </div>' +
                '    </div>' +
                '  </div>' +
                '</div>' +
                '</div>'
            );

            window.mdc.autoInit(document.querySelector('.top-menu'));

            this.tabsList = document.querySelector('.mdc-tab-bar').MDCTabBar;

            if(currentTabs === 'fileManager'){
                this.tabsList.foundation_.adapter_.setActiveTab(0);
            }else if(currentTabs === 'addContent'){
                this.tabsList.foundation_.adapter_.setActiveTab(1);
            }else if(currentTabs === 'addChildContent'){
                this.tabsList.foundation_.adapter_.setActiveTab(2);
            }

            this.tabsList.tabList_.forEach(function (value, key) {
                value.root_.addEventListener('click', function (event) {
                    currentTabs = this.dataset.tabs;
                    return context.changeTabs_();
                });
            });

            haveInit = true;

        }

    }

    changeTabs_(){

        //checking if user clicking the same tab twice
        if(currentClass !== currentTabs){
            document.querySelectorAll('.content').forEach(function (value, keys) {
                value.remove();
            });
    
            TabsController();
        }else{
            console.log('clicking twice!! forbidden')
        }
        
    }
}

class AdminFileManager extends AdminPage{

    constructor(args, callback, target) {

        super(args, callback, target);

        let context = this;

        //create list data of directory
        this.ContentUpload();
        this.Progress();

        document.body.append(this.fab);

        if(haveInit === true){
            let x = document.querySelectorAll('.mdc-dialog');
            x.forEach(function(item){
                item.remove();
            });
        }

        this.target.append(this.progress.wrap);
        this.target.append(this.modalFolder);
        this.target.append(this.modalFile);
        this.target.append(this.wrapper);

        this.mdcFunction = window.mdc.autoInit(
            this.target
        );

        this.mdcFunction[0].listen('MDCDialog:opened', () => {
            this.mdcFunction[1].layout();
        });

        this.mdcFunction[0].defaultButton_.addEventListener('click', function(){
            let input = context.mdcFunction[1];

            return context.ElementCallback.create_ok(input);
        });

        this.mdcFunction[2].defaultButton_.addEventListener('click', function(){
            let input = document.querySelector('.input-image');

            return context.ElementCallback.upload_ok(input, context.progress);
        });


        let switchSelect = this.mdcFunction[6];

        switchSelect.nativeControl_.addEventListener('click', function () {
            if(switchSelect.checked){
                document.querySelectorAll('.buttonToggle-on').forEach(function (elem) {
                    elem.style = 'display: none;';
                });
                document.querySelectorAll('.buttonToggle-off').forEach(function (elem) {
                    elem.style = '';
                });
            }else{
                document.querySelectorAll('.buttonToggle-on').forEach(function (elem) {
                    elem.style = 'display: block;';
                });
                document.querySelectorAll('.buttonToggle-off').forEach(function (elem) {
                    elem.style = 'display: none;';
                });
            }
        });

        this.imageReview = new ImageInput('imageResult');
        this.imageReview.init();

        Elemen = this;

        currentClass = 'fileManager';
    }
    Progress(){
        let context = this;
        this.progress = new Progress(undefined, document.createElement('progress'), undefined);
    }
    Fab() {
        let context = this;
        this.fab = document.createElement('a');
        this.fab.innerHTML ='<span class="mdc-fab__icon material-icons">create_new_folder</span>';
        this.fab.className = ' app-fab--absolute mdc-fab content';
        this.fab.dataset.mdcAutoInit = 'MDCRipple';
        this.fab.setAttribute('aria-label', 'Add New Folder');
        this.fab.href = '#top';
        this.fab.style = 'text-decoration: none;'

        this.fab.addEventListener('click', function(){
            return context.ElementCallback.create(this, context);
        });
    }
    ModalFolder() {
        let modal_content = document.createElement('div');

        modal_content.className = 'mdc-dialog mdc-dialog--scrollable content';
        modal_content.dataset.mdcAutoInit = 'MDCDialog';
        modal_content.role = 'alertdialog';
        modal_content.setAttribute('aria-modal', 'true');
        modal_content.setAttribute('aria-labelledby', 'dialog-create-title');
        modal_content.setAttribute('aria-describedby' , 'dialog-create-content');

        let str = '';
        if(this.data.parentFolder !== null){
            for(let i = 0; i < this.data.parentFolder.length; i++){
                if(this.data.parentFolder[i] !== 'images'){
                    str += '/' + this.data.parentFolder[i];
                }
            }
        }

        modal_content.innerHTML = 
        '<div class="mdc-dialog__container">'+
            '<div class="mdc-dialog__surface">'+
                '<h2 class="mdc-dialog__title" id="my-dialog-title">Create New Folder</h2>'+
                '<div class="mdc-dialog__content" id="my-dialog-content">'+
                    '<div class="mdc-text-field" data-mdc-auto-init="MDCTextField" style="width: 100%;">'+
                        '<input class="mdc-text-field__input" id="modal-folder-name" data-folder="' + str + '" type="text" placeholder="Folder name..." aria-label="Please type your folder name">'+
                        '<label class="mdc-floating-label" for="disabled-text-field">Disabled text field</label>'+
                        '<div class="mdc-line-ripple"></div>'+
                    '</div>'+
                '</div>'+
                '<div class="mdc-dialog__actions">'+
                    '<button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="close">'+
                        '<span class="mdc-button__label">Cancel</span>'+
                    '</button>'+
                    '<button type="button" class="mdc-button mdc-dialog__button mdc-dialog__button--default" data-mdc-dialog-action="accept">'+
                        '<span class="mdc-button__label">OK</span>'+
                    '</button>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<div class="mdc-dialog__scrim"></div>';

        this.modalFolder = modal_content;
    }
    ModalFile() {
        let modal_content = document.createElement('div');

        modal_content.className = 'mdc-dialog mdc-dialog--scrollable content';
        modal_content.dataset.mdcAutoInit = 'MDCDialog';
        modal_content.role = 'alertdialog';
        modal_content.setAttribute('aria-modal', 'true');
        modal_content.setAttribute('aria-labelledby', 'dialog-create-title');
        modal_content.setAttribute('aria-describedby' , 'dialog-create-content');

        let str = '';
        if(this.data.parentFolder !== null){
            for(let i = 0; i < this.data.parentFolder.length; i++){
                if(this.data.parentFolder[i] !== 'images'){
                    str += '/' + this.data.parentFolder[i];
                }
            }
        }

        modal_content.innerHTML = 
        '<div class="mdc-dialog__container">'+
            '<div class="mdc-dialog__surface">'+
                '<h2 class="mdc-dialog__title" id="my-dialog-title">Upload File</h2>'+
                '<div class="mdc-dialog__content" id="my-dialog-content">'+
                    '<div class="mdc-button mdc-button--raised">'+
                        '<i class="material-icons mdc-button__icon" aria-hidden="true">attach_file</i>'+
                        '<span class="mdc-button__label">BROWSE FILE</span>'+
                        '<input class="input-image" type="file" data-folder="' + str + '" accept="image/png, image/jpeg" multiple="true" style="position: absolute; width: 100%; opacity: 0;">'+
                    '</div>'+
                    '<div class="image-result" id="imageResult"></div>'+
                '</div>'+
                '<div class="mdc-dialog__actions">'+
                    '<button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="close">'+
                        '<span class="mdc-button__label">Cancel</span>'+
                    '</button>'+
                    '<button type="button" class="mdc-button mdc-dialog__button mdc-dialog__button--default" data-mdc-dialog-action="accept">'+
                        '<span class="mdc-button__label">OK</span>'+
                    '</button>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<div class="mdc-dialog__scrim"></div>';

        this.modalFile = modal_content;
    }
    ContentUpload() {
        //need these element for modal
        this.ModalFolder();
        this.ModalFile();
        this.Fab();
        
        let table = document.createElement('div'), 
            butCreateFolder = document.createElement('a'), 
            butRemove = butCreateFolder.cloneNode(), 
            butCreateFile = butCreateFolder.cloneNode(),
            butSwitchSelect = document.createElement('div'),
            butGetQueryFile =  butCreateFolder.cloneNode(),
            context = this, 
            countItem = document.createElement('span'),
            baris = 0;

        countItem.innerHTML = this.data.folder.length-2 + ' items';

        butGetQueryFile.className = "mdc-button mdc-button--raised butFileQuery margined";
        butGetQueryFile.innerHTML = '<i class="material-icons mdc-button__icon" aria-hidden="true">folder_open</i>'+
                                    '<span class="mdc-button__label">GET FILE DATA</span>';
        butGetQueryFile.href = "#top";
        butGetQueryFile.dataset.mdcAutoInit = 'MDCRipple';
        butGetQueryFile.style = 'display: none;';

        butCreateFolder.className = "mdc-button mdc-button--raised margined";
        butCreateFolder.innerHTML = '<i class="material-icons mdc-button__icon" aria-hidden="true">create_new_folder</i>'+
                                    '<span class="mdc-button__label">CREATE FOLDER</span>';
        butCreateFolder.href = "#top";
        butCreateFolder.dataset.mdcAutoInit = 'MDCRipple';

        butCreateFile.className = "mdc-button mdc-button--raised margined";
        butCreateFile.innerHTML = '<i class="material-icons mdc-button__icon" aria-hidden="true">cloud_upload</i>'+
                                  '<span class="mdc-button__label">UPLOAD FILE</span>';
        butCreateFile.href = "#top";
        butCreateFile.dataset.mdcAutoInit = 'MDCRipple';

        butSwitchSelect.className = 'select-switch margined';
        butSwitchSelect.style = 'display: inline-flex; vertical-align: middle;';
        butSwitchSelect.innerHTML = 
        '<div class="mdc-switch" data-mdc-auto-init="MDCSwitch">' +
            '<div class="mdc-switch__track"></div>' +
            '<div class="mdc-switch__thumb-underlay">' +
                '<div class="mdc-switch__thumb">' +
                    '<input type="checkbox" id="basic-switch" class="mdc-switch__native-control" role="switch">' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<label for="basic-switch">&nbsp;Select File</label>';

        

        // Adding event for button create folder
        butCreateFolder.addEventListener('click', function(){
            return context.ElementCallback.create(this, Elemen);
        });

        // Adding event for button create file
        butCreateFile.addEventListener('click', function(){
            return context.ElementCallback.upload(this, Elemen);
        });

        butRemove.className = "folder-action material-icons";
        butRemove.innerHTML = "delete";

        table.setAttribute('border', '1px');
        table.className = 'mdc-list mdc-list--two-line';
        butRemove.href = '#remove';

        window.fold = this.data;

        this.data.folder.forEach(function (value, key) {
            let butr = butRemove.cloneNode(true),
                tr = document.createElement('div'),
                td = document.createElement('div'),
                number = td.cloneNode(),
                folder = document.createElement('span'),
                folder_head = folder.cloneNode(),
                folder_body = folder.cloneNode(),
                description = td.cloneNode(),
                action = td.cloneNode(),
                selectBut = document.createElement('div'),
                divider = document.createElement('hr');

            selectBut.className = 'mdc-list-item__graphic buttonToggle-off';
            selectBut.style = 'display: none;';
            selectBut.innerHTML = 
            '<div class="mdc-checkbox" data-mdc-auto-init="MDCCheckbox">' +
            '<input type="checkbox" class="mdc-checkbox__native-control" id="checkbox-1"/>' +
            '<div class="mdc-checkbox__background">' +
                '<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">' +
                    '<path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"/>' +
                '</svg>' +
                '<div class="mdc-checkbox__mixedmark"></div>' +
            '</div>' +
            '</div>';

            divider.className = 'mdc-list-divider';
            tr.className = 'mdc-list-item';
            number.className = 'mdc-list-item__graphic';
            folder.className = 'mdc-list-item__text';
            folder_head.className = 'mdc-list-item__primary-text';
            folder_body.className = 'mdc-list-item__secondary-text';

            if(value[0] !== '.' && value[0] !== '..'){
                butr.dataset.folder = value[0];

                //save element for the next initialize
                context.action.upload.push([folder_head,butr]);

                action.append(butr);

                let str = '';
                if(context.data.parentFolder !== null){
                    for(let i = 0; i < context.data.parentFolder.length; i++){
                        if(context.data.parentFolder[i] !== 'images'){
                            str += '/' + context.data.parentFolder[i];
                        }
                    }
                }
                
                butr.dataset.parent = str;
                butr.dataset.oldfolder = value[0];
                number.dataset.oldfolder = value[0];
                number.dataset.parent = str;

                selectBut.dataset.oldfolder = value[0];
                
                folder_head.dataset.oldfolder = value[0];
                folder_head.innerHTML = value[0];
                folder_head.contentEditable = 'true';

                folder.append(folder_head);
                folder.append(folder_body);

                folder_head.addEventListener('blur', function(){
                    return context.ElementCallback.edit(this);
                });

                if(value[1] !== 'file'){
                    number.innerHTML = 
                    '<span class="action-dir material-icons">subdirectory_arrow_right</span>';

                    number.addEventListener('click', function() {
                        return context.ElementCallback.open(this);
                    });

                    // Adding system event to folder name and remove button
                    butr.addEventListener('click', function() {
                        if(window.confirm('Do you really to delete this folder?')){
                            return context.ElementCallback.remove(this);
                        }
                    });
                    folder_body.innerHTML = 'Folder';

                }else{

                    butr.addEventListener('click', function() {
                        if(window.confirm('Do you really to delete this file?')){
                            return context.ElementCallback.removef(this);
                        }
                    });

                    selectBut.addEventListener('click', function () {
                        
                        if(this.dataset.clicked == 2 || this.dataset.clicked == undefined){
                            context.action.selected.push(this.dataset.oldfolder);
                            this.dataset.clicked = 1;
                        }else{
                            context.action.selected.splice(context.action.selected.indexOf(this.dataset.oldfolder),1);
                            this.dataset.clicked = 2;
                        }

                        // sort array by name, number
                        context.action.selected.sort();

                        context.checkingSelected_();

                    });

                    number.className += ' buttonToggle-on';
                    number.innerHTML = '<span class="material-icons">insert_drive_file</span>';
                    folder_body.innerHTML = 'File';
                }

                // put data in new row
                tr.append(number);
                if(value[1] == 'file'){
                    tr.append(selectBut);
                }
                tr.append(folder);
                tr.append(description);
                tr.append(action);

                // put on table
                table.appendChild(tr);
                table.append(divider);

            }else if(value[0] === '..'){

                let parent = '',
                    toFolder = '';

                if(context.data.parentFolder !== null){
                    for(let i = 0; i < context.data.parentFolder.length; i++){
                        if(i === context.data.parentFolder.length-3 && context.data.parentFolder[i] !== 'images'){
                            parent += '/' + context.data.parentFolder[i];
                        }
                        
                        if(i === context.data.parentFolder.length-2 && context.data.parentFolder[i] !== 'images'){
                            toFolder = context.data.parentFolder[i];
                        }

                    }
                }

                number.innerHTML = '<span class="action-dir material-icons" data-oldfolder="' + toFolder + '" data-parent="' + parent + '">folder</span>';
                number.dataset.parent = parent;
                number.dataset.oldfolder = toFolder;

                if(context.data.parentFolder !== null){
                    number.addEventListener('click', function() {
                        return context.ElementCallback.open(this);
                    });
                }
                
                folder_head.innerHTML = 'Parent Folder';
                countItem.className += ' mdc-list-item__secondary-text';

                folder.append(folder_head);
                folder.append(countItem);

                // put data in new row
                tr.append(number);
                tr.append(folder);

                // put on table
                table.appendChild(tr);
                table.append(divider);
            }

            baris+=1;
        });

        // Put all in wrapper
        this.wrapper.append(butCreateFolder);
        this.wrapper.append(butCreateFile);
        this.wrapper.append(butGetQueryFile);
        this.wrapper.append(butSwitchSelect);
        this.wrapper.append(table);
    }
    checkingSelected_(){

        // Check the array, if user selected one-more file or not
        if(this.action.selected.length > 0){

            document.querySelector('.butFileQuery').style = '';

        }else{

            document.querySelector('.butFileQuery').style = 'display: none;';

        }

    }
}

class AdminFormData extends AdminPage{

    constructor(args, callback, target)
    {

        super(args, callback, target);

        this.form = this.settingsDOM();

        // initialize funtion form, mdc in here
        this.initializeForm();

        currentClass = 'addContent';

    }

    settingsDOM()
    {

        let form = document.createElement('form'),
            rowTitle = document.createElement('div'),
            rowHeader = rowTitle.cloneNode();
        
        rowTitle.className = 'admin-form--row';

        rowHeader.className = 'admin-form--header';
        rowHeader.innerHTML = 'Form Add Comic';

        let rowDescription = rowTitle.cloneNode(true),
            rowRating = rowTitle.cloneNode(true),
            rowHeaderImage = rowTitle.cloneNode(true),
            rowAdultContent = rowTitle.cloneNode(true),
            rowTags = rowTitle.cloneNode(true),
            rowSubmit = rowTitle.cloneNode(true);

        form.name = 'addContent';
        form.enctype = 'multipart/form-data';
        form.className = 'admin-form mdc-elevation--z2';

        rowTitle.innerHTML = 
        '<div class="mdc-text-field mdc-text-field--outlined mdc-text-field--with-leading-icon" data-mdc-auto-init="MDCTextField">'+
            '<input type="text" id="title" aria-controls="title-helper-text" aria-describedby="title-helper-text" class="mdc-text-field__input">'+
            '<i class="material-icons mdc-text-field__icon" tabindex="0" role="button">create</i>'+
            '<div class="mdc-notched-outline">'+
                '<div class="mdc-notched-outline__leading"></div>'+
                '<div class="mdc-notched-outline__notch">'+
                    '<label for="title" class="mdc-floating-label">Title Comic</label>'+
                '</div>'+
                '<div class="mdc-notched-outline__trailing"></div>'+
            '</div>'+
        '</div>'+
        '<div class="mdc-text-field-helper-line">'+
            '<div id= "title-helper-text" class="mdc-text-field-helper-text" aria-hidden="true">'+
                '* Title of comic your upload'+
          '</div>'+
        '</div >';

        rowDescription.style.flexWrap = 'wrap';
        rowDescription.innerHTML = 
        '<div class="mdc-text-field mdc-text-field--textarea description-input" data-mdc-auto-init="MDCTextField">'+
            '<div class="mdc-text-field-character-counter">0 / 500</div>'+
            '<textarea id="description" aria-controls="description-helper-text" aria-describedby="description-helper-text" class="mdc-text-field__input" rows="8" cols="40" maxlength="500"></textarea>'+
            '<div class="mdc-notched-outline">'+
                '<div class="mdc-notched-outline__leading"></div>'+
                '<div class="mdc-notched-outline__notch">'+
                    '<label for="description" class="mdc-floating-label">Description</label>'+
                '</div>'+
                '<div class="mdc-notched-outline__trailing"></div>'+
            '</div>'+
        '</div>'+
        '<div class="mdc-text-field-helper-line">' +
            '<div id="description-helper-text" class="mdc-text-field-helper-text" aria-hidden="true">' +
                '* Description ex: Created By, Publisher, Synopsis, etc.' +
            '</div>' +
        '</div >';

        rowRating.innerHTML = 
        '<div class="admin-form--row-header">Rating</div>'+
        '<div class="mdc-slider mdc-slider--discrete" data-mdc-auto-init="MDCSlider" tabindex="0" role="slider" data-step="5" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="Select Value">' +
            '<div class="mdc-slider__track-container">' +
                '<div class="mdc-slider__track"></div>' +
            '</div>' +
            '<div class="mdc-slider__thumb-container">' +
                '<div class="mdc-slider__pin">' +
                    '<span class="mdc-slider__pin-value-marker"></span>' +
                '</div>' +
                '<svg class="mdc-slider__thumb" width="21" height="21">' +
                    '<circle cx="10.5" cy="10.5" r="7.875"></circle>' +
                '</svg>' +
                '<div class="mdc-slider__focus-ring"></div>' +
            '</div>' +
        '</div>';

        rowHeaderImage.innerHTML = 
        '<div class="mdc-button mdc-button--raised" data-mdc-auto-init="MDCRipple">'+
            '<i class="material-icons mdc-button__icon" aria-hidden="true">attach_file</i>'+
            '<span class="mdc-button__label">Browse Header Image</span>'+
            '<input class="input-image" type="file" accept="image/png, image/jpeg" name="imageHeader" style="position: absolute; width: 100%; height: 100%; opacity: 0;">'+
        '</div>';

        rowAdultContent.innerHTML = 
        '<div class="admin-form--row-header">Content For</div>'+
        '<div class="mdc-form-field" data-mdc-auto-init="MDCFormField">' +
            '<div class="mdc-radio" data-mdc-auto-init="MDCRadio">' +
                '<input class="mdc-radio__native-control" type="radio" id="radio-1" name="radios">' +
                '<div class="mdc-radio__background">' +
                    '<div class="mdc-radio__outer-circle"></div>' +
                    '<div class="mdc-radio__inner-circle"></div>' +
                '</div>' +
            '</div>' +
            '<label for="radio-1">Adult</label>' +
            '<div class="mdc-radio" data-mdc-auto-init="MDCRadio">' +
                '<input class="mdc-radio__native-control" type="radio" id="radio-2" name="radios" checked>' +
                '<div class="mdc-radio__background">' +
                    '<div class="mdc-radio__outer-circle"></div>' +
                    '<div class="mdc-radio__inner-circle"></div>' +
                '</div>' +
            '</div>' +
            '<label for="radio-2">Everyone</label>' +
        '</div>';

        rowTags.className += ' column-flex';
        rowTags.innerHTML = 
        '<div class="mdc-chip-set mdc-chip-set--input admin-form--tags-preview" data-mdc-auto-init="MDCChipSet"></div>' +
        '<div class="admin-form--row-inline">' +
            '<div class="mdc-text-field mdc-text-field--outlined mdc-text-field--with-leading-icon" data-mdc-auto-init="MDCTextField">'+
                '<input type="text" id="tags" aria-controls="tags-helper-text" aria-describedby="tags-helper-text" class="mdc-text-field__input tags-input">'+
                '<i class="material-icons mdc-text-field__icon" tabindex="0" role="button">add_box</i>'+
                '<div class="mdc-notched-outline">'+
                    '<div class="mdc-notched-outline__leading"></div>'+
                    '<div class="mdc-notched-outline__notch">'+
                        '<label for="tags" class="mdc-floating-label">Tags</label>'+
                    '</div>'+
                    '<div class="mdc-notched-outline__trailing"></div>'+
                '</div>'+
            '</div>'+
            '<div class="mdc-text-field-helper-line">' +
                '<div id="tags-helper-text" class="mdc-text-field-helper-text" aria-hidden="true">' +
                    '* Tags ex: Adventure, Isekai, Tags instagram, etc.' +
                '</div>' +
            '</div >'
        '</div>';

        rowSubmit.style = 'flex-direction: row-reverse;'
        rowSubmit.innerHTML = 
        '<button class="mdc-button mdc-button--raised" type="submit" data-mdc-auto-init="MDCRipple">'+
            '<span class="mdc-button__label">CREATE</span>'+
        '</button>'+
        '<button class="mdc-button" type="reset" data-mdc-auto-init="MDCRipple" style="margin-right: 15px;">'+
            '<i class="material-icons mdc-button__icon" aria-hidden="true">clear</i>'+
            '<span class="mdc-button__label">RESET</span>'+
        '</button>';

        form.appendChild(rowHeader);
        form.appendChild(rowTitle);
        form.appendChild(rowDescription);
        form.appendChild(rowRating);
        form.appendChild(rowHeaderImage);
        form.appendChild(rowAdultContent);
        form.appendChild(rowTags);
        form.appendChild(rowSubmit);

        this.target.append(form);

        return form;

    }

    /**
     * @param dom must append in html/pages
     */
    FormTagsController(input, preview) {

        let butSubmit = document.createElement('a'), chipSet = preview.MDCChipSet;

        butSubmit.className = 'mdc-button';
        butSubmit.dataset.mdcAutoInit = 'MDCRipple';
        butSubmit.style.display = 'none';

        butSubmit.innerHTML = 
        '<span class="mdc-button__label">Create Tags</span>'+
        '<i class="material-icons mdc-button__icon" aria-hidden="true">favorite</i>';

        input.parentElement.parentElement.appendChild(butSubmit);

        if(chipSet.chips.length == 0){
            preview.style.display = 'none';
        }
        
        //define some function
        input.addEventListener('keydown', function (event) {

            if(event.code === 'Enter' || event.keyCode === 13){
                preview.style.display = '';
                let chipEl = document.createElement('div');

                chipEl.className = 'mdc-chip';
                chipEl.dataset.value = this.value;
                chipEl.innerHTML = '<div class="mdc-chip__text">' + this.value + '</div><i class="material-icons mdc-chip__icon mdc-chip__icon--trailing" tabindex="0" role="button">cancel</i>';        

                preview.appendChild(chipEl);

                chipSet.addChip(chipEl);

                this.value = '';
            }

            if(chipSet.chips.length == 0){
                preview.style.display = 'none';
            }else{
                preview.style.display = '';
            }

        });

        input.addEventListener('keyup', function (event) {
            if(event.code === 'Enter' || event.keyCode === 13){
                this.value = '';
            }
            
        });

        chipSet.listen('MDCChip:removal', function(event) {
            preview.removeChild(event.detail.root);

            if(chipSet.chips.length == 0){
                preview.style.display = 'none';
            }else{
                preview.style.display = '';
            }
        });

    }

    initializeForm() {

        // // disable 
        this.form.onsubmit = function (event) {
            event.preventDefault();
        }

        /**
         * You can get Element with MDC function in this.form[**].MDC
         */
        this.form.MDCElements = window.mdc.autoInit(
             document.querySelector('.admin-form')
        );

        this.form.MDCElements[4].input = [this.form.MDCElements[5], this.form.MDCElements[6]];

        this.form[6].addEventListener('click', (event) => {
            let formdata = new FormData();

            formdata.append('title', this.form.MDCElements[0].value);
            formdata.append('description', this.form.MDCElements[1].value);
            formdata.append('rating', this.form.MDCElements[2].value);
            formdata.append('files', this.form[2].files[0], this.form[2].files[0].name);

            if (this.form.MDCElements[4].input[0].checked == true){
                formdata.append('adult', true);
            }else{
                formdata.append('adult', false);
            }

            let tags = [];

            this.form.MDCElements[7].chips.forEach(function (value, key) {
                tags[key] = value.root_.dataset.value;
            });

            formdata.append('tags', tags);

            return this.ElementCallback.formsubmit(formdata);
        });

        this.form[5].FormTagsController = this.FormTagsController(this.form[5], document.querySelector('.admin-form--tags-preview'));

    }

}

function TabsController() {

    //checking default tabs
    if(currentTabs == 'fileManager'){
        return new AdminFileManager(currentData.args, currentData.callback.FileManager, currentData.target);
    }else if(currentTabs == 'addContent'){
        return new AdminFormData(currentData.args, currentData.callback.AddContent, currentData.target);
    }else if(currentTabs == 'addChildContent'){
        return new AdminFormData(currentData.args, currentData.callback.AddContent, currentData.target);
    }

}

export default function (args, callback, target) {

    currentData = {
        args: args,
        callback: callback,
        target: target
    };
    
    TabsController();

};

