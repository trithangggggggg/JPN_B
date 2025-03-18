let listPhone = [];
let cart = [];
let nextId = 1;

function showTheoHang() {
    let company = prompt("Nhap hang dien thoai: ");
    if (!company) {
        console.log("Hang khong duoc de trong!");
        return;
    }
    let phones = listPhone.filter(b => b.company === company);
    console.log("Danh sach dien thoai thuoc hang:", company, phones);
}

function inputPhoneMoi() {
    let name = prompt("Nhap ten dien thoai: ");
    let price = parseFloat(prompt("Nhap gia dien thoai: "));
    let quantity = parseInt(prompt("Nhap so luong dien thoai: "));
    let company = prompt("Nhap hang dien thoai: ");

    if (!name || !price || !quantity || !company) {
        console.log("Du lieu khong hop le!");
        return;
    }
    let id = nextId++;
    listPhone.push({ id, name, price, quantity, company });
    console.log("Da them dien thoai:", name);
}

function findPhone() {
    let findPhone = prompt(`Moi nhap lua chon cach tim kiem:
                                1. Tim kiem theo ten
                                2. Tim kiem theo Id`);
    let result;
    if (findPhone == 1) {
        let searchName = prompt("Nhap ten dien thoai muon tim");
        result = listPhone.filter((a) => a.name.includes(searchName));
    } else if (findPhone == 2) {
        let searchID = prompt("Nhap id dien thoai muon tim");
        result = listPhone.filter((a) => a.id == searchID);
    } else {
        console.log("Du lieu nhap vao khong hop le");
        return;
    }
    console.log(result);
}

function buyPhone() {
    let id = +prompt("Moi nhap id dien thoai can mua");
    if(isNaN(id)){
        console.log("Yeu cau nhap so");
        return;
    }
    let soLuong = +prompt("Moi nhap so luong dien thoai muon mua");
    if(isNaN(soLuong) || soLuong <= 0){
        console.log("Yeu cau nhap so hoac so nguyen duong");
        return;
    }
    let phone = listPhone.find(a => a.id === id);
    if (!phone) {
        console.log("Khong tim thay dien thoai co id nay");
        return;
    }
    if (phone.quantity < soLuong) {
        console.log("Kho khong du so luong dien thoai");
        return;
    }
    phone.quantity -= soLuong;
    cart.push({ id: phone.id, name: phone.name, price: phone.price, quantity: soLuong });
    console.log(`Da mua thanh cong dien thoai: "${phone.name}" - So luong: ${soLuong}`);
}

function thanhToan() {
    if (cart.length === 0) {
        console.log("Gio hang trong, chua co dien thoai nao duoc mua.");
        return;
    }
    cart = [];
    console.log("Thanh toan thanh cong! Gio hang da duoc xoa.");
}

function sapxepPhone() {
    let sx = prompt("Moi chon cach sap xep dien thoai theo gia: 1. Tang dan / 2. Giam dan");
    if(sx == 1){
        listPhone.sort((a, b) => a.price - b.price);
    }else if(sx == 2){
        listPhone.sort((a, b) => b.price - a.price);
    }else{
        console.log("Lua chon khong hop le, vui long thu lai");
    }
    console.log(`Danh sach dien thoai sau khi sap xep:`, listPhone);
}

function tongTienTrongKho() {
    let tongTien = listPhone.reduce((sum, item) => sum + item.price * item.quantity, 0);
    console.log(`Tong so tien cua cac dien thoai trong kho: ${tongTien} VND`);
}

function tongPhoneTheoHang() {
    let count = {};
    listPhone.forEach(phone => {
        count[phone.company] = (count[phone.company] || 0) + phone.quantity;
    });
    console.log("Tong so luong dien thoai theo tung hang:", count);
}

do {
    console.log("========= QUAN LY CUA HANG DIEN THOAI ================");
    console.log("1. Hien thi danh sach dien thoai theo hang");
    console.log("2. Them dien thoai moi vao cua hang");
    console.log("3. Tim kiem dien thoai theo ten hoac id");
    console.log("4. Nhap id dien thoai can mua va so luong");
    console.log("5. Thanh toan toan bo gio hang");
    console.log("6. Sap xep dien thoai theo gia");
    console.log("7. Hien thi tong so tien cua cac dien thoai trong kho");
    console.log("8. Hien thi tong so luong dien thoai theo tung hang");
    console.log("9. Thoat chuong trinh");

    chose = +prompt("Moi ban nhap lua chon");
    switch (chose) {
        case 1:
            showTheoHang();
            break;
        case 2:
            inputPhoneMoi();
            break;
        case 3:
            findPhone();
            break;
        case 4:
            buyPhone();
            break;
        case 5:
            thanhToan();
            break;
        case 6:
            sapxepPhone();
            break;
        case 7:
            tongTienTrongKho();
            break;
        case 8:
            tongPhoneTheoHang();
            break;
        case 9:
            console.log("Bye bye");
            break;
        default:
            console.log("Lua chon khong hop le, vui long thu lai");
            break;
    }
} while (chose != 9);
