import Elements from './app-mdc/index.js';

(function () {
    "use strict";

    console.log(
        "                                                                                                                                 \n",
        "        ____________      _______________    ___________        _______________    ________________    _____      _____    _____ \n",
        "       /            \\    /    _____     /\\  /   ___     \\      /              /\\  /               /\\  /    /\\    /    /\\  /    /\\ \n",
        "      /    ____     /\\  /    /\\___/    / / /   /\\__\\    /\\    /    __________/ / /    ___________/ / /    / /   /    / / /    / / \n",
        "     /    /\\__/    / / /    /_/__/    / / /   /_/__/   / /   /    /__________\\/ /    /\\__________\\/ /    /_/___/    / / /    / / \n",
        "    /    / / /    / / /    _____     / / /   ______    \\/   /    __________/\\  /    / /            /    ______     / / /    / / \n",
        "   /    / / /    / / /    /\\___/    / / /   /\\_____\\   /\\  /    /__________\\/ /    /_/________    /    /\\____/    / / /    / / \n",
        "  /    / / /    / / /    / /  /    / / /   /_/_____/  / / /              /\\  /               /\\  /    / /   /    / / /    / / \n",
        " /____/ / /____/ / /____/ /  /____/ / /______________/ / /______________/ / /_______________/ / /____/ /   /____/ / /____/ / \n",
        " \\____\\/  \\____\\/  \\____\\/   \\____\\/  \\______________\\/  \\______________\\/  \\_______________\\/  \\____\\/    \\____\\/  \\____\\/ \n",
        "                                                                                                                                          \n",
    );

    //start app

    //CONFIGURATION FOR THIS APP IN HERE
    const
        imgError = new Image(),
        URLDatabase = 'https://nabechi.syiahindonesia.id',
        AjaxContent = 'ajax-content',
        EnableLog = true
    ;

    let App = {
        RequestData: undefined,
        _request: window.location.href.replace(window.location.origin + '/', '').split('/'),
        Back: undefined,
        titleApp: 'title-app',
        Function: {
            list: undefined,
            keyboard: undefined
        }
    };

    imgError.src = URLDatabase + '/images/aaa/asdasd.jpg';

    window.imageError = imgError;

    //checking android or not
    if (window.navigator.platform.search(/[^Linux armv]/g) > 1) {
        //URLDatabase = 'http://localhost:9999/projects/src/public';
    }

    //define loading bar to play
    window.addEventListener('load', function () {
        window.loading = document.getElementById('loaders');
        loading.className = 'mdc-linear-progress mdc-linear-progress--indeterminate';
    });

    //TODO move this function to script MDC have been loaded
    window.addEventListener('DOMContentLoaded', function () {
        window.loading = document.getElementById('loaders');
        loading.className = 'mdc-linear-progress mdc-linear-progress--closed';
    });

    //Click Event for Home button in Menu drawer
    document.querySelector('.butHome').addEventListener('click', function () {

        return getHome();
    });

    //getting button updated page for functionally
    document.querySelector('.butUpdated').addEventListener('click', function () {

        return getUpdated();
    });

    //getting button genre page for functionally
    document.querySelector('.butGenre').addEventListener('click', function () {

        return getGenre();
    });

    //getting button about page for functionally
    document.querySelector('.butAbout').addEventListener('click', function () {

        return getAbout();

    });

    //Getting button list page for functionally
    document.querySelector('.butListComic').addEventListener('click', function () {

        return getListComic();

    });

    document.querySelector('.butShare').addEventListener('click', function () {
        return shareMenu.open = true;
    });
    
    document.querySelector('.butCopy').addEventListener('click', function () {
        //add function for copy links
    });

    ////////////////////////////////////////////////////////
    //                                                    //
    //           Setting MDC Javascript Manual            //
    //       this setting define after load script        //
    //                                                    //
    ////////////////////////////////////////////////////////
    //Checking script already load

        //this is for function of menu page drawer
        let drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
        let topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(document.querySelector('.mdc-top-app-bar'));
        let shareMenu = mdc.menu.MDCMenu.attachTo(document.querySelector('.menu-share'));

        topAppBar.setScrollTarget(document.getElementById('main-content'));
        topAppBar.listen('MDCTopAppBar:nav', () => {
            drawer.open = !drawer.open;
        });

        //this is function timeout for the loading App scrim if script has been finished load
        setTimeout(function () {
            document
                .getElementsByClassName('loadingApp')[0]
                .className += ' hidden'
            ;
        }, 1000);

        let search = document.getElementById('search-submit'), input = document.querySelector('.search-input'), oi = search.parentNode.parentNode.children[0];

        search.addEventListener('click', function(e) {

            input.classList.remove('search-input_hidden');
            oi.classList.remove('fadeIn');
            oi.classList.add('fadeOut');

            setTimeout(function () {
                input.style = 'width: 100%';
            }, 10);

            setTimeout(function () {
                oi.style = 'display: none;';
            }, 500);


        });

        document.getElementsByTagName('main')[0].addEventListener('click', function () {

            input.style = 'width: 0;';

            setTimeout(function () {
                oi.style = '';
                oi.classList.remove('fadeOut');
                oi.classList.add('fadeIn');
                input.classList.add('search-input_hidden');
            }, 760);

        });

        document.getElementById('search-input').addEventListener('keyup', function (e) {

            let value = this.value;

            if(App.Function.keyboard !== undefined){

                clearTimeout(App.Function.keyboard);

            }

            App.Function.keyboard = setTimeout(function () {

                if(value !== ''){
                    getDataByParamsSearch(value);
                }else{
                    getDataByParamsSearch(undefined);
                }

            }, 1000);

        });

        //////////////////////////////////////////////////////////////////
        //                                                              //
        //                      [REQUEST PAGING]                        //
        //                 define after load big script                 //
        //                                                              //
        //////////////////////////////////////////////////////////////////
        //this checking the request of page if user have reloading page
        if(App._request[0].substr(0,1) === '#'){
            App._request[0] = 'home';
        }


        if(App._request[0] === 'home' || App._request[0] === '') {

            getHome();

        } else if (App._request[0] === 'komik' && App._request[1] !== "undefined" && App._request[2] !== 'chapter' + window.location.hash) {

            //Log('ke komik');

            getDataById(App._request[1]);

        } else if (App._request[0] === 'komik' && App._request[1] !== "undefined") {

            //Log('ke chapter');

            getChapter(App._request[1]);

        } else if (App._request[0] === 'updated' + window.location.hash) {

            getUpdated();

        } else if (App._request[0] === 'genres' + window.location.hash) {

            getGenre();

        } else if (App._request[0] === 'about' + window.location.hash) {

            getAbout();

        } else if (App._request[0] === 'admin' + window.location.hash) {

            getPageAdmin();

        } else if (App._request[0] === 'list' + window.location.hash) {

            getListComic();

        } else if (App._request[0] === 'login' + window.location.hash) {

            getLoginPage();

        } else if (App._request[0] === 'search') {

            getDataByParamsSearch(App._request[1].replace(window.location.hash, ''));

        }

    /**
     * Function for about page
     */
    function getAbout() {
        InitializeFunction();
        document.title = 'Nabechi - About';

        changeTitle('about');

        App.RequestData = Ajax('GET', window.origin + '/about.html', undefined, true);

        App.RequestData.done(function (e) {
            App.Back = 'about';
            window.history.replaceState(e.response, 'Nabechi - About', '/about');
            document.getElementById(AjaxContent).innerHTML = this.response;
        });
    }

    /**
     * Function for get data in index/home page
     */
    function getHome() {
        InitializeFunction();
        //Request new data and put to variable
        //this request image list
        document.title = 'Nabechi - Home';

        changeTitle('home');

        App.RequestData = Ajax('GET', URLDatabase + '/data');
        App.RequestData.done(function (e) {
            let json = this.JSON;

            App.RequestData = Ajax('GET', URLDatabase + '/data?recent=120&data_type=komik&sort=date_updated');
            App.RequestData.done(function (e) {
                json.list_data = e.target.JSON;
                generate(json);
            });

        });
        App.RequestData.fail(function (e) {
            new Log(e);
            alert(e);
        })
        ;

        function generate(e) {

            //TODO you must change this to getDataCarousel and add some function in database for that
            let carouselDraft = [
                {
                    title: e[0].name,
                    rate: 10,
                    image: URLDatabase + '/images/aaa/NABECHI.png',
                    id: e[0].id_data,
                    type: e[0].data_type
                },
                {
                    title: 'Nabechi App',
                    rate: 9,
                    image: URLDatabase + '/images/aaa/NABECHI.png'
                },
                {
                    title: 'Nabechi App',
                    rate: 8,
                    image: URLDatabase + '/images/aaa/NABECHI.png'
                }
            ];

            e.carousel = carouselDraft;

            window.history.replaceState(e, 'Nabechi - Home', '/#home');
            App.Back = 'home';

            //TODO you must private this variable if you finished this website
            Elements(
                'image',
                [
                    e,
                    [
                        'image-list',
                        'mdc-elevation--z1'
                    ]
                ],
                AjaxContent,
                function (ev) {
                    App.Function = ev;

                    App.Function.carousel.play();

                    App.Function.image.forEach(function (item) {

                        item[0].addEventListener('load', function () {
                            item[1].style = "background: 50% 0 no-repeat url('" + item[0].src + "'); background-size: cover; animation: none;";
                        });

                        item[0].addEventListener('error', function () {

                            item[1].style.background = "50% 0 no-repeat url('" + imgError.src + "')";
                            item[1].style.backgroundSize = 'cover';
                            item[1].style.animation = 'none';

                        });

                    });

                    document.querySelectorAll('.butComic')
                        .forEach(
                            function (e) {
                                e.addEventListener('click', function () {
                                    return getDataById(this.dataset.id);
                                })
                            })
                    ;

                    InitializeFunction();

                }
            );

        }
    }

    /**
     * Function for get data up to date sort by type and popular
     */
    function getUpdated() {
        InitializeFunction();

        document.title = 'Nabechi - Recent Updated';

        changeTitle('recent updated');

        App.RequestData = Ajax('GET', URLDatabase + '/data?popular=1&sort=data_type,date_updated');

        App.RequestData.done(function () {

            window.history.replaceState(this.JSON, 'Nabechi - Recent Update', '/updated');

            Elements(
                'list',
                [this.JSON, 1],
                AjaxContent,
                function (i) {

                    App.Function.list = i;

                    document.querySelector('.butBack').addEventListener('click', function () {
                        return getHome();
                    });

                    // for (let k = 0; k < i.length; k++) {
                    //
                    //     i[0][k].addEventListener('click', function () {
                    //
                    //         if (this.dataset.type === 'Komik') {
                    //             getDataById(this.dataset.id);
                    //         } else {
                    //             getChapter(this.dataset.id);
                    //         }
                    //
                    //     });
                    // }

                    InitializeFunction();

                },
                function (error) {
                    console.log(error);
                }
            );

            App.Back = 'updated';

        });

        App.RequestData.fail(function (e) {

            Log(e);

        });

    }

    /**
     * Function for get data by genre sort in datte and popular
     */
    function getGenre() {
        InitializeFunction();

        document.title = 'Nabechi - List Genre';

        changeTitle('list genre');

        App.RequestData = Ajax('GET', URLDatabase + '/genres');

        App.RequestData.done(function () {

            window.history.replaceState(this.JSON, 'Nabechi - Genres', '/genres');

            Elements(
                'list',
                [this.JSON, 2],
                AjaxContent,
                function (i) {
                    App.Back = 'genre';

                    i[0].forEach(function (item) {

                        item.addEventListener('click', function () {

                            let genre = this.innerHTML.toLowerCase();

                            getDataByGenre(genre);

                        });

                    });

                    document.querySelector('.parent-button').addEventListener('click', function () {

                        getHome();

                    });
                }
            );

        });

    }

    /**
     * Function for getting Genre after call getGenre
     * @param genre
     */
    function getDataByGenre(genre) {
        InitializeFunction();

        document.title = 'Nabechi - List ' + genre.toLocaleUpperCase();

        changeTitle('list ' + genre);

        App.RequestData = Ajax('GET', URLDatabase + '/data?popular=1&sort=data_type,date_updated&genre=' + genre);

        App.RequestData.done(function () {

            window.history.replaceState(this.JSON, 'Nabechi - Genres', '/genres/' + genre);

            Elements(
                'list',
                [this.JSON, 1],
                AjaxContent,
                function (i) {
                    App.Function.list = i;

                    App.Back = 'list-genre';

                    // for (let k = 0; k < i.length; k++) {
                    //
                    //     i[k].addEventListener('click', function () {
                    //
                    //         if (this.dataset.type === 'Komik') {
                    //             getDataById(this.dataset.id);
                    //         } else {
                    //             getChapter(this.dataset.id);
                    //         }
                    //
                    //     });
                    // }

                    InitializeFunction();

                    document.querySelector('.parent-button').addEventListener('click', function () {

                        getHome();

                    });
                }
            );

        });

    }

    /**
     * Function for get data by data-id in page komik
     * @param id
     */
    function getDataById(id) {
        InitializeFunction();

        App.RequestData = Ajax('GET', URLDatabase + '/data/' + id);
        App.RequestData.done(function () {

            let i = Ajax('GET', URLDatabase + '/data/' + id + '/chapter-list');

            i.done(function () {

                let komik = App.RequestData.JSON;
                komik.chapter = this.JSON;
                document.title = 'Nabechi - Komik ' + komik.name;

                changeTitle(komik.name);

                window.history.replaceState(komik, document.title, '/komik/' + komik.id_data + '/');

                Elements('data_detail', [komik, komik.chapter], AjaxContent, function (ev) {

                    //this is event click for back button in detail komik
                    document.querySelector('.butBack').addEventListener('click', function () {
                        return getHome();
                    });

                    document.querySelectorAll('.chapter-item').forEach(function (e) {
                        e.addEventListener('click', function () {
                            if (this.dataset.id !== undefined) {
                                return getChapter(this.dataset.id);
                            }
                        })
                    });

                });

            });
            i.fail(function (e) {
                console.log(e);
            })
            ;

            App.Back = 'data_detail';
        });
        App.RequestData.fail(function (e) {
            new Log(e);
        })
        ;

    }

    /**
     * Function for get data type chapter by id in page chapter
     * @param id
     */
    function getChapter(id) {

        InitializeFunction();

        App.RequestData = Ajax('GET', URLDatabase + '/data/' + id);

        App.RequestData.done(function () {

            let chapter = this.JSON,
                Req = Ajax('GET', URLDatabase + '/data/' + chapter.parent_id + '/chapter-list')
            ;

            Req.done(function () {

                document.title = 'Nabechi - ' + chapter.name;

                changeTitle(chapter.name);

                window.history.replaceState(chapter, document.title, '/komik/' + chapter.id_data + '/chapter/');

                Elements('chapter', [chapter, this.JSON], AjaxContent, function (ev) {

                    App.Function = ev;

                    //this is event click for back button in detail komik
                    document.querySelector('.butBack').addEventListener('click', function () {
                        return getHome();
                    });

                    document.querySelectorAll('.but-list').forEach(function (item) {
                        item.addEventListener('click', function () {
                            return document.querySelector('.menu-chapter').MDCMenu.open = true;
                        });
                    });

                    document.querySelectorAll('.but-chapter').forEach(function (e) {
                        e.addEventListener('click', function () {
                            return getChapter(this.dataset.id);
                        })
                    });
                    });

            });

            Req.fail(function (e) {
                console.log(e);
            });

        });

        App.RequestData.fail(function (e) {
            console.log(e);
        });
    }

    /**
     * TODO Warning!! you must privilege the user with their account if we done this website
     * Function for get page Admin like input data or something like that
     */
    function getPageAdmin(
        args = 'comic_post',
        id = undefined
    ) {

        InitializeFunction();

        let xhr;

        if(id !== undefined){

            xhr = Ajax('GET', URLDatabase + '/data/' + id);

            xhr.done(function () {
                console.log(this);
            });

            xhr.fail(function (err) {
                console.log(err);
            });

        }

        //This is private function Elements
        Elements(
            'upload',
            ['image-result', args],
            AjaxContent,
            function (re) {

                App.Function = re[0];

                re[1].forEach(function (item) {

                    item.addEventListener('click', function () {
                        if (item.dataset.nav !== 'list') {
                            return getPageAdmin(item.dataset.nav);
                        } else {
                            return getListComic(true);
                        }
                    });

                });

                // document.getElementById('form').addEventListener('submit', function () {
                //     return Sending(this, this.dataset.type);
                // });

                document.getElementById('form-submit').addEventListener('click', function () {

                    return Sending(this.parentNode, this.parentNode.dataset.type);

                });

            }
        );

        function Sending(form, type) {

            let fd = new FormData(form);

            if (type === 'chapter_post' || type === 'chapter_edit') {
                let files = App.Function.getFiles();

                for (let i = 0; i < files.length; i++) {

                    fd.append('images[]', files[i].file);

                }
            }

            Ajax('POST', window.origin + '/dist/data/form/', fd, true);

        }

    }

    /**
     * Function for get login page username and password
     */
    function getLoginPage(){

        InitializeFunction();

        let module = Elements(
            'login',
            undefined,
            AjaxContent,
            function (node) {
                console.log(node);
                node[0].name = 'form-login';
                node[0].method = 'post';
                node[0].action = 'admin.php';
            },
            function (error) {
                console.log(error);
            }
        );

    }

    /**
     * TODO you have to add function edit if user get verified admin account
     * Function for get list all data with sort by name without thumb
     */
    function getListComic(
        admin = undefined
    ) {

        InitializeFunction();

        App.RequestData = Ajax('GET', URLDatabase + '/data?sort=name&data_type=komik');

        App.RequestData.done(function () {

            document.title = 'Nabechi - List Comic';

            changeTitle('List Comic');

            window.history.replaceState(this.JSON, document.title, '/list');

            Elements(
                'list',
                [
                    this.JSON,
                    3
                ],
                AjaxContent,
                function (node) {

                    //this is event click for back button in detail komik
                    document.querySelector('.butBack').addEventListener('click', function () {
                        return getHome();
                    });

                    if (admin) {

                        // checking login and add some button for admin
                        let c = new VerifyLogin();

                        c.done(function (e) {

                            if (e.target.JSON.code === true) {

                                node.forEach(function (item) {

                                    let button = document.createElement('a');

                                    button.href = '#';
                                    button.className = 'butComicSelect';
                                    button.dataset.id = item.dataset.id;
                                    button.innerHTML = 'select';

                                    item.append(button);

                                    button.addEventListener('click', function () {

                                        return getPageAdmin('comic_edit', this.dataset.id);

                                    });

                                });

                            }

                        })

                    }

                    node.forEach(function (item) {

                        item.children[0].addEventListener('click', function () {

                            getDataById(this.parentNode.dataset.id);

                        });

                    });
                },
                function (err) {
                    console.log(err);
                }
            );

        });

    }

    function getDataByParamsSearch(
        value
    ) {

        InitializeFunction();

        if(value === undefined){

            return;

        }

        let match = value.match(/(komik|chapter|comic|kapter)/i), url = URLDatabase + '/data?sort=rating,date_updated&name=';

        if(match !== null){
            url += value.substr(0,match.index).trim();
            if(match[0].toLowerCase() === ('komik'||'comic')){
                url += '&data_type=komik';
            }else{
                url += '&data_type=chapter';
            }
        }else{
            url += value;
        }

        document.title = 'Nabechi - Search ' + value;

        changeTitle('search - ' + value);

        App.RequestData = Ajax('GET', url);

        App.RequestData.done(function () {

            window.history.replaceState(this.JSON, 'Nabechi - Search ' + value, '/search/' + value);

            Elements(
                'list',
                [this.JSON, 1],
                AjaxContent,
                function (i) {

                    App.Function.list = i;

                    document.querySelector('.butBack').addEventListener('click', function () {
                        return getHome();
                    });

                    //initialize button in components
                    InitializeFunction();

                },
                function (error) {
                    console.log(error);
                }
            );

            App.Back = 'search';

        });

        App.RequestData.fail(function (e) {

            Log(e);

        });

    }

    function InitializeFunction() {

        if(App.RequestData !== undefined){
            App.RequestData.abort();
        }

        if(App.Function !== undefined){

            if(App.Function.list !== undefined){
                if(App.Function.list[0] !== undefined){
                    for (let k = 0; k < App.Function.list[0].length; k++) {

                        //TODO you must private this variable if you finished this website
                        App.Function.list[0][k].addEventListener('click', function () {

                            if (this.dataset.type === 'Komik') {
                                getDataById(this.dataset.id);
                            } else {
                                getChapter(this.dataset.id);
                            }

                        });
                    }
                }

                if(App.Function.list[1] !== undefined) {
                    for (let y = 0; y < App.Function.list[1].length; y++) {

                        //console.log(App.Function.list[1]);

                        App.Function.list[1][y].addEventListener('click', function () {

                            getChapter(this.dataset.id);

                        });

                    }
                }
            }

            if(App.Function.stopLoop !== undefined){

                App.Function.stopLoop();

            }

        }

    }

    /**
     * Function for getting result if user have login or not
     * @returns {*}
     * @constructor
     */
    function VerifyLogin() {

        return Ajax('GET', URLDatabase + '/session/' + document.getElementsByName('_verify')[0].dataset.code);

    }

    /**
     * Function for change Title direct
     * @param title
     */
    function changeTitle(title) {

        document.getElementById(App.titleApp).innerHTML = title;

    }

    /**-----------------------------------------
     * Log function
     * Log() is console.log() for small syntaks
     * -----------------------------------------
     * @param e
     * @constructor
     */
    function Log(e) {
        if (EnableLog === true) {

            return console.log(e);

        }
    }

    /**----------------------------------------------------------------
     * Ajax Function
     * Ajax() is custom function for JQuery.ajax() with custom promises
     * ----------------------------------------------------------------
     * @param type
     * @param toUrl
     * @param formData
     * @param notJSON
     * @returns {*}
     * @constructor
     */
    function Ajax(type, toUrl, formData = null, notJSON = false) {


        if (type == null) {

            new Log('type cannot be nullable');

        }

        if (toUrl == null) {

            new Log('toUrl cannot be null');

        }

        if (type === 'GET' || type === 'get') {
            type = "GET";
        } else {
            type = "POST";
        }

        let xhr = new XMLHttpRequest();

        xhr.open(type, toUrl, true);

        xhr.onload = function () {
            if (notJSON !== true) {
                xhr.JSON = JSON.parse(this.response);
            }
        };

        xhr.done = function (callback) {
            return xhr.addEventListener('load', callback);
        };

        xhr.fail = function (callback) {
            return xhr.addEventListener('error', callback);
        };

        xhr.send(formData);

        return xhr;

    }


    // This is the service worker with the Cache-first network
    // Add this below content to your HTML page, or add the js file to your page at the very top to register service worker
    // Check compatibility for the browser we're running this in
    // if ("serviceWorker" in navigator) {
    //     if (navigator.serviceWorker.controller) {
    //         DLog("[PWA Builder] active service worker found, no need to register");
    //     } else {
    //         // Register the service worker
    //         navigator.serviceWorker
    //             .register("sw.js", {
    //                 scope: "./"
    //             })
    //             .then(function (reg) {
    //                 DLog("[PWA Builder] Service worker has been registered for scope: " + reg.scope);
    //             });
    //     }
    // }

})();