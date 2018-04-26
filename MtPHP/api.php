<?php 
header('Access-Control-Allow-Origin:*');
require_once('./serve.php');

switch ($_POST['Action']) {

    case 'Login':{

        $Msg = Login($_POST);
        echo json_encode($Msg);

    }
    break;

    case 'SignUp':{

        $Msg = SignUp($_POST);
        echo json_encode($Msg);
        
    }
    break;

    case 'GetIndexData':{

        $Msg = GetIndexData($_POST);
        echo json_encode($Msg);
        
    }
    break;

    case 'GetUserData':{

        $Msg = GetUserData($_POST);
        echo json_encode($Msg);
        
    }
    break;

    case 'GetUserImg':{

        $Msg = GetUserImg($_POST);
        echo json_encode($Msg);
        
    }
    break;

    case 'UploadWorks':{

        $Msg = UploadWorks($_POST);
        echo json_encode($Msg);
        
    }
    break;
    
    case 'GetShopPageImg':{

        $Msg = GetShopPageImg($_POST);
        echo json_encode($Msg);
        
    }
    break;

    case 'SetPrice':{

        $Msg = SetPrice($_POST);
        echo json_encode($Msg);
        
    }
    break;

    

    case 'CheckVote':{

        $Msg = CheckVote($_POST);
        echo json_encode($Msg);
        
    }
    break;

    

    case 'AddVote':{

        $Msg = AddVote($_POST);
        echo json_encode($Msg);
        
    }
    break;

    
    
  
}






?>