function isStrongPassword(password) {
    if (password.length < 8) {
        return;
    }
    let coHoa = false;
    let coThuong = false;
    let coSo = false;
    for (let i = 0; i < password.length; i++) {
        let kytu = password[i];

        if (kytu >= 'A' && kytu <= 'Z') {
            coHoa = true;
        } else if (kytu >= 'a' && kytu <= 'z') {
            coThuong = true;
        } else if (kytu >= '0' && kytu <= '9') {
            coSo = true;
        }
    }
    if (coHoa && coThuong && coSo) {
        return true;
    }
    return;
}
console.log(isStrongPassword("agdgs54323ffxd23"));