let array = [];
let chose;
//case1
function inputSP() {
    let id = parseInt(prompt("Moi nhap so dinh danh san pham"));
    let name = prompt("Moi nhap ten san pham");
    let price = prompt("Moi nhap giasan pham");
    let category = prompt("Danh mục sản phẩm.");
    let quantity = prompt(" Số lượng sản phẩm trong kho.");

    array.push({ id, name, price, category, quantity });
    console.log(array);
}
//case 2
function showListSP() {
    if (array.length == 0) {
        console.log("Danh sach san pham trong");
        return;
    }
    for (let i = 0; i < array.length; i++) {
        let sP = array[i];
        console.log(sP);
        
    }
}
//case4
function updateSP() {
    let id = prompt("Nhap id can cap nhat thong tin");
    let product = array.find((item) => item.id == id);
    
    if (product) {
        product.name = prompt("Nhap ten");
        product.price = prompt("Nhap gia tien");
        product.category = prompt("Nhap danh muc san pham");
        product.quantity = prompt("Nhap so luong san pham");
    } else {
        console.log("khong tim thay id");
    }
}


//case 3
function showListSPbyID() {
    if (array.length == 0) {
        console.log("Danh sach san pham trong");
        return;
    }
    let id = prompt("Moi nhap id san pham muon show");
    array.find((item) => item.id === id);
    console.log(`San pham id ${id}`);
    let sP = array[id];
    console.log(`
            id: ${sP.id}
            name: ${sP.name}
            price: ${sP.price}
            category: ${sP.category}
            quantity: ${sP.quantity}
            `);
}
//case5
function deleteCT() {
    let idDelete = parseInt(prompt("Nhập ID muốn xóa:"));
    let index = array.findIndex(sP => sP.id === idDelete);

    if (index === -1) {
        console.log("Không tìm thấy liên hệ!");
    } else {
        array.splice(index, 1);
        console.log(`Đã xóa liên hệ có ID: ${idDelete}`);
    }
}

// case6
function filterPrice() {
    let min = +prompt("Moi nhap gia toi thieu");
    let max = +prompt("Moi nhap gia toi da");
    let newArray = array.filter((product) =>product.spice >= min && product.spice <= max);
    console.log(newArray);
    
}

do {
    console.log("================= QUAN LY SAN PHAM ==============");
    console.log("1. Thêm sản phẩm vào danh sách sản phẩm.");
    console.log("2. Hiển thị tất cả sản phẩm.");
    console.log("3. Hiển thị chi tiết sản phẩm theo id.");
    console.log("4. Cập nhật thông tin sản phẩm (name, price, category, quantity) theo id sản phẩm.");
    console.log("5. Xóa sản phẩm theo id.");
    console.log("6. Lọc sản phẩm theo khoảng giá.");
    console.log("7. Thoát");

    chose = parseInt(prompt("Moi chon chuc nang: "));

    switch (chose) {
        case 1:
            inputSP();
            break;
        case 2:
            showListSP();
            break;
        case 3:
            showListSPbyID();
            break;
        case 4:
            updateSP();
            break;
        case 5:
            deleteCT();
            break;
        case 6:
            filterPrice();
            break;
        case 7:
            console.log("Dax thoát chương trình.");
            break;
        default:
            console.log("Lựa chọn không hợp lệ!");
    }
} while (chose !== 7);
