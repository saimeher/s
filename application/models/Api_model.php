<?php

class Api_model extends CI_Model
{
    function __construct()
    {
        parent::__construct();

        $this->load->database('');
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
         
        $result=$this->db->query('select *from roles where reg_no="'.$param1.'"')->row();
        
        if($result)
        {
          return  array("data"=>$result); 
        }
        else
        {
            return array("data"=>'failed');
        }
    }

 
  
 public function getIssuesList(){
   
    $result=$result=$this->db->query('select *from domains where domain="ac"')->row();
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
    $result=$this->db->query('SELECT domain,domain_title FROM `domains`')->result();
    if($result){
        return $result;
    }else{
        return false;
    }
}

public function getIssuesListbyCategory($domain){
    $result=$this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM data d LEFT JOIN images i on  i.insert_id=d.did where d.domain="'.$domain.'"  GROUP by d.did ORDER BY d.insert_dt DESC')->result();
    $result1 = $this->db->query('SELECT status,COUNT(status) as tot,(SELECT COUNT(status) from data WHERE domain="'.$domain.'" )as t from data WHERE domain="'.$domain.'"    GROUP by status')->result();
 
  
    if($result){
        return array("data"=>$result , "data1"=>$result1);
    }else{
         return array("data1"=>'NoData');
    }
}


public function getIssuesListBySelection($param){
 //  $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days,d.* FROM  data d  LEFT JOIN images i on  i.insert_id=d.did GROUP by d.did order by d.insert_dt DESC')->result();
 
  // if($param['status']=='all' && $param['category']=='all'){

  // }
    if($param['status']=='all' && $param['category']=='all'){

      $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM data d LEFT JOIN images i on  i.insert_id=d.did WHERE  d.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by d.did order by d.insert_dt DESC')->result();
      $result1 = $this->db->query('SELECT status,COUNT(status) as tot,   (SELECT COUNT(status) from data WHERE  insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) )as t from data WHERE  insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY)   GROUP by status')->result();
       $result2='NoAvgData';
  }
else if($param['status']!='all' && $param['category']=='all'){

      $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM data d LEFT JOIN images i on  i.insert_id=d.did WHERE d.status="'.$param['status'].'"  and d.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by d.did order by d.insert_dt DESC')->result();
      $result1 = $this->db->query('SELECT status,COUNT(status) as tot,   (SELECT COUNT(status) from data WHERE status="'.$param['status'].'"  and insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) )as t from data WHERE status="'.$param['status'].'" and insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY)   GROUP by status')->result();
     if($param['status']=='verified_resolved'){
      $result2 = $this->db->query('SELECT avg(datediff(date_of_resolution,insert_dt)) as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum from data WHERE status="'.$param['status'].'"   and insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY)     order by insert_dt DESC')->result();
      }else{
      $result2='NoAvgData';
     }
     
  }
  else if($param['status']=='all' && $param['category']!='all'){

      $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM data d LEFT JOIN images i on  i.insert_id=d.did WHERE d.domain="'.$param['category'].'"  and d.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by d.did order by d.insert_dt DESC')->result();
      $result1 = $this->db->query('SELECT status,COUNT(status) as tot,   (SELECT COUNT(status) from data WHERE domain="'.$param['category'].'" and insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) )as t from data WHERE domain="'.$param['category'].'"  and insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY)   GROUP by status')->result();
       $result2='NoAvgData';
  }else{
      $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM data d LEFT JOIN images i on  i.insert_id=d.did WHERE d.domain="'.$param['category'].'" and d.status="'.$param['status'].'" and d.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by d.did order by d.insert_dt DESC')->result();
      $result1 = $this->db->query('SELECT status,COUNT(status) as tot, (SELECT COUNT(status) from data WHERE domain="'.$param['category'].'" and status="'.$param['status'].'" and insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY)  )as t from data WHERE domain="'.$param['category'].'" and status="'.$param['status'].'"  and insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY)   GROUP by status')->result();
        if($param['status']=='verified_resolved'){
      $result2 = $this->db->query('SELECT avg(datediff(date_of_resolution,insert_dt)) as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum from data WHERE status="'.$param['status'].'" and domain="'.$param['category'].'"   and insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY)     order by insert_dt DESC')->result();
      if ($result2) {
        $result2=$result2;
      }else{
        $result2='NoAvgData';
      }
    }else{
       $result2='NoAvgData';
    }
      
  }
  if($result){
        return array("data"=>$result , "data1"=>$result1,"data2"=>$result2);
    }else{
        return array("data1"=>'NoData',"data2"=>'NoAvgData');
    }
}

public function INSERTISSUE($params){
    $this->db->insert('data',$params);
    $id= $this->db->insert_id();
    if($id){
        return $id;
    }else{
        return false;
    }
}
public function GETDETAILS($param1='')
{

//     $result = $this->db->query('select d.domain_admin, data.* from domains d INNER JOIN  users r ON r.reg_no = "'.$param1.'"
// JOIN data 
//     ON data.domain = d.domain
// WHERE   FIND_IN_SET("'.$param1.'", d.domain_admin)')->result();

//     if($result){
//         return $result;
//     }else{
//         return false;
//     }

     $result = $this->db->query('select i.img_name,d.domain_admin,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, data.* from domains d INNER JOIN  users r ON r.reg_no = "'.$param1.'"
JOIN data 
    ON data.domain = d.domain LEFT JOIN images i on  i.insert_id=data.did
WHERE   FIND_IN_SET("'.$param1.'", d.domain_admin) GROUP BY data.did ORDER BY data.did DESC')->result();

   
     $result1 = $this->db->query('SELECT status,COUNT(status) as tot,(SELECT COUNT(status) from domains d inner join users r ON r.reg_no = "'.$param1.'" join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param1.'", d.domain_admin)  ) as t from domains d inner join users r ON r.reg_no = "'.$param1.'" join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param1.'", d.domain_admin)   GROUP by status')->result();
    if($result){
        return array("data" => $result, "data1" => $result1);
          
    }else{
        return array("data1"=>'NoData');
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
public function UPDATEISSUE($params)
{
    $results = $this->db->query('update data set status= "'.$params['status'].'", priority =  "'.$params['priority'].'", repaired_on =  "'.$params['repaired_on'].'", repaired_by =  "'.$params['repaired_by'].'", date_of_resolution =  "'.$params['date_of_resolution'].'", notes =  "'.$params['notes'].'" where did =  "'.$params['did'].'"');
$data=$results;
   if($data){
        return $data;
    }else{
        return false;
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
        $result = $this->db->query('SELECT  i.id,i.img_name,datediff(d.insert_dt,d.date_of_resolution) as days, datediff(d.insert_dt,curdate()) as day, d.* FROM data d   LEFT JOIN images i on  i.insert_id=d.did and d.reg_no="'.$params.'" where  d.reg_no="'.$params.'" and d.status !="user_deleted" GROUP by did ORDER BY insert_dt desc')->result();
    if($result){
        return $result;
    }else{
        return false;
    }
}

public function getAllIssues(){
    $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM  data d  LEFT JOIN images i on  i.insert_id=d.did GROUP by d.did order by d.insert_dt DESC')->result();
    $result1 = $this->db->query('SELECT status,COUNT(status) as tot, (SELECT COUNT(status) from data )as t  from data   GROUP by status')->result();

    if($result){
        return array("data" => $result, "data1" => $result1);
          
    }else{
        return array("data1"=>'NoData');
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
    $results = $this->db->query(' select *from images where insert_id="'.$params['img_id'].'"  and  reg_no="'.$params['reg_no'].'" ')->result();
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
            $result = $this->db->query('select i.img_name,d.domain_admin,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, data.* from domains d INNER JOIN  users r ON r.reg_no = "'.$param1['reg_no'].'"
JOIN data 
    ON data.domain = d.domain LEFT JOIN images i on  i.insert_id=data.did
WHERE  d.domain = "'.$param1['domain'].'" and FIND_IN_SET("'.$param1['reg_no'].'", d.domain_admin) GROUP BY data.did ORDER BY data.did DESC')->result();
     $result1 = $this->db->query('SELECT status,COUNT(status) as tot,(SELECT COUNT(status) from data WHERE domain="'.$param1['domain'].'" )as t from data WHERE domain="'.$param1['domain'].'"    GROUP by status')->result();


  if($result){
        return array("data"=>$result , "data1"=>$result1);
    }else{
         return array("data1"=>'NoData');
    }


}

public function GETISSUELISTS($param){

//  if($param['status']=='all' && $param['category']=='all'){

//       $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM data d LEFT JOIN images i on  i.insert_id=d.did WHERE  d.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by d.did order by d.insert_dt DESC')->result();
//       $result1 = $this->db->query('SELECT status,COUNT(status) as tot,   (SELECT COUNT(status) from data WHERE  insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) )as t from data WHERE  insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY)   GROUP by status')->result();
 
//   }
// else if($param['status']!='all' && $param['category']=='all'){

//       $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM data d LEFT JOIN images i on  i.insert_id=d.did WHERE d.status="'.$param['status'].'"  and d.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by d.did order by d.insert_dt DESC')->result();
//       $result1 = $this->db->query('SELECT status,COUNT(status) as tot,   (SELECT COUNT(status) from data WHERE status="'.$param['status'].'"  and insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) )as t from data WHERE status="'.$param['status'].'" and insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY)   GROUP by status')->result();
//      if($param['status']=='verified_resolved'){
//       $result2 = $this->db->query('SELECT avg(datediff(date_of_resolution,insert_dt)) as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum from data WHERE status="'.$param['status'].'"    and insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY)     order by insert_dt DESC')->result();
//       }else{
//       $result2='NoAvgData';
//      }
     
//   }
//   else if($param['status']=='all' && $param['category']!='all'){

//       $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM data d LEFT JOIN images i on  i.insert_id=d.did WHERE d.domain="'.$param['category'].'"  and d.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by d.did order by d.insert_dt DESC')->result();
//       $result1 = $this->db->query('SELECT status,COUNT(status) as tot,   (SELECT COUNT(status) from data WHERE domain="'.$param['category'].'" and insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) )as t from data WHERE domain="'.$param['category'].'"  and insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY)   GROUP by status')->result();
 
//   }else{
//       $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM data d LEFT JOIN images i on  i.insert_id=d.did WHERE d.domain="'.$param['category'].'" and d.status="'.$param['status'].'" and d.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by d.did order by d.insert_dt DESC')->result();
//       $result1 = $this->db->query('SELECT status,COUNT(status) as tot, (SELECT COUNT(status) from data WHERE domain="'.$param['category'].'" and status="'.$param['status'].'" and insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY)  )as t from data WHERE domain="'.$param['category'].'" and status="'.$param['status'].'"  and insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY)   GROUP by status')->result();
//         if($param['status']=='verified_resolved'){
//       $result2 = $this->db->query('SELECT avg(datediff(date_of_resolution,insert_dt)) as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum from data WHERE status="'.$param['status'].'"    and insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY)     order by insert_dt DESC')->result();
//       if ($result2) {
//         $result2=$result2;
//       }else{
//         $result2='NoAvgData';
//       }
//     }else{
//        $result2='NoAvgData';
//     }
      
//   }
if($param['status']!='all' && $param['category']=='all'){
    $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.domain_admin, data.* from domains d INNER JOIN  users r ON r.reg_no = "'.$param['reg_no'].'" JOIN data ON data.domain = d.domain LEFT JOIN images i on  i.insert_id=data.did
              WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin)  and  data.status ="'.$param['status'].'" and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by data.did order by data.insert_dt DESC')->result();
    $result1 = $this->db->query('SELECT status,COUNT(status) as tot,(SELECT COUNT(status) from domains d inner join users r ON r.reg_no ="'.$param['reg_no'].'"  join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and data.status="'.$param['status'].'"  and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) ) as t from domains d inner join users r ON r.reg_no = "'.$param['reg_no'].'" join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and data.status="'.$param['status'].'" and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by data.status order by data.insert_dt DESC')->result();
    
    if($param['status']=='verified_resolved'){
      $result2 = $this->db->query('SELECT  avg(datediff(date_of_resolution,insert_dt)) as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum   from domains d INNER JOIN  users r ON r.reg_no = "'.$param['reg_no'].'" JOIN data ON data.domain = d.domain 
WHERE   FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and status="verified_resolved"    and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY)     order by data.insert_dt DESC')->result();
      }else{
      $result2='NoAvgData';
     }
}
else if ($param['status']=='all' && $param['category']=='all') {
 // echo '2ND CONDTION';
  $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.domain_admin, data.* from domains d INNER JOIN  users r ON r.reg_no = "'.$param['reg_no'].'" JOIN data ON data.domain = d.domain LEFT JOIN images i on  i.insert_id=data.did
              WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin)   and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by data.did order by data.insert_dt DESC')->result();
    $result1 = $this->db->query('SELECT status,COUNT(status) as tot,(SELECT COUNT(status) from domains d inner join users r ON r.reg_no ="'.$param['reg_no'].'"  join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin)    and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) ) as t from domains d inner join users r ON r.reg_no = "'.$param['reg_no'].'" join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and   data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by data.status order by data.insert_dt DESC')->result();
    $result2='NoAvgData';
}
else if ($param['status']!='all' && $param['category']!='all') {
 $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.domain_admin, data.* from domains d INNER JOIN  users r ON r.reg_no = "'.$param['reg_no'].'" JOIN data ON data.domain = d.domain LEFT JOIN images i on  i.insert_id=data.did
              WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin)   and  data.domain ="'.$param['category'].'" and  data.status ="'.$param['status'].'" and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by data.did order by data.insert_dt DESC')->result();
    $result1 = $this->db->query('SELECT status,COUNT(status) as tot,(SELECT COUNT(status) from domains d inner join users r ON r.reg_no ="'.$param['reg_no'].'"  join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin)  and  data.domain ="'.$param['category'].'" and data.status="'.$param['status'].'"  and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) ) as t from domains d inner join users r ON r.reg_no = "'.$param['reg_no'].'" join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and data.domain="'.$param['category'].'" and data.status="'.$param['status'].'" and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by data.status order by data.insert_dt DESC')->result();
        
    if($param['status']=='verified_resolved'){
      $result2 = $this->db->query('SELECT  avg(datediff(date_of_resolution,insert_dt)) as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum   from domains d INNER JOIN  users r ON r.reg_no = "'.$param['reg_no'].'" JOIN data ON data.domain = d.domain 
WHERE   FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and data.status="verified_resolved" and data.domain="'.$param['category'].'"   and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY)     order by data.insert_dt DESC')->result();
      }else{
      $result2='NoAvgData';
     }
}
else{
  $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.domain_admin, data.* from domains d INNER JOIN  users r ON r.reg_no = "'.$param['reg_no'].'" JOIN data ON data.domain = d.domain LEFT JOIN images i on  i.insert_id=data.did
              WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and  data.domain ="'.$param['category'].'"  and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by data.did order by data.insert_dt DESC')->result();
    $result1 = $this->db->query('SELECT status,COUNT(status) as tot,(SELECT COUNT(status) from domains d inner join users r ON r.reg_no ="'.$param['reg_no'].'"  join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and  data.domain ="'.$param['category'].'" and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) ) as t from domains d inner join users r ON r.reg_no = "'.$param['reg_no'].'" join data ON data.domain = d.domain WHERE FIND_IN_SET("'.$param['reg_no'].'", d.domain_admin) and  data.domain ="'.$param['category'].'" and data.insert_dt BETWEEN "'.$param['from_date'].'" and  DATE_ADD("'.$param['to_date'].'", INTERVAL 1 DAY) GROUP by data.status order by data.insert_dt DESC')->result();
   $result2='NoAvgData';
}



  if($result){
        return array("data"=>$result , "data1"=>$result1, "data2"=>$result2);
    }
    else{
      return array("data1"=>'NoData',"data2"=>'NoAvgData');
    }
}


//  public function getIssuesListbyStatus($param){
//   if($param['status']=='all' && $param['category']=='all'){

//       $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM data d LEFT JOIN images i on  i.insert_id=d.did  GROUP by d.did order by d.insert_dt DESC')->result();
//       $result1 = $this->db->query('SELECT status,COUNT(status) as tot,   (SELECT COUNT(status) from data )as t from data GROUP by status')->result();
//        $result2='NoAvgData';
//   }
// else if($param['status']!='all' && $param['category']=='all'){

//       $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM data d LEFT JOIN images i on  i.insert_id=d.did WHERE d.status="'.$param['status'].'" GROUP by d.did order by d.insert_dt DESC')->result();
//       $result1 = $this->db->query('SELECT status,COUNT(status) as tot,   (SELECT COUNT(status) from data WHERE status="'.$param['status'].'" ) as t from data WHERE status="'.$param['status'].'"   GROUP by status')->result();
//      if($param['status']=='verified_resolved'){
//       $result2 = $this->db->query('SELECT avg(datediff(date_of_resolution,insert_dt)) as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum from data WHERE status="'.$param['status'].'" order by insert_dt DESC')->result();
//       }else{
//       $result2='NoAvgData';
//      }
     
//   }
//   else if($param['status']=='all' && $param['category']!='all'){

//       $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM data d LEFT JOIN images i on  i.insert_id=d.did WHERE d.domain="'.$param['category'].'"  GROUP by d.did order by d.insert_dt DESC')->result();
//       $result1 = $this->db->query('SELECT status,COUNT(status) as tot,   (SELECT COUNT(status) from data WHERE domain="'.$param['category'].'" )as t from data WHERE domain="'.$param['category'].'"   GROUP by status')->result();
//        $result2='NoAvgData';
//   }else{
//       $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM data d LEFT JOIN images i on  i.insert_id=d.did WHERE d.domain="'.$param['category'].'" and d.status="'.$param['status'].'" GROUP by d.did order by d.insert_dt DESC')->result();
//       $result1 = $this->db->query('SELECT status,COUNT(status) as tot, (SELECT COUNT(status) from data WHERE domain="'.$param['category'].'" and status="'.$param['status'].'" )as t from data WHERE domain="'.$param['category'].'" and status="'.$param['status'].'" GROUP by status')->result();
//         if($param['status']=='verified_resolved')
//         {
//       $result2 = $this->db->query('SELECT avg(datediff(date_of_resolution,insert_dt)) as average,min(datediff(date_of_resolution,insert_dt)) as minimum, max(datediff(date_of_resolution,insert_dt)) as maximum from data WHERE status="'.$param['status'].'" and domain="'.$param['category'].'"     order by insert_dt DESC')->result();
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


public function getIssuesListbyStatus($param){
  if($param['status']=='all'){  

    $result = $this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM  data d  LEFT JOIN images i on  i.insert_id=d.did GROUP by d.did order by d.insert_dt DESC')->result();
    $result1 = $this->db->query('SELECT status,COUNT(status) as tot, (SELECT COUNT(status) from data )as t  from data   GROUP by status')->result();

}
else{
  
    $result=$this->db->query('SELECT i.img_name,datediff(insert_dt,date_of_resolution) as days, datediff(insert_dt,curdate()) as day, d.* FROM data d LEFT JOIN images i on  i.insert_id=d.did where d.status="'.$param['status'].'"  GROUP by d.did ORDER BY d.insert_dt DESC')->result();
    $result1 = $this->db->query('SELECT status,COUNT(status) as tot,(SELECT COUNT(status) from data where status="'.$param['status'].'" )as t from data  where status ="'.$param['status'].'" GROUP by status')->result();
}
 
  
    if($result){
        return array("data"=>$result , "data1"=>$result1);
    }else{
         return array("data1"=>'NoData');
    }
}
}
?>
