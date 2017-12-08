<?php
if(date('Y') == 2016){
    $year = '2016';
}else{
    $year = '2016 - '.date('y');
}
?>
<div class="page-footer">
   <div class="page-footer-inner"> <?=$year?> &copy; Akrivia Automation Pvt Ltd
    </div>
    <!-- END FOOTER -->
    <!-- BEGIN QUICK NAV -->
    <!--  -->

    <!-- END QUICK NAV -->
</div>
</body>
<script src="<?=base_url()?>assets/global/plugins/jquery.min.js" type="text/javascript"></script>
<script src="<?=base_url()?>assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="<?=base_url()?>assets/global/plugins/js.cookie.min.js" type="text/javascript"></script>
<script src="<?=base_url()?>assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
<script src="<?=base_url()?>assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
<script src="<?=base_url()?>assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
<!-- END CORE PLUGINS -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
<script src="<?=base_url()?>assets/global/scripts/datatable.js" type="text/javascript"></script>
<script src="<?=base_url()?>assets/global/plugins/datatables/datatables.min.js" type="text/javascript"></script>
<script src="<?=base_url()?>assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.js" type="text/javascript"></script>
<!-- END PAGE LEVEL PLUGINS -->
<script src="<?=base_url()?>assets/global/plugins/counterup/jquery.waypoints.min.js" type="text/javascript"></script>
<script src="<?=base_url()?>assets/global/plugins/counterup/jquery.counterup.min.js" type="text/javascript"></script>
<!-- BEGIN THEME GLOBAL SCRIPTS -->
<script src="<?=base_url()?>assets/global/scripts/app.min.js" type="text/javascript"></script>
<!-- END THEME GLOBAL SCRIPTS -->
<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="<?=base_url()?>assets/pages/scripts/table-datatables-managed.min.js" type="text/javascript"></script>
<script src="<?=base_url()?>assets/pages/scripts/profile.min.js" type="text/javascript"></script>
<!-- END PAGE LEVEL SCRIPTS -->
<!-- BEGIN THEME LAYOUT SCRIPTS -->
<script src="<?=base_url()?>assets/layouts/layout2/scripts/layout.min.js" type="text/javascript"></script>
<script src="<?=base_url()?>assets/layouts/layout2/scripts/demo.min.js" type="text/javascript"></script>
<script src="<?=base_url()?>assets/layouts/global/scripts/quick-sidebar.min.js" type="text/javascript"></script>
<script src="<?=base_url()?>assets/layouts/global/scripts/quick-nav.min.js" type="text/javascript"></script>
<script src="<?=base_url()?>assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js" type="text/javascript"></script>
<script src="<?=base_url()?>assets/global/plugins/jquery.sparkline.min.js" type="text/javascript"></script>
<!-- BEGIN PAGE LEVEL PLUGINS -->
<script src="<?=base_url()?>assets/global/plugins/select2/js/select2.full.min.js" type="text/javascript"></script>
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="<?=base_url()?>assets/pages/scripts/components-select2.min.js" type="text/javascript"></script>
<!-- END PAGE LEVEL SCRIPTS -->
<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="<?=base_url()?>assets/js/bootbox.min.js" type="text/javascript"></script>
<script src="<?=base_url()?>assets/js/confirm_alert.js" type="text/javascript"></script>

<script type="text/javascript" src="<?=base_url()?>assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
<script type="text/javascript" src="<?=base_url()?>assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js"></script>
<script type="text/javascript" src="<?=base_url()?>assets/global/plugins/clockface/js/clockface.js"></script>
<script type="text/javascript" src="<?=base_url()?>assets/global/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js"></script>
<script type="text/javascript" src="<?=base_url()?>assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript" src="<?=base_url()?>assets/pages/scripts/components-date-time-pickers.min.js"></script>

<!-- END PAGE LEVEL SCRIPTS -->
<script src="<?=base_url()?>assets/global/plugins/bootstrap-toastr/toastr.js" type="text/javascript"></script>
<?php if (($this->session->flashdata('flash_message')) != ""): ?>
    <script type="text/javascript">
        toastr.success("<?php echo $this->session->flashdata('flash_message'); ?>");
     </script>
<?php endif; ?>
</html>