<?php include 'header.php' ?>

        
            <!-- END SIDEBAR -->
            <!-- BEGIN CONTENT -->
            <div class="page-content-wrapper">
                <!-- BEGIN CONTENT BODY -->
                <div class="page-content">
                   
                    <!-- END THEME PANEL -->
                    <h1 class="page-title"> Admin Profile
                      <!--   <small>statistics, charts, recent events and reports</small> -->
                    </h1>
                    <div class="page-bar">
                        <ul class="page-breadcrumb">
                            <li>
                                <i class="icon-home"></i>
                                <a href="<?=base_url().'admin'?>">Dashboard</a>
                                <i class="fa fa-angle-right"></i>
                            </li>
                            <li>
                                <span>Overview</span>
                            </li>
                        </ul>
                        <!-- <a href="index.php" class="btn btn-warning pull-right">Go to Home</a> -->
                    </div>
                    <!-- END PAGE HEADER-->
                    <div class="row">
                        <div class="col-md-12">
                            <!-- BEGIN PROFILE SIDEBAR -->
                            <div class="profile-sidebar">
                                <!-- PORTLET MAIN -->
                                <div class="portlet light profile-sidebar-portlet ">
                                    <!-- SIDEBAR USERPIC -->
                                    <div class="profile-userpic">
                                        <?php
                                        if($result->profile_pic == ''){
                                        ?>
                                            <img
                                                src="<?= base_url() . 'assets/images/default.png' ?>"
                                                name="" alt="" class="img-responsive" />
                                    <?php
                                    }else{
                                    ?>
                                    <img src="<?=base_url().'uploads/profile_pic/'.$result->profile_pic ?>" class="img-responsive" name="" alt="" /> </div>

                                <?php
                                }
                                ?>
                                <!-- END SIDEBAR USERPIC -->
                                <!-- SIDEBAR USER TITLE -->
                                <div class="profile-usertitle">
                                    <div class="profile-usertitle-name"> <?=$result->username?> </div>
                                </div>
                                <!-- END SIDEBAR USER TITLE -->
                                <!-- SIDEBAR BUTTONS -->
                                <!--    <div class="profile-userbuttons">
                                       <button type="button" class="btn btn-circle green btn-sm">Follow</button>
                                       <button type="button" class="btn btn-circle red btn-sm">Message</button>
                                   </div> -->
                                <!-- END SIDEBAR BUTTONS -->
                                <!-- SIDEBAR MENU -->
                                <div class="profile-usermenu">
                                    <ul class="nav">
                                        <li class="<?php echo ($tab == 'overview') ? 'active' : ''; ?>">
                                            <a href="<?=base_url().'admin/overview/'?>">
                                                <i class="fa fa-file-text"></i> Overview </a>
                                        </li>
                                        <li class="<?php echo ($tab == 'profile_info' || $tab == 'avatar' || $tab == 'change_password') ? 'active' : ''; ?>">
                                            <a href="<?=base_url().'admin/profile/profile_info'?>">
                                                <i class="icon-settings"></i> Profile Settings </a>
                                        </li>
                                        <!--  <li>
                                             <a href="page_user_profile_1_help.html">
                                                 <i class="icon-info"></i> Help </a>
                                         </li> -->
                                    </ul>
                                </div>
                                <!-- END MENU -->
                            </div>
                            <!-- END BEGIN PROFILE SIDEBAR -->
                            </div>
                            <!-- BEGIN PROFILE CONTENT -->
                            <div class="profile-content">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="panel-group">
                                            <div class="panel panel-default">
                                                <div class="panel-heading font-green-seagreen"><b>Profile Details</b></div>
                                            <div class="panel-body">
                                                <div class="tab-content">
                                                    <!-- PERSONAL INFO TAB -->
                                                    <div class="tab-pane active" id="tab_1_1">
                                                         <table class="table">
                                       
                                             <tr>
                                                 <th>Username</th>
                                                <td><?=$result->username?></td>
                                                 </tr>
                                                
                                                 <tr>
                                                 <th>Name</th>
                                                <td><?=$result->name?></td>
                                                 </tr>
                                                 <tr>
                                                 <th>Mobile</th>
                                                <td><?=$result->mobile?></td>
                                                 </tr>
                                                 <tr>
                                                 <th>Alternate Mobile</th>
                                                <td><?php if($result->alt_mobile){ echo $result->alt_mobile; }else{ echo '-'; } ?></td>
                                                 </tr>
                                                <tr>
                                                 <th>Email</th>
                                                <td><?=$result->email?></td>
                                                 </tr>
                                                 <tr>
                                                 <th>Alternative Email</th>
                                                <td><?php if($result->alt_email){ echo $result->alt_email; }else{ echo '-'; }?></td>
                                                 </tr>
                                        
                                             
                                     </table>
                                                    </div>
                                                 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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