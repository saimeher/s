<?php include 'header.php' ?>
<?php
if ($profile->status == 1 || $profile->status == 0) {

    $breadcumb = 'Panel Profile';
     $opr = "Meter type Edit & Delete";
} else if ($profile->status == 2) {

    $breadcumb = 'Panel Recovery Profile';
      $opr = "Restore Meter Type";
}
?>

<!-- END SIDEBAR -->
<!-- BEGIN CONTENT -->
<div class="page-content-wrapper">
    <!-- BEGIN CONTENT BODY -->

    <div class="page-content">

        <!-- END THEME PANEL -->
        <div class="col-md-12">
            <h1 class="page-title"> <?= $breadcumb ?>
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
                        if ($profile->status == 1 || $profile->status == 0) { ?>
                            <a href="<?= base_url() . 'admin/panel' ?>">Panel</a>
                            <i class="fa fa-angle-right"></i>
                        <?php } else if ($profile->status == 2) { ?>
                            <a href="<?= base_url() . 'admin/panel_recovery' ?>">Panel Recovery List</a>
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
        </div>

        <!-- END PAGE HEADER-->
        <?php
        $substation = $this->db->get_where('sub_station', array('id' => $profile->sub_station))->row();
        ?>
        <div class="row">

            <div class="col-md-6">
                <div class="col-md-12">
                    <div class="panel-group">
                        <div class="panel panel-default">
                            <div class="panel-heading font-green-seagreen"><b>Panel Details</b></div>
                            <div class="panel-body">
                                <table class="table">
                                    <tr>
                                        <th>Panel Name</th>
                                        <td><?= $profile->group_name ?></td>
                                    </tr>
                                    <tr>
                                        <th>Short Name</th>
                                        <td><?= $profile->display_name ?></td>
                                    </tr>
                                    <tr>
                                        <th>Status</th>
                                        <td>
                                            <?php
                                            if ($profile->status == 1) {
                                                echo '<span class="label label-success">Active</span>';
                                            } else if ($profile->status == 0) {
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
                <div class="col-md-12">
                    <div class="panel-group">
                        <div class="panel panel-default">
                            <div class="panel-heading font-green-seagreen"><b>Dates</b></div>
                            <div class="panel-body">
                                <table class="table">
                                    <tr>
                                        <th>Created On</th>
                                        <td><?= date('d/m/Y', $profile->created_date) ?></td>
                                    </tr>
                                    <tr>
                                        <th>Last Updated On</th>
                                        <td><?php
                                            if ($profile->updated_date != '') {
                                                echo date('d/m/Y', $profile->updated_date);
                                            } else {
                                                echo date('d/m/Y', $profile->created_date);
                                            }

                                            ?></td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="col-md-12">
                    <div class="panel-group">
                        <div class="panel panel-default">
                            <div class="panel-heading font-green-seagreen"><b>Center Details</b></div>
                            <div class="panel-body">
                                <table class="table">
                                    <tr>
                                        <th>Center Name</th>
                                        <td><?= $substation->station_name ?></td>
                                    </tr>
                                    <tr>
                                        <th>Center Short Name</th>
                                        <td><?= $substation->display_name ?></td>
                                    </tr>
                                    <tr>
                                        <th>Contact No</th>
                                        <td><?= $substation->contact ?></td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="col-md-12">
                    <div class="panel-group">
                        <div class="panel panel-default">
                            <div class="panel-heading font-green-seagreen"><b><?=$opr?></b></div>
                            <div class="panel-body">
                                <table class="table">
                                   
                                    <?php
                                    if ($profile->status == 1 || $profile->status == 0) {
                                        ?>
                                         <a class="btn btn-warning btn_cls" data-toggle="tooltip"
                                       data-placement="top" title="" data-original-title="Update"
                                       href="<?php echo base_url(); ?>admin/panel_edit/<?php echo $profile->id; ?>"> <i
                                            class="glyphicon glyphicon-pencil"></i>Edit</a>
                                        <a class="btn btn-danger" data-toggle="tooltip"
                                           data-placement="top" title="" data-original-title="Delete"
                                           onclick="return bootboxConfirm('Are you sure delete this Panel ( <?= $this->admin_model->get_panel_name($profile->id) ?> )',this.href)"
                                           href="<?php echo base_url(); ?>admin/panel_delete/<?php echo $profile->id; ?>">
                                            <i
                                                class="glyphicon glyphicon-trash"></i>Delete</a>

                                        <?php

                                    } else if ($profile->status == 2) {
                                        ?>
                                        <a class="btn yellow  danger-tooltip" data-toggle="tooltip" data-toggle="tooltip"
                                           data-placement="top" title="" data-original-title="Restore"
                                           onclick="return bootboxConfirm('Are you sure Restore this Panel ( <?= $this->admin_model->get_panel_name($profile->id) ?> )',this.href)"
                                           href="<?php echo base_url(); ?>admin/panel_recovery/<?php echo $profile->id; ?>">
                                            <i
                                                class="glyphicon glyphicon-repeat"></i> Restore</a>
                                        <?php

                                    }
                                    ?>

                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="col-md-12">
                    <div class="panel-group">
                        <div class="panel panel-default">
                            <div class="panel-heading font-green-seagreen"><b>Center Contact Person Details</b>
                            </div>
                            <div class="panel-body">
                                <table class="table">
                                    <tr>
                                        <th>Contact Person Name</th>
                                        <td><?= $substation->contact_person ?></td>
                                    </tr>
                                    <tr>
                                        <th>Contact Person Mobile</th>
                                        <td><?= $substation->contact_no ?></td>
                                    </tr>

                                    <tr>
                                        <th>Status</th>
                                        <td>
                                            <?php
                                            if ($substation->status == 1) {
                                                echo '<span class="label label-success">Active</span>';
                                            } else if ($substation->status == 0) {
                                                echo '<span class="label label-warning">In Active</span>';
                                            } else {
                                                echo '<span class="label label-danger">Delete</span>';
                                            }
                                            ?>
                                        </td>
                                    </tr>
                                    <!-- <tr>
                                       <th>Alternative Contact No</th>
                                       <td>123456789</td>
                                   </tr> -->

                                </table>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="col-md-12">
                    <?php
                    $meters = explode(',', $profile->meters);
                    for ($i = 0; $i < sizeof($meters) - 1; $i++) {

                        $meter = $this->db->get_where('meter', array('id' => $meters[$i]))->row();

                        ?>

                        <div class="panel-group">
                            <div class="panel panel-default">
                                <div class="panel-heading font-green-seagreen"><b>Meter Details</b></div>
                                <div class="panel-body">
                                    <table class="table">
                                        <tr>
                                            <th>Meter Name</th>
                                            <td><?= $meter->meter_name ?></td>
                                        </tr>
                                        <tr>
                                            <th>Meter Short Name</th>
                                            <td><?= $meter->display_name ?></td>
                                        </tr>

                                        <tr>
                                            <th>Meter Type</th>
                                            <td><?= $meter->meter_type ?></td>
                                        </tr>

                                        <tr>
                                            <th>Status</th>
                                            <td>
                                                <?php
                                                if ($meter->status == 1) {
                                                    echo '<span class="label label-success">Active</span>';
                                                } else if ($meter->status == 0) {
                                                    echo '<span class="label label-warning">In Active</span>';
                                                } else {
                                                    echo '<span class="label label-danger">Delete</span>';
                                                }
                                                ?>
                                            </td>
                                        </tr>
                                        <!-- <tr>
                                           <th>Alternative Contact No</th>
                                           <td>123456789</td>
                                       </tr> -->

                                    </table>
                                </div>
                            </div>

                        </div>


                    <?php } ?>

                </div>

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
