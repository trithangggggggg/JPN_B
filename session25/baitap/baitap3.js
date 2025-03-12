function checkNumber(array) {
    let arrayNew = [];
    if (Array.isArray(array)) {
        for (let i = array.length - 1; i >= 0; i--) {
            if (array[i] % 2 == 0) {
                arrayNew.push(array[i]);
            }
        }
        arrayNew.length > 0 ? console.log(`So chan la ${arrayNew}`) : console.log("Mang ko co so chan");
    } else {
        console.log("Du lieu khong hop le");
    }
}
checkNumber([1, 2, 4, 6, 5, 2]);
checkNumber([2, 24,3,32]);
