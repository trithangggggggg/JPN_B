let arr = [];
let maxIndex;
for (let i = 0; i < 10; i++) {
    let num = parseInt(prompt(`nhap phan tu thu ${i + 1} cua mang: `));
    arr.push(num);
}
let max = arr[0];
for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
        max = arr[i];
        maxIndex = i;
    }
}
console.log(`So lon nhat: ${max}`);
console.log(`Vi tri: ${maxIndex}`);

