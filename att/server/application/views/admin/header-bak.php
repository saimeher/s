<!DOCTYPE html>
<!-- 
Template Name: Metronic - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.7
Version: 4.7
Author: KeenThemes
Website: http://www.keenthemes.com/
Contact: support@keenthemes.com
Follow: www.twitter.com/keenthemes
Dribbble: www.dribbble.com/keenthemes
Like: www.facebook.com/keenthemes
Purchase: http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes
Renew Support: http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes
License: You must have a valid license purchased only from themeforest(the above link) in order to legally use the theme for your project.
-->
<!--[if IE 8]>
<html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]>
<html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<!-- BEGIN HEAD -->

<head>
    <meta charset="utf-8"/>
    <title>EnMontoR</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <meta
        content="#1 selling multi-purpose bootstrap admin theme sold in themeforest marketplace packed with angularjs, material design, rtl support with over thausands of templates and ui elements and plugins to power any type of web applications including saas and admin dashboards. Preview page of Theme #2 for statistics, charts, recent events and reports"
        name="description"/>
    <meta content="" name="author"/>
    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet"
          type="text/css"/>
    <link href="<?= base_url() ?>assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet"
          type="text/css"/>
    <link href="<?= base_url() ?>assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet"
          type="text/css"/>
    <link href="<?= base_url() ?>assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet"
          type="text/css"/>
    <link href="<?= base_url() ?>assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet"
          type="text/css"/>
    <!-- END GLOBAL MANDATORY STYLES -->
    <!-- BEGIN PAGE LEVEL PLUGINS -->
    <link href="<?= base_url() ?>assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.css"
          rel="stylesheet" type="text/css"/>
    <link href="<?= base_url() ?>assets/global/plugins/morris/morris.css" rel="stylesheet" type="text/css"/>
    <link href="<?= base_url() ?>assets/global/plugins/fullcalendar/fullcalendar.min.css" rel="stylesheet"
          type="text/css"/>
    <link href="<?= base_url() ?>assets/global/plugins/jqvmap/jqvmap/jqvmap.css" rel="stylesheet" type="text/css"/>

    <link href="<?= base_url() ?>assets/pages/css/login.min.css" rel="stylesheet" type="text/css"/>
    <link href="<?= base_url() ?>assets/pages/css/profile.min.css" rel="stylesheet" type="text/css"/>
    <link href="<?= base_url() ?>assets/global/plugins/datatables/datatables.min.css" rel="stylesheet" type="text/css"/>
    <!-- END PAGE LEVEL PLUGINS -->
    <!-- BEGIN THEME GLOBAL STYLES -->
    <link href="<?= base_url() ?>assets/global/css/components-md.min.css" rel="stylesheet" id="style_components"
          type="text/css"/>
    <link href="<?= base_url() ?>assets/global/css/plugins-md.min.css" rel="stylesheet" type="text/css"/>
    <!-- END THEME GLOBAL STYLES -->

    <!-- BEGIN PAGE LEVEL PLUGINS -->
    <link href="<?= base_url() ?>assets/global/plugins/select2/css/select2.min.css" rel="stylesheet" type="text/css" />
    <link href="<?= base_url() ?>assets/global/plugins/select2/css/select2-bootstrap.min.css" rel="stylesheet" type="text/css" />
    <!-- END PAGE LEVEL PLUGINS -->

    <!-- BEGIN THEME LAYOUT STYLES -->
    <link href="<?= base_url() ?>assets/layouts/layout2/css/layout.min.css" rel="stylesheet" type="text/css"/>
    <link href="<?= base_url() ?>assets/layouts/layout2/css/themes/blue.min.css" rel="stylesheet" type="text/css"
          id="style_color"/>
    <link href="<?= base_url() ?>assets/layouts/layout2/css/custom.min.css" rel="stylesheet" type="text/css"/>

    <!-- END THEME LAYOUT STYLES -->
    <link rel="shortcut icon" href="favicon.ico"/>
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet"
          type="text/css"/>
    <link href="<?= base_url() ?>assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet"
          type="text/css"/>

    <link href="<?= base_url() ?>assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css" rel="stylesheet"
          type="text/css"/>
