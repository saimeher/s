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
                        <a href="<?= base_url() . 'admin' ?>">Dashboard</a>
                        <i class="fa fa-angle-right"></i>
                    </li>
                    <li>
                        <span>Profile</span>
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
                                if ($result->profile_pic == ''){
                                ?>
                                <img
                                    src="<?= base_url() . 'assets/images/default.png' ?>"
                                    name="" alt="" class="img-responsive" /></div>

                            <?php
                            }else{
                            ?>
                            <img src="<?= base_url() . 'uploads/profile_pic/' . $result->profile_pic ?>"
                                 class="img-responsive" name="" alt=""/></div>

                        <?php
                        }
                        ?>
                        <!-- END SIDEBAR USERPIC -->
                        <!-- SIDEBAR USER TITLE -->
                        <div class="profile-usertitle">
                            <div class="profile-usertitle-name"> <?= $result->username ?> </div>
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
                                    <a href="<?= base_url() . 'admin/overview/' ?>">
                                        <i class="fa fa-file-text"></i> Overview </a>
                                </li>
                                <li class="<?php echo ($tab == 'profile_info' || $tab == 'avatar' || $tab == 'change_password') ? 'active' : ''; ?>">
                                    <a href="<?= base_url() . 'admin/profile/profile_info' ?>">
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
                                        <span
                                            class="caption-subject bold uppercase font-green-seagreen">Profile Account</span>
                                    </div>
                                    <ul class="nav nav-tabs">

                                        <li class="<?php echo ($tab == 'profile_info') ? 'active' : ''; ?>">
                                            <a href="#tab_1_1" data-toggle="tab">Personal Info</a>
                                        </li>
                                        <li class="<?php echo ($tab == 'avatar') ? 'active' : ''; ?>">
                                            <a href="#tab_1_2" data-toggle="tab">Change Avatar</a>
                                        </li>
                                        <li class="<?php echo ($tab == 'change_password') ? 'active' : ''; ?>">
                                            <a href="#tab_1_3" data-toggle="tab">Change Password</a>
                                        </li>

                                    </ul>
                                </div>
                                <div class="portlet-body">
                                    <div class="tab-content">
                                        <!-- PERSONAL INFO TAB -->
                                        <div class="tab-pane <?php echo ($tab == 'profile_info') ? 'active' : ''; ?>"
                                             id="tab_1_1">
                                            <?php
                                            if ($tab == 'profile_info') {
                                                if (validation_errors()) {
                                                    echo '<div class="alert alert-danger">' . validation_errors() . '</div>';
                                                }
                                            }
                                            echo form_open(base_url() . 'admin/profile/profile_info/profile_update/', 'autocomplete="off"');
                                            ?>

                                            <div class="form-group">
                                                <label class="control-label">Username</label>
                                                <input type="text" placeholder="" value="<?= $result->username; ?>"
                                                       class="form-control" disabled=""/></div>
                                            <div class="form-group">
                                                <label class="control-label">Name</label>
                                                <input type="text" placeholder="" value="<?= $result->name; ?>"
                                                       name="name" class="form-control"/></div>
                                            <div class="form-group">
                                                <label class="control-label">Mobile Number</label>
                                                <input type="text" placeholder="" value="<?= $result->mobile; ?>"
                                                       name="mobile" class="form-control"/></div>
                                            <div class="form-group">
                                                <label class="control-label">Alternate Mobile Number</label>
                                                <input type="text" placeholder=""
                                                       value="<?= $result->alt_mobile; ?>" name="alt_mobile"
                                                       class="form-control"/></div>
                                            <div class="form-group">
                                                <label class="control-label">Email</label>
                                                <input type="email" placeholder="" value="<?= $result->email; ?>"
                                                       name="email" class="form-control"/></div>
                                            <div class="form-group">
                                                <label class="control-label">Alternate Email</label>
                                                <input type="text" placeholder=""
                                                       value="<?= $result->alt_email; ?>" name="alt_email"
                                                       class="form-control"/>
                                            </div>
                                            <div class="margiv-top-10">
                                                <input type="submit" class="btn green" value="Save Changes">

                                            </div>
                                            <?php echo form_close(); ?>
                                        </div>
                                        <!-- END PERSONAL INFO TAB -->
                                        <!-- CHANGE AVATAR TAB -->
                                        <div class="tab-pane <?php echo ($tab == 'avatar') ? 'active' : ''; ?>"
                                             id="tab_1_2">
                                            <?php if ($chpwd_error) {
                                                echo '<div class="alert alert-danger">' . $chpwd_error . '</div>';
                                            } ?>
                                            <form action="<?= base_url() . 'admin/profile/avatar/profile_pic/' ?>"
                                                  method="post" id="profile_pic" role="form"
                                                  enctype="multipart/form-data">
                                                <div class="form-group">
                                                    <div class="fileinput fileinput-new" data-provides="fileinput">
                                                        <div class="fileinput-new thumbnail"
                                                             style="width: 200px; height: 150px;">
                                                            <?php
                                                            if ($result->profile_pic == ''){
                                                            ?>
                                                            <img
                                                                src="<?=base_url()?>assets/images/default.png"
                                                                name="" alt=""/></div>

                                                        <?php
                                                        }else{
                                                        ?>
                                                        <img
                                                            src="<?= base_url() . 'uploads/profile_pic/' . $result->profile_pic ?>"
                                                            name="" alt=""/></div>

                                                    <?php
                                                    }

                                                    ?>
                                                    <div class="fileinput-preview fileinput-exists thumbnail"
                                                         style="max-width: 200px; max-height: 150px;"></div>
                                                    <div>
                                                        <span class="btn default btn-file">
                                                            <span class="fileinput-new"> Select image </span>
                                                        <span class="fileinput-exists"> Change </span> <input type="file" accept="image/gif, image/jpeg" name="profile_pic" id="f"> </span>
                                                        <a href="javascript:;" class="btn default fileinput-exists"
                                                        data-dismiss="fileinput"> Remove </a>
                                                    </div>
                                                </div>

                                        </div>
                                        <div class="margin-top-10">
                                            <input type="submit" class="btn green" value="Submit">

                                        </div>
                                        </form>
                                    </div>
                                    <!-- END CHANGE AVATAR TAB -->
                                    <!-- CHANGE PASSWORD TAB -->

                                    <div class="tab-pane <?php echo ($tab == 'change_password') ? 'active' : ''; ?>"
                                         id="tab_1_3">

                                        <div id="flashmsg" class="alert alert-danger"
                                             style="display:none;">Error:
                                            Alert...
                                        </div>

                                        <?php if (validation_errors()) {
                                            echo '<div class="alert alert-danger">' . validation_errors() . '</div>';
                                        } ?>
                                        <?php if ($chpwd_error) {
                                            echo '<div class="alert alert-danger">' . $chpwd_error . '</div>';
                                        } ?>
                                        <?php
                                           echo form_open(base_url() . 'admin/profile/change_password/change_pwd', 'autocomplete="off"');
                                        ?>

                                        <div class="form-group">
                                            <label class="control-label">Current Password</label>
                                            <input type="password" name="password" class="form-control"/></div>
                                        <div class="form-group">
                                            <label class="control-label">New Password</label>
                                            <input type="password" name="new_pwd" class="form-control"/></div>
                                        <div class="form-group">
                                            <label class="control-label">Re-type New Password</label>
                                            <input type="password" name="re_new_pwd" class="form-control"/></div>
                                        <div class="margin-top-10">
                                            <input type="submit" class="btn green" value="Save Changes">

                                        </div>
                                        </form>
                                    </div>
                                    <!-- END CHANGE PASSWORD TAB -->

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

    <script type="text/javascript">
        var fl = document.getElementById('f');

fl.onchange = function(e){ 
    var ext = this.value.match(/\.(.+)$/)[1];
    switch(ext)
    {
        case 'jpg':
        case 'bmp':
        case 'png':
        case 'gif':
            // alert('allowed');
            break;
        default:
            alert('not allowed');
            this.value='';
    }
};
    </script>
    <!-- END CONTAINER -->
    <script src="<?= base_url() ?>assets/global/plugins/jquery.min.js" type="text/javascript"></script>
    <script>
        $(document).ready(function(e) {

            <?php if($this->session->flashdata('disp')) { ?>$("#flashmsg").text('<?=$this->session->flashdata('message')?>').slideDown(600).delay(3000).slideUp(600); <?php } ?>
            <?php if($this->session->flashdata('disp1')) { ?>$("#flashmsg1").text('<?=$this->session->flashdata('message1')?>').slideDown(600).delay(3000).slideUp(600); <?php } ?>
            <?php if($this->session->flashdata('disp2')) { ?>$("#flashmsg2").text('<?=$this->session->flashdata('message2')?>').slideDown(600).delay(3000).slideUp(600); <?php } ?>


        });
    </script>

    <!-- BEGIN FOOTER -->
<?php include "footer.php" ?>