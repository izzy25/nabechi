<?php

session_start();

require 'config.php';
include '_token.php';

$request_ray = explode('/', $_SERVER['REQUEST_URI']);

switch($request_ray[1]){
    case 'admin';
    include '_admin.php';
    break;
    case 'logout';
    include '_logout.php';
    break;
}

if(empty($_GET['verifyUser']) && empty($_GET['d'])){
?>

<!doctype html>
<html lang="en" prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0, minimum-scale=1.0">
    <title>Nabechi - Home</title>

    <!-- Meta Tags for Open Graph -->
    <meta property="og:tittle" content="Nabechi App Beta" />
    <meta property="og:description" content="Nabechi Website, adalah tempat membaca manga ataupun mahwa scanlation dan tidak di pungut biaya sepeserpun. Website kami dapat diakses oleh siapapun dan kapanpun dengan sangat cepat." />
    <meta property="og:url" content="<?php echo HTTP . ORIGIN; ?>" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="<?php echo HTTP . ORIGIN; ?>/images/NABECHI.png" />
    <meta property="og:site_name" content="Nabechi" />

    <!-- Disable tap highlight on IE -->
    <meta name="msapplication-tap-highlight" content="no">

    <?php
    if(isset($_SESSION['verify'])){
        ?>
    <meta name="_verify" charset="UTF-8" data-code="<?php echo $_SESSION['verify']; ?>">
    <?php
    }
    ?>

    <meta name="pre" charset="UTF-8" data-crsf="<?php echo $_SESSION['_token']; ?>">

    <!-- Web Application Manifest -->
    <link rel="manifest" href="<?php echo HTTP . ORIGIN . '/'; ?>manifest.json">

    <!-- Color the status bar on mobile devices -->
    <meta name="theme-color" content="#6200ee">

    <!-- SEO: If your mobile URL is different from the desktop URL, add a canonical link to the desktop page https://developers.google.com/webmasters/smartphone-sites/feature-phones -->
    <!--
    <link rel="canonical" href="http://www.example.com/">
    -->

    <!--Style the web-->
    <link rel="stylesheet" href="<?php echo HTTP . ORIGIN . '/'; ?>src/app.css"/>

    <!--Material Components Web-->
    <!--You have to change this if build.js or build.css is exist-->
    <link rel="stylesheet" href="<?php echo HTTP . ORIGIN . '/'; ?>dist/material-components-web.min.css"/>

    <!--Normalize.css-->
    <!--Standard for website-->
    <link rel="stylesheet" href="<?php echo HTTP . ORIGIN . '/'; ?>dist/normalize.css"/>

    <!--Animate.css-->
    <link rel="stylesheet" href="<?php echo HTTP . ORIGIN . '/'; ?>dist/animate.css"/>

    <!-- Material Design icons -->
    <?php echo MATERIAL_ICON; ?>

    <!--loading script for app-->
    <script>setTimeout(function () {
            document.querySelector('.infoWarning').setAttribute('style', 'display: block;');
        }, 15000);</script>

</head>
<body class="mdc-typography">

<!--loading costum for pc, if user mobile this is just closed-->
<div role="progressbar" id="loaders" class="mdc-linear-progress">
    <div class="mdc-linear-progress__buffering-dots"></div>
    <div class="mdc-linear-progress__buffer"></div>
    <div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
        <span class="mdc-linear-progress__bar-inner"></span>
    </div>
    <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
        <span class="mdc-linear-progress__bar-inner"></span>
    </div>
</div>

<!--this is load app-->
<div class="loadingApp hidden">
    <div class="logo">
        <span class="l-name">Nabechi</span>
        <span class="beta lode">Beta</span>
    </div>
    <div class="infoWarning" style="display: none;">*Your internet connection is too low.. please wait a bit longer
    </div>
</div>

<!--this is modal drawer or aside-->
<aside class="mdc-drawer mdc-drawer--modal" data-mdc-auto-init="MDCDrawer">
    <div class="mdc-drawer__header">
        <div class="mdc-drawer__title">
            <div class="logo">
                <span class="l-name">Nabechi<span class="beta">Beta</span></span>
            </div>
        </div>
        <h6 class="mdc-drawer__subtitle">Website baca manga</h6>
    </div>
    <div class="mdc-drawer__content">
        <nav class="mdc-list">
            <a class="mdc-list-item mdc-list-item--activated butHome" aria-selected="true"
               data-mdc-auto-init="MDCRipple">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">home</i>
                <span class="mdc-list-item__text">Home</span>
            </a>
            <a class="mdc-list-item butUpdated" data-mdc-auto-init="MDCRipple">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">favorite</i>
                <span class="mdc-list-item__text">Popular</span>
            </a>
            <a class="mdc-list-item mdc-list-item--disabled list-coming" data-mdc-auto-init="MDCRipple">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">search</i>
                <span class="mdc-list-item__text">Search Advanced</span>
            </a>
            <a class="mdc-list-item butGenre" data-mdc-auto-init="MDCRipple">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">label</i>
                <span class="mdc-list-item__text">Genre</span>
            </a>
            <a class="mdc-list-item butListComic" data-mdc-auto-init="MDCRipple">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">list</i>
                <span class="mdc-list-item__text">List Comic</span>
            </a>

            <hr class="mdc-list-divider">
            <h6 class="mdc-list-group__subheader">Storage ~ Not Implemented</h6>
            <a class="mdc-list-item mdc-list-item--disabled list-coming" data-mdc-auto-init="MDCRipple">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">get_app</i>
                <span class="mdc-list-item__text">Downloaded</span>
            </a>
            <a class="mdc-list-item mdc-list-item--disabled list-coming" data-mdc-auto-init="MDCRipple">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">history</i>
                <span class="mdc-list-item__text">History</span>
            </a>
            <a class="mdc-list-item mdc-list-item--disabled list-coming" data-mdc-auto-init="MDCRipple">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">turned_in</i>
                <span class="mdc-list-item__text">Last Reading</span>
            </a>

            <hr class="mdc-list-divider">

            <h6 class="mdc-list-group__subheader">More ~ Not Implemented</h6>
            <a class="mdc-list-item mdc-list-item--disabled list-coming" data-mdc-auto-init="MDCRipple">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">info</i>
                <span class="mdc-list-item__text">Information</span>
            </a>
            <a class="mdc-list-item mdc-list-item--disabled list-coming " data-mdc-auto-init="MDCRipple">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">account_circle</i>
                <span class="mdc-list-item__text">Account</span>
            </a>
            <a class="mdc-list-item mdc-list-item--disabled list-coming" data-mdc-auto-init="MDCRipple">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">settings</i>
                <span class="mdc-list-item__text">Settings</span>
            </a>
            <a class="mdc-list-item butAbout" data-mdc-auto-init="MDCRipple">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">help</i>
                <span class="mdc-list-item__text">About Us</span>
            </a>
        </nav>
    </div>
</aside>

<!--this is background of drawer when opened-->
<div class="mdc-drawer-scrim"></div>

<!--app content-->
<div class="mdc-drawer-app-content app-content">

    <!--bar in top of website-->
    <header class="mdc-top-app-bar mdc-elevation--z4" data-mdc-auto-init="MDCTopAppBar" style="transition: all 0.3s ease-in-out 0s;">
        <div class="mdc-top-app-bar__row">
            <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start animated">
                <a class="demo-menu material-icons mdc-top-app-bar__navigation-icon">menu</a>
                <span class="mdc-top-app-bar__title" id="title-app" style="text-transform: capitalize;">Home</span>
            </section>
            <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end tab-style" role="toolbar">

                <a class="material-icons mdc-top-app-bar__action-item" aria-label="Download" alt="Search"
                   id="search-submit">search</a>

                <div class="search-input search-input_hidden">

                    <input id="search-input" type="search" placeholder="Search Comic..." autofocus="true">

                </div>

                <div class="mdc-top-app-bar__action-item mdc-menu-surface--anchor">
                    <a class="material-icons butShare" aria-label="Print this page" alt="Share" style="color: #fff;text-decoration: none;">share</a>
                    <div class="mdc-menu mdc-menu-surface menu-share" tabindex="-1" id="demo-menu" data-mdc-auto-init="MDCMenu">
                        <div class="mdc-list mdc-list--avatar-list" role="menu" aria-hidden="true" aria-orientation="vertical">
                            <a class="mdc-list-item butCopy" role="menuitem" data-type="copyLink">
                                <span class="material-icons mdc-list-item__graphic">link</span>
                                <span class="mdc-list-item__text">Copy Link</span>
                            </a>
                            <a href="whatsapp://send?text=Website%20Nabechi%20App%20Beta%0AUpdate%20cepat%20buka%20cepat%21%21%21%21%0Ahttps%3A%2F%2Fnabechi.000webhostapp.com" data-action="share/whatsapp/share" class="mdc-list-item" role="menuitem">
                                <span class="material-icons mdc-list-item__graphic">public</span>
                                <span class="mdc-list-item__text">Whatsapp</span>
                            </a>
                            <a class="mdc-list-item" role="menuitem">
                                <span class="material-icons mdc-list-item__graphic">group</span>
                                <span class="mdc-list-item__text">Facebook</span>
                            </a>
                            <div class="mdc-list-divider" role="separator"></div>
                            <a class="mdc-list-item mdc-list-item--disabled">
                                Share this page to your friends...
                            </a>
                        </div>
                    </div>
                </div>

                <a class="material-icons mdc-top-app-bar__action-item hidden" aria-label="Bookmark this page"
                   alt="Tool">more_vert</a>
            </section>
        </div>
    </header>

    <!--content for website in here-->
    <main class="main-content animated slideInUp" id="main-content">

        <div class="mdc-top-app-bar--fixed-adjust" id="top" style="transition: all 1s ease-in-out">
        </div>

        <div id="ajax-content"></div>

    </main>
</div>

<!--app footer-->

<!--script tag-->
<script src="<?php echo HTTP . ORIGIN . '/'; ?>dist/material-components-web.min.js" id="material-design-js"></script>
<script src="<?php echo HTTP . ORIGIN . '/'; ?>src/app.js" type="module" defer></script>

</body>
</html>
<?php
}
?>