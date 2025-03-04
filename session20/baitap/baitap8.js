let n = +prompt("Moi ban nhap 1 so nguyen");
let count = 0;

for (let i = 2; count < n; i++) { 
    let flag = 0;
    
    for (let j = 2; j <= Math.sqrt(i); j++) {
        if (i % j === 0) {
            flag = 1;
            break;
        }
    }
    if (flag === 0) { 
        document.write(i);
        count++;
    }
}