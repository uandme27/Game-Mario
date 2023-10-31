<?php
// Kết nối đến cơ sở dữ liệu
$con = mysqli_connect("localhost", "root", "", "game-mario");

// Kiểm tra kết nối
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit;
}

// Đảm bảo truy vấn đến cơ sở dữ liệu sử dụng bộ ký tự UTF-8
mysqli_set_charset($con, "utf8");

// Truy vấn để lấy dữ liệu từ cơ sở dữ liệu
$sql = "SELECT * FROM student";
$result = mysqli_query($con, $sql);

if ($result) {
    $file = fopen("exported_data.txt", "w"); // Mở file .txt để viết

    // Lặp qua kết quả truy vấn và viết dữ liệu vào file .txt
    while ($row = mysqli_fetch_assoc($result)) {
        $line = $row['id'] . "\t" . $row['name'] . "\t" . $row['phone'] . "\n";
        fwrite($file, $line);
    }

    fclose($file); // Đóng file
    mysqli_free_result($result); // Giải phóng bộ nhớ
} else {
    echo "Query error: " . mysqli_error($con);
}

// Đóng kết nối đến cơ sở dữ liệu
mysqli_close($con);

echo "Dữ liệu đã được xuất ra file exported_data.txt";
?>