<?php include 'header.php' ?>

    <!-- END SIDEBAR -->
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <!-- BEGIN CONTENT BODY -->
        <div class="page-content">

            <!-- END THEME PANEL -->
            <h1 class="page-title"> Admin Dashboard
                <!--   <small>statistics, charts, recent events and reports</small> -->
            </h1>
            <div class="page-bar">
                <ul class="page-breadcrumb">
                    <li>
                        <i class="icon-home"></i>
                        <span>Dashboard</span>

                    </li>

                </ul>

            </div>
            <!-- END PAGE HEADER-->
            <div class="row">
                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <a class="dashboard-stat dashboard-stat-v2 blue" href="<?=base_url().'admin/sub_station'?>">
                        <div class="visual">
                            <i class="fa fa-th-large"></i>
                        </div>
                        <div class="details">
                            <div class="number">
                                <span data-counter="counterup" data-value="<?=$center_count; ?>">0</span>
                            </div>
                            <div class="desc"> Centers </div>
                        </div>
                    </a>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <a class="dashboard-stat dashboard-stat-v2 red" href="<?=base_url().'admin/meter'?>">
                        <div class="visual">
                            <i class="fa fa-tachometer"></i>
                        </div>
                        <div class="details">
                            <div class="number">
                                <span data-counter="counterup" data-value="<?=$meter_count; ?>">0</span>
                            </div>
                            <div class="desc"> Meters </div>
                        </div>
                    </a>

                </div>
                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <a class="dashboard-stat dashboard-stat-v2 green" href="<?=base_url().'admin/panel'?>">
                        <div class="visual">
                            <i class="fa fa-credit-card"></i>
                        </div>
                        <div class="details">
                            <div class="number">
                                <span data-counter="counterup" data-value="<?=$panel_count; ?>">0</span>
                            </div>
                            <div class="desc"> Panels </div>
                        </div>
                    </a>

                </div>
                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <a class="dashboard-stat dashboard-stat-v2 purple" href="<?=base_url().'admin/user'?>">
                        <div class="visual">
                            <i class="fa fa-users"></i>
                        </div>
                        <div class="details">
                            <div class="number">
                                <span data-counter="counterup" data-value="<?=$user_count; ?>">0</span>
                            </div>
                            <div class="desc"> Users </div>
                        </div>
                    </a>

                </div>


            </div>




        <!-- END CONTENT BODY -->
    </div>
    <!-- END CONTENT -->
    <!-- BEGIN QUICK SIDEBAR -->
    <a href="javascript:;" class="page-quick-sidebar-toggler">
        <i class="icon-login"></i>
    </a>
    <!--  -->
    <!-- END QUICK SIDEBAR -->
    </div>

    <!-- END CONTAINER -->
    <!-- BEGIN FOOTER -->
<?php include "footer.php"?>