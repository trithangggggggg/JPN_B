function isPalindrome() {
    let text = prompt("Moi ban nhap chuoi:");
    let flag = 1;
    for (let i = 0; i < text.length / 2; i++) {
        if (text[i] !== text[text.length - 1 - i]) {
            flag = 0;
            break;
        }
    }

    if (flag === 1) {
        console.log("Day la chuoi doi xung!");
    } else {
        console.log("Day khong phai chuoi doi xung.");
    }
}

isPalindrome();
