<?php include 'header.php' ?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <!-- BEGIN CONTENT BODY -->
        <div class="page-content">
            <h1 class="page-title"> List of Restore Centers
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
                        <span>Centers Restore</span>
                    </li>
                </ul>
                <!-- <a href="index.php" class="btn btn-warning pull-right">Go to Home</a> -->
            </div>
            <div class="portlet light portlet-fit portlet-datatable ">
                <div class="portlet-title">
                    <div class="caption">
                        <i class="fa fa-th-large"></i>
                        <span class="caption-subject font-dark sbold uppercase">Restore Centers</span>
                        <div class="tools"></div>
                    </div>
                    <a href="<?= base_url() . 'admin/sub_station' ?>" class="btn dark pull-right">Back to Centers
                        List</a>
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
                            <th>Center Name</th>
                            <th>Contact</th>
                            <th>Contact Person</th>
                            <th>Contact Number</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php
                        $counter = 1;
                       // $this->db->order_by('status');
                       // $this->db->where('status=', '2');
                       // $sub_stations = $this->db->get_where('sub_station')->result_array();
                        foreach ($sub_stations as $row):
                            ?>
                            <tr>
                                <td><?= $counter++; ?></td>
                                <td><?= $row['station_name'] ?></td>
                                <td><?= $row['contact'] ?></td>
                                <td><?= $row['contact_person'] ?></td>
                                <td><?= $row['contact_no'] ?></td>
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
                                       href="<?php echo base_url(); ?>admin/sub_station_profile/<?php echo $row['id']; ?>">
                                        <i class="fa fa-eye"></i></a>

                                    <a class="btn btn-danger tooltips  btn-xs danger-tooltip"
                                       onclick="return bootboxConfirm('Are you sure Restore this Center ( <?=$this->admin_model->get_substation_name($row['id'])?> )',this.href)"
                                       data-toggle="tooltip" data-placement="top" title="" data-original-title="Restore"
                                       href="<?php echo base_url(); ?>admin/sub_station_restore/<?php echo $row['id']; ?>">
                                        <i class="fa fa-repeat"></i></a>
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