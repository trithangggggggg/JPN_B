let arr = ["", false, 0, 5,  "Hello"];
let number = [];
for (let num of arr) {
    if (num) {
        number.push(num);
    }
}
console.log(number);