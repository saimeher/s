<?php

class Api_model extends CI_Model
{
    function __construct()
    {
        parent::__construct();

        $this->load->database();
    }
    

    function userInfo($reg_no, $params) {
        return $this->db->query("select * from users where reg_no='".$reg_no."' limit 1")->row();
    }


    // activeMachines
    function activeMachines($reg_no, $params) {
        return $this->db->query("select * from machines order by mid asc")->result();
    }

    // adding machine
    function addMachine($reg_no, $params) {
        $name = $params[0];
        $this->db->set("name", $name);
        $this->db->insert('machines');
        if($this->db->insert_id()) {
            $return['success'] = true;
            $return['message'] = 'Success';
        } else {
            $return['success'] = false;
            $return['message'] = 'Error';
        }
        return $return;
    }

    // updating machine
    function updateMachine($reg_no, $params) {
        $name = $params[0];
        $mid = $params[1];
        $data["name"] =  $name;
        $this->db->where('mid', $mid);
        $st = $this->db->update('machines', $data);
        if($st) {
            $return['success'] = true;
            $return['message'] = 'Success';
        } else {
            $return['success'] = false;
            $return['message'] = 'Error';
        }
        return $return;

    }

    // attendance upload history
    function uploadHistory($reg_no, $params) {
        return $this->db->query("select h.*,m.name as machine_name from history h inner join machines m on m.mid=h.machine order by ttime desc")->result();
    }


    // delete upload file and data
    function deleteUploadFile($reg_no, $params) {
        $utype = $params[0];
        $hid = $params[1];
        $fd = $this->db->query("select * from history where id=". $hid)->row();
        if(sizeof($fd) > 0) {
            $mid = $fd->machine;
            $fnm = $fd->filename;
            $fdt = $fd->filedate.'%';
            $this->db->query("delete from history where id=", $hid);
            $this->db->query("delete from attendance where mid=".$mid." and filename='".$fnm."' and ttime like '".$fdt."'");
            $return['success'] = true;
            $return['message'] = 'success';
            return $return;
        }
        $return['success'] = false;
        $return['message'] = 'error';
        return $return;
    }

    // day wise attendance
    function attendanceByDate($reg_no, $params) {
        $adate = $params[0];
        $coldepts = $this->db->query("select c.college, c.full_name as college_name, d.department, d.full_name as department_name, concat(c.college,'-',d.department) as id from raghuerp_db.departments d inner join raghuerp_db.colleges c on c.id = d.college order by d.college asc, d.department asc ")->result();
        $data = $this->db->query("select s.reg_no, s.firstname as name, s.designation, c.college, d.department, s.mobile, date_format(ain.ttime, '%h:%i %p') as in_time, date_format(aout.ttime, '%h:%i %p') as out_time from raghuerp_db.staff s left join raghuerp_biometric.attendance ain on trim(ain.reg_no) = trim(s.reg_no) and ain.type='IN' and ain.tdate = '".$adate."' left join raghuerp_biometric.attendance aout on trim(aout.reg_no) = trim(s.reg_no) and aout.type='OUT' and aout.tdate = '".$adate."' left join raghuerp_db.colleges c on c.id = s.college left join raghuerp_db.departments d on d.id = s.department order by s.college asc, s.department asc, s.reg_no asc ")->result();
        foreach($data as $dt) {
            $attendance[$dt->college.'-'.$dt->department][] = $dt;
        }
        $return['success'] = true;
        $return['colgdepts'] = $coldepts;
        $return['attendance'] = $attendance;
        return $return;
    }

