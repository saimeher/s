<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . "/libraries/REST_Controller.php";

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


class Api extends REST_Controller {
	public function __construct()
	{
		parent::__construct();
		$this->load->model('api_model');
		$this->load->helper('jwt');
	}
	public function __destruct() {  
	    $this->db->close();  
	} 
    
	public function index_get()
	{
		$this->response('NULL');
	}
	public function validLogin_post()
	{
		$username = $this->post('username');
		$password = $this->post('password');
		$result = $this->api_model->login($username, $password);
		
		if ($result['success']) {
			// user logged in, generate a token and return
			$id = $result['reg_no'];
			$token = array();
			$token['reg_no'] = $id;
			$token['userid'] = $id;
			$result['token'] = JWT::encode($token, $this->config->item('jwt_key'));
			$result['name'] = $result['name'];
			$result['utype'] = $result['utype'];
			$this->response($result);
		} else {
			// authentication failed, return error
			$this->response(
				array(
					"success"	=> $result['success'], 
					"error"		=> $result['error'],
				)
			);
		}
	}	
		
	function getData($type, $params=null) {
		$success = true;
		$error = '';
		$result = '';
		$response = [];
				
		if(!$_SERVER['HTTP_TOKEN']) {
			$success = false;
			$error = "Token not provided";
		}
		
		if ($success) {
			try 
			{
				$token = JWT::decode($_SERVER['HTTP_TOKEN'], $this->config->item('jwt_key'));
	
				if ($token->reg_no) {		
					switch($type) {
						case 'userData'				: $result = $this->api_model->userData($token->reg_no); break;
						case 'changePassword'		: $result = $this->api_model->changePassword($token->reg_no, $params); break;

						case 'activeMachines'		: $result = $this->api_model->activeMachines($token->reg_no, $params); break;	
						case 'uploadHistory'		: $result = $this->api_model->uploadHistory($token->reg_no, $params); break;	
						case 'deleteUploadFile'		: $result = $this->api_model->deleteUploadFile($token->reg_no, $params); break;		
						
						case 'addMachine'			: $result = $this->api_model->addMachine($token->reg_no, $params); break;		
						case 'updateMachine'		: $result = $this->api_model->updateMachine($token->reg_no, $params); break;		
						case 'attendanceByDate'		: $result = $this->api_model->attendanceByDate($token->reg_no, $params); break;		
						case 'attendanceByDays'		: $result = $this->api_model->attendanceByDays($token->reg_no, $params); break;		
						case 'testAttendance'		: $result = $this->api_model->testAttendance($token->reg_no, $params); break;		
						
						case 'getRole'				: $result = $this->api_model->getRole($token->reg_no, $params); break;		
						case 'attendanceByLateIn' : $result = $this->api_model->attendanceByLateIn($token->reg_no, $params); 
						break;		
						case 'attendanceByEarlyOut': $result = $this->api_model->attendanceByEarlyOut($token->reg_no,$params);
						break;
						case 'attendanceByNoIssue': $result = $this->api_model->attendanceByNoIssue($token->reg_no,$params);
						break;	
						case 'attendanceByNoPunch':$result =$this->api_model->attendanceByNoPunch($token->reg_no,$params);
						break;
						case 'attendanceBySinglePunch':$result = $this->api_model->attendanceBySinglePunch($token->reg_no,$params);
						break;
						case 'getattendancebysingle': $result = $this->api_model->getattendancebysingle($token->reg_no,$params);
						break;
						case 'getcountlate' : $result = $this->api_model->getcountlate($token->reg_no,$params);
                            


					}
				
					$success = true;
				}
			} 
			catch (Exception $e)
			{
				$success = false;
				$error = "Token authentication failed";
			}					
		}
		
		$response['success'] = $success;
		$response['error'] = $error;
		if ($success) {
			$response['data'] = $result;
		}		
		$this->response($response);
	}

	// user data
	public function userData_post()
	{
		$this->getData('userData', []);
	}

	// active machines data
	public function activeMachines_post()
	{
		$this->getData('activeMachines', []);
	}
	
