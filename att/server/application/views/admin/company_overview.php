<?php include 'header.php' ?>

<?php
if ($cmp_profile != '') {
    $company_name = $cmp_profile->company_name;
    $company_email = $cmp_profile->company_email;
    $company_alt_email = $cmp_profile->company_alt_email;
    $company_address = $cmp_profile->company_address;
    $company_contact_no = $cmp_profile->company_contact_no;
    $company_alt_contact_no = $cmp_profile->company_alt_contact_no;
    $website_url = $cmp_profile->website_url;
    $company_logo = $cmp_profile->company_logo;
    //$url = base_url().'admin/company_profile/profile_update/'.$cmp_profile->id;
} else {
    $company_name = '-';
    $company_email = '-';
    $company_alt_email = '-';
    $company_address = '-';
    $company_contact_no = '-';
    $company_alt_contact_no = '-';
    $website_url = '-';
    $company_logo = '';
    //$url = base_url().'admin/company_profile/profile_create/';
}
?>
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
                                <span>Company Overview</span>
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
                                        if ($company_logo == ''){
                                        ?>
                                        <img src="http://www.placehold.it/200x150/EFEFEF/AAAAAA&amp;text=no+image"
                                             class="img-responsive" name="" alt=""/></div>

                                    <?php
                                    }else{
                                    ?>
                                    <img src="<?= base_url() . 'uploads/company_logo/' . $company_logo ?>"
                                         class="img-responsive" name="" alt=""/></div>

                                <?php
                                }
                                ?>
                                    <!-- END SIDEBAR USERPIC -->
                                    <!-- SIDEBAR USER TITLE -->
                                    <div class="profile-usertitle">
                                        <div class="profile-usertitle-name"> Akrivia Automation Pvt Ltd</div>
                                        
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
                                            <li class="<?php echo ($tab == 'company_overview') ? 'active' : ''; ?>">
                                                <a href="<?= base_url() . 'admin/company_overview' ?>">
                                                    <i class="icon-home"></i> Overview </a>
                                            </li>
                                            <li class="<?php echo ($tab == 'company_profile') ? 'active' : ''; ?>">
                                                <a href="<?= base_url() . 'admin/company_profile' ?>">
                                                    <i class="icon-settings"></i> Company Settings </a>
                                            </li>
                                            <!--  <li>
                                                 <a href="page_user_profile_1_help.html">
                                                     <i class="icon-info"></i> Help </a>
                                             </li> -->
                                        </ul>
                                    </div>
                                    <!-- END MENU -->
                                </div>
                                <!-- END PORTLET MAIN -->
                               
                                <!-- END PORTLET MAIN -->
                            </div>
                            <!-- END BEGIN PROFILE SIDEBAR -->
                            <!-- BEGIN PROFILE CONTENT -->
                            <div class="profile-content">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="panel-group">
                                            <div class="panel panel-default">
                                                <div class="panel-heading font-green-seagreen"><b>Company Overview</b></div>
                                            <div class="panel-body">
                                                <div class="tab-content">
                                                    <!-- PERSONAL INFO TAB -->
                                                    <div class="tab-pane active" id="tab_1_1">
                                                         <table class="table">
                                       
                                             <tr>
                                                 <th>Company Name</th>
                                                <td><?=$company_name?></td>
                                                 </tr>
                                                
                                                 <tr>
                                                 <th>Company Email</th>
                                                <td><?=$company_email?></td>
                                                 </tr>

                                                 <tr>
                                                 <th>Alternative Company Email</th>
                                                <td><?php if($company_alt_email){ echo $company_alt_email; }else{ echo '-'; }?></td>
                                                 </tr>
                                                 <tr>
                                                 <th>Company Number</th>
                                                <td><?=$company_contact_no?></td>
                                                 </tr>
                                                 <tr>
                                                 <th>Alternative Company Number</th>
                                                <td><?php if($company_alt_contact_no){ echo  $company_alt_contact_no; }else{ echo '-'; }?></td>
                                                 </tr>
                                                 <tr>
                                                 <th>Address</th>
                                                <td><?=$company_address?></td>
                                                 </tr>
                                                 <tr>
                                                 <th>Website</th>
                                                <td><a href="<?=$website_url?>" target="_blank"><?=$website_url?></a></td>
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