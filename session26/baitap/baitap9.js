function tinhTong(arr) {
    if (!Array.isArray(arr)) {
        console.log("Du lieu khong hop le");
        return;
    }

    if (arr.length === 0) {
        console.log("Mang khong co du lieu");
        return;
    }

    let sumC = 0;
    let sumL = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            sumC += arr[i];
        } else {
            sumL += arr[i];
        }
    }

    console.log(`Tong so chan = ${sumC} (\n) Tong so le = ${sumL}`);
}
console.log(tinhTong([1, 2, 3, 4, 5, 6, 7, 8, 9])); 
console.log(tinhTong([])); 
console.log(tinhTong("abc")); 