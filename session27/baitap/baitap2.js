
let arr = [];
let text;
let chose;

function inputName() {
    let soluong = +prompt("Moi nhap so luong sinh vien muon them");
    for (let i = 0; i < soluong; i++) {
        let name = prompt(`Nhap ten cua sinh vien thu ${i+1}`);
        arr.push(name);
    }
}
function showList() {
    if (arr.length == 0) {
        console.log("Danh sách sinh viên đang trống.");
    } else {
        console.log("Danh sách sinh viên:", arr);
    }
}


function findStudent() {
    let name = prompt("Nhập tên sinh viên cần tìm:");
    if (arr.includes(name)) {
        console.log(`Tìm thấy sinh viên: ${name}`);
    } else {
        console.log("Khong co trong danh sach.");
    }
}
function deleteStudent() {
    let name = prompt("Nhập tên sinh viên muốn xóa:");
    let index = arr.indexOf(name);
    if (index !== -1) {
        arr.splice(index, 1);
        console.log(`Đã xóa sinh viên: ${name}`);
    } else {
        console.log("Không tìm thấy sinh viên này.");
    }
}

    
do {
    console.log("========MENU========");
    console.log("1. Nhập danh sách sinh viên.");
    console.log("2. Hiển thị danh sách sinh viên.");
    console.log("3. Tìm sinh viên theo tên.");
    console.log("4. Xóa sinh viên khỏi danh sách.");
    console.log("5. Thoát.");

    chose = +prompt("Moi ban nhap lua chon");
    switch (chose) {
        case 1: 
            inputName();
            break;
        case 2:
            showList(arr);
            break;
        case 3:
            findStudent(arr);
            break;
        case 4:
            deleteStudent(arr);
            break;
        case 5:
            console.log("thoat chuong trinh");
            break;
        default:
            console.log("Khong hop le");
            break;
    }

} while (chose !== 5);