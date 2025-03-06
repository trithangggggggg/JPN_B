let numbers = [1, 4, 8, 7, 3, 3, 6, 2, 7, 3, 0, 6];
let luckyNumber = +prompt("Moi nhap so bat ki");
let count = 0;

for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] === luckyNumber) {
        count++;
    }
}

if (count > 0) {
    console.log(`So ${luckyNumber} xuat hien ${count} lan trong mang`);
} else {
    console.log(`So ${luckyNumber} khong xuat hien trong mang`);
}
