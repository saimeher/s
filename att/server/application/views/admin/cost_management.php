<?php include 'header.php' ?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <!-- BEGIN CONTENT BODY -->
        <div class="page-content">
            <h1 class="page-title"> List of Centers
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
                        <span>Centers</span>
                    </li>
                </ul>
                <!-- <a href="index.php" class="btn btn-warning pull-right">Go to Home</a> -->
            </div>
            <div class="portlet light portlet-fit portlet-datatable ">
                <div class="portlet-title">
                    <div class="caption">
                        <i class="fa fa-th-large"></i>
                        <span class="caption-subject font-dark sbold uppercase">Cost Management</span>
                        <div class="tools"></div>
                    </div>

                   <div class="page-bar">
                        <ul class="page-breadcrumb pull-right">
                        <li>
                             <a href="#" class="btn dark pull-right" id="mybtn" data-toggle="modal" data-target="#myModal2">Add Cost</a>
                        </li>

                    </ul>
                    </div>
                </div>

                <div class="portlet-body">
                    <table class="table table-striped table-bordered table-hover dt-responsive" width="100%"
                           id="sample_3" cellspacing="0" width="100%">
                        <thead>
                        <tr>

                            <th>S.no</th>
                            <th>Tariff Date</th>
                            <!-- <th>Contact</th> -->
                            <th>Cost</th>
                            <th>Action</th>
                           
                        </tr>
                        </thead>
                        <tbody>
                        <?php
                        $counter = 1;
                        foreach ($cost as $result):
                            ?>
                            <tr>
                                <td><?= $counter++; ?></td>
                                <td><?=date('d/m/Y',$result->tariff_date)?></td>
                                <td><?= $result->cost ?></td>
                                <td><a class="btn btn-warning tooltips  btn-xs warning-tooltip" data-toggle="modal" id="myModal" data-target="#update<?=$result->id?>"
                                       data-placement="top" title="" data-original-title="Update"
                                       href=""> <i
                                            class="glyphicon glyphicon-pencil"></i></a>
                                    <a class="btn btn-danger tooltips  btn-xs danger-tooltip" data-toggle="tooltip"
                                       data-placement="top" title="" data-original-title="Delete"
                                       onclick="return bootboxConfirm('Are you sure delete this cost ( <?=$this->admin_model->get_cost($result->id)?> )',this.href)"
                                       href="<?php echo base_url(); ?>admin/cost_delete/<?php echo $result->id; ?>">
                                        <i class="glyphicon glyphicon-trash"></i></a>
                                </td>
                            </tr>

                               <!-- edit cost -->
    <div class="modal fade bs-modal-sm" id="update<?=$result->id?>" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                 <div class="modal-content">
                     <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                         <h4 class="modal-title">Update Cost</h4>
                    </div>
                    <div class="modal-body">
                          <form method="post" action="<?=base_url()?>admin/update_cost/<?=$result->id ?>" autocomplete="off">
                             <div class="input-group input-medium date date-picker" data-date-format="dd-mm-yyyy" data-date-end-date="+0d">
                                <input type="text" class="form-control" name="date" value="<?=date('d-m-Y',$result->tariff_date)?>" readonly >
                                <span class="input-group-btn btn_group">
                                    <button class="btn default" type="button">
                                        <i class="fa fa-calendar"></i>
                                    </button>
                                </span>

                            </div>  
                            <br>
                            <div class="input-group input-medium">
                                <input type="text" class="form-control" name="cost" value="<?=$result->cost?>">
                                <span class="input-group-btn btn_group">
                                    
                                </span>
                            </div> 
                             
                       
                        <div class="modal-footer">
                          
                            <input type="submit" class="btn green" value="Submit"/>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
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
    <!-- Model pop up -->
       <div class="modal fade bs-modal-sm" id="myModal2" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                 <div class="modal-content">
                     <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                         <h4 class="modal-title">Add Cost</h4>
                    </div>
                    <div class="modal-body">
                         <form method="post" action="<?=base_url()?>admin/add_cost/" autocomplete="off">
                             <div class="input-group input-medium date date-picker" data-date-format="dd-mm-yyyy" data-date-end-date="+0d">
                                <input type="text" class="form-control" name="date" readonly >
                                <span class="input-group-btn btn_group">
                                    <button class="btn default" type="button">
                                        <i class="fa fa-calendar"></i>
                                    </button>
                                </span>
                            </div>  
                            <br>
                            <div class="input-group input-medium">
                                <input type="text" class="form-control" name="cost">
                                <span class="input-group-btn btn_group">
                                    
                                </span>
                            </div> 
                             
                       
                        <div class="modal-footer">
                          
                            <input type="submit" class="btn green" value="Submit"/>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div> 

<script>
$(document).ready(function(){
  
    $("#mybtn").click(function(){
        $("#myModal2").modal({backdrop: "static"});
    });
});
</script>

<?php include "footer.php" ?>
