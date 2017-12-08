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
                                <a href="<?= base_url() . 'admin' ?>">Dashboard</a>
                                <i class="fa fa-angle-right"></i>
                            </li>
                            <li>
                                <span>Application Settings</span>
                            </li>
                        </ul>
                        <!-- <a href="index.php" class="btn btn-warning pull-right">Go to Home</a> -->
                    </div>
                    <!-- END PAGE HEADER-->
                    <div class="row">
                        <div class="col-md-12">
                            <!-- BEGIN PROFILE SIDEBAR -->
                            
                               <div class="form-group">
                                                <label class="col-md-3 control-label btn btn-success">Application Setting</label>
                                                <div class="col-md-9">
                                                    <div class="mt-radio-inline">
                                                        <label class="mt-radio">
                                                            <input type="radio" name="optionsRadios" id="optionsRadios25" value="option1" checked=""> Online
                                                            <span></span>
                                                        </label>
                                                        <label class="mt-radio">
                                                            <input type="radio" name="optionsRadios" id="optionsRadios26" value="option2" checked=""> Offline
                                                            <span></span>
                                                        </label>
                                                       
                                                    </div>
                                                </div>
                                            </div>                        
                                                            
                        </div>
                                    <!-- END MENU -->
                              
                                <!-- END PORTLET MAIN -->
                               
                                <!-- END PORTLET MAIN -->
                           
                            <!-- END BEGIN PROFILE SIDEBAR -->
                            <!-- BEGIN PROFILE CONTENT -->
                                                       <!-- END PROFILE CONTENT -->
                        </div>
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