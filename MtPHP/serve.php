<?php 

header('content-type:text/html; charset=utf-8');

mysql_connect('127.0.0.1', 'root', '99740') or die(mysqli_connect_error());
mysql_select_db('MTDB');
mysql_query("SET NAMES utf8");

date_default_timezone_set('Asia/Taipei');



function SignUp($data){

    $User = $data['User'];
    $Password = md5($data['Password']);

    $Sql = "select * from user where email = '$User'";
    $Rs = mysql_query($Sql);
    if(mysql_num_rows($Rs) != 0){
        $Msg['Status'] = "warning";
        $Msg['Msg']    = '該信箱已註冊';
    }else{
        $Sql = "INSERT INTO user (email,password)VALUES ('$User','$Password');";
									
        mysql_query($Sql);

        $Msg['Status'] = "success";
        $Msg['Msg']    = '註冊成功';

    }

    return $Msg;
}


function Login($data){

    $User = $data['User'];
    $Password = md5($data['Password']);

    $Sql = "select * from user where email = '$User' and password = '$Password'";
    $Rs = mysql_query($Sql);
    if(mysql_num_rows($Rs) != 0){
        $Msg['Status'] = "success";
        $Msg['Msg']    = '登入成功';
    }else{

        $Msg['Status'] = "warning";
        $Msg['Msg']    = '登入失敗';

    }

    return $Msg;

}


function GetIndexData($data){


    $Sql = "select * from img";
    $Rs = mysql_query($Sql);
    
    while($Row = mysql_fetch_assoc($Rs)){

		$RData[] = $Row;
		
	}
    
    return $RData;

}

function GetUserData($data){

    $email = $data['Email'];


    $Sql = "select * from user where email = '$email'";
    $Rs = mysql_query($Sql);
    
    $Row = mysql_fetch_assoc($Rs);

    
    return $Row;

}

function GetUserImg($data){

    $email = $data['Email'];

    $Sql = "select * from img where email = '$email'";
    $Rs = mysql_query($Sql);
    
    while($Row = mysql_fetch_assoc($Rs)){

		$RData[] = $Row;
		
	}
    
    return $RData;

}

function UploadWorks($data){

    $Email = $data['Email'];
    $WorkTitle = $data['WorkTitle'];
    $WorkContent = $data['WorkContent'];
    $WorkImgBase64 = $data['WorkImgBase64'];


    if($data['WorkImgBase64'] != ''){

        define('UPLOAD_PATH', '../img/');
        // 接收 POST 進來的 base64 DtatURI String
        $img     = $WorkImgBase64;
        

        $img     = str_replace('data:image/jpeg;base64,', '', $img);
        $img     = str_replace(' ', '+', $img);
        $dataS   = base64_decode($img);
        $picName = uniqid().hash('sha256', time()).rand();
        //圖片轉檔完的路徑
        $pic     = $picName.'.jpeg';
        $file    = UPLOAD_PATH . $pic;
        
        $success = file_put_contents($file, $dataS);

        // $sql = "UPDATE user_and_tree 
        //            set qrphoto = '{$pic}'
        //          where email   = '{$uid}'";

        $Sql = "INSERT INTO img (src,email,vote,sell,auction,vote_count,sell_total,content,title)VALUES ('$pic','$Email','1','0','0','0','0','$WorkContent','$WorkTitle');";

        mysql_query($Sql);
    
        $msg['Status'] = "success";
        $msg['Msg']    = $pic;
        // echo json_encode($msg);
        return $msg;

    }else{

        $msg['Status'] = "warning";
        $msg['Msg']    = "圖片尚未上傳成功";
        // echo json_encode($msg);
        return $msg;
    }

}

function GetShopPageImg($data){

    $Email = $data['Email'];
    $Img = $data['Img'];

    $Sql = "select * from img where email = '$Email' and src = '$Img'";
    $Rs = mysql_query($Sql);
    $Row = mysql_fetch_assoc($Rs);

    return $Row;

}



function SetPrice($data){

    $Price = $data['Price'];

    $Sql = "UPDATE shop 
                 set price = '$Price'
                 where id   = '1'";
    $Rs = mysql_query($Sql);

    $Msg['Status'] = 'success';

    return $Msg;

}

function CheckVote($data){

    $Email = $data['Email'];

    $Sql = "select * from user where email = '$Email'";
    $Rs = mysql_query($Sql);
    $Row = mysql_fetch_assoc($Rs);

    return $Row;
}


function AddVote($data){

    $Email = $data['Email'];
    $Img = $data['Img'];
    $Datetime= date("Y/m/d H:i:s");

    $Sql = "select * from user where email = '$Email'";
    $Rs = mysql_query($Sql);
    $Row = mysql_fetch_assoc($Rs);

    if($Row['vote_time'] == null){

        $Sql = "UPDATE user 
        set vote_time = '$Datetime'
        where email   = '$Email'";

        $Rs = mysql_query($Sql);

        $Sql = "select * from img where email = '$Email' and src = '$Img'";
        $Rs = mysql_query($Sql);
        $Row = mysql_fetch_assoc($Rs);
    
        $Vote = (int)$Row['vote_count'];
        $Vote = (string)($Vote + 1);
    
        $Sql = "UPDATE img 
            set vote_count = '$Vote'
            where email   = '$Email' and src = '$Img'";
    
        $Rs = mysql_query($Sql);
    
        // $Sql = "UPDATE user 
        //     set vote = '0'
        //     where email   = '$Email'";
        // $Rs = mysql_query($Sql);

        
        $Msg['Status'] = 'success';


    }else{

        $Sql = "select * from user where email = '$Email'";
        $Rs = mysql_query($Sql);
        $Row = mysql_fetch_assoc($Rs);
        $TimeRes = strtotime($Datetime) - strtotime($Row['vote_time']);

        if($TimeRes >= 86400){

            $Sql = "select * from img where email = '$Email' and src = '$Img'";
            $Rs = mysql_query($Sql);
            $Row = mysql_fetch_assoc($Rs);
        
            $Vote = (int)$Row['vote_count'];
            $Vote = (string)($Vote + 1);
        
            $Sql = "UPDATE img 
                set vote_count = '$Vote'
                where email   = '$Email' and src = '$Img'";
        
            $Rs = mysql_query($Sql);
        
            // $Sql = "UPDATE user 
            //     set vote = '0'
            //     where email   = '$Email'";
            // $Rs = mysql_query($Sql);

            $Sql = "UPDATE user 
            set vote_time = '$Datetime'
            where email   = '$Email'";

            $Rs = mysql_query($Sql);
            
            $Msg['Status'] = 'success';
    

        }else{

            $Msg['Status'] = 'warning';

        }


    }

    return $Msg;
}
?>