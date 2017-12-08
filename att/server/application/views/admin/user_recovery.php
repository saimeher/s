<?php include 'header.php' ?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <!-- BEGIN CONTENT BODY -->
        <div class="page-content">
            <!-- END THEME PANEL -->
            <h1 class="page-title"> List of Restore Users
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
                        <span>User Restore</span>
                    </li>
                </ul>
                <!-- <a href="index.php" class="btn btn-warning pull-right">Go to Home</a> -->
            </div>
            <div class="portlet light portlet-fit portlet-datatable ">
                <div class="portlet-title">
                    <div class="caption">
                        <i class="fa fa-users"></i>
                        <span class="caption-subject font-dark sbold uppercase">Restore Users</span>
                        <div class="tools"></div>
                    </div>
                    <a href="<?= base_url() . 'admin/user' ?>" class="btn dark pull-right">Back to Users List</a>

                </div>
                <div id="flashmsg" class="alert alert-info" style="display:none;">Error: Alert...</div>
                <?php if ($this->session->flashdata('message')) { ?>

                <?php } ?>
                <div class="portlet-body">
                    <table class="table table-striped table-bordered table-hover dt-responsive" width="100%"
                           id="sample_3" cellspacing="0" width="100%">
                        <thead>
                        <tr>

                            <th>S.no</th>
                            <th>Username</th>
                            <th>Mobile</th>
                            <th>Email Type</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php
                        $counter = 1;
                        foreach ($users as $row):
                            ?>
                            <tr>
                                <td><?= $counter++; ?></td>
                                <td><?= $row['username'] ?></td>
                                <td><?= $row['mobile'] ?></td>
                                <td><?= $row['email'] ?></td>
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
                                       data-placement="top" title="" data-original-title="Profile"
                                       href="<?php echo base_url(); ?>admin/user_profile/<?php echo $row['id']; ?>"> <i
                                            class="glyphicon glyphicon-user"></i></a>

                                    <a class="btn btn-danger tooltips  btn-xs danger-tooltip" data-toggle="tooltip"
                                       data-placement="top" title="" data-original-title="Restore"
                                       onclick="return bootboxConfirm('Are you sure restore this User ( <?=$this->admin_model->get_user_name($row['id'])?> )',this.href)"
                                       href="<?php echo base_url(); ?>admin/user_restore/<?php echo $row['id']; ?>"> <i
                                            class="glyphicon glyphicon-repeat"></i></a>
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

    <script>
        $(document).ready(function (e) {
            <?php if($this->session->flashdata('disp')) { ?>$("#flashmsg").text('<?=$this->session->flashdata('message')?>').slideDown(600).delay(5000).slideUp(600); <?php } ?>
        });
    </script>
<?php include "footer.php" ?>