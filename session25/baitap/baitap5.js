function checkArray(arr) {
    if (!Array.isArray(arr)) {
        console.log("khong hop le");
        return;
    }
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (Number.isInteger(arr[i]) && arr[i] > 0) {
            count++;
        }
    }
    if (count > 0) {
        console.log(`So luong so nguyen duong co trong mang la ${count}`);
    } else {
        console.log("Mang khong co so nguyen duong");
    }
}
checkArray([1, 2, 5, 7, -8, 6]);