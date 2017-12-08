<?php include 'header.php' ?>
<?php
if ($result != '') {
    $station_name = $result->station_name;
    $display_name = $result->display_name;
    $sid = $result->sid;
    $contact = $result->contact;
    $alt_contact1 = $result->alt_contact1;
    $alt_contact2 = $result->alt_contact2;
    $alt_contact3 = $result->alt_contact3;
    $contact_person = $result->contact_person;
    $contact_alt_person = $result->contact_alt_person;
    $contact_no = $result->contact_no;
    $contact_alt_no = $result->contact_alt_no;
    $location = $result->location;
    $address = $result->address;
    $status = $result->status;
    $bredcumb = 'Update Center';
} else {
    $sid = set_value('sid');
    $station_name = set_value('station_name');
    $display_name = set_value('short_name');
    $contact = set_value('station_contact');
    $alt_contact1 = set_value('alt_station_contact1');
    $alt_contact2 = set_value('alt_station_contact2');
    $alt_contact3 = set_value('alt_station_contact3');
    $contact_person = set_value('station_contact_person');
    $contact_alt_person = set_value('station_contact_person1');
    $contact_no = set_value('station_contact_no');
    $contact_alt_no = set_value('station_contact_no1');
    $status = set_radio('status');
    $location = set_value('location');
    $address = set_value('address');
    $bredcumb = 'Add New Center';
}
?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">

    <!-- BEGIN CONTENT BODY -->

    <div class="page-content">
        <h1 class="page-title"> <?= $bredcumb ?>
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
                    <a href="<?= base_url() . 'admin/sub_station' ?>">Centers</a>
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
                    <div class="panel panel-success ">
                        <div class="panel-heading ">
                            Center Details
                        </div>
                        <div class="panel-body">
                            <div class="form-group col-md-6">
                                <label class="control-label">Center Name</label>

                                <input type="text" class="form-control" name="station_name"
                                       value="<?= $station_name; ?>"
                                       maxlength="50">
                            </div>
                            <div class="form-group col-md-6">
                                <label class="control-label">Center Short Name</label>
                                <input type="text" class="form-control" name="short_name"
                                       value="<?= $display_name ?>"
                                       maxlength="30">
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
                            Center Contact Numbers
                        </div>
                        <div class="panel-body">
                            <div class="form-group col-md-6">
                                <label class="control-label">Number 1</label>

                                <input type="text" class="form-control" name="station_contact"
                                       value="<?= $contact ?>" minlength="10" maxlength="10">
                            </div>
                            <div class="form-group col-md-6">
                                <label class="control-label">Number 2</label>

                                <input type="text" class="form-control" name="alt_station_contact1"
                                       value="<?= $alt_contact1 ?>" minlength="10" maxlength="10">
                            </div>
                            <div class="form-group col-md-6">
                                <label class="control-label">Number 3</label>

                                <input type="text" class="form-control" name="alt_station_contact2"
                                       value="<?= $alt_contact2 ?>" minlength="10" maxlength="10">
                            </div>
                            <div class="form-group col-md-6">
                                <label class="control-label">Number 4</label>

                                <input type="text" class="form-control" name="alt_station_contact3"
                                       value="<?= $alt_contact3 ?>" minlength="10" maxlength="10">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                             <div class="panel panel-success">
                        <div class="panel-heading">
                             Contact Person 1
                        </div>
                        <div class="panel-body">
                            <div class="form-group col-md-6">
                                <label class="control-label">Name </label>

                                <input type="text" class="form-control"
                                       value="<?= $contact_person ?>"
                                       name="station_contact_person" maxlength="50">
                            </div>
                            <div class="form-group col-md-6">
                                <label class="control-label">Mobile </label>

                                <input type="text" class="form-control" value="<?= $contact_no ?>"
                                       name="station_contact_no" minlength="10" maxlength="10">
                            </div>
                            
                           
                        </div>
                    </div>
                        </div>
                        <div class="col-md-6">
                             <div class="panel panel-success">
                        <div class="panel-heading">
                            Contact Person 2 
                        </div>
                        <div class="panel-body">
                           
                            <div class="form-group col-md-6">
                                <label class="control-label">Name</label>

                                <input type="text" class="form-control" name="station_contact_person1"
                                       value="<?= $contact_alt_person ?>" maxlength="50">
                            </div>
                            <div class="form-group col-md-6">
                                <label class="control-label">Mobile</label>

                                <input type="text" class="form-control" name="station_contact_no1"
                                       value="<?= $contact_alt_no ?>" minlength="10" maxlength="10">
                            </div>
                        </div>
                    </div>
                        </div>
                    </div>
                   
                   
                    <div class="panel panel-success">
                        <div class="panel-heading ">
                            Center Address Details
                        </div>
                        <div class="panel-body">
                            <div class="form-group col-md-6">
                                <label class="control-label">Center Location</label>
                                <textarea class="form-control text_area" name="location" maxlength="50"><?= $location ?></textarea>
                            </div>
                            <div class="form-group col-md-6">
                                <label class="control-label">Center Address</label>
                                <textarea class="form-control text_area" name="address" maxlength="128"><?= $address ?></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-success">
                        <div class="panel-heading">
                            Center Status
                        </div>
                        <div class="panel-body">
                            <?php if ($status == '') { ?>
                                <input type="checkbox" class="make-switch green" name="status" value="1"
                                       data-on-color="success"
                                       data-off-color="danger" <?php echo set_checkbox('status', '1'); ?> >

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
    <script src="<?= base_url() ?>assets/global/plugins/jquery.min.js" type="text/javascript"></script>



<?php include "footer.php" ?>
