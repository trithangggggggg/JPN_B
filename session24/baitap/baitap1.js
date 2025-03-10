console.log("1. Nhập mảng ");
console.log("2. Hiển thị mảng");
console.log("3. Tìm phần tử lớn nhất và nhỏ nhất trong mảng");
console.log("4. Tính tổng các phần tử trong mảng");
console.log("5. Tìm số lần xuất hiện của một phần tử trong mảng");
console.log("6. Sắp xếp mảng tăng dần");
console.log("7. Thoát chương trình");

let chose;
let arr = [];
do {
    chose = +prompt("lua chon cua ban: ");
    switch (chose) {
        case 1:
            let number = +prompt("Nhập số lượng phần tử");
            for (let i = 0; i < number; i++) {
                let num = +prompt(`Nhap gia tri phan tu thu ${i + 1}`);
                arr.push(num);
            }
            break;
        case 2:
            console.log(arr);
            break;
        case 3:
            let min = arr[0];
            let max = arr[0];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] > max) {
                    max = arr[i];
                }
                if (arr[i] < min) {
                    min = arr[i];
                }
            }
            console.log(`gia tri lon nhat ${max}`);
            console.log(`gia tri nho nhat ${min}`);
            break;
        case 4:
            let sum = 0;
            for (let i = 0; i < arr.length; i++) {
                sum += arr[i];
            }
            break;
        case 5:
            let count = 0;
            let findNumber = 0;
            for (let i = 0; i < arr.length; i++) {
                findNumber == arr[i] ? count++ : count;
            }
            console.log(`So lan xuat hien ${count}`);

            break;
        case 6:
            for (let i = 0; i < arr.length; i++) {
                for (let j = 1; j < arr.length - 1 - i; j++) {
                    if (arr[i] > arr[j]) {
                        let temp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = temp;
                    }
                }
            }
            break;
        case 7:
            console.log("thoat chuong trinh");
            break;
    }
} while (chose != 7);