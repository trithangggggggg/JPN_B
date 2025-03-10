console.log("================ MENU ================");
console.log("1. Nhap mang 2 chieu");
console.log("2. Hien thi mang 2 chieu");
console.log("3. Tinh tong cac phan tu trong mang");
console.log("4. Tim so lon nhat trong mang va vi tri cua no");
console.log("5. Tinh trung binh cong cac phan tu cua mot hang");
console.log("6. Dao nguoc cac hang trong mang");
console.log("7. Thoat");
console.log("======================================");

let arr = [];
let choice;

do {
    choice = +prompt("Nhap lua chon:");

    switch (choice) {
        case 1:
            let row = +prompt("Nhap so hang:");
            let col = +prompt("Nhap so cot:");

            for (let i = 0; i < row; i++) {
                let temp = prompt(`Nhap hang ${i + 1} (cach nhau boi dau cach)`).split(" ").map(Number);
                if (temp.length !== col) {
                    console.log("Sai so luong phan tu! Nhap lai.");
                    i--;
                    continue;
                }
                arr.push(temp);
            }
            break;

        case 2:
            for (let i = 0; i < arr.length; i++) {
                console.log(`arr[${i}] = ${arr[i].join(" ")}`);
            }
            break;

        case 3:
            let sum = 0;
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr[i].length; j++) {
                    sum += arr[i][j];
                }
            }
            console.log("Tong: " + sum);
            break;

        case 4:
            let max = -Infinity;
            let rowMax = -1, colMax = -1;
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr[i].length; j++) {
                    if (arr[i][j] > max) {
                        max = arr[i][j];
                        rowMax = i;
                        colMax = j;
                    }
                }
            }
            console.log(`So lon nhat: ${max}, vi tri: [${rowMax}][${colMax}]`);
            break;

        case 5:
            let r = +prompt("Nhap chi so hang:");
            if (r >= 0 && r < arr.length) {
                let sumRow = 0;
                for (let j = 0; j < arr[r].length; j++) {
                    sumRow += arr[r][j];
                }
                console.log(`TBC hang ${r}: ${sumRow / arr[r].length}`);
            } else {
                console.log("Khong hop le");
            }
            break;

        case 6:
            for (let i = 0; i < arr.length; i++) {
                arr[i].reverse();
            }
            console.log("Mang sau khi dao nguoc cac hang:");
            for (let i = 0; i < arr.length; i++) {
                console.log(arr[i].join(" "));
            }
            break;

        case 7:
            console.log("Thoat chuong trinh");
            break;
    }
} while (choice !== 7);
