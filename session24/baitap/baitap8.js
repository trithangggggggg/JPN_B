let choice;
let str = "";

do {
    console.log("================ MENU ================");
    console.log("1. Nhap chuoi");
    console.log("2. Hien thi chuoi");
    console.log("3. Tim tu con trung lap va so lan xuat hien");
    console.log("4. Tim tu dai nhat va ngan nhat");
    console.log("5. Thoat");
    console.log("======================================");

    choice = +prompt("Nhap lua chon:");

    switch (choice) {
        case 1: {
            str = prompt("Nhap chuoi:");
            break;
        }

        case 2: {
            console.log(`Chuoi hien tai: ${str}`);
            break;
        }

        case 3: {
            let words = [], count = [], temp = "";
            
            for (let i = 0; i <= str.length; i++) {
                if (i === str.length || str[i] === " ") {
                    if (temp) {
                        let found = false;
                        for (let j = 0; j < words.length; j++) {
                            if (words[j] === temp) {
                                count[j]++;
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            words.push(temp);
                            count.push(1);
                        }
                        temp = "";
                    }
                } else {
                    temp += str[i].toLowerCase();
                }
            }

            for (let i = 0; i < words.length; i++) {
                console.log(`${words[i]}: ${count[i]}`);
            }
            break;
        }

        case 4: {
            let minW = "", maxW = "", temp = "";
            
            for (let i = 0; i <= str.length; i++) {
                if (i === str.length || str[i] === " ") {
                    if (temp) {
                        if (!minW || temp.length < minW.length) minW = temp;
                        if (!maxW || temp.length > maxW.length) maxW = temp;
                        temp = "";
                    }
                } else {
                    temp += str[i];
                }
            }

            console.log(`Tu ngan nhat: ${minW}`);
            console.log(`Tu dai nhat: ${maxW}`);
            break;
        }

        case 5: {
            console.log("Thoat chuong trinh ");
            break;
        }
    }
} while (choice !== 5);
