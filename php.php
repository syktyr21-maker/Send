<?php
// اطلاعات اتصال به پایگاه داده
$host = 'localhost';         // یا آدرس دیتابیس هاست شما
$user = 'DB_USERNAME';       // نام کاربری دیتابیس
$pass = 'DB_PASSWORD';       // رمز عبور دیتابیس
$dbname = 'DB_NAME';         // نام دیتابیس

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
  die("خطا در اتصال: " . $conn->connect_error);
}

$name = $_POST['name'] ?? '';
$message = $_POST['message'] ?? '';

if ($name && $message) {
  $stmt = $conn->prepare("INSERT INTO messages (name, message) VALUES (?, ?)");
  $stmt->bind_param("ss", $name, $message);
  $stmt->execute();
  echo "✅ پیام ذخیره شد";
  $stmt->close();
} else {
  echo "⚠️ لطفاً همه فیلدها را پر کنید";
}

$conn->close();
?>
