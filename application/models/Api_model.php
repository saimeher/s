<?php

class Api_model extends CI_Model
{
    function __construct()
    {
        parent::__construct();

        $this->load->database('');
        $CI =   &get_instance();
        $this->db2 = $this->load->database('db2', TRUE);   
    }
    
    // validate login details
public function loginCheck($username, $password) 
    {

        $login_data = $this->db->query('select  s.gender,s.dp,   u.*  from  users u left join staff s ON s.reg_no=u.reg_no  where u.reg_no="'.$username.'" and u.password="'.md5($password).'"')->row();
        
       if ($login_data) 
        {
            return $login_data;
        } 
       
        else 
        {
            return false;
        }      
          
    }


  public function getRole($param1='')
    {
         
         // $result=$this->db->query('select *from roles where reg_no="'.$param1.'"')->row();
       // $result= $this->db->query('select reg_no,role,concat(GROUP_CONCAT(domain), ",") as domain_admin from roles where reg_no = "'.$param1.'"')->row();
       $result= $this->db->query('select * ,concat(GROUP_CONCAT(domain), ",") as domain_admin from roles where reg_no = "'.$param1.'"')->row();
        if($result->reg_no != '')
        {
          return  array("data"=>$result); 
        }
        else
        {
            return array("data"=>'failed');
        }
    }

 
  
 public function getIssuesList(){
   
    $result=$result=$this->db->query('select * from domains where domain="ac"')->row();
    if($result)
        {
          return $result;
        }
        else
        {
            return false;
        }
 }

//  public function getActivites(){
//     $sql="select *from data";
//     $result=$this->db->query($sql)->result();
//    //return $result;
//     if($result){
//         return $result;
//     }else{
//          return false;
//     }
// }

public function getCategories(){
    $result=$this->db->query('SELECT domain,domain_title,domain_info,domain_admin FROM `domains`')->result();
    if($result){
        return $result;
    }else{
        return false;
    }
}

