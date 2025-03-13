function nhapDanhSach(arr) {
    let n = +prompt("Nhap so luong phan tu:");
    for (let i = 0; i < n; i++) {
        let num = +prompt("Nhap so thu " + (i + 1) + ":");
        arr.push(num);
    }
}

function tinhTrungBinh(arr) {
    let tong = 0;
    for (let i = 0; i < arr.length; i++) {
        tong = tong + arr[i];
    }
    let tb = arr.length > 0 ? tong / arr.length : 0;
    console.log("Trung binh cac so: " + tb);
}

function timSoChanLonNhat(arr) {
    let maxChan = null;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0 && (maxChan === null || arr[i] > maxChan)) {
            maxChan = arr[i];
        }
    }
    console.log("So chan lon nhat: " + (maxChan !== null ? maxChan : "Khong co"));
}

function timSoLeNhoNhat(arr) {
    let minLe = null;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 !== 0 && (minLe === null || arr[i] < minLe)) {
            minLe = arr[i];
        }
    }
    console.log("So le nho nhat: " + (minLe !== null ? minLe : "Khong co"));
}

let arr = [];
let chon;
do {
    console.log("========MENU========");
    console.log("1. Nhap danh sach so nguyen.");
    console.log("2. Tinh trung binh cac so.");
    console.log("3. Tim so chan lon nhat.");
    console.log("4. Tim so le nho nhat.");
    console.log("5. Thoat.");

    chon = +prompt("Moi ban nhap lua chon:");

    switch (chon) {
        case 1:
            nhapDanhSach(arr);
            break;
        case 2:
            tinhTrungBinh(arr);
            break;
        case 3:
            timSoChanLonNhat(arr);
            break;
        case 4:
            timSoLeNhoNhat(arr);
            break;
        case 5:
            console.log("Thoat chuong trinh.");
            break;
        default:
            console.log("Lua chon khong hop le, vui long nhap lai.");
            break;
    }

} while (chon !== 5);
