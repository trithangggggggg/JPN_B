function checkNumber(number) {
    if (!Number.isInteger(number)) {
        console.log("Khong hop le");
        return;
    }
    let count = 0;
    for (let i = 1; i < number; i++) {
        if (number % i == 0) {
            count++;
        }
    }
    count == 1? console.log(` ${number} La so nguyen to`) : console.log(`${number} Khong phai so nguyen to`);
}
checkNumber(17);