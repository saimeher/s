<?php include 'header.php' ?>

<?php
if ($result != '') {
    $group_name = $result->group_name;
    $display_name = $result->display_name;
    $sub_station = $result->sub_station;
    $meters = $result->meters;
    $sid = $result->sid;
    $status = $result->status;
    $breadcumb = 'Update Panel';
} else {
    $group_name = set_value('group_name');
    $sub_station = set_value('sub_station');
    $display_name = set_value('display_name');
    //$meters = set_value('meters[]');
    $status = set_radio('status');
    $sid = set_value('sid');
    $breadcumb = 'Add New Panel';
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
                    <a href="<?= base_url() . 'admin' ?>">Dashboard</a>
                    <i class="fa fa-angle-right"></i>
                </li>
                <li>
                    <a href="<?= base_url() . 'admin/panel' ?>">Panels</a>
                    <i class="fa fa-angle-right"></i>
                </li>
                <li>
                    <span><?=$breadcumb?></span>
                </li>
            </ul>
            <!-- <a href="index.php" class="btn btn-warning pull-right">Go to Home</a> -->
        </div>
        <div class="portlet box green " style="height: 600px;">
            <div class="portlet-title">
                <div class="caption">
                    <i class="fa fa-plus-circle"></i> <?=$breadcumb?>
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
                            Panel Details
                        </div>
                        <div class="panel-body">
                            <div class="form-group col-md-6">
                                <label class="control-label">Group Name</label>

                                <input type="text" class="form-control" name="group_name"
                                       value="<?= $group_name; ?>"
                                       maxlength="50">
                            </div>
                            <div class="form-group col-md-6">
                                <label class="control-label">Display Name</label>

                                <input type="text" class="form-control" name="display_name"
                                       value="<?= $display_name; ?>"
                                       maxlength="20">
                            </div>
                            <div class="form-group col-md-6">
                                <label class="control-label">Center Name</label>
                                <select id="single" name="sub_station"
                                        class="form-control select2 select2-hidden-accessible"
                                        tabindex="-1" aria-hidden="true">
                                    <option value="">Select Center</option>
                                    <?php
                                    foreach ($substation as $station):
                                        ?>
                                        <option
                                            value="<?= $station['id'] ?>"
                                            <?php if ($station['id'] == $sub_station){ ?>selected=""<?php } ?>><?= $station['station_name'] ?></option>
                                        <?php
                                    endforeach;
                                    ?>
                                </select>
                            </div>

                            <div class="form-group col-md-6">
                                <label class="control-label">Meter Name</label>
                                <select id="multiple" name="meters[]"
                                        class="form-control select2-multiple select2-hidden-accessible"
                                        multiple="" tabindex="-1" aria-hidden="true">

                                    <?php
                                   
                                    if ($result != '') {
                                        $panel = $this->db->get_where('grouping', array('id' => $result->id))->row();
                                        $meter1 = explode(',', $panel->meters);
                                        asort($meter1);
                                        $meter12 = $this->db->get('meter')->result_array();
                                        foreach ($meter12 as $m2):
                                            $c = 0;
                                            foreach($meter1 as $m){
                                                if($m){
                                                if ($m2['id'] == $m) {
                                                    $c = 1;
                                                    $m1 = $this->db->get_where('meter', array('id' => $m2['id']))->row();
                                                   // echo $m1->meter_name;
                                                } 
                                                }
                                            }
                                         if($c == 1){
                                                ?>
                                                <option
                                                    value="<?= $m1->id ?>"
                                                 selected="" ><?= $m1->meter_name ?></option>

                                                <?php
                                        }
                                        $meter121 = explode(',', $meter);
                                        asort($meter121);
                                        foreach($meter121 as $m3){
                                            if($m3){
                                                if($m3 == $m2['id']){
                                        $m1 = $this->db->get_where('meter', array('id' => $m3))->row();

                                        ?>
                                        <option
                                            value="<?= $m1->id ?>"
                                        ><?= $m1->meter_name?></option>

                                        <?php
                                    }
                                }
                                       } 
                                        endforeach;
                                    }else{
                                        $meter1 = explode(',', $meter);
                                    asort($meter1);
                                
                                        foreach($meter1 as $m){
                                            if($m){
                                        $m1 = $this->db->get_where('meter', array('id' => $m))->row();

                                        ?>
                                        <option
                                            value="<?= $m1->id ?>"
                                        ><?= $m1->meter_name?></option>

                                        <?php
                                    }
                                } 
                                    }
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
                            Panel Status
                        </div>
                        <div class="panel-body">
                            <?php if ($status == ''){ ?>

                                <div class="bootstrap-switch-container" style="width: 147px; margin-left: 0px; height:39px;">
                                        <span class="bootstrap-switch-handle-on bootstrap-switch-success"
                                              style="width: 49px;"></span><span class="bootstrap-switch-label"
                                                                                style="width: 49px;">&nbsp;</span><span
                                        class="bootstrap-switch-handle-off bootstrap-switch-danger"
                                        style="width: 49px;"></span><input type="checkbox" class="make-switch" name="status" value="1" data-on-color="success" data-off-color="danger"<?php echo  set_checkbox('status', '1'); ?>></div>
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
                   <?php echo form_close(); ?>
                </div>
            </div>

        </div>
    </div>
</div>
<?php include "footer.php" ?>