let cart = [];
let chose;

let product = [
    {
        id: 1,
        name: "Men men",
        price: 20000,
        quantity: 20,
        category: "Mon an dan toc Mong"
    },
    {
        id: 2,
        name: "Bun bo Hue",
        price: 80000,
        quantity: 21,
        category: "Mon an dan toc Kinh"
    },
    {
        id: 3,
        name: "Com lam",
        price: 40000,
        quantity: 15,
        category: "Mon an dan toc Mong"
    },
    {
        id: 4,
        name: "Banh dau xanh",
        price: 60000,
        quantity: 30,
        category: "Mon an dan toc Kinh"
    },
];
//case1
function showProduct() {
    let choice = +prompt("Moi ban nhap lua chon mon an dan toc: 1. Kinh / 2. Mong");
    let result;
    if (choice == 1) {
        result = products.filter(p => p.category === "Mon an dan toc Kinh");
    } else if (choice == 2) {
        result = products.filter(p => p.category === "Mon an dan toc Mong");
    } else {
        console.log("Lua chon khong hop le");
        return;
    }
    console.log("Danh sach san pham:", result);
}

//cáe2
function choseProducts() {
    let choseId = +prompt("Moi ban nhap id san pham");
    let indexProduct = products.findIndex(p => p.id === choseId);
    if (indexProduct === -1) {
        console.log("San pham khong co trong cua hang");
        return;
    }
    let choseQuantity = +prompt("Moi ban nhap so luong san pham muon mua");
    if (products[indexProduct].quantity < choseQuantity) {
        console.log(`San pham chi con ${products[indexProduct].quantity}`);
        return;
    }
    products[indexProduct].quantity -= choseQuantity;
    let indexCart = cart.findIndex(item => item.id === choseId);
    if (indexCart === -1) {
        cart.push({
            id: choseId,
            name: products[indexProduct].name,
            quantity: choseQuantity,
            price: products[indexProduct].price,
            category: products[indexProduct].category
        });
    } else {
        cart[indexCart].quantity += choseQuantity;
    }
    console.log("Gio hang hien tai:", cart);
}

//case33
function sortProducts() {
    let order = +prompt("Sap xep theo gia: 1. Tang dan / 2. Giam dan");
    if (order == 1) {
        products.sort((a, b) => a.price - b.price);
    } else if (order == 2) {
        products.sort((a, b) => b.price - a.price);
    } else {
        console.log("Lua chon khong hop le");
        return;
    }
    console.log("Danh sach san pham sau khi sap xep:", products);
}

//case4
function calculateTotal() {
    if (cart.length === 0) {
        console.log("Gio hang rong");
        return;
    }
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    console.log(`Tong tien thanh toan: ${total} VND`);
}

do {
    console.log("=========QUAN LY UNG DUNG MUA HANG=================");
    console.log("1. Hien thi cac san pham theo ten danh muc.");
    console.log("2. Chon san pham de mua bang cach nhap id san pham");
    console.log("3. Sap xep cac san pham trong cua hang theo gia (Tang dan/Giam dan)");
    console.log("4. Tinh so tien thanh toan trong gio hang.");
    console.log("5. Thoat.");

    chose = +prompt("Moi ban nhap lua chon");
    switch (chose) {
        case 1:
            showProduct();
            break;
        case 2:
            choseProducts();
            break;
        case 3:
            sortProducts();
            break;
        case 4:
            calculateTotal();
            break;
        case 5:
            console.log("Bye bye");
            break;
        default:
            console.log("Lua chon khong hop le, vui long thu lai");
            break;
    }
} while (chose != 5);