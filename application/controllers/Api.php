<?php
//defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . "/libraries/REST_Controller.php";

class Api extends REST_Controller {

	public function __construct()
	{
		if (isset($_SERVER['HTTP_ORIGIN'])) {
           header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
           header('Access-Control-Allow-Credentials: true');
           header('Access-Control-Max-Age: 86400');    // cache for 1 day
           header("Access-Control-Allow-Origin", "*");
 		header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
       }

      // Access-Control headers are received during OPTIONS requests
       if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

           if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
               header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

           if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
               header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

           exit(0);
       }

     
       parent::__construct();
		$this->load->database();
		$this->load->model('api_model');
		//$this->load->library('jwt');
		$this->load->helpers('jwt');
		$CI =   &get_instance();
        $this->db2 = $this->load->database('db2', TRUE);   
		 
	}

	public function index_get()
	{
		$this->response('test');
	}

		
	public function loginCheck_post(){
		 $username=$this->post('username');
		  $password=$this->post('password');
		$emp_login=$this->api_model->loginCheck($username,$password);
		//print_r($emp_login);
		//echo $emp_login->reg_no;
		//echo $emp_login['reg_no'];

		if ($emp_login != false) {
				$token = array();
				$token['id'] = $emp_login->reg_no;
				$output['token'] = Jwt::encode($token, $this->config->item('jwt_key'));
				$token =$output['token'];
		  		$emp_login->token = $token;
		  		$emp_login->key = $this->config->item('jwt_key');
			}

	 	if($emp_login)
			{
				return $this->response($emp_login,200);
		   	}
		  else {
		      return $this->response("failure",200);
			}
		 
	} 

	


	function getData($type, $params=null,$params1=null,$params2=null) {
		 
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
				//echo "try block";
				$token = JWT::decode($_SERVER['HTTP_TOKEN'], $this->config->item('jwt_key'));
				  // echo 'after try block';
				//echo  $token['id'].'JI';
			   // if ($token->id) {
				 if ($token->reg_no) {		
					switch($type) {
						 
						case 'getRole'					: $result= $this->api_model->getRole($params); break; 
						case 'getCategories'			: $result= $this->api_model->getCategories($params); break; 
						case 'getIssuesListbyCategory'	: $result=$this->api_model->getIssuesListbyCategory($params);break; 
						case 'getIssuesListBySelection'	: $result=$this->api_model->getIssuesListBySelection($params); break; 
						case 'INSERTISSUE' 				: $result = $this->api_model->INSERTISSUE($params); break;
						case 'GETDETAILS' 				: $result =  $this->api_model->GETDETAILS($params); break;	
						case 'getDomainsbyId' 			: $result =  $this->api_model->getDomainsbyId($params); break;	
						case 'UPDATEISSUE' 				: $result =  $this->api_model->UPDATEISSUE($params); break;
						case 'DELETEISSUE' 				: $result =  $this->api_model->DELETEISSUE($params); break;
						case 'modifyIssue'	 			: $result = $this->api_model->modifyIssue($params); break;
						case 'getissue'	 				: $result = $this->api_model->getissue($params); break;
						case 'getAllIssues'				: $result = $this->api_model->getAllIssues($params); break;
						case 'updateissues'				: $result = $this->api_model->updateissues($params); break;	
						case 'getImagesbyId'			: $result = $this->api_model->getImagesbyId($params); break;
						case 'getDatabyId_Domain'		: $result = $this->api_model->getDatabyId_Domain($params); break;	
						case 'GETISSUELISTS'			: $result = $this->api_model->GETISSUELISTS($params); break;	
						case 'getIssuesListbyStatus'	: $result=$this->api_model->getIssuesListbyStatus($params); break; 
						case 'getDatabyId_Status'		: $result = $this->api_model->getDatabyId_Status($params); break;
						case 'addDomain'				: $result = $this->api_model->addDomain($params,$params1); break;
						case 'updateDomain'				: $result = $this->api_model->updateDomain($params,$params1); break;
						case 'updateIncharge'			: $result = $this->api_model->updateIncharge($params,$params1); break;
						/////ionic  app

					case  'getIssueapp' : $result = $this->api_model->getIssueapp($params,$params1); break;
					case 'insertData' : $result = $this->api_model->insertData($params,$params1);
					break;
					case 'getIssuesListofadmin' : $result = $this->api_model->getIssuesListofadmin($params,$params1);
					break;
			        case 'getIssuesListofuser' : $result = $this->api_model->getIssuesListofuser($params,$params1);
			        break;
			        case 'deleteIssueofuser' : $result = $this->api_model->deleteIssueofuser($params,$params1);
			        break;

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
			//$response['data'] = $result;
			 $this->response($result,200);
		}
	}
	
	public function getRole_post(){
		$reg_no= $this->post('reg_no');
	   $this->getData('getRole',$reg_no); 
		// $result= $this->api_model->getRole($reg_no); 
	}

	// public function getIssuesList_get(){
		 
	// 	  $result= $this->api_model->getActivites();
	// 	 $this->response($result,200);
	// 	// print_r($result);
	// 	// return $result;
	// 	//$this->getData('getIssuesList');
	// }


	public function getCategories_get(){
		$result=$this->api_model->getCategories();
		//$this->response($result,200);
		$this->getData('getCategories');
	}

	public function getIssuesListbyCategory_post(){
		$domain = $this->post('domain');
		$this->getData('getIssuesListbyCategory',$domain);
	}

	public function getIssuesListBySelection_post(){
	 
		$data = array(
			'category' => $this->post('category'),
			'status' => $this->post('status'),
			'from_date' => $this->post('from_date'),
			'to_date' =>$this->post('to_date'));
     $this->getData('getIssuesListBySelection',$data);
	}

	public function INSERTISSUE_post(){
	 	$mobile1= $this->db->query('select mobile from raghuerp_dbnew.staff where  reg_no="'.$this->post('reg_no').'" ')->row();
	  	if($mobile1){
	  		$mobile = $mobile1->mobile;
	  	}else{
	  		$mobile = '';
	  	}
		$data = array(
			'domain' => $this->post('domain'),
			'issue_desc' => $this->post('issue_desc'),
			'location' => $this->post('location'),
			'problem' =>$this->post('problem'),
			'raised_by' =>$this->post('raised_by'),
			'reg_no' =>$this->post('reg_no'),
			'mobile' =>$mobile
			);
     $this->getData('INSERTISSUE',$data);
	}
 public function GETDETAILS_post()
 { 
 	$reg_no = $this->post('reg_no');
 
 	$this->getData('GETDETAILS',$reg_no);

}

public function getDomainsbyId_post(){
	$reg_no = $this->post('reg_no');
  	$this->getData('getDomainsbyId',$reg_no);
}

public function UPDATEISSUE_post()
{
		$time=  strtotime($this->post('repaired_on'));
		$start = date('Y-m-d H:i:s', $time);
		//$data['from_date'] =$start;
	  	$time1=  strtotime($this->post('date_of_resolution'));
		$start1 = date('Y-m-d H:i:s', $time1);
	$data = array(
		'status' =>$this->post('status'),
		'priority' =>$this->post('priority'),
		'repaired_on' =>  $start ,
		'repaired_by' => $this->post('repaired_by'),
		'date_of_resolution'=>$start1,
		'notes' =>$this->post('notes'),
		'did' => $this->post('did')
		);
	 $this->getData('UPDATEISSUE',$data);
}
public function DELETEISSUE_post()
{
	 
	$did = $this->post('did');
	 $this->getData('DELETEISSUE',$did);
}

public function modifyIssue_post(){
	$data = array(
			'did' => $this->post('did'),
			'domain' => $this->post('domain'),
			'issue_desc' => $this->post('issue_desc'),
			'location' => $this->post('location'),
			'problem' =>$this->post('problem') 
			);
     $this->getData('modifyIssue',$data);
}

public function getissue_post()
 { 
  	$reg_no = $this->post('reg_no');
 	$this->getData('getissue',$reg_no);

}

// for admin
public function getAllIssues_get(){
	$this->getData('getAllIssues');
}



public function updateissues_post(){
	 
		$data = array(
			'domain' => $this->post('domain'),
			'issue_desc' => $this->post('issue_desc'),
			'location' => $this->post('location'),
			'problem' =>$this->post('problem'),
			
			'did' =>$this->post('did')
			);
     $this->getData('updateissues',$data);
	}

public function insert_docs_post( ){
	//echo $this->post('length');
		// echo sizeof($_FILES["uploads"]["name"]);
			$data['reg_no']=$this->post('reg_no');
			$data['insert_id']=$this->post('id');
		  for($i=0;$i<$this->post('length');$i++){
		 	$name= $_FILES["uploads"]["name"][$i] ;
		  	$data['img_name'] = $name;
			$type= $_FILES["uploads"]["type"][$i] ;
			$data['img_type'] = $type;
			$ftpe = pathinfo($_FILES["uploads"]["name"][$i] ,PATHINFO_EXTENSION);

			move_uploaded_file($_FILES["uploads"]["tmp_name"][$i] , "uploads/".$name);
			 $this->db->insert('images',$data);		
		 }
		 
		  //$this->db->insert('images',$data);		

		// return $this->response($file_name,200); 
	}

public function getImagesbyId_post(){
		$data = array(
			'reg_no' => $this->post('reg_no'),
			'img_id' => $this->post('img_id') 
			);
	
	  $this->getData('getImagesbyId',$data);
}
public function getDatabyId_Domain_post()
 { 
  $data = array(
    'domain' => $this->post('domain'),
	'reg_no' => $this->post('reg_no') );
   $this->getData('getDatabyId_Domain',$data);

}
public function updateImage_post(){
		$id= $this->post('id');
	    $imagesdata = $this->db->query('select *from images where id="'.$id.'"')->row();
	    $Img= $imagesdata->img_name;
		// $result= $this->api_model->getRole($reg_no);
		//echo base_url()."uploads/".$Img; 
		 
		$res= unlink("./uploads/".$Img);
		 
	}

public function update_docs_post( ){
 
			//Unlinking here
			$id=$this->post('id');
			$imagesdata = $this->db->query('select *from images where id="'.$id.'"')->row();
	    	$Img= $imagesdata->img_name;
			$res= unlink("./uploads/".$Img);

			//Update here
		  for($i=0;$i<$this->post('length');$i++){
		 	$name= $_FILES["uploads"]["name"][$i] ;
		  	$data['img_name'] = $name;
			$type= $_FILES["uploads"]["type"][$i] ;
			$data['img_type'] = $type;
			$ftpe = pathinfo($_FILES["uploads"]["name"][$i] ,PATHINFO_EXTENSION);

			move_uploaded_file($_FILES["uploads"]["tmp_name"][$i] , "uploads/".$name);
			 //$this->db->insert('images',$data);	
			   $this->db->where('id', $id);
    		$result = $this->db->update('images', $data);	
    		if($result){
    			return $result;
    		}else{
    			return 'not updated';
    		}
		 }
	}

	public function GETISSUELISTS_post(){
	 
		$data = array(
			'category' => $this->post('category'),
			'status' => $this->post('status'),
			'from_date' => $this->post('from_date'),
			'to_date' =>$this->post('to_date'),
			'reg_no' => $this->post('reg_no'));
     $this->getData('GETISSUELISTS',$data);
	}
	public function getIssuesListbyStatus_post(){
		$data = array(
			'category' => $this->post('category'),
			'status' => $this->post('status'));

		$this->getData('getIssuesListbyStatus',$data);
	}

   public function getDatabyId_Status_post()
 	{ 
		  $data = array(
		  	'category' => $this->post('category'),
		  	'status' => $this->post('status'),  
			'reg_no' => $this->post('reg_no') 
			);
		   $this->getData('getDatabyId_Status',$data);

  	}


  // 	public function addDomain_post()
 	// { 
		//   $data = array(
		//   	'domain' => $this->post('domain'),
		//   	'domain_title' => $this->post('domain_title'),  
		// 	'domain_info' => $this->post('domain_info'),
		// 	'domain_admin' => $this->post('domain_admin')
		// 	);
		//    $this->getData('addDomain',$data);

  // 	}

  	public function addDomain_post(){
           $domain=array();
          
          foreach($this->post('domain_admin')as $da){
            $domain[]=$da;
          
           }
      
       $arr_str  = implode(",",$domain);
      
        $data = array(
            'domain' => $this->post('domain'),
            'domain_title' => $this->post('domain_title'),
            'domain_info' => $this->post('domain_info') ,
            'domain_admin' => $arr_str
            );
     $this->getData('addDomain',$data,$domain);
    }

    // public function updateDomain_post(){
    // 	$domains_admins =  array();
    // 	$domains= $this->post('domain_admin');
    // 	$domains_admins = (explode(",",$domains));
     
    // 	$data = array(
    //         'domain' => $this->post('domain'),
    //         'domain_title' => $this->post('domain_title'),
    //         'domain_info' => $this->post('domain_info'),
    //         'domain_admin' => $this->post('domain_admin')
    //         );
    //  $this->getData('updateDomain',$data,$domains_admins);
    
            
    // }

     public function updateDomain_post(){
    	  $domain=array();
          
          foreach($this->post('domain_admin')as $da){
            $domain[]=$da;
          
           }
      
       $arr_str  = implode(",",$domain);
      
        $data = array(
            'domain' => $this->post('domain'),
            'domain_title' => $this->post('domain_title'),
            'domain_info' => $this->post('domain_info') ,
            'domain_admin' => $arr_str
            );
     $this->getData('updateDomain',$data,$domain);
    
            
    }


    public function updateIncharge_post(){
    	  $domain=array();
          
          foreach($this->post('domain_admin')as $da){
            $domain[]=$da;
          
                 }
      
       $arr_str  = implode(",",$domain);
     // echo $arr_str;
        $data = array(
            'domain' => $this->post('domain'),
            //'domain_title' => $this->post('domain_title'),
           	// 'domain_info' => $this->post('domain_info') ,
            'domain_admin' => $arr_str
            );
     $this->getData('updateIncharge',$data,$domain);
    
    }
//////////////////////mobile app queries

public function get_issue_post() {
		$did = $this->post('did');

		$this->getData('getIssueapp',$did);
	}	

	public function insert_data_post() {
		$data = $this->post('issue');

		// $result = $this->api_model->insertData($data);
		$this->getData('insertData',$data);
	}

	public function issues_list_post() {
		$reg_no = $this->post('reg_no');
		$type = $this->post('type');
		$role = $this->post('role');
		$data = array('reg_no' => $reg_no, 'type' => $type, 'role' => $role);

		// $result = $this->api_model->getIssuesList($data);
		$this->getData('getIssuesListofadmin',$data);
	}


	public  function getissuesforuser_post()
	{
		$reg_no = $this->post('reg_no');
		$type = $this->post('type');
          $data = array('reg_no' => $reg_no, 'type' => $type);
		$this->getData('getIssuesListofuser',$data);
	}

	public function delete_issue_post() {
		$did = $this->post('did');
		$mobile = $this->post('mobile');
		$status = $this->post('status');

		$data = array('did' => $did, 'mobile' => $mobile, 'status' => $status);

		 $this->getData('deleteIssueofuser',$data);
	}	
    

}