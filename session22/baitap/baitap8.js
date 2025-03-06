let array = prompt("Moi ban hap mot mang so nguyen gonm 10 phan tu ");
let counts = {};
let arr = array.split("");

for (let i = 0; i < arr.length; i++) {
    let num = arr[i];
    if (counts[num] === undefined) {
        counts[num] = 1;
    } else {
        counts[num]++;
    }
}
let maxCount = 0;
let minValue = Infinity;

for (let key in counts) {
    let value = parseInt(key);
    let count = counts[key];

    if (count > maxCount) {
        maxCount = count;
        minValue = value;
    } else if (count === maxCount && value < minValue) {
        minValue = value;
    }
}

console.log(`Phần tử xuất hiện nhiều nhất là: ${minValue}`);