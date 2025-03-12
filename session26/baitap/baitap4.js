let check1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let check2 = [];
let check3 = "abcasf"

function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) {
            return false
        }
    }
    return true;
}

function checkNumber(num) {
    if (Array.isArray(num)) {
        if (num.length == 0) {
            console.log("mang khong co phan tu");
            return;
        }
        let result = num.filter((item) => {
            return isPrime(item);
        })
        console.log(result);
        
    } else {
        console.log("du lieu khong hop le");
    }
}
checkNumber(check1);
checkNumber(check2);
checkNumber(check3);