</head>




<body class="page-header-fixed page-sidebar-closed-hide-logo page-container-bg-solid page-md">
<!-- BEGIN HEADER -->
<div class="page-header navbar navbar-fixed-top">
    <!-- BEGIN HEADER INNER -->
    <div class="page-header-inner ">
        <!-- BEGIN LOGO -->
        <div class="page-logo">
            <a href="#">
                <img src="<?= base_url() ?>assets/images/logo.png" alt="logo" class="logo-default"/> </a>
            <div class="menu-toggler sidebar-toggler">
                <!-- DOC: Remove the above "hide" to enable the sidebar toggler button on header -->
            </div>
        </div>
        <!-- END LOGO -->
        <!-- BEGIN RESPONSIVE MENU TOGGLER -->
        <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse"
           data-target=".navbar-collapse"> </a>

        <div class="page-top">
            <!-- BEGIN HEADER SEARCH BOX -->
            <!-- DOC: Apply "search-form-expanded" right after the "search-form" class to have half expanded search box -->
            <form class="search-form search-form-expanded" action="page_general_search_3.html" method="GET">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search..." name="query">
                    <span class="input-group-btn">
                                <a href="javascript:;" class="btn submit">
                                    <i class="icon-magnifier"></i>
                                </a>
                            </span>
                </div>
            </form>
            <!-- END HEADER SEARCH BOX -->
            <?php
            $res = $this->admin_model->admin_details($this->session->userdata('login_user_id'));
            ?>
            <!-- BEGIN TOP NAVIGATION MENU -->
            <div class="top-menu">
                <ul class="nav navbar-nav pull-right">


                    <li class="dropdown dropdown-user">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
                           data-close-others="true">
                            <img alt="" class="img-circle"
                                 src="<?= base_url() . 'uploads/profile_pic/' . $res->profile_pic ?>"/>
                            <span class="username username-hide-on-mobile"><?= $res->username; ?>  </span>
                            <i class="fa fa-angle-down"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="<?= base_url() . 'admin/overview' ?>">
                                    <i class="icon-user"></i> My Profile </a>
                            </li>

                            <li>
                                <a href="<?= base_url() . 'admin/logout' ?>">
                                    <i class="icon-key"></i> Log Out </a>
                            </li>
                        </ul>
                    </li>
                    <!-- END USER LOGIN DROPDOWN -->
                    <!-- BEGIN QUICK SIDEBAR TOGGLER -->
                    <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
                    <li class="dropdown dropdown-extended quick-sidebar-toggler">
                        <span class="sr-only">Toggle Quick Sidebar</span>
                        <i class="icon-logout"></i>
                    </li>
                    <!-- END QUICK SIDEBAR TOGGLER -->
                </ul>
            </div>
            <!-- END TOP NAVIGATION MENU -->
        </div>
        <!-- END PAGE TOP -->
    </div>
    <!-- END HEADER INNER -->
</div>
<!-- END HEADER -->
<!-- BEGIN HEADER & CONTENT DIVIDER -->
<div class="clearfix"></div>
<!-- END HEADER & CONTENT DIVIDER -->

