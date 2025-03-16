let nhanvien = []; 

function inputNv() {
    let id = prompt("Nhap ID nhan vien: ");
    let ten = prompt("Nhap ten nhan vien: ");
    let vitri = prompt("Nhap vi tri: ");
    let luong = parseFloat(prompt("Nhap muc luong: "));

    nhanvien.push({ id, ten, vitri, luong });
    console.log("Nhan vien da duoc them thanh cong!");
}



function deleteNv() {
    let id = prompt("Nhap ID nhan vien can xoa: ");
    let index = nhanvien.findIndex(nv => nv.id === id);

    if (index !== -1) {
        let xacnhan = prompt(`Ban co chac chan muon xoa nhan vien ${nhanvien[index].ten} (y/n): `);
        if (xacnhan.toLowerCase() === 'y') {
            nhanvien.splice(index, 1);
            console.log("Nhan vien da duoc xoa");
        } else {
            console.log("Huy xoa nhan vien.");
        }
    } else {
        console.log("Khong tim thay nhan vien co ID nay");
    }
}

function updateMoney() {
    let id = prompt("Nhap ID nhan vien can cap nhat luong: ");
    let nv = nhanvien.find(nv => nv.id === id);

    if (nv) {
        let luongMoi = parseFloat(prompt("Nhap muc luong moi: "));
        nv.luong = luongMoi;
        console.log("Muc luong da duoc cap nhat");
    } else {
        console.log("Khong tim thay nhan vien co ID nay");
    }
}

function findNv() {
    let ten = prompt("Nhap ten nhan vien can tim: ");
    let ketqua = nhanvien.filter(nv => nv.ten.toLowerCase().includes(ten.toLowerCase()));

    if (ketqua.length > 0) {
        console.log("Danh sach nhan vien tim thay:");
        console.table(ketqua);
    } else {
        console.log("Khong tim thay nhan vien nao!");
    }
}

function menu() {
    let chose;
    do {
        console.log("===== QUAN LY NHAN VIEN =====");
        console.log("1. Them nhan vien");
        console.log("2. Xoa nhan vien");
        console.log("3. Cap nhat luong nhan vien");
        console.log("4. Tim kiem nhan vien");
        console.log("5. Thoat");

        chose = parseInt(prompt("Moi chon chuc nang: "));

        switch (chose) {
            case 1:
                inputNv();

                break;
            case 2:
                deleteNv();
                break;
            case 3:
                updateMoney();
                break;
            case 4:
                findNv();
                break;
            case 5:
                console.log("Thoat chuong trinh.");
                break;
            default:
                console.log("Lua chon khong hop le");
        }
    } while (chose !== 5);
}

menu();

