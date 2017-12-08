<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Data extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	
    public function __destruct() {  
        $this->db->close();  
    } 
	public function index()
	{
		echo "okay";
	}

	public function save()
	{
		$reg_no     = trim($_GET['reg_no']);
		$dt         = trim($_GET['dt']);
        $ttime      = trim($_GET['ttime']);

        $dttm = $dt . ' ' . $ttime;
        $cdt = $dt . " 12:00:00";

        $mid = 9999;
        $fid = 9999;
        $iname = "live_punch";

		if($reg_no) {

            if((date('Y-m-d H:i:s', strtotime($dttm)) < date('Y-m-d H:i:s',strtotime($cdt)))) {
				$type = "IN";
				$sel_in = $this->db->query("select ttime, count(*) as count from attendance where reg_no='".$reg_no."' and tdate='".$dt."' and type='".$type."'")->row();
				if($sel_in->count > 0) {
					(date('Y-m-d H:i:s', strtotime($dttm)) < date('Y-m-d H:i:s',strtotime($sel_in->ttime))) ? $fdttm = $dttm : $fdttm = $sel_in->ttime;
				} else {
					$fdttm = $dttm;
				}
				// $q = $this->db->query("insert ignore attendance (mid,fid,reg_no,tdate,ttime,type,filename) values ('".$mid."','".$fid."','".$reg_no."','".$dt."','".$dttm."','".$type."','".$iname."') ");
				$q = $this->db->query("insert into attendance (mid,fid,reg_no,tdate,ttime,type,filename) values ('".$mid."','".$fid."','".$reg_no."','".$dt."','".$fdttm."','".$type."','".$iname."') on duplicate key update ttime='".$fdttm."'");
            } else {
                $type = "OUT";
				$sel_out = $this->db->query("select ttime, count(*) as count from attendance where reg_no='".$reg_no."' and tdate='".$dt."' and type='".$type."'")->row();
				if($sel_out->count > 0) {
					(date('Y-m-d H:i:s', strtotime($dttm)) > date('Y-m-d H:i:s',strtotime($sel_out->ttime))) ? $ldttm = $dttm : $ldttm = $sel_out->ttime;
				} else {
					$ldttm = $dttm;
				}
                $q = $this->db->query("insert into attendance (mid,fid,reg_no,tdate,ttime,type,filename) values ('".$mid."','".$fid."','".$reg_no."','".$dt."','".$ldttm."','".$type."','".$iname."') on duplicate key update ttime='".$ldttm."'");
			}
			
		}			

		if($q) echo 1;
		else echo 0;
	}


}
