let menu;
let chose;

function addMenu() {
    let category = prompt("Nhập tên danh mục:");
    let name = prompt("Nhập tên món ăn:");
    let price = Number(prompt("Nhập giá món ăn:"));
    let description = prompt("Nhập mô tả món ăn:");

    const dish = {
        name,
        price,
        description
    };
    menu[category].push(dish);
    
    console.log(`Đã thêm món ăn ${name} vào danh mục ${category}`);
}

function removeMenu() {
    let category = prompt("Nhập tên danh mục:");
    let name = prompt("Nhập tên món ăn cần xóa:");
    
    if (!menu[category]) {
        console.log(`Không tìm thấy danh mục ${category}`);
        return;
    }
    
    let index = menu[category].findIndex(dish => dish.name === name);
    
    if (index === -1) {
        console.log(`Không tìm thấy món ăn "${name}" trong danh mục "${category}"`);
        return;
    }
    
    menu[category].splice(index, 1);
    console.log(`Đã xóa món ăn "${name}" khỏi danh mục "${category}"`);
    
}

function updateMenu() {
    let category = prompt("Nhập tên danh mục:");
    let name = prompt("Nhập tên món ăn cần cập nhật:");
    
    if (!menu[category]) {
        console.log(`Không tìm thấy danh mục "${category}" `);
        return;
    }
    
    let dish = menu[category].find(item => item.name === name);
    
    if (!dish) {
        console.log(`Không tìm thấy món ăn "${name}" trong danh mục "${category}"`);
        return;
    }
    
    dish.name = prompt("Nhập tên mới:");
    dish.price = Number(prompt("Nhập giá mới:"));
    dish.description = prompt("Nhập mô tả mới:");
    
    console.log(`Đã cập nhật thông tin món ăn "${name}".`);
    
}

function showAllMenu() {
    for (let category in menu) {
        console.log(`--- ${category} ---`);
        for (let i = 0; i < menu[category].length; i++) {
            let dish = menu[category][i];
            console.log(`- ${dish.name}: ${dish.price} VND - ${dish.description}`);
        }
    }
}
function searchDish() {
    let name = prompt("Nhập tên món ăn cần tìm:");
    let found = false;
    
    for (let category in menu) {
        for (let i = 0; i < menu[category].length; i++) {
            let dish = menu[category][i];
            if (dish.name === name) {
                console.log(`Tìm thấy món ăn "${name}" trong danh mục "${category}":`);
                console.log(`- Giá: ${dish.price} VND`);
                console.log(`- Mô tả: ${dish.description}`);
                found = true;
            }
        }
    }
    if (!found) {
        console.log(`Không tìm thấy món ăn "${name}" trong menu.`);
    }
}


do {
    console.log("======QUAN LY MENU NHA HANG=====");
    console.log("1. Thêm món ăn vào danh mục");
    console.log("2. Xóa món ăn khỏi danh mục");
    console.log("3. Cập nhật thông tin món ăn");
    console.log("4. Hiển thị toàn bộ menu");
    console.log("5. Tìm kiếm món ăn theo tên");
    console.log("6. Thoát");
    choice = parseInt(prompt("Nhập lựa chọn của bạn:"));

    switch (chose) {
        case 1:
            addMenu();
            break;
        case 2:
            removeMenu();
            break;
        case 3:
            updateMenu();
            break;
        case 4:
            showAllMenu();
            break;
        case 5:
            searchDish();
            break;
        case 6:
            console.log("Chương trình kết thúc.");
            break;
        default:
            console.log("Lựa chọn không hợp lệ");
    }
} while (chose !== 6);