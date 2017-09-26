<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . "/libraries/REST_Controller.php";
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



class Cron extends REST_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('api_model');
        $this->load->library('email');   	
	}

	public function index_get()
	{
		$this->response('NULL');
	}

	public function processMessages_get()
	{
		$return = [];
		// mtype = 'mail' and 
		$sql = "select * from messages where processed = 0";
		if($query = $this->db->query($sql)) {
        	$result = $query->result();
			for ($i=0; $i<sizeof($result); $i++) {
				$mid = $result[$i]->mid;
				$mtype = $result[$i]->mtype;
				$mailtype = $result[$i]->mailtype;
				$mto = $result[$i]->mto;
				$cc = $result[$i]->cc;
				$bcc = $result[$i]->bcc;
				$subject = $result[$i]->subject;
				$message = $result[$i]->message;
				$processed = $result[$i]->processed;

				$item = $result[$i];
				if ($item->mtype == 'mail') {
					$data = $this->sendEmail($item);
					$return[] = "update messages set processed = 1, processed_return = '" . $data . "' where mid=" . $mid . ';';
				}
				else if ($item->mtype == 'sms') {
					$data = $this->sendSMS($item);
					$return[] = "update messages set processed = 1, processed_return = '" . $data . "' where mid=" . $mid . ';';
				}
			}
		}

		for ($j=0; $j<sizeof($return); $j++) {
			$query = $this->db->query($return[$j]);
		}
		
	}

	 function sendSMS($params)
	{
        $to = $params->mto;
        $message = $params->message;

   		$URL = "http://login.smsmoon.com/API/sms.php";
		$post_fields = array(
		    'username' => 'raghuedu',
		    'password' => 'abcd.1234',
		    'from' => 'RAGHUT',
		    'to' => $to,
		    'msg' => $message,
		    'type' => '1',
		    'dnd_check' => '0'
		);

		$ch = curl_init();

		curl_setopt($ch, CURLOPT_URL, $URL);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

		curl_exec($ch);
	}

	
}
