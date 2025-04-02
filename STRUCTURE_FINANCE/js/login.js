// ================================================================================
// ===================== JAVASCRIP PHẦN ĐĂNG NHẬP =================================

function dangNhapTuForm() {
    let ten = document.getElementById("login-username").value;
    let matKhau = document.getElementById("login-password").value;

    dangNhap(ten, matKhau);
}


function dangNhap(username, password) {
    let users = JSON.parse(localStorage.getItem("users")) || []; // Lấy danh sách users từ localStorage
    let hopLe = false;

    // Duyệt danh sách để kiểm tra đăng nhập
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            hopLe = true;
            break;
        }
    }

    if (hopLe == true) {
        console.log(111);
        
        showSnackbar("Đăng nhập thành công!");
        window.location = "index.html"
    } else {
        showSnackbar("Sai tên đăng nhập hoặc mật khẩu!");
    }
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

