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
        <div class="logo_2">
            <a href="<?=base_url()?>admin">
                <img src="<?=base_url()?>assets/images/logo_ad.png" alt="" /> </a>
        </div>
        <!-- END LOGO -->
        <!-- BEGIN LOGIN -->
        <div class="content content_1">
            <!-- BEGIN LOGIN FORM -->
         <form class="login-form" action="<?=base_url().'admin/login_check/'?>" method="post">
                <h3 class="form-title font-green">Sign In</h3>


                <div class="form-group">
                    <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
                    <label class="control-label visible-ie8 visible-ie9">Username</label>
                    <input class="form-control form-control-solid placeholder-no-fix" required="" type="text" autocomplete="off" placeholder="Username" name="username" /> </div>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9">Password</label>
                    <input class="form-control form-control-solid placeholder-no-fix" required="" type="password" autocomplete="off" placeholder="Password" name="password" /> </div>
                <div class="form-actions form_act">
                    <button type="submit" class="btn green uppercase">Login</button>
                    <!--label class="rememberme check mt-checkbox mt-checkbox-outline">
                        <input type="checkbox" name="remember" value="1" />Remember
                        <span></span>
                    </label-->
                    <!-- <a href="javascript:;" id="forget-password" class="forget-password">Forgot Password?</a> -->

                </div>
                      <div id="flashmsg" class="alert alert-danger" style="display:none;"> Enter any Username and Password.</div>



         </form>

            <!-- END LOGIN FORM -->
            <!-- BEGIN FORGOT PASSWORD FORM -->
               <div class="create-account">
            <p>
                <a href="<?=base_url()?>admin/forgot_password/" id="forget-password" class="uppercase forget-password "> Forgot Password </a>
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
            });
        </script>
    </body>

</html>