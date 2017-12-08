<?php include 'header.php' ?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <!-- BEGIN CONTENT BODY -->
        <div class="page-content">
            <h1 class="page-title"> List of Meters
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
                        <span>Meters</span>
                    </li>
                </ul>
                <!-- <a href="index.php" class="btn btn-warning pull-right">Go to Home</a> -->
            </div>
            <div class="portlet light portlet-fit portlet-datatable ">
                <div class="portlet-title">
                    <div class="caption">
                        <i class="fa fa-tachometer"></i>
                        <span class="caption-subject font-dark sbold uppercase">Meters</span>
                        <div class="tools"></div>
                    </div>
                    <div class="page-bar">
                        <ul class="page-breadcrumb pull-right">
                        <li>

                             <a href="<?= base_url() . 'admin/meter_add' ?>" class="btn dark pull-right"><i class="fa fa-plus-circle"></i>Add New Meter</a>
                        </li>
                        <li>
                             <a href="<?= base_url() . 'admin/meter_recovery' ?>" class="btn yellow pull-right btn_cls"><i class="fa fa-repeat"></i>Restore Meters</a>
                        </li>
                    </ul>
                    </div>
                   
                </div>

                <div class="portlet-body">
                    <table class="table table-striped table-bordered table-hover" width="100%"
                           id="sample_1" cellspacing="0" width="100%">
                        <thead>
                        <tr>

                            <th>S.no</th>
                            <th>Meter Name</th>
                            <th>Short Name</th>
                            <th>Meter Type</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php
                        $counter = 1;
                        foreach ($meters as $row):
                            ?>
                            <tr>
                                <td><?= $counter++; ?></td>
                                <td><?= $row['meter_name'] ?></td>
                                <td><?= $row['display_name'] ?></td>
                                <td><?= $row['meter_type'] ?></td>
                                <td>
                                    <?php
                                    if ($row['status'] == 1) {
                                        echo '<span class="label label-success">Active</span>';
                                    } else if ($row['status'] == 0) {
                                        echo '<span class="label label-warning">In Active</span>';
                                    } else {
                                        echo '<span class="label label-danger">Delete</span>';
                                    }
                                    ?>
                                </td>
                                <td>
                                    <a class="btn btn-success tooltips  btn-xs success-tooltip" data-toggle="tooltip"
                                       data-placement="top" title="" data-original-title="View"
                                       href="<?php echo base_url(); ?>admin/meter_profile/<?php echo $row['id']; ?>"> <i
                                            class="fa fa-eye"></i></a>
                                    <a class="btn btn-warning tooltips  btn-xs warning-tooltip" data-toggle="tooltip"
                                       data-placement="top" title="" data-original-title="Update"
                                       href="<?php echo base_url(); ?>admin/meter_edit/<?php echo $row['id']; ?>"> <i
                                            class="glyphicon glyphicon-pencil"></i></a>
                                    <a class="btn btn-danger tooltips  btn-xs danger-tooltip" data-toggle="tooltip"
                                       data-placement="top" title="" data-original-title="Delete"
                                       onclick="return bootboxConfirm('Are you sure delete this Meter ( <?=$this->admin_model->get_meter_name($row['id'])?> )',this.href)"
                                       href="<?php echo base_url(); ?>admin/meter_delete/<?php echo $row['id']; ?>"> <i
                                            class="glyphicon glyphicon-trash"></i></a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>


    </div>
    </div>
    <script src="<?= base_url() ?>assets/global/plugins/jquery.min.js" type="text/javascript"></script>


<?php include "footer.php" ?>
