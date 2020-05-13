<?php

$servername = "remotemysql.com";
$username = "2brhMowid7";
$password = "sXrXC67iRz";
$dbname = "2brhMowid7";

// $servername = "localhost";
// $username = "masarnia_admin";
// $password = "Ypz0M5y4m";
// $dbname = "masarnia_produkty";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM kategorie";

$status = array();
$data;

if($result = $conn->query($sql)){
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $data[] = array(
                'id' => $row["id"],
                'nazwaKategorii' => $row["nazwaKategorii"],   
            );
        }
    } else {
        $status['success'] = false;
        $status['msg'] = 'Brak danych!';
        echo json_encode($status);
    }
    echo json_encode($data);
} else {
    $status['success'] = false;
    echo json_encode($status);
}

$conn->close();

?>