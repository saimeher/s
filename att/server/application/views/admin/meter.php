<?php include 'header.php' ?>
<?php
if ($result != '') {
    $meter_name = $result->meter_name;
    $display_name = $result->display_name;
    $meter_type = $result->meter_type;
    $sid = $result->sid;
    $status = $result->status;
    $bredcumb = 'Update Meter';

} else {
    $meter_name = set_value('meter_name');
    $display_name = set_value('short_name');
    $meter_type = set_value('meter_type');
    $status = set_radio('status');
    $sid = set_value('sid');
    $bredcumb = 'Add New Meter';
}
?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">

    <!-- BEGIN CONTENT BODY -->
    <div class="page-content">

        <div class="page-bar">
            <ul class="page-breadcrumb">
                <li>
                    <i class="icon-home"></i>
                    <a href="<?= base_url() . 'admin' ?>">Home</a>
                    <i class="fa fa-angle-right"></i>
                </li>
                <li>
                    <a href="<?= base_url() . 'admin/meter' ?>">Meters</a>
                    <i class="fa fa-angle-right"></i>
                </li>
                <li>
                    <span><?= $bredcumb ?></span>
                </li>
            </ul>
            <!-- <a href="index.php" class="btn btn-warning pull-right">Go to Home</a> -->
        </div>
        <div class="portlet box green ">
            <div class="portlet-title">
                <div class="caption">
                    <i class="fa fa-plus-circle"></i> <?= $bredcumb ?>
                </div>
            </div>

            <div class="portlet-body form">
                <?php if (validation_errors()) {
                    echo '<div class="alert alert-danger">' . validation_errors() . '</div>';
                }
                echo form_open('', 'autocomplete="off"');
                ?>
                <div class="form-body">
                    <div class="panel panel-success">
                        <div class="panel-heading ">
                            Meter Details
                        </div>
                        <div class="panel-body">
                            <div class="form-group col-md-6">
                                <label class="control-label">Meter Name</label>

                                <input type="text" class="form-control" name="meter_name"
                                       value="<?= $meter_name; ?>"
                                       maxlength="50">
                            </div>
                            <div class="form-group col-md-6">
                                <label class="control-label">Meter Short Name</label>
                                <input type="text" class="form-control" name="short_name"
                                       value="<?= $display_name ?>"
                                       maxlength="30">
                            </div>

                            <div class="form-group col-md-6">
                                <label class="control-label">Meter Type</label>

                                <select name="meter_type"
                                        class="form-control select2 select2-hidden-accessible"
                                         tabindex="-1" aria-hidden="true">
                                    <option value="">Select Meter Type</option>
                                    <?php
                                    $meter_type1 = $this->db->get_where('meter_type', array('status' => 1))->result_array();
                                    foreach ($meter_type1 as $type):
                                        ?>
                                        <option value="<?= $type['meter_type'] ?>"
                                                <?php if ($meter_type == $type['meter_type']){ ?>selected=""<?php } ?> ><?= $type['meter_type'] ?></option>
                                        <?php
                                    endforeach;
                                    ?>
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label class="control-label">Meter Id</label>
                                <input type="text" class="form-control" name="sid"
                                       value="<?= $sid ?>"
                                       maxlength="30">
                            </div>
                        </div>
                    </div>


                    <div class="panel panel-success">
                        <div class="panel-heading">
                            Meter Status
                        </div>
                        <div class="panel-body">
                            <?php if ($status == '') { ?>
                                <input type="checkbox" class="make-switch green" name="status" value="1" data-on-color="success" data-off-color="danger" <?php echo  set_checkbox('status', '1'); ?> >
                            <?php } else {
                                ?>
                                <div class="form-group">
                                    <label class="col-md-1 control-label">Status</label>
                                    <div class="col-md-9">
                                        <div class="radio">
                                            <label>
                                                <input type="radio" name="status" id="status1"
                                                       value=1 <?php if ($status == 1) { ?> checked="checked" <?php } ?>
                                                       tabindex="6">
                                                <span class="label label-success">Active</span>
                                            </label>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <label>
                                                <input type="radio" name="status" id="status2"
                                                       value=0 <?php if ($status == 0) { ?> checked="checked" <?php } ?>
                                                       tabindex="7">
                                                <span class="label label-warning">In Active</span>
                                            </label>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <!--label>
                                                <input type="radio" name="status" id="status3"
                                                       value=2 <?php if ($status == 2) { ?> checked="checked" <?php } ?>
                                                       tabindex="8">
                                                <span class="label label-danger">Delete</span>
                                            </label-->
                                        </div>
                                    </div>
                                </div>
                                <?php
                            } ?>
                        </div>
                    </div>

                    <div class="form-actions right">

                        <button type="submit" class="btn dark">Submit</button>
                    </div>
                    </form>
                </div>
            </div>

        </div>
    </div>

<?php include "footer.php" ?>