function sum(a, b) {
    if (!Number.isInteger(a) && !Number.isInteger(b)){
        console.log("Du lieu khong hop le");
    }else{
        return `tong cua 2 so ${a} va ${b} la ${a + b}`;
    }
}
console.log(sum(4, 5));

