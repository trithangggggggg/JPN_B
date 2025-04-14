// ================================================================================
// ===================== JAVASCRIP PHẦN ĐĂNG NHẬP =================================

function dangNhapTuForm() {
    let tenEl = document.getElementById("login-username");
    let matKhauEl = document.getElementById("login-password");

    let username = tenEl.value.trim();
    let password = matKhauEl.value;

    let usernameErrorEl = document.getElementById("usernameError");
    let passwordErrorEl = document.getElementById("passwordError");
    let loginFailEl = document.getElementById("loginFail");

    // Ẩn lỗi trước
    usernameErrorEl.style.display = "none";
    passwordErrorEl.style.display = "none";
    loginFailEl.style.display = "none";

    let isValid = true;

    if (username === "") {
        usernameErrorEl.textContent = "Vui lòng nhập email"; // THAY ĐỔI: Thông báo rõ hơn
        usernameErrorEl.style.display = "block";
        isValid = false;
    }

    if (password === "") {
        passwordErrorEl.textContent = "Vui lòng nhập mật khẩu"; // THAY ĐỔI: Thông báo rõ hơn
        passwordErrorEl.style.display = "block";
        isValid = false;
    }

    if (isValid === false) {
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.username === username); // THAY ĐỔI: Dùng find() thay for

    if (!user) {
        loginFailEl.textContent = "Tài khoản không tồn tại"; // THAY ĐỔI: Thông báo cụ thể
        loginFailEl.style.display = "block";
    } else if (user.password !== password) {
        loginFailEl.textContent = "Mật khẩu không đúng"; // THAY ĐỔI: Thông báo cụ thể
        loginFailEl.style.display = "block";
    } else {
        localStorage.setItem("currentUser", username);
        window.location.href = "index.html"; // THAY ĐỔI: Dùng href cho thống nhất
    }
}