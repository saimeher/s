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
    $url = base_url().'admin/company_profile/profile_update/'.$cmp_profile->id;
} else {
    $company_name = '';
    $company_email = '';
    $company_alt_email = '';
    $company_address = '';
    $company_contact_no = '';
    $company_alt_contact_no = '';
    $website_url = '';
    $company_logo = '';
    $url = base_url().'admin/company_profile/profile_create/';
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
                        <span>Company Profile</span>
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
                                <div class="profile-usertitle-name"> <?=$company_name?></div>
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
                                <div class="portlet light ">
                                    <div class="portlet-title tabbable-line">
                                        <div class="caption caption-md">
                                            <i class="icon-globe theme-font hide"></i>
                                            <span class="caption-subject font-green-seagreen bold uppercase">Company Details</span>
                                        </div>

                                    </div>
                                    <div class="portlet-body">
                                        <div class="tab-content">
                                            <!-- PERSONAL INFO TAB -->
                                            <div class="tab-pane active" id="tab_1_1">
                                                <form role="form" action="<?=$url; ?>" method="post"  enctype="multipart/form-data"  autocomplete="off">
                                                    <div class="form-group">
                                                        <label class="control-label">Company Name</label>
                                                        <input type="text" placeholder="" name="company_name" value="<?=$company_name?>"
                                                               class="form-control" required=""/></div>
                                                    <div class="form-group">
                                                        <label class="control-label">Company Email</label>
                                                        <input type="email" placeholder="" name="company_email" value="<?=$company_email?>"
                                                               class="form-control" required=""/></div>
                                                    <div class="form-group">
                                                        <label class="control-label">Company Alternate Email</label>
                                                        <input type="email" placeholder="" name="company_alt_email" value="<?=$company_alt_email?>"
                                                               class="form-control"/></div>
                                                    <div class="form-group">
                                                        <label class="control-label">Company Contact Number</label>
                                                        <input type="text" placeholder="" name="company_contact_no" value="<?=$company_contact_no?>"
                                                               class="form-control" required=""/></div>
                                                    <div class="form-group">
                                                        <label class="control-label">Company Alternate Contact
                                                            Number</label>
                                                        <input type="text" placeholder="" name="company_alt_contact_no" value="<?=$company_alt_contact_no?>"
                                                               class="form-control"/></div>

                                                    <div class="form-group">
                                                        <label class="control-label">Company Address</label>
                                                        <textarea class="form-control" rows="3" name="company_address"
                                                                  placeholder="Company Address" required=""><?=$company_address?></textarea>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="control-label">Compnay Website Url</label>
                                                        <input type="url" placeholder="http://www.mywebsite.com" value="<?=$website_url?>"
                                                               name="website_url" class="form-control"
                                                               required=""/></div>
                                                    <div class="form-group">
                                                        <div class="fileinput fileinput-new" data-provides="fileinput">
                                                            <div class="fileinput-new thumbnail"
                                                                 style="width: 200px; height: 150px;">
                                                                <?php
                                                                if ($company_logo == ''){
                                                                ?>
                                                                <img
                                                                    src="http://www.placehold.it/200x150/EFEFEF/AAAAAA&amp;text=no+image"
                                                                    name="" alt=""/></div>

                                                            <?php
                                                            }else{
                                                            ?>
                                                            <img
                                                                src="<?= base_url() . 'uploads/company_logo/' . $company_logo ?>"
                                                                name="" alt=""/></div>

                                                        <?php
                                                        }
                                                        ?>
                                                        <div class="fileinput-preview fileinput-exists thumbnail"
                                                             style="max-width: 200px; max-height: 150px;"></div>
                                                        <div>
                                                                        <span class="btn default btn-file">
                                                                            <span
                                                                                class="fileinput-new"> Select image </span>
                                                                            <span
                                                                                class="fileinput-exists"> Change </span>
                                                                            <input type="file"
                                                                                   name="company_logo"> </span>
                                                            <a href="javascript:;" class="btn default fileinput-exists"
                                                               data-dismiss="fileinput"> Remove </a>
                                                        </div>
                                                    </div>
                                                    <div class="margiv-top-10">
                                                        <input type="submit" class="btn green" value="Submit">
                                                    </div>
                                                </form>
                                            </div>
                                            <!-- END PERSONAL INFO TAB -->


                                            <!-- END PRIVACY SETTINGS TAB -->
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
<?php include "footer.php" ?>