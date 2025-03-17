let tasks = [];
let nextId = 1;

function addTask() {
    let name = prompt("Nhap ten cong viec:");
    let description = prompt("Nhap mo ta cong viec:");
    let startTime = new Date().toLocaleString();
    let status = "Chua hoan thanh";

    const task = {
        id: nextId,
        name,
        description,
        startTime,
        status
    };
    tasks.push(task);
    
    console.log(`Da them cong viec "${name}" voi ID: ${nextId}`);
    nextId++;
}

function showAllTasks() {
    if (tasks.length === 0) {
        console.log("Danh sach cong viec trong!");
        return;
    }
    console.log("=== DANH SACH CONG VIEC ===");
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        console.log(`ID: ${task.id}`);
        console.log(`Ten: ${task.name}`);
        console.log(`Mo ta: ${task.description}`);
        console.log(`Thoi gian bat dau: ${task.startTime}`);
        console.log(`Trang thai: ${task.status}`);
        console.log("-".repeat(30));
    }
}

function updateTaskStatus() {
    let id = Number(prompt("Nhap ID cong viec can cap nhat:"));
    
    let task = tasks.find(item => item.id === id);
    
    if (!task) {
        console.log(`Khong tim thay cong viec voi ID "${id}"`);
        return;
    }
    
    let newStatus = prompt("Nhap trang thai moi (Hoan thanh/Chua hoan thanh):");
    if (newStatus === "Hoan thanh" || newStatus === "Chua hoan thanh") {
        task.status = newStatus;
        console.log(`Da cap nhat trang thai cong viec ID "${id}" thanh "${newStatus}"`);
    } else {
        console.log("Trang thai khong hop le!");
    }
}

function filterTasks() {
    let status = prompt("Nhap trang thai can loc (Hoan thanh/Chua hoan thanh):");
    let filtered = tasks.filter(task => task.status === status);
    
    if (filtered.length === 0) {
        console.log(`Khong co cong viec nao voi trang thai "${status}"`);
        return;
    }
    
    console.log(`=== CONG VIEC ${status.toUpperCase()} ===`);
    for (let i = 0; i < filtered.length; i++) {
        let task = filtered[i];
        console.log(`ID: ${task.id}`);
        console.log(`Ten: ${task.name}`);
        console.log(`Mo ta: ${task.description}`);
        console.log(`Thoi gian bat dau: ${task.startTime}`);
        console.log(`Trang thai: ${task.status}`);
        console.log("-".repeat(30));
    }
}

function sortTasks() {
    tasks.sort((a, b) => a.status.localeCompare(b.status));
    console.log("Da sap xep cong viec theo trang thai!");
    showAllTasks();
}

let chose;
do {
    console.log("=== QUAN LY CONG VIEC ===");
    console.log("1. Them cong viec moi");
    console.log("2. Hien thi tat ca cong viec");
    console.log("3. Cap nhat trang thai cong viec");
    console.log("4. Loc cong viec theo trang thai");
    console.log("5. Sap xep cong viec theo trang thai");
    console.log("6. Thoat");
    choice = parseInt(prompt("Nhap lua chon cua ban:"));

    switch (chose) {
        case 1:
            addTask();
            break;
        case 2:
            showAllTasks();
            break;
        case 3:
            updateTaskStatus();
            break;
        case 4:
            filterTasks();
            break;
        case 5:
            sortTasks();
            break;
        case 6:
            console.log("Tam biet!");
            break;
        default:
            console.log("Lua chon khong hop le");
    }
} while (chose !== 6);
