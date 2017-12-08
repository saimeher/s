<?php include 'header.php' ?>
<?php
if ($result->status == 1 || $result->status == 0) {

    $breadcumb = 'User Profile';
     $opr = "Meter type Edit & Delete";
} else if ($result->status == 2) {

    $breadcumb = 'User Recovery Profile';
     $opr = "Meter type Edit & Delete";
}
?>

    <!-- END SIDEBAR -->
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <!-- BEGIN CONTENT BODY -->
        <div class="page-content">

            <!-- END THEME PANEL -->
            <h1 class="page-title"> <?=$breadcumb ?>
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
                        <?php
                        if ($result->status == 1 || $result->status == 0) { ?>
                            <a href="<?= base_url() . 'admin/user' ?>">User profile</a>
                            <i class="fa fa-angle-right"></i>
                        <?php } else if ($result->status == 2) { ?>
                            <a href="<?= base_url() . 'admin/user_recovery' ?>">User Recovery List</a>
                            <i class="fa fa-angle-right"></i>
                        <?php }
                        ?>
                    </li>
                    <li>
                        <span><?= $breadcumb ?></span>
                    </li>
                </ul>
                <!-- <a href="index.php" class="btn btn-warning pull-right">Go to Home</a> -->
            </div>
            <!-- END PAGE HEADER-->

            <div class="row">
                <div class="col-md-6">
                    <div class="panel-group">
                        <div class="panel panel-default">
                            <div class="panel-heading font-green-seagreen"><b>User Details</b></div>
                            <div class="panel-body">
                                <table class="table">
                                    <tr>
                                        <th>Username</th>
                                        <td><?= $result->username ?></td>
                                    </tr>

                                    <tr>
                                        <th>Name</th>
                                        <td><?= $result->name ?></td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                    </div>
                    <div class="panel-group">
                        <div class="panel panel-default">
                            <div class="panel-heading font-green-seagreen"><b>Access Panels</b></div>
                            <div class="panel-body">
                                <table class="table">
                                    <tr>
                                        <th>Access Panels</th>
                                        <td>
                                            <?php
                                            $panels = explode(',', $result->access_panel);
                                            $panel = $this->db->get('grouping')->result_array();
                                            foreach ($panel as $p):
                                                $c = 0;
                                                for ($i = 0; $i < sizeof($panels) - 1; $i++) {
                                                    if ($p['id'] == $panels[$i]) {
                                                        $c = 1;

                                                    }

                                                }
                                                if ($c == 1) {
                                                    echo '<a href="' . base_url() . 'admin/panel_profile/' . $p["id"] . '" target="_blank"><span class=" btn btn-xs blue"><i class="fa fa-credit-card"> </i>' . $p["group_name"] . '</span></a>';
                                                }
                                            endforeach;

                                            ?>

                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                    </div>
                    <div class="panel-group">
                        <div class="panel panel-default">
                            <div class="panel-heading font-green-seagreen"><b>User Status</b></div>
                            <div class="panel-body">
                                <table class="table">
                                    <tr>
                                        <th>Status</th>

                                        <td>
                                            <?php
                                            if ($result->status == 1) {
                                                echo '<span class="label label-success">Active</span>';
                                            } else if ($result->status == 0) {
                                                echo '<span class="label label-warning">In Active</span>';
                                            } else {
                                                echo '<span class="label label-danger">Delete</span>';
                                            }
                                            ?>
                                        </td>

                                    </tr>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="col-md-6">
                    <div class="panel-group">
                        <div class="panel panel-default">
                            <div class="panel-heading font-green-seagreen"><b>User Contact Details</b></div>
                            <div class="panel-body">
                                <table class="table">
                                    <tr>
                                        <th>Mobile</th>
                                        <td><?= $result->mobile ?></td>
                                    </tr>
                                    <tr>
                                        <th>Alternate Mobile</th>
                                        <td><?php if ($result->alt_mobile) {
                                                echo $result->alt_mobile;
                                            } else {
                                                echo '-';
                                            } ?></td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td><?= $result->email ?></td>
                                    </tr>
                                    <tr>
                                        <th>Alternate Email</th>
                                        <td><?php if ($result->alt_email) {
                                                echo $result->alt_email;
                                            } else {
                                                echo '-';
                                            } ?></td>
                                    </tr>

                                </table>
                            </div>
                        </div>

                    </div>
                    <div class="panel-group">
                        <div class="panel panel-default">
                            <div class="panel-heading font-green-seagreen"><b>Dates</b></div>
                            <div class="panel-body">
                                <table class="table">
                                    <tr>
                                        <th>Created On</th>
                                        <td><?php echo date('d/m/Y', $result->created_date); ?></td>
                                    </tr>
                                    <tr>
                                        <th>Last Updated On</th>
                                        <td><?php
                                            if ($result->updated_date != '') {
                                                echo date('d/m/Y', $result->updated_date);
                                            } else {
                                                echo date('d/m/Y', $result->created_date);
                                            }

                                            ?></td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                    </div>
                     <div class="panel-group">
                        <div class="panel panel-default">
                            <div class="panel-heading font-green-seagreen"><b><?=$opr?></b></div>
                            <div class="panel-body">
                                <table class="table">
                                   
                                    <?php
                                    if ($result->status == 1 || $result->status == 0) {
                                        ?>
                                        
                                        <a class="btn btn-warning btn_cls" data-toggle="tooltip"
                                       data-placement="top" title="" data-original-title="Update"
                                       href="<?php echo base_url(); ?>admin/user_edit/<?php echo $result->id; ?>"> <i
                                            class="glyphicon glyphicon-pencil"></i>Edit</a>
                                        <a class="btn btn-danger  btn_cls" data-toggle="tooltip"
                                           data-placement="top" title="" data-original-title="Delete"
                                           onclick="return bootboxConfirm('Are you sure delete this User ( <?=$this->admin_model->get_user_name($result->id)?> )',this.href)"
                                           href="<?php echo base_url(); ?>admin/user_delete/<?php echo $result->id; ?>"> <i
                                                class="glyphicon glyphicon-trash"></i>Delete</a>

                                        <?php

                                    } else if ($result->status == 2) {
                                        ?>
                                        <a class="btn yellow  danger-tooltip btn_cls" data-toggle="tooltip"
                                           data-placement="top" title="" data-original-title="Restore"
                                           onclick="return bootboxConfirm('Are you sure Restore this User ( <?=$this->admin_model->get_user_name($result->id)?> )',this.href)"
                                           href="<?php echo base_url(); ?>admin/user_recovery/<?php echo $result->id; ?>"> <i
                                                class="glyphicon glyphicon-repeat"></i> Restore</a>
                                        <?php

                                    }
                                    ?>

                                        <a href="#"class="btn btn-danger sbold" data-toggle="modal" data-target="#small">
                                <i class="fa fa-unlock"></i> Reset Password
                                </a>


                                </table>
                            </div>
                        </div>

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
   <div class="modal fade bs-modal-sm" id="small" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                 <div class="modal-content">
                     <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                         <h4 class="modal-title">Reset Password</h4>
                    </div>
                    <div class="modal-body">
                         <form method="post" action="<?=base_url()?>admin/user_reset_password/<?=$result->id ?>">
                            <div class="input-inline input-medium">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                         <i class="fa fa-lock"></i>
                                    </span>
                                     <input type="password" name="user_pwd" required="" class="form-control" placeholder=" Reset Password ">
                                </div>
                            </div>
                             
                       
                        <div class="modal-footer">
                          
                            <input type="submit" class="btn green" value="Submit"/>
                        </div>
                    </form>
                </div>

            </div>
        </div>
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
