<?php include 'header.php' ?>
<?php
if ($profile->status == 1 || $profile->status == 0) {

    $breadcumb = 'Center Profile';
    $opr = 'Center Edit & Delete';
} else if ($profile->status == 2) {

    $breadcumb = 'Center Restore Profile';
    $opr = 'Restore Center';
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
                            <a href="<?= base_url() . 'admin/sub_station' ?>">Centers</a>
                            <i class="fa fa-angle-right"></i>
                        <?php } else if ($profile->status == 2) { ?>
                            <a href="<?= base_url() . 'admin/recovery_substation' ?>">Centers Restore List</a>
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
        <div class="row">
            <!-- substation details -->
            <div class="col-md-6">
                <div class="col-md-12">
                    <div class="panel-group">
                        <div class="panel panel-default">
                            <div class="panel-heading font-green-seagreen"><b>Details</b></div>
                            <div class="panel-body">
                                <table class="table">
                                    <tr>
                                        <th>Name</th>
                                        <td><?= $profile->station_name ?></td>
                                    </tr>
                                    <tr>
                                        <th>Short Name</th>
                                        <td><?= $profile->display_name ?></td>
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
                                                echo  date('d/m/Y', $profile->created_date);
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
                            <div class="panel-heading font-green-seagreen"><b>Communication Details</b></div>
                            <div class="panel-body">
                                <table class="table">
                                    <tr>
                                        <th>Location</th>
                                        <td><?= $profile->location ?></td>
                                    </tr>
                                    <tr>
                                        <th>Address</th>
                                        <td><?= $profile->address ?></td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="col-md-12">
                    <div class="panel-group">
                        <div class="panel panel-default">
                            <div class="panel-heading font-green-seagreen"><b> Status</b></div>
                            <div class="panel-body">
                                <table class="table">
                                    <tr>
                                        <th>Status</th>
                                        <td> <?php
                                            if ($profile->status == 1) {
                                                echo '<span class="label label-success">Active</span>';
                                            } else if ($profile->status == 0) {
                                                echo '<span class="label label-warning">In Active</span>';
                                            } else {
                                                echo '<span class="label label-danger">Delete</span>';
                                            }
                                            ?></td>
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
            </div>
            <div class="col-md-6">
                <div class="col-md-12">
                    <div class="panel-group">
                        <div class="panel panel-default">
                            <div class="panel-heading font-green-seagreen"><b>Contact Person1</b></div>
                            <div class="panel-body">
                                <table class="table">
                                    <tr>
                                        <th>Name</th>
                                        <td><?= $profile->contact_person ?></td>
                                    </tr>
                                    <tr>
                                        <th>Mobile</th>
                                        <td><?= $profile->contact_no ?></td>
                                    </tr>

                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="panel-group">
                        <div class="panel panel-default">
                            <div class="panel-heading font-green-seagreen"><b>Contact Person2</b></div>
                            <div class="panel-body">
                                <table class="table">

                                    <tr>
                                        <th>Name</th>
                                        <td><?php if ($profile->contact_alt_person) {
                                                echo $profile->contact_alt_person;
                                            } else {
                                                echo '-';
                                            } ?></td>
                                    </tr>

                                    <tr>
                                        <th>Mobile</th>
                                        <td><?php if ($profile->contact_alt_no) {
                                                echo $profile->contact_alt_no;
                                            } else {
                                                echo '-';
                                            } ?></td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="panel-group">
                        <div class="panel panel-default ">
                            <div class="panel-heading font-green-seagreen"><b>Contact Details</b></div>
                            <div class="panel-body">
                                <table class="table">
                                    <tr>
                                        <th>Contact No</th>
                                        <td><?= $profile->contact ?></td>
                                    </tr>
                                    <tr>
                                        <th>Contact No1</th>
                                        <td><?php if ($profile->alt_contact1) {
                                                echo $profile->alt_contact1;
                                            } else {
                                                echo '-';
                                            } ?></td>
                                    </tr>
                                    <tr>
                                        <th>Contact No2</th>
                                        <td><?php if ($profile->alt_contact2) {
                                                echo $profile->alt_contact2;
                                            } else {
                                                echo '-';
                                            } ?></td>
                                    </tr>
                                    <tr>
                                        <th>Contact No3</th>
                                        <td><?php if ($profile->alt_contact3) {
                                                echo $profile->alt_contact3;
                                            } else {
                                                echo '-';
                                            } ?></td>
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
                                        <a class="btn btn-warning  btn-md btn_cls" data-toggle="tooltip"
                                           data-placement="top" title="" data-original-title="Update"
                                           href="<?php echo base_url(); ?>admin/sub_station_edit/<?php echo $profile->id ?>">
                                            <i class="glyphicon glyphicon-pencil"></i> Edit</a>

                                        <a class="btn btn-danger btn-md "
                                           onclick="return bootboxConfirm('Are you sure delete this Center ( <?= $this->admin_model->get_substation_name($profile->id) ?> )',this.href)"
                                           data-toggle="tooltip" data-placement="top" title=""
                                           data-original-title="Delete"
                                           href="<?php echo base_url(); ?>admin/sub_station_delete/<?php echo $profile->id; ?>">
                                            <i class="glyphicon glyphicon-trash"></i> Delete</a>

                                        <?php

                                    } else if ($profile->status == 2) {
                                        ?>
                                        <a class="btn yellow  danger-tooltip"
                                           onclick="return bootboxConfirm('Are you sure restore this Center ( <?= $this->admin_model->get_substation_name($profile->id) ?> )',this.href)"
                                           data-toggle="tooltip" data-placement="top" title=""
                                           data-original-title="Restore"
                                           href="<?php echo base_url(); ?>admin/recovery_substation/<?php echo $profile->id; ?>">
                                            <i class="fa fa-repeat"></i> Restore</a>
                                        <?php

                                    }
                                    ?>

                                    <!-- <tr>
                                       <th>Alternative Contact No</th>
                                       <td>123456789</td>
                                   </tr> -->

                                </table>
                            </div>
                        </div>
                    </div>
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
