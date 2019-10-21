<?php

define('HTTP', $_SERVER['REQUEST_SCHEME'] . '://');
define('ORIGIN', $_SERVER['HTTP_HOST']);

//define('MATERIAL_ICON', '<link href="http://localhost/material-design-icons/iconfont/material-icon.css" rel="stylesheet"/>');
define('MATERIAL_ICON', '<link rel="stylesheet" href="' . HTTP . ORIGIN . '/material-design-icons/iconfont/material-icons.css"/>');
define('REMOTE_SERVER', 'nabechi-dev.test');