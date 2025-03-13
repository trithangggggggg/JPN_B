function maxNumber(n) {
    let num = n.toString().split('');
    num.sort(function(a, b) {
        return b - a;
    });
    return Number(num.join(''));
}
console.log(maxNumber(32429343));
