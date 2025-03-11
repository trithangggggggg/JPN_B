let users = [];

function checkEmail(email) {
    let hopLe = false;
    
    if (email.includes("@")) {
        if (email.endsWith(".com") || email.endsWith(".vn")) {
            hopLe = true;
        }
    }
    
    if (!hopLe) {
        console.log("Email khong hop le");
    } else {
        let find = false;

        for (let i = 0; i < users.length; i++) {
            if (users[i] === email) {
                find = true;
                break;
            }
        }
        
        if (find) {
            console.log("Tai khoan da ton taii");
        } else {
            users.push(email);
            console.log("Dang ky thanh cong");
        }
    }
}
console.log(checkEmail("trithang@gmail.com"));

