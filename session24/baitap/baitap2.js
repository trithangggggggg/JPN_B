console.log("1. Nhập mảng số nguyên");
console.log("2. Hiển thị mảng");
console.log("3. Tìm các phần tử chẵn và lẻ");
console.log("4. Tính trung bình cộng của mảng");
console.log("5. Xóa phần tử tại vị trí chỉ định");
console.log("6. Tìm phần tử lớn thứ hai trong mảng");
console.log("7. Thoát chương trìnhh");

let chose;
let arr = [];
do {
    chose = +prompt("lua chon cua ban: ");
    switch (chose) {
        case 1:
            let number = +prompt("Nhap so phan tu muon nhap");
            for (let i = 0; i < number; i++) {
                let num = +prompt(`Nhap gia tri phan tu thu ${i + 1}`);
                arr.push(num);
            }
            break;
        case 2:
            console.log(arr);
            break;
        case 3:
            let countC = 0;
            let countL = 0;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] % 2 == 0) {
                    countC++;
                } else {
                    countL++;
                }
            }
            console.log(`chan: ${countC}`);
            console.log(`le: ${countL}`);
            break;
        case 4:
            let count = arr.length;
            let sum = 0;
            let tbc;
            for (let i = 0; i < arr.length; i++) {
                sum += arr[i];
            }
            tbc = sum / count;
            console.log(`Trung binh cong cua mang la ${tbc}`);
            break;
        case 5:
            let deleteIndex = +prompt(`Nhap vi tri phan tu muon xoa`);
            let removed = arr[deleteIndex];
            arr.splice(deleteIndex, 1);
            console.log(`Da xoa phan tu ${removed}vi tri thu ${[deleteIndex]}`);
            break;
        case 6:
            let max = -Infinity;
            let superMax = -Infinity;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] > superMax) {
                    superMax = arr[i];
                }
            }
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] > max && arr[i] < superMax) {
                    max = arr[i];
                }
            }
            console.log(`So lon thu 2 la ${max}`);
            
            break;
        case 7:
            console.log("thoat chuong trinh");
            
            break;
    }
} while (chose != 7);