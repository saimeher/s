
<?php
defined('BASEPATH') OR exit('No direct script access allowed');
error_reporting(E_ERROR);

if (isset($_SERVER['HTTP_ORIGIN'])) {
	header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
	header('Access-Control-Allow-Credentials: true');
	header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
		header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

	exit(0);
}


class Upload extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		echo 'test';
	}

    public function upload() {

        $target_path = "./uploads/";        
        $target_path = $target_path . basename( $_FILES['file']['name']);
 
        if (move_uploaded_file($_FILES['file']['tmp_name'], $target_path)) {

        	$data['reg_no']=$_POST['reg_no'];
			$data['insert_id']=$_POST['id'];
		  //for($i=0;$i<$this->post('length');$i++){
		 	$name= $_FILES["file"]["name"]  ;
		  	$data['img_name'] = $name;
			$type= $_FILES["file"]["type"]  ;
			 $data['img_type'] = $type;
			//$ftpe = pathinfo($_FILES["uploads"]["name"][$i] ,PATHINFO_EXTENSION);

			//move_uploaded_file($_FILES["uploads"]["tmp_name"][$i] , "uploads/".$name);
			$result =  $this->db->insert('images',$data);		
			// return $this->response(true,200);
		// }
			log_message('error','USER_INFO '. "Upload and move success " . $target_path);
        } 
        else {
            log_message('error','USER_INFO '. "ERROR UPLOADING " . $target_path);
        }
    }
     // return $this->response($file,200);
}