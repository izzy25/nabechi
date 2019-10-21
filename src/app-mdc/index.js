let importedScript = {
    image       : undefined,
    data_detail : undefined,
    chapter     : undefined,
    list        : undefined,
    upload      : undefined,
    login       : undefined,
    imageLoading: undefined
};

function AppElement(call, args, target, callback, error) {

    // change screen to the top-left corner website, because sometimes screen bugging or glitching
    // bad for look
    window.scrollTo(0,0);

    // check if in this section is have load the script , lets put it to false first
    let haveLoad = false;

    // function load start for loading bar indeterminate/run
    // change this into better syntax if you want better performance
    function loadStart(){
        document.getElementById('loaders').className =  'mdc-linear-progress mdc-linear-progress--indeterminate';
    }

    // call it when you need load bar
    loadStart();

    // function load done for detected if image/DOM/anything in the website have loaded and closed the load bars
    // change this too :D
    function loadDone(node){

        // special syntax for chapter section XD
        if(call === 'chapter'){

            loadStart();

            let images = args[0].media_url_array.length-1;

            importedScript.imageLoading = setInterval(function() {

                let imageSelect = document.querySelector('[data-number="' + images + '"]');

                if( imageSelect !== null){
                    clearInterval(importedScript.imageLoading);
                    document.getElementById('loaders').classList.replace('mdc-linear-progress--indeterminate', 'mdc-linear-progress--closed');
                }

            }, 1000);

        // for any section but this is for any section can supported
        // but you must change haveLoad to true/5
        // this is sucks i cant think any more
        // please someone FIX IT!!!!!!!!!!! ;(
        }else{

		importedScript.imageLoading = setInterval(function() {

            haveLoad += 1;

            //checking load
            if(haveLoad === 5 || haveLoad === true){
                clearInterval(importedScript.imageLoading);
                document.getElementById('loaders').classList.replace('mdc-linear-progress--indeterminate', 'mdc-linear-progress--closed');
            }

		}, 1000);
            
        }
        
    }

    // for stop loop carausel in home or any carausel in the website
    window.stopLoop = true;

    // delete elements you dont need again
    // IMPORTANT !!! - DO NOT DELETE THIS SYNTAX
    document.querySelectorAll('.content').forEach(function (e) {
        e.remove();
    });

    // if target showing have class remove it for default settings
    // IMPORTANT !!! - DO NOT DELETE THIS SYNTAX
    document.getElementById(target).removeAttribute('class');


    if(call === 'image'){

        if(importedScript.image === undefined){

            return import('./home/index.js')
                .then(
                    module => {
                        importedScript.image = module.default;
                        let node = module.default(args[0],args[1],target);
                        loadDone(node);
                        return callback(node);
                    })
                .catch(
                    error
                );

        } else {

            let node = importedScript.image(args[0],args[1],target);
            loadDone(node);
            return callback(node);

        }

    }else if(call === 'data_detail'){

        if(importedScript.data_detail === undefined){

            import('./detail-comic/index.js')
                .then(
                    module => {
                        importedScript.data_detail = module.default;
                        let node = module.default(args[0],args[1],args[2],target);
                        loadDone(node);
                        return callback(node);
                    })
                .catch(
                    error
                );

        } else {

            let node = importedScript.data_detail(args[0],args[1],args[2],target);
            loadDone(node);
            return callback(node);

        }

    }else if(call === 'chapter'){

        window.stopLoop = false;

        if(importedScript.chapter === undefined){

            return import('./chapter/index.js')
                .then(
                    module => {
                        importedScript.chapter = module.default;
                        let node = module.default(args[0],args[1],args[2],target);
                        loadDone(node);
                        return callback(node);
                    })
                .catch(
                    error
                );

        } else {

            let node = importedScript.chapter(args[0],args[1],args[2],target);
            loadDone(node);
            return callback(node);

        }

    }else if(call === 'list'){

        if(importedScript.list === undefined){

            return import('./data/list/index.js')
                .then(
                    module => {
                        importedScript.list = module.default;
                        let node = module.default(args[0], args[1], target);
                        loadDone(node);
                        return callback(node);
                    })
                .catch(
                    error
                );

        } else {

            let node = importedScript.list(args[0], args[1], target);
            loadDone(node);
            return callback(node);

        }

    }else if(call === 'upload'){

        if(importedScript.upload === undefined){

            return import('./data/upload/index.js')
                .then(
                    module => {
                        importedScript.upload = module.default;
                        let result = new module.default([args.data.folder, args.data.parent_folder], args.Element, target);
                        loadDone(result);
                        return callback(result);
                    })
                .catch(
                    error
                );

        } else {

            let result = new importedScript.upload([args.data.folder, args.data.parent_folder], args.Element, target);
            loadDone(result);
            return callback(result);

        }

    }else if(call === 'login'){

        if(importedScript.login === undefined){

            return import('./data/_login.js')
                .then(
                    module => {
                        importedScript.login = module.default;
                        let node = module.default(false, target);
                        loadDone(node);
                        return callback(node);
                    })
                .catch(
                    error
                );

        } else {

            let node = importedScript.login(false, target);
            loadDone(node);
            return callback(node);

        }

    }

    // new AppMDC('http://nabechi-dev.localhost/dist/app-mdc/index.js');

}

export default function Elements(call, args, target, callback, error) {
    return AppElement(call, args, target, callback, error);
}