	// adding new machine
	public function addMachine_post()
	{
		$machine = $this->post("machine");
		$this->getData('addMachine', [$machine]);
	}
	
	// updating machine
	public function updateMachine_post()
	{
		$machine = $this->post("machine");
		$mid = $this->post("mid");
		$this->getData('updateMachine', [$machine,$mid]);
	}

	// attendance data upload history
	public function uploadHistory_post()
	{
		$this->getData('uploadHistory', []);
	}
	
	// delete uploaded file and data
	public function deleteUploadFile_post()
	{
		$hid = $this->post("hid");
		$utype = $this->post("utype");
		$this->getData('deleteUploadFile', [$utype, $hid]);
	}
	
	// attendance By Date
	public function attendanceByDate_post()
	{
		$utype = $this->post("utype");
		$adate = $this->post("adate");
		$this->getData('attendanceByDate', [$adate, $utype]);
	}
	
	// day range attendance data
	public function attendanceByDays_post()
	{
		$utype = $this->post("utype");
		$start_date = $this->post("start_date");
		$end_date = $this->post("end_date");
		$this->getData('attendanceByDays', [$start_date, $end_date, $utype]);
	}
	
	// day range attendance data
	public function testAttendance_post()
	{
		$start_date = $this->post("start_date");
		$end_date = $this->post("end_date");
		$college = $this->post("college");
		$this->getData('testAttendance', [$start_date, $end_date,$college]);
	}
	// getting login role
	public function getRole_post()
	{
		$this->getData('getRole', []);
	}
	