    public function getIssuesListbyCategory($domain){
    $result=$this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM data d LEFT JOIN images i on  i.insert_id=d.did where d.domain="'.$domain.'"  GROUP by d.did ORDER BY d.insert_dt DESC')->result();

    $result1 = $this->db->query('SELECT status,COUNT(status) as tot,(SELECT COUNT(status) from data WHERE domain="'.$domain.'" )as t from data WHERE domain="'.$domain.'"    GROUP by status')->result();
    $result2 = $this->db->query('SELECT floor(avg(datediff(date_of_resolution,insert_dt)) )as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum from data WHERE status="verified_resolved"  and domain="'.$domain.'" order by insert_dt DESC')->result();
       if ($result2) {
        $result2=$result2;
      }
      else{
        $result2='NoAvgData';
      } 

    if($result){
        return array("data" => $result, "data1" => $result1,"data2" => $result2);
          
    }else{
        return array("data1"=>'NoData',"data2"=>'NoAvgData');
    }
}


 
  
//     if($result){
//         return array("data"=>$result , "data1"=>$result1);
//     }else{
//          return array("data1"=>'NoData');
//     }
// }


public function getIssuesListBySelection($param){
 
    if($param['status']=='all' && $param['category']=='all'){

      $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM data d LEFT JOIN images i on  i.insert_id=d.did WHERE  d.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by d.did order by d.insert_dt DESC')->result();
      $result1 = $this->db->query('SELECT status,COUNT(status) as tot,   (SELECT COUNT(status) from data WHERE  insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) )as t from data WHERE  insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY)   GROUP by status')->result();
       $result2 = $this->db->query('SELECT floor(avg(datediff(date_of_resolution,insert_dt)) )as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum from data WHERE status="verified_resolved" and   insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) order by insert_dt DESC')->result(); 
        if ($result2) {
        $result2=$result2;
      }
      else{
        $result2='NoAvgData';
      } 

       
  }
else if($param['status']!='all' && $param['category']=='all'){

      $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM data d LEFT JOIN images i on  i.insert_id=d.did WHERE d.status="'.$param['status'].'"  and d.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by d.did order by d.insert_dt DESC')->result();
      $result1 = $this->db->query('SELECT domain as status,COUNT(status) as tot,   (SELECT COUNT(status) from data WHERE status="'.$param['status'].'"  and insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) )as t from data WHERE status="'.$param['status'].'" and insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY)   GROUP by domain')->result();
      $result2 = $this->db->query('SELECT floor(avg(datediff(date_of_resolution,insert_dt))) as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum from data WHERE status="verified_resolved"   and insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY)     order by insert_dt DESC')->result();
      if ($result2) {
        $result2=$result2;
      }
      else{
        $result2='NoAvgData';
      } 
     
  }
  else if($param['status']=='all' && $param['category']!='all'){

      $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM data d LEFT JOIN images i on  i.insert_id=d.did WHERE d.domain="'.$param['category'].'"  and d.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by d.did order by d.insert_dt DESC')->result();
      $result1 = $this->db->query('SELECT status,COUNT(status) as tot,   (SELECT COUNT(status) from data WHERE domain="'.$param['category'].'" and insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) )as t from data WHERE domain="'.$param['category'].'"  and insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY)   GROUP by status')->result();
       $result2 = $this->db->query('SELECT floor(avg(datediff(date_of_resolution,insert_dt)) )as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum from data WHERE status="verified_resolved" and domain="'.$param['category'].'"  and insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) order by insert_dt DESC')->result();
       if ($result2) {
        $result2=$result2;
      }
      else{
        $result2='NoAvgData';
      } 
  }
  else
  {
      $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM data d LEFT JOIN images i on  i.insert_id=d.did WHERE d.domain="'.$param['category'].'" and d.status="'.$param['status'].'" and d.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by d.did order by d.insert_dt DESC')->result();
      $result1 = $this->db->query('SELECT status,COUNT(status) as tot, (SELECT COUNT(status) from data WHERE domain="'.$param['category'].'" and status="'.$param['status'].'" and insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY)  )as t from data WHERE domain="'.$param['category'].'" and status="'.$param['status'].'"  and insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY)   GROUP by status')->result();
//         if($param['status']=='verified_resolved'){
//       $result2 = $this->db->query('SELECT avg(datediff(date_of_resolution,insert_dt)) as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum from data WHERE status="'.$param['status'].'" and domain="'.$param['category'].'"   and insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY)     order by insert_dt DESC')->result();
//       if ($result2) {
//         $result2=$result2;
//       }else{
//         $result2='NoAvgData';
//       }
//     }else{
//        $result2='NoAvgData';
//     }
      
//   }
//   if($result){
//         return array("data"=>$result , "data1"=>$result1,"data2"=>$result2);
//     }else{
//         return array("data1"=>'NoData',"data2"=>'NoAvgData');
//     }
// }
      $result2 = $this->db->query('SELECT floor(avg(datediff(date_of_resolution,insert_dt)) )as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum from data WHERE status="verified_resolved" and domain="'.$param['category'].'"  and insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) order by insert_dt DESC')->result();
       if ($result2) {
        $result2=$result2;
      }
      else{
        $result2='NoAvgData';
      }
  }
  if($result){
        return array("data"=>$result , "data1"=>$result1,"data2"=>$result2);
    }else{
        return array("data1"=>'NoData',"data2"=>'NoAvgData');
    }
} 


// public function GETDETAILS($param1='')
// {


//      $result = $this->db->query('select i.img_name,d.domain_admin,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, data.* from domains d INNER JOIN  users r ON r.reg_no = "'.$param1.'"
//       JOIN data 
//           ON data.domain = d.domain LEFT JOIN images i on  i.insert_id=data.did
//       WHERE   FIND_IN_SET("'.$param1.'", d.domain_admin) GROUP BY data.did ORDER BY data.did DESC')->result();

   
//      $result1 = $this->db->query('SELECT status,COUNT(status) as tot,(SELECT COUNT(status) from domains d inner join users r ON r.reg_no = "'.$param1.'" join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param1.'", d.domain_admin)  ) as t from domains d inner join users r ON r.reg_no = "'.$param1.'" join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param1.'", d.domain_admin)   GROUP by status')->result();
//     $result2 = $this->db->query('SELECT  floor(avg(datediff(date_of_resolution,insert_dt))) as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum   from domains d INNER JOIN  users r ON r.reg_no = "'.$param1.'" JOIN data ON data.domain = d.domain 
// WHERE   FIND_IN_SET("'.$param1.'", d.domain_admin) and data.status="verified_resolved"  order by data.insert_dt DESC')->result();
//        if ($result2) {
//         $result2=$result2;
//       }
//       else{
//         $result2='NoAvgData';
//       }
//   if($result){
//         return array("data"=>$result , "data1"=>$result1,"data2"=>$result2);
//     }else{
//         return array("data1"=>'NoData',"data2"=>'NoAvgData');
//     }
// }
public function GETDETAILS($param1='')
{


     $result = $this->db->query('select i.img_name,d.domain_admin,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, data.* from domains d INNER JOIN  raghuerp_dbnew.staff r ON r.reg_no = "'.$param1.'"
      JOIN data            ON data.domain = d.domain LEFT JOIN images i on  i.insert_id=data.did       WHERE   FIND_IN_SET("'.$param1.'", d.domain_admin) GROUP BY data.did ORDER BY data.did DESC')->result();

   
     $result1 = $this->db->query('SELECT data.status,COUNT(data.status) as tot,(SELECT COUNT(data.status) from domains d inner join raghuerp_dbnew.staff r ON r.reg_no = "'.$param1.'" join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param1.'", d.domain_admin)  ) as t from domains d inner join raghuerp_dbnew.staff r ON r.reg_no = "'.$param1.'" join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param1.'", d.domain_admin)   GROUP by status')->result();

    $result2 = $this->db->query('SELECT  floor(avg(datediff(date_of_resolution,insert_dt))) as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum   from domains d INNER JOIN  raghuerp_dbnew.staff r ON r.reg_no = "'.$param1.'" JOIN data ON data.domain = d.domain 
WHERE   FIND_IN_SET("'.$param1.'", d.domain_admin) and data.status="verified_resolved"  order by data.insert_dt DESC')->result();


    $result4 = $this->db->query('SELECT status,COUNT(status) as tot, (SELECT COUNT(status) from data where repaired_by ="'.$param1.'" )as t  from data where repaired_by="'.$param1.'"  GROUP by status')->result();
       if ($result2) {
        $result2=$result2;
      }
      else{
        $result2='NoAvgData';
      }
  if($result){
        return array("data"=>$result , "data1"=>$result1,"data2"=>$result2 ,"data4" => $result4);
    }else{
        return array("data1"=>'NoData',"data2"=>'NoAvgData');
    }
}

public function getDomainsbyId($param1=''){
     $result = $this->db->query('select d.domain_admin, d.domain from domains d WHERE   FIND_IN_SET("'.$param1.'", d.domain_admin) GROUP BY domain')->result();
     if($result){
        return $result;
    }else{
        return false;
    }
}

public function DELETEISSUE($params){
    $result = $this->db->query('UPDATE data set status="user_deleted"  where did="'.$params.'"');
    if($result){
        return $result;
    }else{
        return false;
    }
}
// public function UPDATEISSUE($params)
// {
//     $results = $this->db->query('update data set status= "'.$params['status'].'", priority =  "'.$params['priority'].'", repaired_on =  "'.$params['repaired_on'].'", repaired_by =  "'.$params['repaired_by'].'", date_of_resolution =  "'.$params['date_of_resolution'].'", notes =  "'.$params['notes'].'" where did =  "'.$params['did'].'"');
// $data=$results;
//    if($data){
//         return $data;
//     }else{
//         return false;
//     }

// }
 public function UPDATEISSUE($params) {    
        $type = $params['status'];
        $where = '';

        $result2 =$this->db->query("select * from data where did = '".$params['did']."' ")->row();
            $num = $result2->mobile;
            $reg_no1 = $result2->reg_no;
           $issue_desc = $result2->issue_desc;
           $repaired_by = $result2->repaired_by;
           $raised_by = $result2->raised_by;
           $location = $result2->location;
           $domain = $result2->domain;
           $issue_desc = $result2->issue_desc;

            // echo $reg_no1;


           $result4 =$this->db->query("select * from raghuerp_dbnew.staff where reg_no = '$reg_no1' limit 1 ")->row();
            $email1 = $result4->email;
            $to1 =$email1;
            // echo $num1;


         switch($type) {

            case 'assigned':
                $where = " status= '".$params['status']."', priority =  '".$params['priority']."', assigned_on =  '".$params['assigned_on']."', repaired_by =  '".$params['repaired_by']."',  repaired_name =  '".$params['repaired_name']."',assignedtext =  '".$params['assignedtext']."' ";
                break;
            case 'onhold':
                $where =" status = '".$params['status']."', priority =  '".$params['priority']."', onholdtext=  '".$params['onholdtext']."'";
                break;
            case 'cannot_be_resolved':
               $where =" status = '".$params['status']."', priority =  '".$params['priority']."', cannottext=  '".$params['cannottext']."',cannot_be_resolveddate='".$params['cannot_be_resolveddate']."'";
                break; 
           case 'verified_resolved':
               $where =" status = '".$params['status']."', priority =  '".$params['priority']."', date_of_resolution=  '".$params['date_of_resolution']."',notes ='".$params['notes']."'";
                break;              
                case 'resolution_in_progress':
               $where =" status = '".$params['status']."', priority =  '".$params['priority']."', expected_resolution_date  =  '".$params['expected_resolution_date']."',resolutiontext =  '".$params['resolutiontext']."'";

               $st = $this->db->query("select resolutionstarttime from data where did = '".$params['did']."' limit 1")->row();
           $res = $st->resolutionstarttime;
            if($res == '')
              {
                $d =$this->db->query("update data set resolutionstarttime = '".$params['resolutionstarttime']."' where did = '".$params['did']."'");

              }
                break;                    
        }

            
          $sql = "update data set $where where did = '".$params['did']."'";

         $result = $this->db->query($sql);
  
        if($result){
          if($type == 'verified_resolved' || $type == 'cannot_be_resolved' )
          {
            
             $to = $num;
                $message = 'Status of issue "' . trim(substr($issue_desc, 0, 76)). '" changed to "' . $params['status'] . '"';

           $sms['message'] = $message;
          $sms['to'] =$to;   
          $result3=$this->sendSMS($sms);
           $sms['to1'] =$to1;  
            $sms['cc'] ='';  
            $result3=$this->sendEmail($sms);
           return array("success" => true, "data1" => $result);
          }
          if($type == 'assigned')
          {
              $result1 = $this->db->query("select * from raghuerp_dbnew.staff where reg_no = '".$params['repaired_by']."' limit 1")->row();
            $num1 = $result1->mobile;
            $num2 = $result1->email;
                $to = $num1;
                // $message = 'Status of issue "' . trim(substr($issue_desc, 0, 76)). '" changed to "' . $params['status'] . '"';
                $message = '' . $domain . ' Issue at '. $location .' - ' . trim(substr($issue_desc, 0, 76)) .  ' - Raised by - ' . $raised_by . '('. $num .')';  

           $sms1['message'] = $message;
          $sms1['to'] =$to;   
          $result4=$this->sendSMS($sms1);
            $sms1['to1'] = $num2;  
            $sms1['cc'] ='';  
            $result3=$this->sendEmail($sms1);
           return array("success" => true, "data1" => $result);
          }

          if($type == 'resolution_in_progress'){

           $result =$this->db->query("select * from data where did = '".$params['did']."' limit 1")->row();
           $num = $result->mobile;
           $reg_no = $result->reg_no;
           $issue_desc = $result->issue_desc;
            $result5 =$this->db->query("select * from raghuerp_dbnew.staff where reg_no = '$reg_no' limit 1")->row();
             $to1 = $result5->email;              
             $to = $num;
                $message = 'Status of issue "' . trim(substr($issue_desc, 0, 76)). '" changed to "' . $params['status'] . '"';

           $sms['message'] = $message;
          $sms['to'] =$to;   
          $result1=$this->sendSMS($sms);
            $sms['to1'] = $to1;
          $sms['cc'] ='';   
          $result1=$this->sendEmail($sms);
           return array("success" => true, "data1" => $result);
          
      }
          else
          {
            return array("success" => true, "data1" => $result);
          }
         // return array("success" => true, "data1" => $result);
        }
        else
        {
           return array("success" => false);
        }
    }
   
public function modifyIssue($params){

     $results = $this->db->query('update data set domain= "'.$params['domain'].'", issue_desc =  "'.$params['issue_desc'].'", location =  "'.$params['location'].'", problem =  "'.$params['problem'].'"  where did =  "'.$params['did'].'"');
     if($results){
        return $results;
    }else{
        return false;
    }
}

public function getissue($params){
    //$result = $this->db->query('SELECT  * FROM data where reg_no="'.$params.'" ORDER BY did DESC')->result();
        // $result = $this->db->query('SELECT  i.id,i.img_name,datediff(d.insert_dt,d.date_of_resolution) as days, datediff(d.insert_dt,curdate()) as day, d.* FROM data d   LEFT JOIN images i on  i.insert_id=d.did and d.reg_no="'.$params.'" where  d.reg_no="'.$params.'" and d.status !="user_deleted" GROUP by did ORDER BY insert_dt desc')->result();
  $result = $this->db->query('SELECT  i.id,i.img_name,datediff(d.insert_dt,d.date_of_resolution) as days, datediff(d.insert_dt,curdate()) as day, d.* FROM data d   LEFT JOIN images i on  i.insert_id=d.did and d.reg_no="'.$params.'" where  d.reg_no="'.$params.'"  GROUP by did ORDER BY insert_dt desc')->result();
    if($result){
        return $result;
    }else{
        return false;
    }
}

public function getAllIssues(){
    $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM  data d  LEFT JOIN images i on  i.insert_id=d.did GROUP by d.did order by d.insert_dt DESC')->result();
    $result1 = $this->db->query('SELECT status,COUNT(status) as tot, (SELECT COUNT(status) from data )as t  from data   GROUP by status')->result();
    // $result2 = $this->db->query('')
    $result2 = $this->db->query('SELECT floor(avg(datediff(date_of_resolution,insert_dt)) )as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum from data WHERE status="verified_resolved" order by insert_dt DESC')->result();
       if ($result2) {
        $result2=$result2;
      }
      else{
        $result2='NoAvgData';
      } 

    if($result){
        return array("data" => $result, "data1" => $result1,"data2" => $result2);
          
    }else{
        return array("data1"=>'NoData',"data2"=>'NoAvgData');
    }
}

public function updateissues($params)
{
    $results = $this->db->query('update data set  domain =  "'.$params['domain'].'", issue_desc =  "'.$params['issue_desc'].'", location =  "'.$params['location'].'", problem =  "'.$params['problem'].'" where did =  "'.$params['did'].'"');
    $data=$results;
   if($data){
        return $data;
    }else{
        return false;
    }
}

public function getImagesbyId($params=''){
    $results = $this->db->query(' select * from images where insert_id="'.$params['img_id'].'"  and  reg_no="'.$params['reg_no'].'" ')->result();
$data=$results;
   if($data){
        return $data;
    }else{
        return false;
    }
}

public function getDatabyId_Domain($param1='')
{
        // if($param1['domain']!='all'){
            $result = $this->db->query('select i.img_name,d.domain_admin,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, data.* from domains d INNER JOIN  raghuerp_dbnew.staff r ON r.reg_no = "'.$param1['reg_no'].'"
JOIN data 
    ON data.domain = d.domain LEFT JOIN images i on  i.insert_id=data.did
WHERE  d.domain = "'.$param1['domain'].'" and FIND_IN_SET("'.$param1['reg_no'].'", d.domain_admin) GROUP BY data.did ORDER BY data.did DESC')->result();
     $result1 = $this->db->query('SELECT status,COUNT(status) as tot,(SELECT COUNT(status) from data WHERE domain="'.$param1['domain'].'" )as t from data WHERE domain="'.$param1['domain'].'"    GROUP by status')->result();




//   if($result){
//         return array("data"=>$result , "data1"=>$result1);
//     }else{
//          return array("data1"=>'NoData');
//     }


// }
     $result2 = $this->db->query('SELECT  floor(avg(datediff(date_of_resolution,insert_dt))) as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum   from domains d INNER JOIN  raghuerp_dbnew.staff r ON r.reg_no = "'.$param1['reg_no'].'" JOIN data ON data.domain = d.domain 
WHERE   FIND_IN_SET("'.$param1['reg_no'].'", d.domain_admin) and data.status="verified_resolved" and data.domain="'.$param1['domain'].'"  order by data.insert_dt DESC')->result();
       if ($result2) {
        $result2=$result2;
      }
      else{
        $result2='NoAvgData';
      }
  if($result){
        return array("data"=>$result , "data1"=>$result1,"data2"=>$result2);
    }else{
        return array("data1"=>'NoData',"data2"=>'NoAvgData');
    }
}


public function GETISSUELISTS($param){

if($param['status']!='all' && $param['category']=='all'){
    $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.domain_admin, data.* from domains d INNER JOIN raghuerp_dbnew.staff r ON r.reg_no = "'.$param['reg_no'].'" JOIN data ON data.domain = d.domain LEFT JOIN images i on  i.insert_id=data.did
              WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin)  and  data.status ="'.$param['status'].'" and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by data.did order by data.insert_dt DESC')->result();
    $result1 = $this->db->query('SELECT data.domain as status,COUNT(data.status) as tot,(SELECT COUNT(data.status) from domains d inner join raghuerp_dbnew.staff r ON r.reg_no ="'.$param['reg_no'].'"  join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and data.status="'.$param['status'].'"  and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) ) as t from domains d inner join raghuerp_dbnew.staff r ON r.reg_no = "'.$param['reg_no'].'" join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and data.status="'.$param['status'].'" and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by data.domain order by data.insert_dt DESC')->result();
    
    
      $result2 = $this->db->query('SELECT  floor(avg(datediff(date_of_resolution,insert_dt))) as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum   from domains d INNER JOIN  raghuerp_dbnew.staff r ON r.reg_no = "'.$param['reg_no'].'" JOIN data ON data.domain = d.domain 
WHERE   FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and data.status="verified_resolved"    and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY)     order by data.insert_dt DESC')->result();
      if ($result2) {
        $result2=$result2;
      }
      else{
        $result2='NoAvgData';
      } 
}
else if ($param['status']=='all' && $param['category']=='all') {
 // echo '2ND CONDTION';
  $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.domain_admin, data.* from domains d INNER JOIN  raghuerp_dbnew.staff r ON r.reg_no = "'.$param['reg_no'].'" JOIN data ON data.domain = d.domain LEFT JOIN images i on  i.insert_id=data.did
              WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin)   and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by data.did order by data.insert_dt DESC')->result();
    $result1 = $this->db->query('SELECT data.status,COUNT(data.status) as tot,(SELECT COUNT(data.status) from domains d inner join raghuerp_dbnew.staff r ON r.reg_no ="'.$param['reg_no'].'"  join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin)    and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) ) as t from domains d inner join raghuerp_dbnew.staff r ON r.reg_no = "'.$param['reg_no'].'" join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and   data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by data.status order by data.insert_dt DESC')->result();
    // $result2='NoAvgData';
    $result2 = $this->db->query('SELECT  floor(avg(datediff(date_of_resolution,insert_dt))) as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum   from domains d INNER JOIN  raghuerp_dbnew.staff r ON r.reg_no = "'.$param['reg_no'].'" JOIN data ON data.domain = d.domain 
WHERE   FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and data.status="verified_resolved"    and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY)     order by data.insert_dt DESC')->result();
      if ($result2) {
        $result2=$result2;
      }
      else{
        $result2='NoAvgData';
      } 
}
else if ($param['status']!='all' && $param['category']!='all') {
 $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.domain_admin, data.* from domains d INNER JOIN  raghuerp_dbnew.staff r ON r.reg_no = "'.$param['reg_no'].'" JOIN data ON data.domain = d.domain LEFT JOIN images i on  i.insert_id=data.did
              WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin)   and  data.domain ="'.$param['category'].'" and  data.status ="'.$param['status'].'" and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by data.did order by data.insert_dt DESC')->result();
    $result1 = $this->db->query('SELECT data.status,COUNT(data.status) as tot,(SELECT COUNT(data.status) from domains d inner join raghuerp_dbnew.staff r ON r.reg_no ="'.$param['reg_no'].'"  join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin)  and  data.domain ="'.$param['category'].'" and data.status="'.$param['status'].'"  and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) ) as t from domains d inner join raghuerp_dbnew.staff r ON r.reg_no = "'.$param['reg_no'].'" join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and data.domain="'.$param['category'].'" and data.status="'.$param['status'].'" and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by data.status order by data.insert_dt DESC')->result();
        
    // if($param['status']=='verified_resolved'){
      $result2 = $this->db->query('SELECT  floor(avg(datediff(date_of_resolution,insert_dt))) as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum   from domains d INNER JOIN  raghuerp_dbnew.staff r ON r.reg_no = "'.$param['reg_no'].'" JOIN data ON data.domain = d.domain 
WHERE   FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and data.status="verified_resolved" and data.domain="'.$param['category'].'"   and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY)     order by data.insert_dt DESC')->result();
      if ($result2) {
        $result2=$result2;
      }
      else{
        $result2='NoAvgData';
      } 
      
}
else{
  $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.domain_admin, data.* from domains d INNER JOIN  raghuerp_dbnew.staff r ON r.reg_no = "'.$param['reg_no'].'" JOIN data ON data.domain = d.domain LEFT JOIN images i on  i.insert_id=data.did
              WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and  data.domain ="'.$param['category'].'"  and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by data.did order by data.insert_dt DESC')->result();
    $result1 = $this->db->query('SELECT data.status,COUNT(data.status) as tot,(SELECT COUNT(data.status) from domains d inner join raghuerp_dbnew.staff r ON r.reg_no ="'.$param['reg_no'].'"  join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and  data.domain ="'.$param['category'].'" and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) ) as t from domains d inner join raghuerp_dbnew.staff r ON r.reg_no = "'.$param['reg_no'].'" join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and  data.domain ="'.$param['category'].'" and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by data.status order by data.insert_dt DESC')->result();
    $result2 = $this->db->query('SELECT  floor(avg(datediff(date_of_resolution,insert_dt))) as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum   from domains d INNER JOIN  raghuerp_dbnew.staff r ON r.reg_no = "'.$param['reg_no'].'" JOIN data ON data.domain = d.domain 
WHERE   FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and data.status="verified_resolved" and data.domain="'.$param['category'].'"   and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY)     order by data.insert_dt DESC')->result();
      if ($result2) {
        $result2=$result2;
      }
      else{
        $result2='NoAvgData';
      } 
   // $result2='NoAvgData';
}



  if($result){
        return array("data"=>$result , "data1"=>$result1, "data2"=>$result2);
    }
    else{
      return array("data1"=>'NoData',"data2"=>'NoAvgData');
    }
}
public function getIssuesListbyStatus($param){
  if($param['status']=='all' && $param['category']=='all'){

      $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM data d LEFT JOIN images i on  i.insert_id=d.did  GROUP by d.did order by d.insert_dt DESC')->result();
      $result1 = $this->db->query('SELECT status,COUNT(status) as tot,   (SELECT COUNT(status) from data )as t from data GROUP by status')->result();
      $result2 = $this->db->query('SELECT floor(avg(datediff(date_of_resolution,insert_dt)) )as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum from data WHERE status="verified_resolved" order by insert_dt DESC')->result();
       if ($result2) {
        $result2=$result2;
      }
      else{
        $result2='NoAvgData';
      }

  }
else if($param['status']!='all' && $param['category']=='all'){

      $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM data d LEFT JOIN images i on  i.insert_id=d.did WHERE d.status="'.$param['status'].'" GROUP by d.did order by d.insert_dt DESC')->result();
      // $result1 = $this->db->query('SELECT status,COUNT(status) as tot,   (SELECT COUNT(status) from data WHERE status="'.$param['status'].'" ) as t from data WHERE status="'.$param['status'].'"   GROUP by status')->result();
       $result1 = $this->db->query('SELECT domain as status,count(domain) as tot, (SELECT COUNT(status) from data WHERE status="'.$param['status'].'" ) as t from data WHERE status="'.$param['status'].'" GROUP by domain order by domain ASC')->result();
      $result2 = $this->db->query('SELECT floor(avg(datediff(date_of_resolution,insert_dt)) )as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum from data WHERE status="verified_resolved" order by insert_dt DESC')->result();
       if ($result2) {
        $result2=$result2;
      }
      else{
        $result2='NoAvgData';
      }

  }
  else if($param['status']=='all' && $param['category']!='all'){

      $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM data d LEFT JOIN images i on  i.insert_id=d.did WHERE d.domain="'.$param['category'].'"  GROUP by d.did order by d.insert_dt DESC')->result();
      $result1 = $this->db->query('SELECT status,COUNT(status) as tot,   (SELECT COUNT(status) from data WHERE domain="'.$param['category'].'" )as t from data WHERE domain="'.$param['category'].'"   GROUP by status')->result();
      $result2 = $this->db->query('SELECT floor(avg(datediff(date_of_resolution,insert_dt)) )as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum from data WHERE status="verified_resolved" and domain="'.$param['category'].'" order by insert_dt DESC')->result();
       if ($result2) {
        $result2=$result2;
      }
      else{
        $result2='NoAvgData';
      }
  }else{
      $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM data d LEFT JOIN images i on  i.insert_id=d.did WHERE d.domain="'.$param['category'].'" and d.status="'.$param['status'].'" GROUP by d.did order by d.insert_dt DESC')->result();
      $result1 = $this->db->query('SELECT status,COUNT(status) as tot, (SELECT COUNT(status) from data WHERE domain="'.$param['category'].'" and status="'.$param['status'].'" )as t from data WHERE domain="'.$param['category'].'" and status="'.$param['status'].'" GROUP by status')->result();
      $result2 = $this->db->query('SELECT floor(avg(datediff(date_of_resolution,insert_dt)) )as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum from data WHERE status="verified_resolved" and domain="'.$param['category'].'" order by insert_dt DESC')->result();
       if ($result2) {
        $result2=$result2;
      }
      else{
        $result2='NoAvgData';
      }
  }
  if($result){
        return array("data"=>$result , "data1"=>$result1,"data2"=>$result2);
    }else{
        return array("data1"=>'NoData',"data2"=>'NoAvgData');
    }
}



// public function getIssuesListbyStatus($param){
//   if($param['status']=='all'){  

//     $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM  data d  LEFT JOIN images i on  i.insert_id=d.did GROUP by d.did order by d.insert_dt DESC')->result();
//     $result1 = $this->db->query('SELECT status,COUNT(status) as tot, (SELECT COUNT(status) from data )as t  from data   GROUP by status')->result();

// }
// else{
  
//     $result=$this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM data d LEFT JOIN images i on  i.insert_id=d.did where d.status="'.$param['status'].'"  GROUP by d.did ORDER BY d.insert_dt DESC')->result();
//     $result1 = $this->db->query('SELECT status,COUNT(status) as tot,(SELECT COUNT(status) from data where status="'.$param['status'].'" )as t from data  where status ="'.$param['status'].'" GROUP by status')->result();
// }
 
  
//     if($result){
//         return array("data"=>$result , "data1"=>$result1);
//     }else{
//          return array("data1"=>'NoData');
//     }
// }
 public function getDatabyId_Status($param){
  
     if($param['status']!='all' && $param['category']=='all'){
    $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.domain_admin, data.* from domains d INNER JOIN raghuerp_dbnew.staff r ON r.reg_no = "'.$param['reg_no'].'" JOIN data ON data.domain = d.domain LEFT JOIN images i on  i.insert_id=data.did
              WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin)  and  data.status ="'.$param['status'].'"  GROUP by data.did order by data.insert_dt DESC')->result();
    $result1 = $this->db->query('SELECT data.domain as status,COUNT(data.status) as tot,(SELECT COUNT(data.status) from domains d inner join raghuerp_dbnew.staff r ON r.reg_no = "'.$param['reg_no'].'"  join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and data.status="'.$param['status'].'"  ) as t from domains d inner join raghuerp_dbnew.staff r ON r.reg_no = "'.$param['reg_no'].'" join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and data.status="'.$param['status'].'"  GROUP by data.domain order by data.insert_dt DESC')->result();
    
    // if($param['status']=='verified_resolved'){
      $result2 = $this->db->query('SELECT  floor(avg(datediff(date_of_resolution,insert_dt))) as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum   from domains d INNER JOIN  raghuerp_dbnew.staff r ON r.reg_no = "'.$param['reg_no'].'" JOIN data ON data.domain = d.domain 
      WHERE   FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and data.status="verified_resolved" order by data.insert_dt DESC')->result();
      if ($result2) {
        $result2=$result2;
      }
      else{
        $result2='NoAvgData';
      } 
}
else if ($param['status']=='all' && $param['category']=='all') {
 // echo '2ND CONDTION';
  $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.domain_admin, data.* from domains d INNER JOIN  raghuerp_dbnew.staff r ON r.reg_no = "'.$param['reg_no'].'" JOIN data ON data.domain = d.domain LEFT JOIN images i on  i.insert_id=data.did
              WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin)  GROUP by data.did order by data.insert_dt DESC')->result();
    $result1 = $this->db->query('SELECT data.status,COUNT(data.status) as tot,(SELECT COUNT(data.status) from domains d inner join raghuerp_dbnew.staff r ON r.reg_no ="'.$param['reg_no'].'"  join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) ) as t from domains d inner join raghuerp_dbnew.staff r ON r.reg_no = "'.$param['reg_no'].'" join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin)  GROUP by data.status order by data.insert_dt DESC')->result();
    $result2 = $this->db->query('SELECT  floor(avg(datediff(date_of_resolution,insert_dt))) as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum   from domains d INNER JOIN  raghuerp_dbnew.staff r ON r.reg_no = "'.$param['reg_no'].'" JOIN data ON data.domain = d.domain 
WHERE   FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and data.status="verified_resolved" order by data.insert_dt DESC')->result();
    if ($result2) {
        $result2=$result2;
      }
      else{
        $result2='NoAvgData';
      } 
    // $result2='NoAvgData';

}
else if ($param['status']!='all' && $param['category']!='all') {
 $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.domain_admin, data.* from domains d INNER JOIN  raghuerp_dbnew.staff r ON r.reg_no = "'.$param['reg_no'].'" JOIN data ON data.domain = d.domain LEFT JOIN images i on  i.insert_id=data.did
              WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin)   and  data.domain ="'.$param['category'].'" and  data.status ="'.$param['status'].'" GROUP by data.did order by data.insert_dt DESC')->result();
    $result1 = $this->db->query('SELECT data.status,COUNT(data.status) as tot,(SELECT COUNT(data.status) from domains d inner join raghuerp_dbnew.staff r ON r.reg_no ="'.$param['reg_no'].'"  join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin)  and  data.domain ="'.$param['category'].'" and data.status="'.$param['status'].'"   ) as t from domains d inner join raghuerp_dbnew.staff r ON r.reg_no = "'.$param['reg_no'].'" join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and data.domain="'.$param['category'].'" and data.status="'.$param['status'].'"  GROUP by data.status order by data.insert_dt DESC')->result();
        
    
      $result2 = $this->db->query('SELECT  floor(avg(datediff(date_of_resolution,insert_dt))) as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum   from domains d INNER JOIN  raghuerp_dbnew.staff r ON r.reg_no = "'.$param['reg_no'].'" JOIN data ON data.domain = d.domain 
WHERE   FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and data.status="verified_resolved" and data.domain="'.$param['category'].'"  order by data.insert_dt DESC')->result();
       if ($result2) {
        $result2=$result2;
      }
      else{
        $result2='NoAvgData';
      } 
      
}
else{
  $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.domain_admin, data.* from domains d INNER JOIN  raghuerp_dbnew.staff r ON r.reg_no = "'.$param['reg_no'].'" JOIN data ON data.domain = d.domain LEFT JOIN images i on  i.insert_id=data.did
              WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and  data.domain ="'.$param['category'].'"  GROUP by data.did order by data.insert_dt DESC')->result();
    $result1 = $this->db->query('SELECT data.status,COUNT(data.status) as tot,(SELECT COUNT(data.status) from domains d inner join raghuerp_dbnew.staff r ON r.reg_no ="'.$param['reg_no'].'"  join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and data.domain= "'.$param['category'].'") as t from domains d inner join raghuerp_dbnew.staff r ON r.reg_no = "'.$param['reg_no'].'" join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and  data.domain ="'.$param['category'].'"  GROUP by data.status order by data.insert_dt DESC')->result();
   // $result2='NoAvgData';
     $result2 = $this->db->query('SELECT  floor(avg(datediff(date_of_resolution,insert_dt))) as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum   from domains d INNER JOIN  raghuerp_dbnew.staff r ON r.reg_no = "'.$param['reg_no'].'" JOIN data ON data.domain = d.domain 
WHERE   FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and data.status="verified_resolved" and data.domain="'.$param['category'].'"  order by data.insert_dt DESC')->result();
       if ($result2) {
        $result2=$result2;
      }
      else{
        $result2='NoAvgData';
      } 
}



  if($result){
        return array("data"=>$result , "data1"=>$result1, "data2"=>$result2);
    }
    else{
      return array("data1"=>'NoData',"data2"=>'NoAvgData');
    }
}


public function addDomain($params,$param1){
     $id = $this->db->insert('domains',$params);
       
    if($id){

        for($i=0; $i<sizeof($param1); $i++) {
            $data['reg_no']=$param1[$i];
            $data['role']='stf';
            $data['status']='1';
            $data['domain']=$params['domain'];

            $result = $this->db->insert('roles',$data);   
        }
       
           return $id;
    }else{
        return false;
    }
}

// public function updateDomain($params,$param1){
      
//     $this->db->where('domain',$params['domain']);
//     $result = $this->db->update('domains',$params);
//     if($result){
//         $delete = $this->db->query('delete from roles where domain="'.$params['domain'].'" ');
//         if($delete){
//           for($i=0; $i<sizeof($param1); $i++) {
//             $data['reg_no']=$param1[$i];
//             $data['role']='stf';
//             $data['status']='1';
//             $data['domain']=$params['domain'];
//             $result = $this->db->insert('roles',$data);   
//         }
//         }
        
//       return $result;
//     }
//     else{
//       return false;
//     }
// }

public function updateDomain($params,$param1){
      
    $this->db->where('domain',$params['domain']);
    $result = $this->db->update('domains',$params);
    
    if($result){
        $delete = $this->db->query('delete from roles where domain="'.$params['domain'].'" ');
        if($delete){
          for($i=0; $i<sizeof($param1); $i++) {
            $data['reg_no']=$param1[$i];
            $data['role']='stf';
            $data['status']='1';
            $data['domain']=$params['domain'];
            $result = $this->db->insert('roles',$data);   
        }
        }
        
      return $result;
    }
    else{
      return false;
    }
}


public function updateIncharge($params,$param1){
      
      if($params['domain'] == 'all'){
        $reg_no = $params['domain_admin'];
        $update = $this->db->query('update domains set domain_admin = concat(domain_admin,",", "'.$reg_no.'")');
      //  update domains set domain_admin = concat(domain_admin,',', 'rec0072,rec0130')
       // update domains set domain_admin = concat(domain_admin, ',', 'rec0032,rec0067,rec0072')
        if($update){
            for($i=0; $i<sizeof($param1); $i++) {
              $data['reg_no']=$param1[$i];
              $data['role']='stf';
              $data['status']='1';
              $data['domain']='';
              $result = $this->db->insert('roles',$data);   
          }
          }
        }
       else{

        $this->db->where('domain',$params['domain']);
        $result = $this->db->update('domains',$params);
        if($result){
        $delete = $this->db->query('delete from roles where domain="'.$params['domain'].'" ');
          if($delete){
            for($i=0; $i<sizeof($param1); $i++) {
              $data['reg_no']=$param1[$i];
              $data['role']='stf';
              $data['status']='1';
              $data['domain']=$params['domain'];
              $result = $this->db->insert('roles',$data);   
          }
          }
            return $result;
        }
        else{
              return false;
        }   //     $data['reg_no']=$param1[$i];
      }   
}

  public function INSERTISSUE($params){
    $this->db->insert('data',$params);
    $did= $this->db->insert_id();
    if($did)
    {
      $result =$this->db->query("select * from data where did = '$did' limit 1")->row();
      $domain=$result->domain;
      $issue_desc = $result->issue_desc;
      $raised_by = $result->raised_by;
      $number = $result->mobile;
      $status = $result->status;
      $location = $result->location;
      $result4 = $this->db->query("select * from raghuerp_dbnew.staff where reg_no = '".$params['reg_no']."' limit 1" )->row();
       $to2=$result4->email;
      // $adminMobileSql = "select domain_admin from domains where domain = '$domain' limit 1"; 
      //       $queryadmin = $this->db->query($adminMobileSql);
       $resultadmin = $this->db->query("select domain_admin from domains where domain = '$domain' limit 1")->row()->domain_admin;

       $mobi = explode(",",$resultadmin);
      
            // $resultadmin = $queryadmin->result();

       for($i=0;$i<sizeof($mobi);$i++)
     {
       $sq = $this->db->query("select * from raghuerp_dbnew.staff where reg_no = '".$mobi[$i]."'")->row();
           // $admin_mobile = $resultadmin;

        $admin_mobile = $sq->mobile;
        $admin_email = $sq->email;
                $to1 = $admin_email; 
                $to = $admin_mobile;
                switch($domain) {
                    case 'electrical': $domain = 'Electrical'; break;
                    case 'civil': $domain = 'Civil'; break;
                    case 'water_supply': $domain = 'Water Supply'; break;
                    case 'sanitation': $domain = 'Sanitation'; break;
                    case 'carpentary': $domain = 'Carpentary'; break;
                    case 'ac': $domain = 'AC'; break;
                    case 'transportation': $domain = 'Transportation'; break;
                    case 'infrastructure': $domain = 'Infrastructure'; break;
                    case 'house_keeping': $domain = 'House Keeping'; break;
                    case 'misc': $domain = 'Misc'; break; 
                }

                // $message = 'New Issue raised in "' . $domain . '" category - ' . trim(substr($issue_desc, 0, 76)) . '   raised by - "' . $raised_by . '"'; 
                 $message = '' . $domain . ' Issue at '. $location .' - ' . trim(substr($issue_desc, 0, 76)) .  ' - Raised by - ' . $raised_by . '('. $number .')';  
                $message1 = 'Your Request has been raised  in  domain - "' . $domain . '"';
                $sms['message'] = $message;
                $sms['to'] =$to;   
                $result1=$this->sendSMS($sms);
                $sms['to1'] = $to1;
                $sms['cc'] ='';
                $result2 = $this->sendEmail($sms);

                 } 
                 $sms1['message']= $message1;
                 $sms1['to'] = $number;
                 $result1= $this->sendSMS($sms1);
                 $sms1['cc'] ='';
                 $sms1['to1'] = $to2;
                $result2 = $this->sendEmail($sms1);
                 return $did;
    }
    else
    {
      return 'error';
    }
    
  }

  //  public function INSERTISSUE($params){
  //   $this->db->insert('data',$params);
  //   $did= $this->db->insert_id();
  //   if($did)
  //   {
  //     $result =$this->db->query("select * from data where did = '$did' limit 1")->row();
  //     $domain=$result->domain;
  //     $issue_desc = $result->issue_desc;
  //     $raised_by = $result->raised_by;
  //     $number = $result->mobile;
  //     $status = $result->status;
  //     $location = $result->location;

  //     // $adminMobileSql = "select domain_admin from domains where domain = '$domain' limit 1"; 
  //     //       $queryadmin = $this->db->query($adminMobileSql);
  //      $resultadmin = $this->db->query("select domain_admin from domains where domain = '$domain' limit 1")->row()->domain_admin;

  //       $mobi = explode(",",$resultadmin);
      
  //           // $resultadmin = $queryadmin->result();

  //      for($i=0;$i<sizeof($mobi);$i++)
  //      {
       
  //          // $admin_mobile = $resultadmin;

  //       $admin_mobile = $mobi[$i];

    
  //               $to = $admin_mobile;
  //               switch($domain) {
  //                   case 'electrical': $domain = 'Electrical'; break;
  //                   case 'civil': $domain = 'Civil'; break;
  //                   case 'water_supply': $domain = 'Water Supply'; break;
  //                   case 'sanitation': $domain = 'Sanitation'; break;
  //                   case 'carpentary': $domain = 'Carpentary'; break;
  //                   case 'ac': $domain = 'AC'; break;
  //                   case 'transportation': $domain = 'Transportation'; break;
  //                   case 'infrastructure': $domain = 'Infrastructure'; break;
  //                   case 'house_keeping': $domain = 'House Keeping'; break;
  //                   case 'misc': $domain = 'Misc'; break; 
  //               }

  //               // $message = 'New Issue raised in "' . $domain . '" category - ' . trim(substr($issue_desc, 0, 76)) . '   raised by - "' . $raised_by . '"'; 
  //                $message = '' . $domain . ' Issue at '. $location .' - ' . trim(substr($issue_desc, 0, 76)) .  ' - Raised by - ' . $raised_by . '('. $number .')';  
  //               $message1 = 'Your Request has been raised  in  domain - "' . $domain . '"';

  //               $sms['message'] = $message;
  //               $sms['to'] =$to;   
  //               $result1=$this->sendSMS($sms);
  //           } 

  //                $sms1['message']= $message1;
  //                $sms1['to'] = $number;
  //                $result1= $this->sendSMS($sms1);


  //               // return $result1;
  //                return $did;
  //   }
  //   else
  //   {
  //     return 'error';
  //   }
    
  // }
     public function sendSMS($params)
       {
        $to = $params['to'];
        $message = $params['message'];
        $apptype='issue-register';
        $sql = "insert into raghuerp_dbnew.messages(mtype, mto,mailtype,cc,bcc,subject, message,application_type) values('sms', '$to','smstype','cc','bcc','subject', '$message','$apptype')";
        if ($this->db->query($sql))
        {
            return (array("success" => true));
        }
    }
    //send sms via issue register project
  //   function sendSMS($params)
  // {
  //   $to = $params['to'];
  //  $msg = $params['message'];
  //   $URL = "http://login.smsmoon.com/API/sms.php";
  //   $post_fields = array(
  //       'username' => 'raghuedu',
  //       'password' => 'abcd.1234',
  //       'from' => 'RAGHUT',
  //       'to' => $to,
  //       'msg' => $msg,
  //       'type' => '1',
  //       'dnd_check' => '0'
  //   );

  //   $ch = curl_init();

  //   curl_setopt($ch, CURLOPT_URL, $URL);
  //   curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
  //   curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  //   curl_exec($ch);
  //   }

    public function sendEmail($params)
    {
        $to = $params['to1'];
        $cc = $params['cc'];
        $subject ='Issue Register'; 
        $type = 'html';// Leave Status or ..
        $message = $params['message'];  // html or ..
       $apptype='Issue Register'; // eg LeaveSystem or ..
        $sql = "insert into raghuerp_dbnew.messages(mtype, mailtype, mto, cc, subject, message,application_type) values('mail', '$type', '$to', '$cc', '$subject', '$message','$apptype')";
        if ($this->db->query($sql)) {
            return (array("success" => true));
        }
    }
    



   public function  GETISSUESINPROGRESS($reg_no){
       $sql = "SELECT i.img_name,datediff(d.assigned_on,d.repaired_on) as days, datediff(d.assigned_on,curdate()) as day,datediff(d.insert_dt,d.date_of_resolution) as da, d.* FROM data d LEFT JOIN images i on  i.insert_id=d.did   where repaired_by ='$reg_no' ORDER BY d.did DESC";
        $query = $this->db->query($sql);
        $result = $query->result();
        return array("success" => true, "data" => $result);
    } 



    public function RESOLUTIONINPROGRESS($param)
    {
      $st = $this->db->query("select resolutionstarttime from data where did = '".$param['did']."' limit 1")->row();
      $res = $st->resolutionstarttime;
      if($res == '')
      {
        $d =$this->db->query("update data set resolutionstarttime = '".$param['resolutionstarttime']."' where did = '".$param['did']."'");

      }

      $type = $param['status'];


      if($type == 'resolution_in_progress'){

          $results = $this->db->query("update data set status= '".$param['status']."', expected_resolution_date =  '".$param['expected_resolution_date']."', resolutiontext =  '".$param['resolutiontext']."' where did =  '".$param['did']."'"); 
        $data=$results;
         if($data){
           $result =$this->db->query("select * from data where did = '".$param['did']."' limit 1")->row();
           $num = $result->mobile;
           $reg_no = $result->reg_no;
           $issue_desc = $result->issue_desc;
            $result5 =$this->db->query("select * from raghuerp_dbnew.staff where reg_no = '$reg_no' limit 1")->row();
             $to1 = $result5->email;              
             $to = $num;
                $message = 'Status of issue "' . trim(substr($issue_desc, 0, 76)). '" changed to "' . $param['status'] . '"';

           $sms['message'] = $message;
          $sms['to'] =$to;   
          $result1=$this->sendSMS($sms);
            $sms['to1'] = $to1;
          $sms['cc'] ='';   
          $result1=$this->sendEmail($sms);
              return $data;
          }else{
              return false;
          }
      }
       if($type == 'onhold'){
          $results = $this->db->query("update data set status= '".$param['status']."', onholddate =  '".$param['onholddate']."', onholdtext =  '".$param['onholdtext']."' where did =  '".$param['did']."'");

      $data=$results;
         if($data){
              return $data;
          }else{
              return false;
          }
        
      }
       if($type == 'cannot_be_resolved'){
          $results = $this->db->query("update data set status= '".$param['status']."', cannot_be_resolveddate =  '".$param['cannot_be_resolveddate']."', cannottext =  '".$param['cannottext']."' where did =  '".$param['did']."'");

      $data=$results;
         if($data){
           $result =$this->db->query("select * from data where did = '".$param['did']."' limit 1")->row();
           $num = $result->mobile;
           $reg_no = $result->reg_no;
           $issue_desc = $result->issue_desc;
           $result5 =$this->db->query("select * from raghuerp_dbnew.staff where reg_no = '$reg_no' limit 1")->row();
             $to1 = $result5->email;       
             $to = $num;
                $message = 'Status of issue "' . trim(substr($issue_desc, 0, 76)). '" changed to "' . $param['status'] . '"';

           $sms['message'] = $message;
          $sms['to'] =$to;   
          $result1=$this->sendSMS($sms);
           $sms['to1'] = $to1;
          $sms['cc'] ='';   
          $result1=$this->sendEmail($sms);

              return $data;
          }else{
              return false;
          }
      }
      if($type == 'closed'){
          $results = $this->db->query("update data set status= '".$param['status']."', repaired_on =  '".$param['repaired_on']."', repairedtext =  '".$param['repairedtext']."' where did =  '".$param['did']."'");

      $data=$results;
         if($data){
              return $data;
          }else{
              return false;
          }
      }


    }

    public function RESOLUTIONCLOSED($params)
    {
          $results = $this->db->query("update data set status= 'closed' , repaired_on =  '".$params['repaired_on']."', repairedtext =  '".$params['repairedtext']."' where did =  '".$params['did']."'");
        $data=$results;
         if($data){
              return $data;
          }else{
              return false;
          }

    }

    ////////////queries for ionic app

   public function getIssueapp($params) {
        $sql = 'select * from data where did = "'.$params['did'].'" limit 1';
    // $sql = "select * from data where did = '$did' limit 1";

        $query = $this->db->query($sql);
        $result = $query->result();
        return array("success" => true, "data" => $result);
    } 


    public function insertData($data) {
        $did = $data['did'];
        $domain = $data['domain'];
        $issue_desc = $data['issue_desc'];
        $location = $data['location'];
        $problem = $data['problem'];
        $raised_by = $data['raised_by'];
        $reg_no = $data['reg_no'];
        $mobile = $data['mobile'];
        $status = $data['status'];
        $priority = $data['priority'];
        $repaired_on = $data['repaired_on'];
        $repaired_by = $data['repaired_by'];
        $date_of_resolution = $data['date_of_resolution'];
        $notes = $data['notes'];
        $role = $data['role'];
        $image = $data['image'];
        $role1 = $data['role1'];
        $deletedImages = $data['deletedImages'];

        $previous_status = '';
        $previous_status_mobile = '';
        $admin_mobile = '';

        if ($did > 0) {
            $admin_fields = '';
            if ($role1 == 'stf') {
                $admin_fields = " ,priority = '$priority', repaired_on = '$repaired_on', repaired_by = '$repaired_by', date_of_resolution = '$date_of_resolution', notes = '$notes', status = '$status' ";
            }
            $sql = "update data set domain = '$domain', issue_desc = '$issue_desc', location = '$location', problem = '$problem', image = '$image' $admin_fields where did = $did";

            // get previous status to check if status has changed
            $prevStatusSql = "select mobile, status from data where did = $did limit 1"; 
            $queryprev = $this->db->query($prevStatusSql);
            $resultprev = $queryprev->result();
            $previous_status = $resultprev[0]->status;
            $previous_status_mobile = $resultprev[0]->mobile;

            //remove images
            // if ($did > 0 && $deletedImages.length > 0) { 
            //     $toDelete = explode(',', $deletedImages);
            //     for($i=0; $i<sizeof($toDelete); $i++) {
            //         unlink("./uploads/" . $toDelete[$i]);
            //     }
            // }
        } else {
            $sql = "insert into data(domain, issue_desc, location, problem, raised_by,reg_no, mobile, image) values('$domain', '$issue_desc', '$location', '$problem', '$raised_by','$reg_no', '$mobile', '$image');";

            // get admin mobile
            // $adminMobileSql = "select mobile from domains where domain = '$domain' limit 1"; 
            $adminMobileSql = "select domain_admin from domains where domain = '$domain' limit 1"; 
            $queryadmin = $this->db->query($adminMobileSql);
            $resultadmin = $queryadmin->result();
            $admin_mobile = $resultadmin[0]->domain_admin;
        }

        // replace 'null' with null
        $sql = str_replace("''", "null", $sql);        
        $sql = str_replace("'null'", "null", $sql);
        $sql = str_replace("'0000-00-00'", "null", $sql);
        $sql = str_replace("'0000-00-00 00:00'", "null", $sql);
        
        if ($this->db->query($sql)) {
            
            // send sms on status change
            if ($did > 0 && $previous_status != $status && $previous_status_mobile != '') {

                switch($status) {
                    case 'pending': $status = 'Pending'; break;
                    case 'assigned': $status = 'Assigned'; break;
                    case 'resolution_in_progress': $status = 'Resolution in Progress'; break;
                    case 'on_hold': $status = 'On Hold'; break;
                    case 'verified_resolved': $status = 'Verified & Resolved'; break;
                    case 'cannot_be_resolved': $status = 'Cannot be Resolved'; break;
                }

                $to = $previous_status_mobile;
                $message = 'Status of issue "' . trim(substr($issue_desc, 0, 76)). '" changed to "' . $status . '"';
                  $sms2['message'] = $message;
                $sms2['to'] =$to;   
                $this->sendSMS($sms2);
            }

            // send sms to admin on new issue
            if (!$did ) {
                $to = $admin_mobile;

                switch($domain) {
                    case 'electrical': $domain = 'Electrical'; break;
                    case 'civil': $domain = 'Civil'; break;
                    case 'water_supply': $domain = 'Water Supply'; break;
                    case 'sanitation': $domain = 'Sanitation'; break;
                    case 'carpentary': $domain = 'Carpentary'; break;
                    case 'ac': $domain = 'AC'; break;
                    case 'transportation': $domain = 'Transportation'; break;
                    case 'infrastructure': $domain = 'Infrastructure'; break;
                    case 'house_keeping': $domain = 'House Keeping'; break;
                    case 'misc': $domain = 'Misc'; break; 
                }

                $message = 'New Issue raised in "' . $domain . '" category - ' . trim(substr($issue_desc, 0, 76));              
                  $sms4['message'] = $message;
                $sms4['to'] =$to;   
                $this->sendSMS($sms4);
            }            

            return array("success"=>true, "error"=>$did . '-' . $admin_mobile);
        } else {
            $error = 'Failed creating issue';
            if ($did > 0) $error = 'Failed updating issue';
            return array("success"=>false, "error"=>$error);
        }
    }

    ////// for admin domain
    public function getIssuesListofadmin($data) {
        $reg_no = $data['reg_no'];  
        $role = $data['role'];    
        $type = $data['type'];
        $where = '';

        switch($type) {
            case 'pending':
                $where = " and (status = 'pending') ";
                break;
                 case 'onhold':
                $where = " and (status = 'onhold') ";
                break;
                 case 'assigned':
                $where = " and (status = 'assigned') ";
                break;
           case 'closed':
                $where = " and (status = 'closed') ";
                break;
            case 'in_progress':
                $where = " and (status = 'resolution_in_progress') ";
                break;    
           case 'user_deleted':
                 $where = " and (status = 'user_deleted') ";
                break;                              
               case 'verified_resolved':
               $where = " and (status = 'verified_resolved')";
               break;
               case 'cannot_be_resolved':
               $where = "and (status ='cannot_be_resolved')";
               break;                     
        }

           $sql = " (select did, issue_desc, data.domain from data inner join domains on domains.domain = data.domain where FIND_IN_SET('$reg_no', domain_admin) $where order by data.domain asc, data.insert_dt desc)";
        

        $query = $this->db->query($sql);
        $result = $query->result();
        return array("success" => true, "data" => $result);
    }


    public function getIssuesListofuser($data) {
        $reg_no = $data['reg_no'];     
        $type = $data['type'];
        $where = '';

        switch($type) {
            case 'pending':
                $where = " and (status = 'pending') ";
                break;
             case 'onhold':
            $where = " and (status = 'onhold') ";
            break;
             case 'assigned':
            $where = " and (status = 'assigned') ";
            break;

            case 'closed':
                $where = " and (status = 'closed') ";
                break;
            case 'in_progress':
                $where = " and (status = 'resolution_in_progress') ";
                break;    
           case 'user_deleted':
                 $where = " and (status = 'user_deleted') ";
                break;                              
               case 'verified_resolved':
               $where = " and (status = 'verified_resolved')";
               break;
               case 'cannot_be_resolved':
               $where = "and (status ='cannot_be_resolved')";
               break;
        }

            
          $sql = "(select * from data where reg_no = '$reg_no' $where order by domain asc, insert_dt desc)";
        

        $query = $this->db->query($sql);
        $result = $query->result();
        return array("success" => true, "data1" => $result);
    }

      public function deleteIssueofuser($data) {

        $did = $data['did'];
        $mobile = $data['mobile'];
        $status = $data['status'];

        $sql = "update data set status = '$status' where did = $did and mobile='$mobile' limit 1";
        if ($this->db->query($sql)) {
            return array("success"=>true);
        } else {
            return array("success"=>false, "error"=>"Couldn't delete Issue");
        }
    }
    public function Toresolutionprogress($data)
    {
       $reg_no = $data['reg_no'];     
        $type = $data['type'];
        $where = '';

        switch($type) {
            case 'assigned':
                $where = " and (status = 'assigned') ";
                break;
            case 'onhold':
                $where = " and (status = 'onhold') ";
                break;
            case 'in_progress':
                $where = " and (status = 'resolution_in_progress') ";
                break;    
           case 'user_deleted':
                 $where = " and (status = 'user_deleted') ";
                break;                              
               case 'verified_resolved':
               $where = " and (status = 'verified_resolved')";
               break;
               case 'cannot_be_resolved':
               $where = "and (status ='cannot_be_resolved')";
               break;
               case 'closed':
               $where = " and (status ='closed')";
               break;

        }
            
          $sql = "(SELECT i.img_name,datediff(d.assigned_on,d.repaired_on) as days, datediff(d.assigned_on,curdate()) as day,datediff(d.insert_dt,d.date_of_resolution) as da, d.* FROM data d LEFT JOIN images i on  i.insert_id=d.did   where repaired_by ='$reg_no' $where   ORDER BY d.did DESC)";
        

        $query = $this->db->query($sql);
        $result = $query->result();
        return array("success" => true, "data1" => $result);
    }

}
?>
