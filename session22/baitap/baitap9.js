let arr = [4, 5, 4, 6, 1, 9, 6, 4, 4, 3];
let number = [];
for (let i = 0; i < arr.length; i++) {
    if (!number.includes(arr[i])) {
        number.push(arr[i]);
    }
}
for (let i = 0; i < number.length - 1; i++) {
    for (let j = i + 1; j < number.length; j++) {
        if (number[i] > number[j]) {
            let temp = number[i];
            number[i] = number[j];
            number[j] = temp;
        }
    }
}
number.slice();
console.log(number);