	// attendance file upload function 
	public function attendanceUpload_post()
	{
		header("Access-Control-Allow-Origin: *");
		// $this->response('1123');
		$path = "biodata/";
		$mid = $_POST['mid'];
		
		if (isset($_FILES['file'])) {
			$originalName = $_FILES['file']['name'];
			$ext = '.'.pathinfo($originalName, PATHINFO_EXTENSION);
			$generatedName = md5($_FILES['file']['tmp_name']).$ext;
			$filePath = $path.date('YmdHis').'mh_'.$mid.'_'.rand(1111,9999).'_'.$_FILES['file']['name'];
			
			if (!is_writable($path)) {
				$this->response(array(
				'status' => false,
				'msg'    => 'Destination directory not writable.'
				));
				exit;
			}
			
			if (move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
				
				$file = fopen($filePath,"r");
				$iname = substr($originalName, 0, -(strlen($ext)));
				$testc = 0;

				while(! feof($file))
				{
					$data = fgetcsv($file);
					if($data[0]) {
						$fid = trim($data[0]);
						$reg_no = trim($data[3]);
						// date format in csv file - dd/mm/yyyy
						$da = explode('/', trim($data[1]));
						$ttime = $da[2].'-'.sprintf("%02d", $da[1]).'-'.sprintf("%02d", $da[0]).' '.trim($data[2]);
						$fdt = $da[2].'-'.sprintf("%02d", $da[1]).'-'.sprintf("%02d", $da[0]);
						$cdt = $da[2].'-'.sprintf("%02d", $da[1]).'-'.sprintf("%02d", $da[0]).' 12:00:00';
						// if($ttime < $da[2].'-'.$da[1].'-'.$da[0].' 12:00:00') {

							
						if((date('Y-m-d H:i:s', strtotime($ttime)) < date('Y-m-d H:i:s',strtotime($cdt)))) {
							$type = "IN";
							$sel_in = $this->db->query("select ttime, count(*) as count from attendance where reg_no='".$reg_no."' and tdate='".$fdt."' and type='".$type."'")->row();
							if($sel_in->count > 0) {
								(date('Y-m-d H:i:s', strtotime($ttime)) < date('Y-m-d H:i:s',strtotime($sel_in->ttime))) ? $fdttm = $ttime : $fdttm = $sel_in->ttime;
							} else {
								$fdttm = $ttime;
							}
							// $q = $this->db->query("insert ignore attendance (mid,fid,reg_no,tdate,ttime,type,filename) values ('".$mid."','".$fid."','".$reg_no."', '".$fdt."','".$fdttm."','".$type."','".$iname."') ");
							$q = $this->db->query("insert into attendance (mid,fid,reg_no,tdate,ttime,type,filename) values ('".$mid."','".$fid."','".$reg_no."','".$fdt."','".$fdttm."','".$type."','".$iname."') on duplicate key update ttime='".$fdttm."'");
						} else {
							$type = "OUT";
							$sel_out = $this->db->query("select ttime, count(*) as count from attendance where reg_no='".$reg_no."' and tdate='".$fdt."' and type='".$type."'")->row();
							if($sel_out->count > 0) {
								(date('Y-m-d H:i:s', strtotime($ttime)) > date('Y-m-d H:i:s',strtotime($sel_out->ttime))) ? $ldttm = $ttime : $ldttm = $sel_out->ttime;
							} else {
								$ldttm = $ttime;
							}
							$q = $this->db->query("insert into attendance (mid,fid,reg_no,tdate,ttime,type,filename) values ('".$mid."','".$fid."','".$reg_no."', '".$fdt."','".$ldttm."','".$type."','".$iname."') on duplicate key update ttime='".$ttime."'");
						}
						
					}
					$testc++;
				}
				$this->db->query("insert into history (machine,filename,filedate,testing) values('".$mid."', '".$iname."', '".$fdt."', '".$testc."')");

				$this->response(array(
				'status'        => true
				));
				exit;
			}
		} else {
			$this->response(
				array('status' => false, 'msg' => 'No file uploaded.')
			);
			exit;
		}
	}
    //Get Attendance by late 
    public function attendanceByLateIn_post()
	{
		$utype = $this->post("utype");
		$adate = $this->post("adate");
		$this->getData('attendanceByLateIn', [$adate, $utype]);
	}
	//get Attendance by early
    public function attendanceByEarlyOut_post()
    {
    	$utype = $this->post("utype");
    	$adate = $this->post("adate");
    	$this->getData('attendanceByEarlyOut',[$adate, $utype]);
    }
    //get Attendance by No issue
    public function attendanceByNoIssue_post()
    {
     	$utype = $this->post("utype");
		$adate = $this->post("adate");
		$this->getData('attendanceByNoIssue', [$adate, $utype]);    	
    }
     public function attendanceBySinglePunch_post()
    {
    	$utype = $this->post("utype");
    	$adate = $this->post("adate");
    	$this->getData('attendanceBySinglePunch',[$adate, $utype]);
    }
     public function attendanceByNoPunch_post()
    {
    	$utype = $this->post("utype");
    	$adate = $this->post("adate");
    	$this->getData('attendanceByNoPunch',[$adate, $utype]);
    }
    
    // get attendance by single person
    public function getattendancebysingle_post()
    {
    	$reg_no = $this->post('reg_no');
    	$start_date = $this->post("start_date");
		$end_date = $this->post("end_date");

    	$this->getData('getattendancebysingle',[$start_date,$end_date,$reg_no]);
    }


    // get late commers in an month
    public function getcountlate_post()
    {
    	$start_date = $this->post("start_date");
		$end_date = $this->post("end_date");
		$college = $this->post("college");
		$this->getData('getcountlate',[$start_date,$end_date,$college]);
    }
	// Get Multiple query results function
	public function GetMultipleQueryResult($queryString)
    {
	    if (empty($queryString)) {
	                return false;
	            }

	    $index     = 0;
	    $ResultSet = array();

	    /* execute multi query */
	    if (mysqli_multi_query($this->db->conn_id, $queryString)) {
	        do {
	            if (false != $result = mysqli_store_result($this->db->conn_id)) {
	                $rowID = 0;
	                while ($row = $result->fetch_assoc()) {
	                    $ResultSet[$index][$rowID] = $row;
	                    $rowID++;
	                }
	            }
	            $index++;
	        } while (mysqli_more_results($this->db->conn_id) && mysqli_next_result($this->db->conn_id));
	    }

	    return $ResultSet;
    }




}