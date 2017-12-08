<?php include 'header.php' ?>
<?php
if ($result != '') {
    $meter_type = $result->meter_type;
    $meter_make = $result->meter_make;
    $act_power = $result->act_power;
    $rct_power = $result->rct_power;
    $lc = $result->lc;
    $lv = $result->lv;
    $pf = $result->pf;
    $fre = $result->fre;
    $cp_units = $result->cp_units;
    $apr_power = $result->apr_power;
    $status = $result->status;
    $breadcumb= 'Update Meter Type';
} else {
    $meter_type = set_value('meter_type');
    $meter_make = set_value('meter_make');
    $rct_power = 1;
    $act_power = 1;
    $lc = 1;
    $lv = 1;
    $pf = 1;
    $fre = 1;
    $cp_units = 1;
    $apr_power = 1;
    $status = '';
    $breadcumb= 'Add New Meter Type';
}
?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">

        <!-- BEGIN CONTENT BODY -->
        <div class="page-content">
            <h1 class="page-title"> <?=$breadcumb?>
                <!--   <small>statistics, charts, recent events and reports</small> -->
            </h1>
            <div class="page-bar">
                <ul class="page-breadcrumb">
                    <li>
                        <i class="icon-home"></i>
                        <a href="<?=base_url().'admin'?>">Dashboard</a>
                        <i class="fa fa-angle-right"></i>
                    </li>
                    <li>
                        <a href="<?=base_url().'admin/metertype'?>">Meter Types</a>
                        <i class="fa fa-angle-right"></i>
                    </li>
                    <li>
                        <span><?=$breadcumb?></span>
                    </li>
                </ul>
                <!-- <a href="index.php" class="btn btn-warning pull-right">Go to Home</a> -->
            </div>
            <div class="portlet box green ">
                <div class="portlet-title">
                    <div class="caption">
                        <i class="fa fa-plus-circle"></i> <?=$breadcumb?>
                    </div>
                </div>

                <div class="portlet-body form">
                   <?php if(validation_errors()) { echo '<div class="alert alert-danger">'.validation_errors() . '</div>'; }
                    echo form_open('','autocomplete="off"');
                ?> 
                        <div class="form-body">
                            <div class="panel panel-success">
                                <div class="panel-heading ">
                                    Meter Details
                                </div>
                                <div class="panel-body">
                                    <div class="form-group col-md-6">
                                        <label class="control-label">Meter Type</label>

                                        <input type="text" class="form-control" name="meter_type"
                                               value="<?= $meter_type; ?>"
                                               maxlength="50">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label class="control-label">Meter Make</label>
                                        <input type="text" class="form-control"  name="meter_make"
                                               value="<?= $meter_make ?>"
                                               maxlength="50">

                                    </div>

                                </div>
                            </div>
                            <div class="panel panel-success">
                                <div class="panel-heading ">
                                    Meter Parameters
                                </div>
                                <div class="panel-body">
                                    <div class="form-group col-md-3">
                                        <label class="control-label"><b>Active Power</b></label>

                                        <div class="bootstrap-switch-container" style="width: 147px; margin-left: 0px;">
                                        <span class="bootstrap-switch-handle-on bootstrap-switch-success"
                                              style="width: 49px;"></span><span class="bootstrap-switch-label"
                                                                                style="width: 49px;">&nbsp;</span><span
                                                class="bootstrap-switch-handle-off bootstrap-switch-danger"
                                                style="width: 49px;"></span><input type="checkbox" class="make-switch"
                                                                                   name="act_power" <?php if($act_power == 1) { ?>checked="" <?php } ?> value="1"
                                                                                   data-on-color="success"
                                                                                   data-off-color="danger"></div>
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label class="control-label"><b>Reactive Power</b></label>
                                        <div class="bootstrap-switch-container" style="width: 147px; margin-left: 0px;">
                                        <span class="bootstrap-switch-handle-on bootstrap-switch-success"
                                              style="width: 49px;"></span><span class="bootstrap-switch-label"
                                                                                style="width: 49px;">&nbsp;</span><span
                                                class="bootstrap-switch-handle-off bootstrap-switch-danger"
                                                style="width: 49px;"></span><input type="checkbox" class="make-switch"
                                                                                   name="rct_power" <?php if($rct_power == 1) { ?>checked="" <?php } ?>  value="1"
                                                                                   data-on-color="success"
                                                                                   data-off-color="danger"></div>
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label class="control-label"><b>Live Current</b></label>
                                        <div class="bootstrap-switch-container" style="width: 147px; margin-left: 0px;">
                                        <span class="bootstrap-switch-handle-on bootstrap-switch-success"
                                              style="width: 49px;"></span><span class="bootstrap-switch-label"
                                                                                style="width: 49px;">&nbsp;</span><span
                                                class="bootstrap-switch-handle-off bootstrap-switch-danger"
                                                style="width: 49px;"></span><input type="checkbox" class="make-switch"
                                                                                   name="lc" <?php if($lc == 1) { ?>checked="" <?php } ?>  value="1"
                                                                                   data-on-color="success"
                                                                                   data-off-color="danger"></div>
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label class="control-label"><b>Live Voltage</b></label>
                                        <div class="bootstrap-switch-container" style="width: 147px; margin-left: 0px;">
                                        <span class="bootstrap-switch-handle-on bootstrap-switch-success"
                                              style="width: 49px;"></span><span class="bootstrap-switch-label"
                                                                                style="width: 49px;">&nbsp;</span><span
                                                class="bootstrap-switch-handle-off bootstrap-switch-danger"
                                                style="width: 49px;"></span><input type="checkbox" class="make-switch"
                                                                                   name="lv" <?php if($lv == 1) { ?>checked="" <?php } ?>  value="1"
                                                                                   data-on-color="success"
                                                                                   data-off-color="danger"></div>
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label class="control-label"><b>Power Factor</b></label>
                                        <div class="bootstrap-switch-container" style="width: 147px; margin-left: 0px;">
                                        <span class="bootstrap-switch-handle-on bootstrap-switch-success"
                                              style="width: 49px;"></span><span class="bootstrap-switch-label"
                                                                                style="width: 49px;">&nbsp;</span><span
                                                class="bootstrap-switch-handle-off bootstrap-switch-danger"
                                                style="width: 49px;"></span><input type="checkbox" class="make-switch"
                                                                                   name="pf" <?php if($pf == 1) { ?>checked="" <?php } ?>  value="1"
                                                                                   data-on-color="success"
                                                                                   data-off-color="danger"></div>
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label class="control-label"><b>Frequency</b></label>
                                        <div class="bootstrap-switch-container" style="width: 147px; margin-left: 0px;">
                                        <span class="bootstrap-switch-handle-on bootstrap-switch-success"
                                              style="width: 49px;"></span><span class="bootstrap-switch-label"
                                                                                style="width: 49px;">&nbsp;</span><span
                                                class="bootstrap-switch-handle-off bootstrap-switch-danger"
                                                style="width: 49px;"></span><input type="checkbox" class="make-switch"
                                                                                   name="fre" <?php if($fre == 1) { ?>checked="" <?php } ?>  value="1"
                                                                                   data-on-color="success"
                                                                                   data-off-color="danger"></div>
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label class="control-label"><b>Units Consumed</b></label>
                                        <div class="bootstrap-switch-container" style="width: 147px; margin-left: 0px;">
                                        <span class="bootstrap-switch-handle-on bootstrap-switch-success"
                                              style="width: 49px;"></span><span class="bootstrap-switch-label"
                                                                                style="width: 49px;">&nbsp;</span><span
                                                class="bootstrap-switch-handle-off bootstrap-switch-danger"
                                                style="width: 49px;"></span><input type="checkbox" class="make-switch"
                                                                                   name="cp_units"  <?php if($cp_units == 1) { ?>checked="" <?php } ?>  value="1"
                                                                                   data-on-color="success"
                                                                                   data-off-color="danger"></div>
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label class="control-label"><b>Apparent Power</b></label>
                                        <div class="bootstrap-switch-container" style="width: 147px; margin-left: 0px;">
                                        <span class="bootstrap-switch-handle-on bootstrap-switch-success"
                                              style="width: 49px;"></span><span class="bootstrap-switch-label"
                                                                                style="width: 49px;">&nbsp;</span><span
                                                class="bootstrap-switch-handle-off bootstrap-switch-danger"
                                                style="width: 49px;"></span><input type="checkbox" class="make-switch"
                                                                                   name="apr_power"  <?php if($apr_power == 1) { ?>checked="" <?php } ?>  value="1"
                                                                                   data-on-color="success"
                                                                                   data-off-color="danger"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="panel panel-success">
                                <div class="panel-heading">
                                    Meter Type Status
                                </div>
                                <div class="panel-body">
                                    <?php if ($status == '') { ?>
                                        <div class="bootstrap-switch-container" style="width: 147px; margin-left: 0px;">
                                        <span class="bootstrap-switch-handle-on bootstrap-switch-success"
                                              style="width: 49px;"></span><span class="bootstrap-switch-label"
                                                                                style="width: 49px;">&nbsp;</span><span
                                                class="bootstrap-switch-handle-off bootstrap-switch-danger"
                                                style="width: 49px;"></span><input type="checkbox" class="make-switch"
                                                                                   name="status" checked="" value="1"
                                                                                   data-on-color="success"
                                                                                   data-off-color="danger"></div>
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