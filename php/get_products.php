<?php

$servername = "remotemysql.com";
$username = "2brhMowid7";
$password = "sXrXC67iRz";
$dbname = "2brhMowid7";

// $servername = "s27.hekko.pl";
// $username = "masarnia_admin";
// $password = "Ypz0M5y4m";
// $dbname = "masarnia_produkty";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$content = trim(file_get_contents("php://input"));
$decoded = json_decode($content, true);

$sql = "SELECT * FROM produkty";

if(is_array($decoded)) {
    if(array_key_exists('sort', $decoded) && strlen($decoded['sort']) > 0) $sql .= " ORDER BY ".explode(",",$decoded['sort'])[0]." ".explode(",",$decoded['sort'])[1];
    if(array_key_exists('limit', $decoded)) $sql .= " LIMIT ".$decoded['limit'];
}

$status = array();
$data;

$i = 0;

if($result = $conn->query($sql)){
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $data = array(
                'produkty' => array(
                    
                    'id' => $row["id"],
                    'nazwaProduktu' => $row["nazwaProduktu"],
                    'cenaProduktu' => $row["cenaProduktu"],
                    'adresZdjecia' => $row["adresZdjecia"],
                    'opisProduktu' => $row["opisProduktu"]
                    //'czyPolecane' => $row["czyPolecane"]    
                )
            );
            
            $i++;
        }
    }
    echo json_encode($data);
} else {
    $status['success'] = false;
    echo json_encode($status);
}

$conn->close();

?>