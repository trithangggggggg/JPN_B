function checkPrimeArray(arr) {
    if (!Array.isArray(arr)) {
        console.log("Du lieu khong hop le");
        return;
    } else if (arr.length === 0) {
        console.log("Mang khong co du lieu");
        return;
    } else {
        let soNguyenToLe = [];

        for (let i = 0; i < arr.length; i++) {
            let num = arr[i];
            if (num > 1 && num % 2 !== 0) {
                let isPrime = true;
                for (let j = 2; j * j <= num; j++) {
                    if (num % j === 0) {
                        isPrime = false;
                        break;
                    }
                }
                if (isPrime) {
                    soNguyenToLe.push(num);
                }

            }

            // return soNguyenToLe;
        }
        return soNguyenToLe;
    }
}
console.log(checkPrimeArray([10, 2, 3, 5, 7, 9]))  
console.log(checkPrimeArray([]))  
console.log(checkPrimeArray("abc"))  