<!-- END HEADER & CONTENT DIVIDER -->
<!-- BEGIN CONTAINER -->
<div class="page-container">
    <!-- BEGIN SIDEBAR -->
    <div class="page-sidebar-wrapper">

        <div class="page-sidebar navbar-collapse collapse">

            <ul class="page-sidebar-menu  page-header-fixed page-sidebar-menu-hover-submenu " data-keep-expanded="false"
                data-auto-scroll="true" data-slide-speed="200">
                <li class="nav-item  <?php if ($page == 'dashboard') { ?> active <?php } ?> ">
                    <a href="<?= base_url() . 'admin' ?>" class="nav-link nav-toggle">
                        <i class="fa fa-dashboard"></i>
                        <span class="title">Dashboard</span>
                        <?php if ($page == 'dashboard') { ?>
                            <span class="selected"></span>
                            <span class="arrow open"></span> <?php } ?>
                    </a>

                </li>
                <li class="nav-item  <?php if ($page == 'substation') { ?> active <?php } ?> ">
                    <a href="<?= base_url() . 'admin/sub_station' ?>" class="nav-link nav-toggle">
                        <i class="fa fa-diamond"></i>
                        <span class="title">Sub Station</span>
                        <?php if ($page == 'substation') { ?>
                            <span class="selected"></span>
                            <span class="arrow open"></span> <?php } ?>

                    </a>

                </li>
                <li class="nav-item  <?php if ($page == 'meter') { ?> active <?php } ?> ">
                    <a href="<?= base_url() . 'admin/meter' ?>" class="nav-link nav-toggle">
                        <i class="fa fa-tachometer"></i>
                        <span class="title">Meter</span>
                    <?php if ($page == 'meter') { ?>
                        <span class="selected"></span>
                        <span class="arrow open"></span> <?php } ?>
                    </a>

                </li>
                <li class="nav-item   <?php if ($page == 'panel') { ?> active <?php } ?>">
                    <a href="<?= base_url() . 'admin/panel' ?>" class="nav-link nav-toggle">
                        <i class="fa fa-credit-card"></i>
                        <span class="title">Panels</span>
                        <?php if ($page == 'panel') { ?>
                            <span class="selected"></span>
                            <span class="arrow open"></span> <?php } ?>
                    </a>

                </li>
                <li class="nav-item   <?php if ($page == 'metertype') { ?> active <?php } ?>">
                    <a href="<?= base_url() . 'admin/metertype' ?>" class="nav-link nav-toggle">
                        <i class="fa fa-tachometer"></i>
                        <span class="title">Meter Type</span>
                        <?php if ($page == 'metertype') { ?>
                            <span class="selected"></span>
                            <span class="arrow open"></span> <?php } ?>
                    </a>

                </li>
                <li class="nav-item  <?php if ($page == 'company_profile' || $page == 'app_setting') { ?> active <?php } ?>">
                    <a href="#" class="nav-link nav-toggle">
                        <i class="fa fa-cog"></i>
                        <span class="title">Settings</span>

                    </a>
                    <ul class="sub-menu">
                        <li class="nav-item start active open">
                            <a href="<?= base_url() . 'admin/company_overview' ?>" class="nav-link ">
                                <i class="fa fa-cog"></i>
                                <span class="title">Company Settings</span>
                                <?php if ($page == 'company_profile') { ?>
                                    <span class="selected"></span>
                                    <span class="arrow open"></span> <?php } ?>

                            </a>
                        </li>
                        <li class="nav-item start ">
                            <a href="<?=base_url().'admin/application_setting'?>" class="nav-link ">
                                <i class="fa fa-cog"></i>
                                <span class="title">Application Settings</span>
                                <?php if ($page == 'app_setting') { ?>
                                    <span class="selected"></span>
                                    <span class="arrow open"></span> <?php } ?>

                            </a>
                        </li>

                    </ul>

                </li>
                <li class="nav-item   <?php if ($page == 'users') { ?> active <?php } ?>">
                    <a href="<?= base_url() . 'admin/user' ?>" class="nav-link nav-toggle">
                        <i class="fa fa-users"></i>
                        <span class="title">Users</span>
                        <?php if ($page == 'user') { ?>
                            <span class="selected"></span>
                            <span class="arrow open"></span> <?php } ?>
                    </a>

                </li>

            </ul>
            <!-- END SIDEBAR MENU -->
        </div>
        <!-- END SIDEBAR -->
    </div>