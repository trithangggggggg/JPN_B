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
        usernameErrorEl.style.display = "block";
        isValid = false;
    }

    if (password === "") {
        passwordErrorEl.style.display = "block";
        isValid = false;
    }

    if (isValid === false) {
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let hopLe = false;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            hopLe = true;
            break;
        }
    }

    if (hopLe === true) {
        window.location = "index.html";
    } else {
        loginFailEl.style.display = "block";
    }
}
