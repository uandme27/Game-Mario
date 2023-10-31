<?php
// Kết nối đến cơ sở dữ liệu
$con = mysqli_connect("localhost", "root", "", "game-mario");

// Kiểm tra kết nối
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

// Đảm bảo truy vấn đến cơ sở dữ liệu sử dụng bộ ký tự UTF-8
mysqli_set_charset($con, "utf8");

// Kiểm tra xem biểu mẫu đã được gửi đi chưa
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lấy dữ liệu từ biểu mẫu
    $name = $_POST["name"];
    $phone = $_POST["phone"];

    // Thực hiện truy vấn SQL để chèn dữ liệu vào cơ sở dữ liệu
    $sql = "INSERT INTO student (name, phone) VALUES ('$name', '$phone')";

    if (mysqli_query($con, $sql)) {
        echo "Dữ liệu đã được chèn thành công vào cơ sở dữ liệu.";
    } else {
        echo "Lỗi: " . mysqli_error($con);
    }
}

// Đóng kết nối đến cơ sở dữ liệu
mysqli_close($con);
?>