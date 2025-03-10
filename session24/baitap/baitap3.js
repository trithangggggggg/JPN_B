console.log("1. Nhập mảng số nguyên");
console.log("2. Hiển thị mảng");
console.log("3. Tìm phần tử lớn nhất trong mảng và in ra chỉ số của nó");
console.log("4. Tính tổng và trung bình cộng của các số dương trong mảng");
console.log("5. Đảo ngược mảng");
console.log("6. Kiểm tra mảng có đối xứng không");
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
            let max = -Infinity;
            let index = -1;

            for (let i = 0; i < arr.length; i++) {
                if (arr[i] > max) {
                    max = arr[i];
                    index = i;
                }
            }

            console.log(`So lon nhat la ${max} tai chi so ${index}`);
            break;
        case 4:
            let sum = 0;
            let count = 0;

            for (let i = 0; i < arr.length; i++) {
                if (arr[i] > 0) {
                    sum += arr[i];
                    count++;
                }
            }

            let tbc = count > 0 ? sum / count : 0;

            console.log(`Tong so duong: ${sum}`);
            console.log(`Trung binh cong so duong: ${tbc}`);
            break;

        case 5:
            let reversedArr = [];

            for (let i = arr.length - 1; i >= 0; i--) {
                reversedArr.push(arr[i]);
            }

            console.log(`Mang dao nguoc: ${reversedArr}`);
            break;
        case 6:
            let isSymmetric = true;

            for (let i = 0; i < arr.length / 2; i++) {
                if (arr[i] !== arr[arr.length - 1 - i]) {
                    isSymmetric = false;
                    break;
                }
            }
            console.log(isSymmetric ? "Mang doi xung" : "Mang khong doi xung");
            break;
        case 7:
            console.log("thoat chuong trinh");

            break;
    }
} while (chose != 7)
