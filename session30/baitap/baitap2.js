
let listBook = [];
let cart = [];
let nextId = 1;

function showTheoTheLoai() {
    let category = prompt("Nhập thể loại sách: ");
    if (!category) {
        console.log("Thể loại không được để trống!");
        return;
    }
    let sach = listBook.filter(b => b.category === category);
    console.log("Danh sách sách thuộc thể loại:", category, sach);
}

function inputSachMoi() {
    let name = prompt("Nhập tên sách: ");
    let price = parseFloat(prompt("Nhập giá sách: "));
    let quantity = parseInt(prompt("Nhập số lượng sách: "));
    let category = prompt("Nhập thể loại sách: ");

    if (!name || !price || !quantity || !category) {
        console.log("Dữ liệu không hợp lệ!");
        return;
    }
    let id = nextId++;
    listBook.push({ id, name, price, quantity, category });
    console.log("Đã thêm sách:", name);
}

function findSach() {
    let findBook = prompt(`Mời nhập lựa chọn cách tìm kiếm :
                                1. Tìm kiếm theo tên
                                2. Tìm kiếm theo Id`);
    let result;
    if (findBook == 1) {
        let searchName = prompt("Nhap ten sach muon tim");
        result = listBook.filter((a) => a.name.includes(searchName));
    } else if (findBook == 2) {
        let searchID = prompt("Nhap id sach muon tim");
        result = listBook.filter((a) => a.id == searchID);
    } else {
        console.log("Dữ liệu nhập vào không hợp lệ");
        return;
    }
    console.log(result);

}

function buySach() {
    let id = +prompt("Moi nhap id sach can mua");
    if(isNaN(id)){
        console.log("Yeu cau nhap so ");
    }
    let soluong = +prompt("Moi nhap so luong sach muon mua");
    if(isNaN(soluong) || soluong <= 0){
        console.log("Yeu cau nhap so hoac so nguyen duong");
    }
    let sach = listBook.find(a => a.id === id);
    if (!sach) {
        console.log("Khong tim thay sach co id nay");
        return;
    }
    if (sach.quantity < soLuong) {
        console.log("Kho khong du so luong sach");
        return;
    }
    sach.quantity -= soLuong;
    cart.push({ 
        id: sach.id, 
        ten: sach.name, 
        gia: sach.price, 
        soLuong: soLuong 
    });
    console.log(`Đã mua thành công sách: "${sach.name}" 
                                - Số lượng: ${soLuong}`);
}

function sapxepSach() {
    let sx = prompt("Moi chon cach sap xep sach theo gia: 1. Tang dan / 2. Giam dan");
    if(sx == 1){
        listBook.sort((a, b) => a.price - b.price);
    }else if(sx == 2){
        listBook.sort((a, b) => b.price - a.price);
    }else{
        console.log("Lua chon khong hop le, vui long thu lai");
    }
    console.log(`Danh sach sach sau khi sap xep ${listBook}`);
}

function tinhTien() {
    if (cart.length === 0) {
        console.log("Giỏ hàng trống, Chưa có sách nào được mua.");
        return;
    }

    let tongSL = cart.reduce((sum, item) => sum + item.quantity, 0);
    let tongTien = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    console.log(`Tổng số lượng sách đã mua: ${tongSL}`);
    console.log(`Tổng tiền phải thanh toán: ${tongTien} VNĐ`);
}

function tongSachInKho() {
    if (listBook.length === 0) {
        console.log("Kho sach trong! Chua co sach nao trong kho.");
        return;
    }

    let tong = 0;
    for (let i = 0; i < listBook.length; i++) {
        tong = tong + listBook[i].quantity;
    }

    console.log(`Tong so sach hien co trong kho: ${tong} cuon`);
}

do {
    console.log("=========QUAN LY UNG DUNG MUA SACH=================");
    console.log(`1. Hiển thị danh sách sách theo thể loại 
                    (Người dùng chọn thể loại để xem sách trong danh mục đó)`);
    console.log("2. Thêm sách mới vào kho");
    console.log("3. Tìm kiếm sách theo tên hoặc id.");
    console.log("4. Nhập id sách cần mua và số lượng.");//(Nhập id sách cần mua và số lượng, cập nhật lại kho)
    console.log(`5. Sắp xếp sách theo giá:
                       - Tăng dần.
                       - Giảm dần`);
    console.log("6. Tính tổng số lượng sách đã mua và in ra tổng tiền trong giỏ hàng");
    console.log("7. Hiển thị tổng số lượng sách trong kho.");
    console.log("8. Thoát chương trình.");

    chose = +prompt("Moi ban nhap lua chon");
    switch (chose) {
        case 1:
            showTheoTheLoai();
            break;
        case 2:
            inputSachMoi();
            break;
        case 3:
            findSach();
            break;
        case 4:
            buySach();
            break;
        case 5:
            sapxepSach();
            break;
        case 6:
            tinhTien();
            break;
        case 7:
            tongSachInKho();
            break;
        case 8:
            console.log("Bye byee");
            break;
        default:
            console.log("Lua chon khong hop le, vui long thu lai");
            break;
    }

} while (chose != 8); `  `