    // day wise attendance
    function attendanceByDays($reg_no, $params) {
        $start_date = $params[0];
        $end_date = $params[1];
        // $return['sdt'] = date('Y-m-d', strtotime($start_date));
        // $return['edt'] = date('Y-m-d', strtotime($end_date));
        // $return['params'] = $params;
        // return $return;
        $sel1='';
        $sel2='';
        $dtwk = [];
        for($dt = $start_date,$i=1; $dt <= $end_date && $i <= 31; $i++, $dt=date('Y-m-d', strtotime($dt .' +1 day'))) {
            if($sel1=='') { $sel1 = " date_format(ain".$i.".ttime, '%h:%i %p') as in_time_".$i.", date_format(aot".$i.".ttime, '%h:%i %p') as out_time_".$i.", timediff(aot".$i.".ttime, ain".$i.".ttime) as work_tm_".$i.", '".date('jS, D',strtotime($dt))."' as day_".$i; }
            else { $sel1 .= ", date_format(ain".$i.".ttime, '%h:%i %p') as in_time_".$i.", date_format(aot".$i.".ttime, '%h:%i %p') as out_time_".$i.", timediff(aot".$i.".ttime, ain".$i.".ttime) as work_tm_".$i.", '".date('jS, D',strtotime($dt))."' as day_".$i; }

            $sel2 .= "left join raghuerp_biometric.attendance ain".$i." on trim(ain".$i.".reg_no) = trim(s.reg_no) and ain".$i.".type='IN' and ain".$i.".tdate = '".$dt."'  
                left join raghuerp_biometric.attendance aot".$i." on trim(aot".$i.".reg_no) = trim(s.reg_no) and aot".$i.".type='OUT' and aot".$i.".tdate = '".$dt."' ";

            $dtwk[] = date('jS, D',strtotime($dt));
            
        }
        $data_query = "select s.reg_no, s.firstname as name, s.designation, c.college, d.department, s.mobile, 
        ".$sel1."
        from raghuerp_db.staff s 
        ".$sel2."
        left join raghuerp_db.colleges c on c.id = s.college 
        left join raghuerp_db.departments d on d.id = s.department 
        order by s.college asc, s.department asc, s.reg_no asc ";

        $coldepts = $this->db->query("select c.college, c.full_name as college_name, d.department, d.full_name as department_name, concat(c.college,'-',d.department) as id from raghuerp_db.departments d inner join raghuerp_db.colleges c on c.id = d.college order by d.college asc, d.department asc ")->result();
        $data = $this->db->query($data_query)->result();
        foreach($data as $dt) {
            $attendance[$dt->college.'-'.$dt->department][] = $dt;
        }
        $return['success'] = true;
        $return['dateweek'] = $dtwk;
        $return['colgdepts'] = $coldepts;
        $return['attendance'] = $attendance;
        return $return;
    }

    // select a.reg_no, st.firstname, c.college, d.department, a.tdate, date_format(a.tdate, '%a') as wday, date_format(a1.ttime, '%h:%i %p') as morning, date_format(a2.ttime, '%h:%i %p') as evening, a1.ttime as intime, a2.ttime as outtime from raghuerp_biometric.attendance a inner join raghuerp_db.staff st on st.reg_no = a.reg_no inner join raghuerp_db.departments d on d.id = st.department inner join raghuerp_db.colleges c on c.id = d.college left join raghuerp_biometric.attendance a1 on a1.reg_no = a.reg_no and a1.tdate = a.tdate and a1.type = 'IN' left join raghuerp_biometric.attendance a2 on a2.reg_no = a.reg_no and a2.tdate = a.tdate and a2.type = 'OUT' where a.tdate between '2017-08-26' and '2017-09-23' group by a.reg_no, a.tdate ORDER BY a.reg_no asc, a.tdate ASC

