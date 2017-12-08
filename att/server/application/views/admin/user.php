<?php include 'header.php' ?>

<?php
if ($result != '') {
    $username = $result->username;
    $password = $result->password;
    $name = $result->name;
    $mobile = $result->mobile;
    $alt_mobile = $result->alt_mobile;
    $email = $result->email;
    $alt_email = $result->alt_email;
    $access_panel = $result->access_panel;
    $centers1 = $result->centers;
    $status = $result->status;
    $breadcumb = 'Update User';
} else {
    $username = set_value('username');
    $password = set_value('password');
    $name = set_value('name');
    $mobile = set_value('mobile');
    $alt_mobile = set_value('alt_mobile');
    $email = set_value('email');
    $alt_email = set_value('alt_email');
    // $access_panel = set_value('');
    $status = set_value('status');
    $breadcumb = 'Add New User';
}
?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">

    <!-- BEGIN CONTENT BODY -->
    <div class="page-content">
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
                    <a href="<?= base_url() . 'admin/user' ?>">Users</a>
                    <i class="fa fa-angle-right"></i>
                </li>
                <li>
                    <span> <?= $breadcumb ?></span>
                </li>
            </ul>
            <!-- <a href="index.php" class="btn btn-warning pull-right">Go to Home</a> -->
        </div>

        <div class="portlet box green ">
            <div class="portlet-title">
                <div class="caption">
                    <i class="fa fa-user"></i> <?= $breadcumb ?>
                </div>
            </div>

            <div class="portlet-body form">
                <?php if (validation_errors()) {
                    echo '<div class="alert alert-danger">' . validation_errors() . '</div>';
                }
                echo form_open('', 'autocomplete="off"');
                ?>
                <div class="form-body">
                    <div class="form-group">
                        <label class="control-label">Name</label>
                        <input type="text" placeholder="" value="<?= $name; ?>"
                               name="name" class="form-control" required=""maxlength="20"/></div>
                    <div class="form-group">
                        <label class="control-label">Username</label>
                        <input type="text" name="username" placeholder="" value="<?= $username; ?>"
                               class="form-control"/ maxlength="50"></div>
<!--                    <div class="form-group">-->
<!--                        <label class="control-label">Password</label>-->
<!--                        <input type="password" name="password" placeholder="" value="--><?//= $password; ?><!--"-->
<!--                               class="form-control"/></div>-->
                    <div class="form-group">
                        <label class="control-label">Mobile Number</label>
                        <input type="text" placeholder="" value="<?= $mobile; ?>"
                               name="mobile" class="form-control" required="" minlength="10"/></div>
                    <div class="form-group">
                        <label class="control-label">Alternate Mobile Number</label>
                        <input type="text" placeholder=""
                               value="<?= $alt_mobile; ?>" name="alt_mobile"
                               class="form-control" minlength="10"/></div>
                    <div class="form-group">
                        <label class="control-label">Email</label>
                        <input type="email" placeholder="" value="<?= $email; ?>"
                               name="email" class="form-control" required="" maxlength="50"/></div>
                    <div class="form-group">
                        <label class="control-label">Alternate Email</label>
                        <input type="email" name="alt_email" class="form-control" maxlength="50" value="<?= $alt_email ?>"/>
                    </div>

                    <div class="form-group">
                        <label class="control-label">Panels</label>
                        <select multiple id="e1" name="panel[]" class=""
                                 >

                            <?php
                            $panel = $this->db->get('grouping')->result_array();
                            if ($result == '') {
                                foreach ($panel as $p):
                                    ?>
                                    <option value="<?= $p['id'] ?>"><?= $p['group_name'] ?></option>
                                    <?php
                                endforeach;
                            } else {
                                $panels = explode(',', $access_panel);
                                $panel = $this->db->get('grouping')->result_array();
                                foreach ($panel as $p):
                                    $c = 0;
                                    for ($i = 0; $i < sizeof($panels) - 1; $i++) {
                                        if ($p['id'] == $panels[$i]) {
                                            $c = 1;

                                        }

                                    }

                                    ?>
                                    <option
                                        value="<?= $p['id'] ?>" <?php if ($c == 1) { ?>selected="" <?php } ?>
                                    ><?= $p['group_name'] ?></option>

                                    <?php

                                endforeach;
                            }
                            ?>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="control-label">Centers</label>
                        <select multiple id="e2" name="centers[]" class="">

                            <?php
                            $centers = $this->db->get('sub_station')->result_array();
                            if ($result == '') {
                                foreach ($centers as $p):
                                    ?>
                                    <option value="<?= $p['id'] ?>"><?= $p['station_name'] ?></option>
                                    <?php
                                endforeach;
                            } else {
                                $centers = explode(',', $centers1);
                                $center = $this->db->get('sub_station')->result_array();
                                foreach ($center as $p):
                                    $c = 0;
                                    for ($i = 0; $i < sizeof($centers) - 1; $i++) {
                                        if ($p['id'] == $centers[$i]) {
                                           $c = 1;
                                        }
                                    }

                                    ?>
                                    <option
                                        value="<?= $p['id'] ?>" <?php if ($c == 1) { ?>selected="" <?php } ?>
                                    ><?= $p['station_name'] ?></option>
                                    <?php

                                endforeach;
                            }
                            ?>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="control-label">Status</label>
                        <?php if ($status == '') { ?>
                            <input type="checkbox" class="make-switch green" name="status" value="1" data-on-color="success" data-off-color="danger" <?php echo  set_checkbox('status', '1'); ?> >
                        <?php } else {
                            ?>

                            <div class="">
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

                            <?php
                        } ?>
                    </div>
                    <div class="form-actions right">
                        <button type="submit" class="btn dark">Submit</button>
                    </div>
                    </form>
                </div>
            </div>

        </div>
    </div>
<!-- <script src="<?=base_url()?>assets/pages/scripts/components-select2.min.js" type="text/javascript"></script> -->
   <!-- <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
     <script src="<?=base_url()?>assets/js/select2.min.js"></script>
<script type="text/javascript">
    $("#e1").select2();
    $("#e2").select2();

</script>
<script src="<?= base_url() ?>assets/global/plugins/jquery.min.js" type="text/javascript"></script>



<?php include "footer.php" ?>