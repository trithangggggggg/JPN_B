// ===========================================================================
// ===========JAVASCRIPT PHẦN ĐĂNG KÝ NGƯỜI DÙNG MỚI =========================

function registerNew() {
    let ten = document.getElementById("username").value.trim();
    let matKhau = document.getElementById("password").value;
    let xacNhanMatKhau = document.getElementById("confirmPassword").value;
    
    if (ten === "") {
        showSnackbar("Tên tài khoản không được để trống !");
        return;
    }

    if (!ten.includes("@") || !(ten.endsWith(".com") || ten.endsWith(".vn"))) {
        showSnackbar("Email sai định dạng. Hãy nhập email có @ và kết thúc bằng .com hoặc .vn !");
        return;
    }

    if(xacNhanMatKhau === ""){
        showSnackbar("Mật khẩu xác nhận không được để trống !");
        return;
    }
    
    if (matKhau !== xacNhanMatKhau) {
        showSnackbar("Mật khẩu xác nhận không khớp !");
        return;
    }

    if (matKhau.length < 6) {
        showSnackbar("Mật khẩu phải có ít nhất 6 ký tự !");
        return;
    }

    let ketQua = dangKy(ten, matKhau);
    if (ketQua) {
        showSnackbar("Đăng ký thành công !");
        window.location.href = "login.html";
       
    } else {
        showSnackbar("Tên đăng nhập đã tồn tại!");
    }
}

function dangKy(username, password) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let tonTai = users.some(user => user.username === username);

    if (tonTai) {
        return false;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    return true;
}

// hàm hiệu ứng thông báo snackBar
function showSnackbar(text) {
    var sb = document.getElementById("snackbar");
    sb.textContent = text;
    sb.classList.add("show");

    setTimeout(function() {
        sb.classList.remove("show");
    }, 3000);
}






