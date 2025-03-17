let contact = [];

function inputCT() {
    let id = parseInt(prompt("Moi nhap so dinh danh"));
    let name = prompt("Moi nhap ten cua nguoi lien he");
    let email = prompt("Moi nhap email cua nguoi lien he");
    let phone = prompt("Moi nhap so dien thoai cua nguoi lien he");

    contact.push({ id, name, email, phone });
    console.log("Da them thanh cong 1 lien he moi");
}

function showListCT() {
    if (contact.length == 0) {
        console.log("Danh sách nguoi lien he đang trống.");
        return;
    }
    console.log("Danh sach danh ba:");
    for (let i = 0; i < contact.length; i++) {
        let person = contact[i];
        console.log(`
            id: ${person.id}
            name: ${person.name}
            email: ${person.email}
            phone: ${person.phone}
        `);
    }
}

function findCtofSDT() {
    let phoneFind = prompt("Nhập số điện thoại muốn tìm:");
    let findContact = contact.find(person => person.phone === phoneFind);

    if (!findContact) {
        console.log("Không tìm thấy!");
    } else {
        console.log(`Tìm thấy: 
            id: ${findContact.id}
            name: ${findContact.name}
            email: ${findContact.email}
            phone: ${findContact.phone}
        `);
    }
}


function updateCT() {
    let findId = parseInt(prompt("Nhập ID muốn cập nhật:"));
    for (let i = 0; i < contact.length; i++) {
        if (contact[i].id === findId) {
            contact[i].name = prompt("Nhập tên mới:");
            contact[i].email = prompt("Nhập email mới:");
            contact[i].phone = prompt("Nhập số điện thoại mới:");
            console.log("Cập nhật thành công!");
            return;
        }
    }
    console.log("Không tìm thấy liên hệ!");
}



function deleteCT() {
    let idDelete = parseInt(prompt("Nhập ID muốn xóa:"));
    let index = contact.findIndex(person => person.id === idDelete);

    if (index === -1) {
        console.log("Không tìm thấy liên hệ!");
    } else {
        contact.splice(index, 1);
        console.log(`Đã xóa liên hệ có ID: ${idDelete}`);
    }
}


let chose;
do {
    console.log("================= QUAN LY DANH BA ==============");
    console.log("1. Thêm đối tượng Contact vào danh sách liên hệ.");
    console.log("2. Hiển thị danh sách danh bạ.");
    console.log("3. Tìm kiếm thông tin Contact theo số điện thoại.");
    console.log("4. Cập nhật thông tin Contact(name, email, phone) theo id.");
    console.log("5. Xóa một đối tượng Contact khỏi danh sách danh bạ theo id.");
    console.log("6. Thoát");

    chose = parseInt(prompt("Moi chon chuc nang: "));

    switch (chose) {
        case 1:
            inputCT();
            break;
        case 2:
            showListCT();
            break;
        case 3:
            findCtofSDT();
            break;
        case 4:
            updateCT();
            break;
        case 5:
            deleteCT();
            break;
        case 6:
            console.log("Thoát chương trình.");
            break;
        default:
            console.log("Lựa chọn không hợp lệ!");
    }
} while (chose !== 6);