    // day wise attendance by department
    function testAttendance($reg_no, $params) {
        $start_date = $params[0];
        $end_date = $params[1];
        $coldepts = $this->db->query("select c.college, c.full_name as college_name, d.department, d.full_name as department_name, concat(c.college,'-',d.department) as id from raghuerp_db.departments d inner join raghuerp_db.colleges c on c.id = d.college where d.status=1 order by d.college asc, d.department asc ")->result();
        $staffids = $this->db->query("select st.reg_no, c.college, d.department, concat(c.college,'-',d.department) as id from raghuerp_db.staff st inner join raghuerp_db.departments d on d.id=st.department inner join raghuerp_db.colleges c on c.id = d.college where st.status=1 order by d.college asc, d.department asc")->result();
        // $data = $this->db->query("select a.reg_no,  st.firstname as name, c.college, d.department,  a.tdate, a1.ttime as intime, a2.ttime as outtime from attendance a  inner join raghuerp_db.staff st on st.reg_no = a.reg_no inner join raghuerp_db.departments d on d.id = st.department inner join raghuerp_db.colleges c on c.id = d.college  left join attendance a1 on a1.reg_no = a.reg_no and a1.tdate = a.tdate and a1.type = 'IN' left join attendance a2 on a2.reg_no = a.reg_no and a2.tdate = a.tdate and a2.type = 'OUT' where a.tdate between '".$start_date."' and '".$end_date."'  group by a.reg_no, a.tdate ORDER BY a.tdate ASC")->result();
       
         $data = $this->db->query("select a.reg_no, st.firstname as name, c.college, d.department, a.tdate, date_format(a.tdate, '%a') as wday, date_format(a1.ttime, '%h:%i %p') as morning, date_format(a2.ttime, '%h:%i %p') as evening, a1.ttime as intime, a2.ttime as outtime from raghuerp_biometric.attendance a inner join raghuerp_db.staff st on st.reg_no = a.reg_no inner join raghuerp_db.departments d on d.id = st.department inner join raghuerp_db.colleges c on c.id = d.college left join raghuerp_biometric.attendance a1 on a1.reg_no = a.reg_no and a1.tdate = a.tdate and a1.type = 'IN' left join raghuerp_biometric.attendance a2 on a2.reg_no = a.reg_no and a2.tdate = a.tdate and a2.type = 'OUT' where a.tdate between '".$start_date."' and '".$end_date."' group by a.reg_no, a.tdate ORDER BY a.reg_no asc, a.tdate ASC")->result();

$myARR=[];
        foreach($coldepts as $dts) {
            $dd = 0;
        foreach($data as $dt) {
if($dts->id   ==  $dt->college.'-'.$dt->department)
            {
                $dd =1;
                break;
            }
            }
            if($dd == 0)
            {
               array_push($myARR,$dts->college.'-'.$dts->department);
            }
        }

        foreach($coldepts as $dts) {
        foreach($data as $dt) {
            
            // $ret_data[$dt->college.'-'.$dt->department][$dt->reg_no]['name'] = $dt->reg_no.' - '.$dt->name;
            if($dts->id   ==  $dt->college.'-'.$dt->department)
            {
              $ret_data[$dts->college.'-'.$dts->department][$dt->reg_no][] = array('reg_no'=>$dt->reg_no, 'name'=>$dt->name, 'date'=>$dt->tdate, 'weekday'=>$dt->wday, 'morning'=>$dt->morning, 'evening'=>$dt->evening);

            }
        }        
    }
       

foreach($myARR as $dt) {
    $ret_data[$dt]=[]; 

}

        foreach($staffids as $ids) {
            $id_data[$ids->college.'-'.$ids->department][] = $ids->reg_no;
        }
        $return['success'] = true;
        $return['colgdepts'] = $coldepts;
        $return['staffids'] = $id_data;
        $return['mondata'] = $ret_data;
        // $return['attendance'] = $data;
        return $return;
    }

    // day wise attendance by department
    function deptAttendanceByDate($reg_no, $params) {
        $adate = $params[0];
        $college = $params[1];
        $dept = $params[2];
        // $coldepts = $this->db->query("select c.college, c.full_name as college_name, d.department, d.full_name as department_name, concat(c.college,'-',d.department) as id from raghuerp_db.departments d inner join raghuerp_db.colleges c on c.id = d.college order by d.college asc, d.department asc ")->result();
        $data = $this->db->query("select s.reg_no, s.firstname as name, s.designation, c.college, d.department, s.mobile, date_format(ain.ttime, '%h:%i %p') as in_time, date_format(aout.ttime, '%h:%i %p') as out_time from raghuerp_db.staff s left join raghuerp_biometric.attendance ain on trim(ain.reg_no) = trim(s.reg_no) and ain.type='IN' and ain.ttime like '%".$adate."%' left join raghuerp_biometric.attendance aout on trim(aout.reg_no) = trim(s.reg_no) and aout.type='OUT' and aout.ttime like '%".$adate."%' left join raghuerp_db.colleges c on c.id = s.college left join raghuerp_db.departments d on d.id = s.department where c.college='".$college."' and d.department='".$dept."' ")->result();
        // foreach($data as $dt) {
        //     $attendance[$dt->college.'-'.$dt->department][] = $dt;
        // }
        $return['success'] = true;
        // $return['colgdepts'] = $coldepts;
        $return['attendance'] = $data;
        return $return;
    }

