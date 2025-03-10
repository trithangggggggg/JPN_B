console.log("============================MENU========================");
console.log("1. Nhập số phần tử cần nhập và giá trị các phần tử ");
console.log("2. In ra giá trị các phần tử đang quản lý ");
console.log("3. In ra các phần tử chẵn, tính tổng và sắp xếp giảm dần");
console.log("4. In ra giá trị lớn nhất, nhỏ nhất và vị trí của chúng ");
console.log("5. In ra các số nguyên tố trong mảng và tính tổng ");
console.log("6. Nhập một số và đếm số lần xuất hiện trong mảng ");
console.log("7. Thêm một phần tử vào vị trí chỉ định ");
console.log("8. Xóa một phần tử theo giá trị ");
console.log("9. Sắp xếp mảng theo thứ tự tăng dần hoặc giảm dần ");
console.log("0. Thoát");
console.log("==============================================================");

let chose;
let arr = [];
do {
    chose = +prompt("lua chon cua ban: ");
    switch (chose) {
        case 1: {
            let number = +prompt("Nhập số lượng phần tử");
            for (let i = 0; i < number; i++) {
                let num = +prompt(`Nhap gia tri phan tu thu ${i + 1}`);
                arr.push(num);
            }
            break;
        }

        case 2: {
            for (let i = 0; i < arr.length; i++) {
                console.log(`arr[${i}] = ${arr[i]}`);
            }
            break;
        }

        case 3: {
            let sum = 0;
            let count = 0;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] % 2 == 0) {
                    count++;
                    console.log(`Phan tu chan ${count}`);
                    sum += arr[i];
                }
                for (let j = 0; j < arr.length - 1 - i; j++) {
                    if (arr[j] < arr[j + 1]) {
                        let temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }
            }
            console.log(`Tong cac phan tu chan la ${arr}`);
            console.log(`Manng sau khi da sap xep la ${arr[j]}`);
            break;
        }

        case 4: {
            let min = arr[0];
            let max = arr[0];
            let minIndex;
            let maxIndex;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] > max) {
                    max = arr[i];
                    maxIndex = i;
                }
                if (arr[i] < min) {
                    min = arr[i];
                    minIndex = i;
                }
            }
            console.log(`Gia tri lon nhat la ${max} o vi tri thu ${maxIndex} trong mang`);
            console.log(`Gia tri nho nhat la ${min} o vi tri thu ${minIndex} trong mang`);
            break;
        }
        case 5: {
            let sumNT = 0;
            for (let i = 1; i < arr.length; i++) {
                console.log(arr[i]);
                let count = 0;
                for (let j = 1; j <= arr[j]; j++) {
                    if (arr[j] % j == 0) {
                        count++;
                        sumNT += arr[j];
                    }
                }
                if (count == 2) {
                    console.log(`${arr[j]} la so nguyen to`);
                }
            }
            console.log(`Tong cac so nguyen to la ${sumNT}`);

            break;
        }
        case 6: {
            break;
        }
        case 7: {
            break;
        }
        case 8: {
            break;
        }
        case 9: {
            break;
        }
    }
} while (chose != 0);