import {urlDatabase} from '../../config.js';
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
    let App = {
        RequestData: undefined,
        _request: window.location.pathname.split('/'),
        Back: false,
        titleApp: 'title-app',
        Function: {
            list: undefined,
            keyboard: undefined,
            confirm: undefined
        },
        xhr_: false
    };

    window.data = urlDatabase;

    //CONFIGURATION FOR THIS APP IN HERE
    const
        imgError = new Image(),
        URLDatabase = urlDatabase,
        AjaxContent = 'ajax-content',
        EnableLog = true,
        getAbout = function () {
            if (beforeChangePage()) {
                document.title = 'Nabechi - About';

                if (arguments[0] !== undefined && App.Back == false) {
                    history.pushState(null, 'Nabechi - About', '/about');
                }else{
                    App.Back = false;
                }

                changeTitle('about');

                App.RequestData = Ajax('GET', window.origin + '/about.html', undefined, true);

                App.RequestData.done(function (e) {

                    document.getElementById(AjaxContent).innerHTML = this.response;

                    InitializeFunction();

                });
            }
        },

        /**
         * Function for get data in index/home page
         */
        getHome = function () {

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

            if (beforeChangePage()) {
                //Request new data and put to variable
                //this request image list
                document.title = 'Nabechi - Home';

                if (arguments[0] !== false && App.Back == false) {
                    history.pushState(null, 'Nabechi - Home', '/#home');
                }else{
                    App.Back = true;
                }

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

            }

        },

        /**
         * Function for get data up to date sort by type and popular
         */
        getUpdated = function () {
            if (beforeChangePage()) {

                document.title = 'Nabechi - Recent Updated';

                if (arguments[0] !== false && App.Back == false) {
                    history.pushState(null, 'Nabechi - Recent Update', '/updated');
                }else{
                    App.Back = false;
                }

                changeTitle('recent updated');

                App.RequestData = Ajax('GET', URLDatabase + '/data?popular=1&sort=data_type,date_updated');

                App.RequestData.done(function () {

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

                });

            }

        },

        /**
         * Function for get data by genre sort in datte and popular
         */
        getGenre = function () {
            if (beforeChangePage()) {

                document.title = 'Nabechi - List Genre';

                if (arguments[0] !== false && App.Back == false) {
                    history.pushState(null, 'Nabechi - Genres', '/genres');
                }else{
                    App.Back = false;
                }

                changeTitle('list genre');

                App.RequestData = Ajax('GET', URLDatabase + '/genres');

                App.RequestData.done(function () {

                    Elements(
                        'list',
                        [this.JSON, 2],
                        AjaxContent,
                        function (i) {
                            App.Function.list = i;

                            i[0].forEach(function (item) {

                                item.addEventListener('click', function () {

                                    let genre = this.innerHTML.toLowerCase();

                                    getDataByGenre(genre);

                                });

                            });

                            document.querySelector('.parent-button').addEventListener('click', function () {

                                getHome();

                            });

                            InitializeFunction();
                        }
                    );

                });
            }

        },

        /**
         * Function for getting Genre after call getGenre
         * @param genre
         */
        getDataByGenre = function (genre) {
            if (beforeChangePage()) {

                document.title = 'Nabechi - List ' + genre.toLocaleUpperCase();

                if (arguments[1] !== false && App.Back == false) {
                    history.pushState(null, 'Nabechi - Genres', '/genres/' + genre);
                }else{
                    App.Back = false;
                }

                changeTitle('list ' + genre);

                App.RequestData = Ajax('GET', URLDatabase + '/data?popular=1&sort=data_type,date_updated&genre=' + genre);

                App.RequestData.done(function () {

                    Elements(
                        'list',
                        [this.JSON, 1],
                        AjaxContent,
                        function (i) {
                            App.Function.list = i;

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

        },

        /**
         * Function for get data by data-id in page komik
         * @param id
         */
        getDataById = function (id) {

            if (beforeChangePage()) {
                if (arguments[1] !== false && App.Back == false) {
                    history.pushState(null, document.title, '/komik/' + id);
                }else{
                    App.Back = false;
                }

                App.RequestData = Ajax('GET', URLDatabase + '/data/' + id);
                App.RequestData.done(function () {

                    let i = Ajax('GET', URLDatabase + '/data/' + id + '/chapter-list');

                    i.done(function () {

                        let komik = App.RequestData.JSON;
                        komik.chapter = this.JSON;
                        document.title = 'Nabechi - Komik ' + komik.name;

                        changeTitle(komik.name);

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

                            InitializeFunction();

                        });

                    });
                    i.fail(function (e) {
                        console.log(e);
                    })
                    ;

                });

            }
        },

        /**
         * Function for get data type chapter by id in page chapter
         * @param id
         */
        getChapter = function (id) {
            if (beforeChangePage()) {

                if (arguments[1] !== false && App.Back == false) {
                    history.pushState(null, document.title, '/komik/' + id + '/chapter');
                }else{
                    App.Back = false;
                }

                App.RequestData = Ajax('GET', URLDatabase + '/data/' + id);

                App.RequestData.done(function () {

                    let chapter = this.JSON,
                        Req = Ajax('GET', URLDatabase + '/data/' + chapter.parent_id + '/chapter-list')
                    ;

                    Req.done(function () {

                        document.title = 'Nabechi - ' + chapter.name;

                        changeTitle(chapter.name);

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

                        InitializeFunction();

                    });

                    Req.fail(function (e) {
                        console.log(e);
                    });

                });
            }
        },

        /**
         * TODO Warning!! you must privilege the user with their account if we done this website
         * Function for get page Admin like input data or something like that
         */
        getPageAdmin = function (
            args = 'comic_post',
            id = undefined
        ) {

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

            if (beforeChangePage()) {

                if (arguments[2] !== false && App.Back == false) {
                    history.pushState(null, 'Nabechi - Dashboard', '/admin');
                }else{
                    App.Back = false;
                }

                let xhr;

                if (id !== undefined) {

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

                        InitializeFunction();

                    }
                );
            }

        },

        /**
         * Function for get login page username and password
         */
        getLoginPage = function () {

            if (beforeChangePage()) {

                if (arguments[0] !== false && App.Back == false) {
                    history.pushState(null, 'Nabechi - Login', '/login');
                }else{
                    App.Back = false;
                }

                let module = Elements(
                    'login',
                    undefined,
                    AjaxContent,
                    function (node) {
                        node[0].name = 'form-login';
                        node[0].method = 'post';
                        node[0].action = '/admin';
                        InitializeFunction();
                    },
                    function (error) {
                        console.log(error);
                    }
                );
            }

        },

        /**
         * TODO you have to add function edit if user get verified admin account
         * Function for get list all data with sort by name without thumb
         */
        getListComic = function (
            admin = undefined
        ) {

            if (beforeChangePage()) {

                if (arguments[1] !== false && App.Back == false) {
                    history.pushState(null, 'Nabechi - List Comic', '/list');
                }else{
                    App.Back = false;
                }

                App.RequestData = Ajax('GET', URLDatabase + '/data?sort=name&data_type=komik');

                App.RequestData.done(function () {

                    document.title = 'Nabechi - List Comic';

                    changeTitle('List Comic');

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

                            }

                            node.forEach(function (item) {

                                item.children[0].addEventListener('click', function () {

                                    getDataById(this.parentNode.dataset.id);

                                });

                            });

                            InitializeFunction();
                        },
                        function (err) {
                            console.log(err);
                        }
                    );

                });
            }

        },

        getUploadPage = function () {

            if (beforeChangePage()) {

                //checking user is valid or nah
                let context = arguments, wait = true, url = URLDatabase + '/data/manager';

                if (context.length > 0) {

                    if (context[1].has('fileList[]')) {

                        App.RequestData = Ajax(
                            context[0],
                            url + '?' + App.xhr_,
                            context[1],
                            false,
                            function (pe) {
                                context[2].bar.max = pe.total;
                                context[2].Progressing(pe.loaded);
                            },
                            function () {
                                App.Function.confirm = undefined;
                            }
                        );

                        App.Function.confirm = 'Are you sure to left the page, this is can lost your progress?';

                    } else {
                        App.RequestData = Ajax(context[0], url + '?' + App.xhr_, context[1], false);
                    }

                } else {
                    App.RequestData = Ajax('GET', url + '?' + App.xhr_);
                }

                App.RequestData.done(function () {

                    wait = false;

                    if (this.JSON.code === 400) {
                        alert(this.JSON.status);
                    }

                    Elements(
                        'upload',
                        {
                            data: this.JSON,
                            Element: {
                                FileManager: {
                                    create: function (args, context) {
                                        context.mdcFunction[0].open();
                                    },
                                    create_ok: function (input) {
                                        if (wait === false) {
                                            if (input.value !== 'images') {
                                                let formData = new FormData();
                                                formData.append('folder_name', input.value);
                                                formData.append('parent_folder', input.input_.dataset.folder);
                                                formData.append('method', 'cFolder');
                                                getUploadPage('POST', formData);
                                            } else {
                                                alert('Cannot create folder images!!!');
                                            }
                                        } else {
                                            alert('the request not successfull yet, please wait...');
                                        }
                                    },
                                    upload: function (args, context) {
                                        context.mdcFunction[2].open();
                                    },
                                    upload_ok: function (input, progress) {
                                        if (wait === false) {
                                            let formData = new FormData();
                                            for (let i = 0; i < input.files.length; i++) {
                                                formData.append('fileList[]', input.files[i], input.files[i].name);
                                            }
                                            formData.append('parent_folder', input.dataset.folder);
                                            formData.append('method', 'uFile');
                                            getUploadPage('POST', formData, progress);
                                        } else {
                                            alert('the request not successfull yet, please wait...');
                                        }
                                    },
                                    edit: function (args) {
                                        console.log(args);
                                        if (wait === false) {

                                        }
                                    },
                                    remove: function (args) {
                                        if (wait === false) {
                                            let formData = new FormData();
                                            formData.append('folder_name', args.dataset.folder);
                                            formData.append('parent_folder', args.dataset.parent);
                                            formData.append('method', 'rFolder');
                                            getUploadPage('POST', formData);
                                        } else {
                                            alert('the request not successfull yet, please wait...');
                                        }
                                    },
                                    removef: function (args) {
                                        if (wait === false) {
                                            let formData = new FormData();
                                            formData.append('file_name', args.dataset.folder);
                                            formData.append('parent_folder', args.dataset.parent);
                                            formData.append('method', 'rFile');
                                            getUploadPage('POST', formData);
                                        } else {
                                            alert('the request not successfull yet, please wait...');
                                        }
                                    },
                                    open: function (args) {
                                        if (wait === false) {
                                            let formData = new FormData();
                                            if (args.dataset.oldfolder === '') {
                                                getUploadPage();
                                            } else {
                                                formData.append('folder_name', args.dataset.oldfolder);
                                                formData.append('parent_folder', args.dataset.parent);
                                                formData.append('method', 'gFolder');
                                                getUploadPage('POST', formData);
                                            }
                                        } else {
                                            alert('the request not successfull yet, please wait...');
                                        }
                                    },
                                    fresh: function () {
                                        getUploadPage();
                                    }
                                },
                                AddContent: {
                                    formsubmit: function (form) {
                                        form.append('method', 'createContent');
                                        getUploadPage('POST', form);
                                    }
                                }
                            }
                        },
                        AjaxContent,
                        function (result) {
                            return result;
                        },
                        function (error) {
                            console.log(error);
                        }
                    );

                    InitializeFunction();

                });

            }

        },

        getDataByParamsSearch = function (
            value
        ) {

            if (beforeChangePage()) {
                if (value === undefined) {

                    return;

                }

                let match = value.match(/(komik|chapter|comic|kapter)/i),
                    url = URLDatabase + '/data?sort=rating,date_updated&name=';

                if (match !== null) {
                    url += value.substr(0, match.index).trim();
                    if (match[0].toLowerCase() === ('komik' || 'comic')) {
                        url += '&data_type=komik';
                    } else {
                        url += '&data_type=chapter';
                    }
                } else {
                    url += value;
                }

                document.title = 'Nabechi - Search ' + value;

                if (arguments[1] !== false && App.Back == false) {
                    history.pushState(null, 'Nabechi - Search ' + value, '/search/' + value);
                }else{
                    App.Back = false;
                }

                changeTitle('search - ' + value);

                App.RequestData = Ajax('GET', url);

                App.RequestData.done(function () {

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

                });
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
    }, false);

    window.addEventListener('popstate', function (e) {
        PopState(e);
    }, false);

    //TODO move this function to script MDC have been loaded
    window.addEventListener('DOMContentLoaded', function () {
        window.loading = document.getElementById('loaders');
        loading.className = 'mdc-linear-progress mdc-linear-progress--closed';
    });

    //Click Event for Home button in Menu drawer
    document.querySelector('.butHome').addEventListener('click', function () {

        return getHome();
    }, false);

    //getting button updated page for functionally
    document.querySelector('.butUpdated').addEventListener('click', function () {

        return getUpdated();
    }, false);

    //getting button genre page for functionally
    document.querySelector('.butGenre').addEventListener('click', function () {

        return getGenre();
    }, false);

    //getting button about page for functionally
    document.querySelector('.butAbout').addEventListener('click', function () {

        return getAbout();

    }, false);

    //Getting button list page for functionally
    document.querySelector('.butListComic').addEventListener('click', function () {

        return getListComic();

    }, false);

    document.querySelector('.butShare').addEventListener('click', function () {
        return shareMenu.open = true;
    }, false);

    document.querySelector('.butCopy').addEventListener('click', function () {
        //add function for copy links
    }, false);

    ////////////////////////////////////////////////////////
    //                                                    //
    //           Setting MDC Javascript Manual            //
    //       this setting define after load script        //
    //                                                    //
    ////////////////////////////////////////////////////////
    //Checking script already load

    //this is for function of menu page drawer

    let drawer = window.mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
    let topAppBar = window.mdc.topAppBar.MDCTopAppBar.attachTo(document.querySelector('.mdc-top-app-bar'));
    let shareMenu = window.mdc.menu.MDCMenu.attachTo(document.querySelector('.menu-share'));

    topAppBar.setScrollTarget(document.getElementById('main-content'));
    topAppBar.listen('MDCTopAppBar:nav', () => {
        drawer.open = !drawer.open;
    });

    window.mdc.autoInit();

    //this is function timeout for the loading App scrim if script has been finished load
    setTimeout(function () {
        document
            .getElementsByClassName('loadingApp')[0]
            .className += ' hidden'
        ;
    }, 1000);

    let search = document.getElementById('search-submit'), input = document.querySelector('.search-input'),
        oi = search.parentNode.parentNode.children[0];

    search.addEventListener('click', function (e) {

        input.classList.remove('search-input_hidden');
        oi.classList.remove('fadeIn');
        oi.classList.add('fadeOut');

        setTimeout(function () {
            input.style = 'width: 100%';
            document.getElementById('search-input').focus();
        }, 10);

        setTimeout(function () {
            oi.style = 'display: none;';
        }, 500);


    });

    /**
     * Event for search button
     */
    document.getElementById('search-input').addEventListener('keyup', function (e) {

        let value = this.value;

        if (App.Function.keyboard !== undefined) {
            clearTimeout(App.Function.keyboard);
        }

        App.Function.keyboard = setTimeout(function () {

            if (value !== '') {
                getDataByParamsSearch(value);
            } else {
                getDataByParamsSearch(undefined);
            }

        }, 1000);

    });

    /**
     * Event for search button
     */
    document.getElementById('search-input').addEventListener('blur', function () {
        input.style = 'width: 0;';

        setTimeout(function () {
            oi.style = '';
            oi.classList.remove('fadeOut');
            oi.classList.add('fadeIn');
            input.classList.add('search-input_hidden');
        }, 760);
    });

    //////////////////////////////////////////////////////////////////
    //                                                              //
    //                      [REQUEST PAGING]                        //
    //                 define after load big script                 //
    //                                                              //
    //////////////////////////////////////////////////////////////////
    //this checking the request of page if user have reloading page

    App._request.splice(0, 1);

    if (App._request[0] === '') {
        App._request[0] = 'home';
    }

    if (App._request[0] === 'home') {

        new getHome();

    } else if (App._request[0] === 'komik' && App._request[1] !== "undefined" && App._request[2] !== 'chapter') {

        new getDataById(App._request[1]);

    } else if (App._request[0] === 'komik' && App._request[1] !== "undefined") {

        new getChapter(App._request[1]);

    } else if (App._request[0] === 'updated') {

        new getUpdated();

    } else if (App._request[0] === 'genres') {

        if (App._request[1] !== ''&& App._request[1] !== undefined) {
            new getDataByGenre(App._request[1]);
        } else {
            new getGenre();
        }

    } else if (App._request[0] === 'about') {

        new getAbout();

    } else if (App._request[0] === 'admin') {

        new getUploadPage();

    } else if (App._request[0] === 'list') {

        new getListComic();

    } else if (App._request[0] === 'login') {

        new getLoginPage();

    } else if (App._request[0] === 'search') {

        new getDataByParamsSearch(App._request[1]);

    }

    /**
     * PopState function
     * logic after click button back/forward browser
     * @param {string} ev
     */
    function PopState(ev) {

        let locArray = window.location.pathname.split('/');

        locArray.splice(0,1);

        App.Back = true;

        if (locArray[0] === 'home') {

            getHome(false);

        } else if (locArray[0] === 'komik' && locArray[1] !== "undefined" && locArray[2] !== 'chapter') {

            getDataById(locArray[1], false);

        } else if (locArray[0] === 'komik' && locArray[1] !== "undefined") {

            getChapter(locArray[1], false);

        } else if (locArray[0] === 'updated') {

            getUpdated(false);

        } else if (locArray[0] === 'genres') {

            if (locArray[1] !== '' && locArray[1] !== undefined) {
                new getDataByGenre(locArray[1], false);
            } else {
                new getGenre(false);
            }

        } else if (locArray[0] === 'about') {

            getAbout(false);

        } else if (locArray[0] === 'admin') {


        } else if (locArray[0] === 'list') {

            getListComic(false);

        } else if (locArray[0] === 'login') {

            getLoginPage(false);

        } else if (locArray[0] === 'search') {

            getDataByParamsSearch(locArray[1], false);

        } else if (locArray[0] === 'admin') {

            getUploadPage();

        }
    }

    /**
     * Initialize
     * this function is call in start and end of function Element
     */
    function InitializeFunction() {

        if (!document.location.pathname.search('admin')) {
            document.getElementById('top').style.paddingTop = '';
        }

        if (App.Function !== undefined) {

            if (App.Function.list !== undefined) {
                if (App.Function.list[0] !== undefined) {
                    for (let k = 0; k < App.Function.list[0].length; k++) {

                        //TODO you must private this variable if you finished this website
                        App.Function.list[0][k].addEventListener('click', function () {

                            if (this.dataset.type === 'Komik') {
                                getDataById(this.dataset.id);
                            } else if (this.dataset.type === 'Chapter') {
                                getChapter(this.dataset.id);
                            }

                        });
                    }
                }

                if (App.Function.list[1] !== undefined) {
                    for (let y = 0; y < App.Function.list[1].length; y++) {

                        //console.log(App.Function.list[1]);

                        App.Function.list[1][y].addEventListener('click', function () {

                            getChapter(this.dataset.id);

                        });

                    }
                }
            }

            if (App.Function.stopLoop !== undefined) {

                App.Function.stopLoop();

            }

        }

    }

    function beforeChangePage() {

        document.getElementById('loaders').classList.replace('mdc-linear-progress--closed', 'mdc-linear-progress--indeterminate');

        if(App.RequestData !== undefined){
            if( App.RequestData.status !== 200){
                App.RequestData.abort();
            }
        }

        if (App.Function.stopChapter !== undefined) {
            App.Function.stopChapter();
        }

        if (App.Function.confirm !== undefined) {

            if (window.confirm(App.Function.confirm)) {
                App.Function.confirm = undefined;
                App.RequestData.abort();

                if (window.stop !== undefined) {
                    window.stop();
                } else if (document.execCommand !== undefined) {
                    document.execCommand('STOP', false);
                }

                return true;
            } else {
                return false;
            }

        } else {
            if (App.Function.stop !== undefined) {
                App.Function.stop = true;
            }
            if (window.stop !== undefined) {
                window.stop();
            } else if (document.execCommand !== undefined) {
                document.execCommand('STOP', false);
            }
            return true;
        }

    }

    function ErrorAlert(){
        return window.alert('Sorry.... you are offline, please try again later...');
    }

    /**
     * Function for change Title direct
     * @param title
     */
    function changeTitle(title) {

        document.getElementById(App.titleApp).innerHTML = title;

        // move this syntax to afterChangePage, you must create these function first
        if(window.location.pathname !== '/admin' && document.querySelector('.top-menu') !== null){
            document.querySelector('.top-menu').remove();
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
    function Ajax(type, toUrl, formData = null, notJSON = false, uploadProgress, uploadSuccess) {

        if(App.xhr_ == false){
            let cookie = document.cookie.split(';');

            cookie.forEach(function (value, key) {
                if(value.search('/PHPSESSID/i')){
                    cookie = value.replace(' ', '');
                }
            });

            toUrl += '?' + cookie;
            App.xhr_ = cookie;
        }

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

        if ("withCredentials" in xhr) {

            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            xhr.open(type, toUrl, true);

        } else if (typeof XDomainRequest != "undefined") {

            // Otherwise, check if XDomainRequest.
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xhr = new XDomainRequest();
            xhr.open(type, toUrl, true);

        } else {

            // Otherwise, CORS is not supported by the browser.
            xhr = null;

        }

        if (!xhr) {
            throw new Error('CORS not supported');
        }

        xhr.upload.onprogress = uploadProgress;
        xhr.upload.onloadend = uploadSuccess;

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

        // DEFAULT ERROR!!!!
        xhr.addEventListener('error', function () {
            return ErrorAlert();
        });

        xhr.finish = function (callback) {
            return xhr.upload.addEventListener('loadend', callback);
        };

        xhr.withCredentials = true;

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