    function indviduatAttendance($reg_no, $params) {
        $st = mktime(0,0,0,$params[1],1,$params[2]);
        $start_date = date('Y-m-d', $st);
        $end_date = date('Y-m-t', $st);
        $data = $this->GetMultipleQueryResult("call month_attendance('".$reg_no."','".$start_date."','".$end_date."') ");

        $return['success'] = true;
        $return['attendance'] = $data[0];
        return $return;
    }


    // get role
    function getRole($reg_no, $params) {
        $role_rs = $this->db->query("select role from roles where reg_no='".$reg_no."'")->result();
        if(sizeof($role_rs) > 0) {
            $role = $role_rs[0]->role;
        } else {
            $role = 'staff';
        }
        $return['success'] = true;
        $return['role'] = $role;
        return $return;
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
    // data for late
    function attendanceByLateIn($reg_no, $params) {
        $adate = $params[0];
        $coldepts = $this->db->query("select c.college, c.full_name as college_name, d.department, d.full_name as department_name, concat(c.college,'-',d.department) as id from raghuerp_db.departments d inner join raghuerp_db.colleges c on c.id = d.college order by d.college asc, d.department asc ")->result();
        $data = $this->db->query("select (select count(*) from raghuerp_db.staff s left join raghuerp_biometric.attendance ain on trim(ain.reg_no) = trim(s.reg_no) and ain.type='IN' and ain.tdate = '".$adate."' left join raghuerp_db.colleges c on c.id = s.college left join raghuerp_db.departments d on d.id = s.department   where date_format(ain.ttime, '%h:%i %p') > '09:00 AM' order by s.college asc, s.department asc, s.reg_no asc) as count, s.reg_no, s.firstname as name, s.designation, c.college, d.department, s.mobile, date_format(ain.ttime, '%h:%i %p') as in_time from raghuerp_db.staff s left join raghuerp_biometric.attendance ain on trim(ain.reg_no) = trim(s.reg_no) and ain.type='IN' and ain.tdate = '".$adate."' left join raghuerp_db.colleges c on c.id = s.college left join raghuerp_db.departments d on d.id = s.department   where date_format(ain.ttime, '%h:%i %p') > '09:00 AM' order by s.college asc, s.department asc, s.reg_no asc ")->result();
        foreach($data as $dt) {
            $attendance[$dt->college.'-'.$dt->department][] = $dt;

            $attendance['count'] = $dt->count;
        }
        $return['success'] = true;
        $return['colgdepts'] = $coldepts;
        $return['attendance1'] = $attendance;
        return $return;
    } 
    //data for early
    public  function attendanceByEarlyOut($reg_no, $params) {
        $adate = $params[0];
        $coldepts = $this->db->query("select c.college, c.full_name as college_name, d.department, d.full_name as department_name, concat(c.college,'-',d.department) as id from raghuerp_db.departments d inner join raghuerp_db.colleges c on c.id = d.college order by d.college asc, d.department asc ")->result();
        $data = $this->db->query("select  (select count(*) from raghuerp_db.staff s left join raghuerp_biometric.attendance aout on trim(aout.reg_no) = trim(s.reg_no) and aout.type='OUT' and aout.tdate = '".$adate."' left join raghuerp_db.colleges c on c.id = s.college left join raghuerp_db.departments d on d.id = s.department   where date_format(aout.ttime, '%h:%i %p') <= '03:30 PM' order by s.college asc, s.department asc, s.reg_no asc)as  count,s.reg_no, s.firstname as name, s.designation, c.college, d.department, s.mobile, date_format(aout.ttime, '%h:%i %p') as out_time from raghuerp_db.staff s left join raghuerp_biometric.attendance aout on trim(aout.reg_no) = trim(s.reg_no) and aout.type='OUT' and aout.tdate = '".$adate."' left join raghuerp_db.colleges c on c.id = s.college left join raghuerp_db.departments d on d.id = s.department   where date_format(aout.ttime, '%h:%i %p') <= '03:30 PM' order by s.college asc, s.department asc, s.reg_no asc ")->result();
        foreach($data as $dt) {
            $attendance[$dt->college.'-'.$dt->department][] = $dt;

            $attendance['count'] = $dt->count;
        }
        $return['success'] = true;
        $return['colgdepts'] = $coldepts;
        $return['attendance2'] = $attendance;
        return $return;
    }     
    //data for no issue
    public  function attendanceByNoIssue($reg_no, $params) {
        $adate = $params[0];
        $coldepts = $this->db->query("select c.college, c.full_name as college_name, d.department, d.full_name as department_name, concat(c.college,'-',d.department) as id from raghuerp_db.departments d inner join raghuerp_db.colleges c on c.id = d.college order by d.college asc, d.department asc ")->result();
        $data = $this->db->query("select (select count(*) from raghuerp_db.staff s left join raghuerp_biometric.attendance ain on trim(ain.reg_no) = trim(s.reg_no) and ain.type='IN' and ain.tdate = '".$adate."' left join raghuerp_biometric.attendance aout on trim(aout.reg_no) = trim(s.reg_no) and aout.type='OUT' and aout.tdate = '".$adate."' left join raghuerp_db.colleges c on c.id = s.college left join raghuerp_db.departments d on d.id = s.department  where date_format(ain.ttime, '%h:%i %p') < '09:00 AM'  and date_format(aout.ttime, '%h:%i %p') > '03:30 PM' order by s.college asc, s.department asc, s.reg_no asc) as count,s.reg_no, s.firstname as name, s.designation, c.college, d.department, s.mobile, date_format(ain.ttime, '%h:%i %p') as in_time, date_format(aout.ttime, '%h:%i %p') as out_time from raghuerp_db.staff s left join raghuerp_biometric.attendance ain on trim(ain.reg_no) = trim(s.reg_no) and ain.type='IN' and ain.tdate = '".$adate."' left join raghuerp_biometric.attendance aout on trim(aout.reg_no) = trim(s.reg_no) and aout.type='OUT' and aout.tdate = '".$adate."' left join raghuerp_db.colleges c on c.id = s.college left join raghuerp_db.departments d on d.id = s.department  where date_format(ain.ttime, '%h:%i %p') < '09:00 AM'  and date_format(aout.ttime, '%h:%i %p') > '03:30 PM' order by s.college asc, s.department asc, s.reg_no asc")->result();
        foreach($data as $dt) {
            $attendance[$dt->college.'-'.$dt->department][] = $dt;

            $attendance['count'] = $dt->count;
        }
        $return['success'] = true;
        $return['colgdepts'] = $coldepts;
        $return['attendance3'] = $attendance;
        return $return;
    }     
    public function getattendancebysingle($reg_no, $params)
    {
        $start_date = $params[0];
        $end_date = $params[1];
        $reg_no = $params[2];
        $data = $this->db->query("select  DISTINCT a1.ttime as intime, a.reg_no, st.firstname as name, c.college, d.department, a.tdate, date_format(a.tdate, '%a') as wday, date_format(a1.ttime, '%h:%i %p') as morning, date_format(a2.ttime, '%h:%i %p') as evening,a2.ttime as outtime from raghuerp_biometric.attendance a inner join raghuerp_db.staff st on st.reg_no = a.reg_no inner join raghuerp_db.departments d on d.id = st.department inner join raghuerp_db.colleges c on c.id = d.college left join raghuerp_biometric.attendance a1 on a1.reg_no = a.reg_no and a1.tdate = a.tdate and a1.type = 'IN' left join raghuerp_biometric.attendance a2 on a2.reg_no = a.reg_no and a2.tdate = a.tdate and a2.type = 'OUT' where a.reg_no='".$reg_no."' and a.tdate between '".$start_date."' and '".$end_date."'")->result();


        $work = $this->db->query('select (select  datediff("'.$end_date.'","'.$start_date.'")  + 1 ) - (SELECT count(*) from raghuerp_biometric.holidays where holdate between  "'.$start_date.'" and "'.$end_date.'")  as count')->result();

         $worked = $this->db->query('select *,count(*) as ct FROM `attendance` a WHERE a.tdate between "'.$start_date.'" and "'.$end_date.'" and a.reg_no = "'.$reg_no.'" group by a.tdate ')->result();
         
         $average =$this->db->query("select
              timediff(a2.ttime,a1.ttime) as difference,
              time_to_sec(timediff(a2.ttime,a1.ttime)) as seconds, 
              a.reg_no, st.firstname as name, c.college, d.department, a.tdate, date_format(a.tdate, '%a') as wday, date_format(a1.ttime, '%h:%i %p') as morning, 
            date_format(a2.ttime, '%h:%i %p') as evening, a1.ttime as intime, a2.ttime as outtime from raghuerp_biometric.attendance a
            inner join raghuerp_db.staff st on st.reg_no = a.reg_no 
            inner join raghuerp_db.departments d on d.id = st.department 
            inner join raghuerp_db.colleges c on c.id = d.college 
            left join raghuerp_biometric.attendance a1 on a1.reg_no = a.reg_no and a1.tdate = a.tdate and a1.type = 'IN' 
            left join raghuerp_biometric.attendance a2 on a2.reg_no = a.reg_no and a2.tdate = a.tdate and a2.type = 'OUT' 
            where a.tdate between '".$start_date."' and '".$end_date."' and a.reg_no ='".$reg_no."' group by a.tdate")->result();





         $return['success'] = true;
        $return['data1'] = $data;
        $return['work'] = $work;
        $return['worked'] = $worked;
        $return['average'] = $average;
        return $return;
    }

    public function getcountlate($reg_no, $params)
    {
        $start_date = $params[0];
        $end_date = $params[1];
        $coldepts = $this->db->query("select c.college, c.full_name as college_name, d.department, d.full_name as department_name, concat(c.college,'-',d.department) as id from raghuerp_db.departments d inner join raghuerp_db.colleges c on c.id = d.college where d.status=1 order by d.college asc, d.department asc ")->result();
        $staffids = $this->db->query("select st.reg_no, c.college, d.department, concat(c.college,'-',d.department) as id from raghuerp_db.staff st inner join raghuerp_db.departments d on d.id=st.department inner join raghuerp_db.colleges c on c.id = d.college where st.status=1 order by d.college asc, d.department asc")->result();
        // $data = $this->db->query("select a.reg_no,  st.firstname as name, c.college, d.department,  a.tdate, a1.ttime as intime, a2.ttime as outtime from attendance a  inner join raghuerp_db.staff st on st.reg_no = a.reg_no inner join raghuerp_db.departments d on d.id = st.department inner join raghuerp_db.colleges c on c.id = d.college  left join attendance a1 on a1.reg_no = a.reg_no and a1.tdate = a.tdate and a1.type = 'IN' left join attendance a2 on a2.reg_no = a.reg_no and a2.tdate = a.tdate and a2.type = 'OUT' where a.tdate between '".$start_date."' and '".$end_date."'  group by a.reg_no, a.tdate ORDER BY a.tdate ASC")->result();
       
         // $data = $this->db->query("select (select count(*) from raghuerp_biometric.attendance a inner join raghuerp_db.staff st on st.reg_no = a.reg_no inner join raghuerp_db.departments d on d.id = st.department inner join raghuerp_db.colleges c on c.id = d.college left join raghuerp_biometric.attendance a1 on a1.reg_no = a.reg_no and a1.tdate = a.tdate and a1.type = 'IN' left join raghuerp_biometric.attendance a2 on a2.reg_no = a.reg_no and a2.tdate = a.tdate and a2.type = 'OUT' where a.tdate between '".$start_date."' and '".$end_date."' and date_format(a1.ttime, '%h:%i %p') > '09:20 AM' )as count, a.reg_no, st.firstname as name, c.college, d.department, a.tdate, date_format(a.tdate, '%a') as wday, date_format(a1.ttime, '%h:%i %p') as morning, a1.ttime as intime from raghuerp_biometric.attendance a inner join raghuerp_db.staff st on st.reg_no = a.reg_no inner join raghuerp_db.departments d on d.id = st.department inner join raghuerp_db.colleges c on c.id = d.college left join raghuerp_biometric.attendance a1 on a1.reg_no = a.reg_no and a1.tdate = a.tdate and a1.type = 'IN' left join raghuerp_biometric.attendance a2 on a2.reg_no = a.reg_no and a2.tdate = a.tdate and a2.type = 'OUT' where a.tdate between '".$start_date."' and '".$end_date."' and date_format(a1.ttime, '%h:%i %p') > '09:20 AM'  ORDER BY a.reg_no asc, a.tdate ASC")->result();

         $data = $this->db->query("select a1.ttime as intime ,a.reg_no, st.firstname as name, c.college, d.department, a.tdate, date_format(a.tdate, '%a') as wday, date_format(a1.ttime, '%h:%i %p') as morning from raghuerp_biometric.attendance a  inner join raghuerp_db.staff st on st.reg_no = a.reg_no  inner join raghuerp_db.departments d on d.id = st.department inner join raghuerp_db.colleges c on c.id = d.college inner join raghuerp_biometric.attendance a1 on a1.reg_no = a.reg_no and a1.type = 'IN' and a1.tdate = a.tdate where a1.tdate between '".$start_date."' and '".$end_date."' and date_format(a1.ttime, '%h:%i %p') > '09:00 AM' group by a.reg_no,a.tdate ORDER BY a.reg_no asc, a.tdate ASC")->result();
         $data1 = $this->db->query("select a1.ttime as outtime ,a.reg_no, st.firstname as name, c.college, d.department, a.tdate, date_format(a.tdate, '%a') as wday, date_format(a1.ttime, '%h:%i %p') as morning from raghuerp_biometric.attendance a  inner join raghuerp_db.staff st on st.reg_no = a.reg_no  inner join raghuerp_db.departments d on d.id = st.department inner join raghuerp_db.colleges c on c.id = d.college inner join raghuerp_biometric.attendance a1 on a1.reg_no = a.reg_no and a1.type = 'OUT' and a1.tdate = a.tdate where a1.tdate between '".$start_date."' and '".$end_date."' and date_format(a1.ttime, '%h:%i %p') < '03:30 AM' group by a.reg_no,a.tdate ORDER BY a.reg_no asc, a.tdate ASC")->result();
        
        foreach($data as $dt) {
            // $ret_data[$dt->college.'-'.$dt->department][$dt->reg_no]['name'] = $dt->reg_no.' - '.$dt->name;
            $ret_data[$dt->college.'-'.$dt->department][$dt->reg_no][] = array('reg_no'=>$dt->reg_no, 'name'=>$dt->name, 'date'=>$dt->tdate, 'weekday'=>$dt->wday, 'morning'=>$dt->morning, 'evening'=>$dt->evening);
            $ret_data['count'] = $dt->count;
        }
        foreach($staffids as $ids) {
            $id_data[$ids->college.'-'.$ids->department][] = $ids->reg_no;
        }
        $return['success'] = true;
        $return['colgdepts'] = $coldepts;
        $return['staffids'] = $id_data;
        $return['mondata'] = $ret_data;
        $return['data1'] = $data;
        $return['data2'] = $data1;
        // $return['attendance'] = $data;
        return $return;
    }




    ########################### Supporting functions
    // sending email
	function sendEmail($to,$subject,$message)
	{

		$this->load->library('email');

		$this->email->from('testmail@akrivia.in', 'myExams Portal');
		$this->email->to($to);
		// $this->email->cc('admin@raghueducational.org');
		// $this->email->bcc('techlead.it@raghues.com');
        $this->email->set_mailtype("html");

		$this->email->subject($subject);
		$this->email->message($message);

		$st = $this->email->send();

		if($st) {
			return true;
		} else {
			return false;
		}

	}

    // send sms
	function sendSMS($to,$msg)
	{
		$URL = "http://login.smsmoon.com/API/sms.php";
		$post_fields = array(
		    'username' => 'raghuedu',
		    'password' => 'abcd.1234',
		    'from' => 'RAGHUT',
		    'to' => $to,
		    'msg' => $msg,
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
?>
