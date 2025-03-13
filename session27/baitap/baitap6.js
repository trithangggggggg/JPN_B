function checkNumber(arr) {
    let hieu = arr[1] - arr[0];
    for (let i = 2; i < arr.length; i++) {
        if (arr[i] - arr[i - 1] !== hieu) {
            return "Day khong phai day so cap so cong";
        }
    }
    return "Day la day cap so cap so cong";
}

console.log(checkNumber([1, 2, 3, 5])); 
console.log(checkNumber("abcabc")); 
