function checkArray(arr) {
    if (!Array.isArray(arr)) {
        console.log("Du lieu khong hop le");
        return;
    } else if (arr.length === 0) {
        console.log("Mang khong co du lieu");
        return;
    } else {
        let binhPhuong = [];
        for (let i = 0; i < arr.length; i++) {
            binhPhuong.push(arr[i] * arr[i]);
        }
        let soChan = [];
        for (let i = 0; i < binhPhuong.length; i++) {
            if (binhPhuong[i] % 2 === 0) {
                soChan.push(binhPhuong[i]);
            }
        }
        return soChan;
    }
}
console.log(checkArray([2, 5, 10]))  
console.log(checkArray([]))  
console.log(checkArray("abc"))  