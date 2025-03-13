let n = +prompt("Moi nhap so mang");
let arr = [];
let number = +prompt("Moi nhap so phan tu");
for (let i = 0; i < number; i++) {
    let a = +prompt("Moi nhap so bat ki");
    arr.push(a);
}

function splitArray(arr, n) {
    let result = [];
    for (let i = 0; i < arr.length; i += n) {
        result.push(arr.slice(i, i + n));
    }
    return result;
}
console.log(splitArray(arr, n));
