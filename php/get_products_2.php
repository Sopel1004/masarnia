<?php

$servername = "remotemysql.com";
$username = "2brhMowid7";
$password = "sXrXC67iRz";
$dbname = "2brhMowid7";

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

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "".$row["id"]."'>".$row["nazwaProduktu"]."";
    }
} else {
    echo "0 results";
}

// $status = array();

// if($result = $conn->query($sql)){
//     $data = $result-> fetch_all(MYSQLI_ASSOC);
//     echo $data[0]['nazwaProduktu'];

//     // echo json_encode($data);
// } 
// else {
//     $status['success'] = false;
//     echo json_encode($status);
// }


$conn->close();

?>