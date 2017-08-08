<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require(APPPATH'.libraries/REST_Controller.php');

class Rest_server extends CI_Controller {

    public function index()
    {
        $this->load->helper('url');
        $this->response('hail',200);
        //$this->load->view('rest_server');
    }


}
