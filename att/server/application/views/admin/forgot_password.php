<!DOCTYPE html>

<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>EnmontoR - Energy Monitoring System</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta content="" />
    <meta content="" name="author" />
    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css" />
    <link href="<?=base_url()?>assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="<?=base_url()?>assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
    <link href="<?=base_url()?>assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />

    <link href="<?=base_url()?>assets/global/css/components.min.css" rel="stylesheet" id="style_components" type="text/css" />
    <link href="<?=base_url()?>assets/global/css/plugins.min.css" rel="stylesheet" type="text/css" />
     <link href="<?=base_url()?>assets/global/css/plugins-md.min.css" rel="stylesheet" type="text/css" />
    <!-- END THEME GLOBAL STYLES -->
    <!-- BEGIN PAGE LEVEL STYLES -->
    <link href="<?=base_url()?>assets/pages/css/login.min.css" rel="stylesheet" type="text/css" />
    <link href="<?=base_url()?>assets//customcss/style.css" rel="stylesheet" type="text/css" />
    <!-- END PAGE LEVEL STYLES -->
    <!-- BEGIN THEME LAYOUT STYLES -->
    <!-- END THEME LAYOUT STYLES -->
    <link rel="shortcut icon" href="favicon.ico" /> </head>

    <!-- END HEAD -->

    <body class="login" style="background-color: #227b80 !important;">
        <!-- BEGIN LOGO -->
        <div class="logo_1">
            <a href="<?=base_url()?>admin">
                <img src="<?=base_url()?>assets/images/logo_ad.png" alt="" /> </a>
        </div>
        <!-- END LOGO -->
        <!-- BEGIN LOGIN -->
        <div class="content content_1">
            <!-- BEGIN LOGIN FORM -->


            <!-- END LOGIN FORM -->
            <!-- BEGIN FORGOT PASSWORD FORM -->
            <form class="" action="<?=base_url().'admin/forgot_password'?>" method="post">
                <h3 class="font-green">Forgot Password ?</h3>
                <p> Enter your e-mail address below to reset your password. </p>
                <div class="form-group ">
                    <div class="input-icon"><i class="fa fa-envelope"></i>
                    <input class="form-control" type="text" autocomplete="off"  placeholder="Email" name="email" /> </div></div>
                <div class="form-actions form_act1 ">
                     <input type="submit" class="btn btn-success uppercase pull-right " value="Submit"><br/>
                </div>
                <div id="flashmsg" class="alert alert-danger" style="display:none;"> Enter any Email.</div>
                <div id="flashmsg1" class="alert alert-success" style=" display:none;"> </div>
            </form>
              <div class="create-account">
            <p>
                <a href="<?=base_url()?>admin" id="forget-password" class="uppercase forget-password "> Login Here </a>
            </p>
        </div>
        </div>
       <script src="<?=base_url()?>assets/global/plugins/jquery.min.js" type="text/javascript"></script>
        <script src="<?=base_url()?>assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
        <script src="<?=base_url()?>assets/global/plugins/jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>

        <script src="<?=base_url()?>assets/pages/scripts/login.min.js" type="text/javascript"></script>

         <script>
            $(document).ready(function(e) {
                <?php if($this->session->flashdata('disp')) { ?>$("#flashmsg").text('<?=$this->session->flashdata('flash_message')?>').slideDown(600).delay(10000).slideUp(600); <?php } ?>
                <?php if($this->session->flashdata('disp1')) { ?>$("#flashmsg1").text('<?=$this->session->flashdata('flash_message1')?>').slideDown(600).delay(10000).slideUp(600); <?php } ?>

            });
        </script>
    </body>

</html>