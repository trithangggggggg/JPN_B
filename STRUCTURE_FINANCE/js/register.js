// ===========================================================================
// ===========JAVASCRIPT PHẦN ĐĂNG KÝ NGƯỜI DÙNG MỚI =========================


let users = JSON.parse(localStorage.getItem("users")) || [];

function registerNew() {
    let tenEl = document.getElementById("username");
    let matKhauEl = document.getElementById("password");
    let xacNhanEl = document.getElementById("confirmPassword");

    let ten = tenEl.value.trim();
    let matKhau = matKhauEl.value;
    let xacNhan = xacNhanEl.value;

    let tenErr = document.getElementById("usernameError");
    let mkErr = document.getElementById("passwordError");
    let xnErr = document.getElementById("confirmError");

    // Reset lỗi
    tenErr.style.display = "none";
    mkErr.style.display = "none";
    xnErr.style.display = "none";
    tenErr.textContent = "";
    mkErr.textContent = "";
    xnErr.textContent = "";

    let isValid = true;

    // Kiểm tra tên
    if (ten === "") {
        tenErr.textContent = "Tên không được để trống";
        tenErr.style.display = "block";
        isValid = false;
    } else if (!ten.includes("@") || !(ten.endsWith(".com") || ten.endsWith(".vn"))) {
        tenErr.textContent = "Email sai định dạng";
        tenErr.style.display = "block";
        isValid = false;
    }

    // Kiểm tra mật khẩu
    if (matKhau === "") {
        mkErr.textContent = "Mật khẩu không được để trống";
        mkErr.style.display = "block";
        isValid = false;
    } else if (matKhau.length < 6) {
        mkErr.textContent = "Mật khẩu phải có ít nhất 6 ký tự";
        mkErr.style.display = "block";
        isValid = false;
    }

    // Kiểm tra xác nhận mật khẩu
    if (xacNhan === "") {
        xnErr.textContent = "Vui lòng xác nhận mật khẩu";
        xnErr.style.display = "block";
        isValid = false;
    } else if (xacNhan !== matKhau) {
        xnErr.textContent = "Mật khẩu xác nhận không khớp";
        xnErr.style.display = "block";
        isValid = false;
    }

    // Kiểm tra tài khoản trùng
    let tonTai = users.some(function(user) {
        return user.username === ten;
    });

    if (tonTai) {
        tenErr.textContent = "Tài khoản đã tồn tại";
        tenErr.style.display = "block";
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    // Thêm user mới
    users.push({ username: ten, password: matKhau });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công!");
    window.location.href = "login.html";
}
