// Khởi tạo dữ liệu ban đầu 
let monthlyCategories = JSON.parse(localStorage.getItem("monthlyCategories")) || [
    {
        id: 1,
        month: "2024-03",
        categories: [
            { id: 1, name: "Ăn uống", budget: 18000000 },
            { id: 3, name: "Đi lại", budget: 5000000 },
            { id: 5, name: "Tiền nhà", budget: 20000000 }
        ],
        amount: 4000000
    },
    {
        id: 2,
        month: "2024-04",
        categories: [
            { id: 2, name: "Mua sắm", budget: 18000000 },
            { id: 4, name: "Giải trí", budget: 10000000 },
            { id: 1, name: "Ăn uống", budget: 18000000 }
        ],
        amount: 5000000
    }
];

let transactions = JSON.parse(localStorage.getItem("transactions")) || [
    {
        id: 1,
        userId: 1,
        month: "2024-03",
        categoryId: 1,
        amount: 150000,
        date: "2024-03-10"
    },
    {
        id: 2,
        userId: 1,
        month: "2024-03",
        categoryId: 3,
        amount: 50000,
        date: "2024-03-15"
    }
];

let monthlyReports = JSON.parse(localStorage.getItem("monthlyReports")) || [
    {
        userId: 1,
        month: "2024-03",
        totalAmount: 200000,
        details: [
            { categoryId: 1, amount: 150000 },
            { categoryId: 3, amount: 50000 },
        ]
    },
    {
        userId: 1,
        month: "2024-04",
        totalAmount: 120000,
        details: [
            { categoryId: 4, amount: 120000 },
        ]
    },
];

let selectedMonth = "";
let searchKeyword = "";
let sortOrder = "asc"; // ascending (tăng dần) "desc" (nhỏ dần)
let itemsPerPage = 10;
let currentPage = 1;

// Lưu dữ liệu vào localStorage
function saveToLocalStorage() {
    localStorage.setItem("monthlyCategories", JSON.stringify(monthlyCategories));
    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("monthlyReports", JSON.stringify(monthlyReports));
    showNotification("Đã lưu dữ liệu thành công!");
}

// Làm mới giao diện
function refreshUI() {
    let currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
    if (currentMonthData) {
        document.getElementById("remainingAmount").textContent = `${currentMonthData.amount.toLocaleString()} VND`;
    }
    displayTransactions();
    displayStats();
}

// Khi trang tải lấy tháng đã lưu và hiển thị dữ liệu 
document.addEventListener("DOMContentLoaded", () => {
    selectedMonth = localStorage.getItem("selectedMonth") || "";
    if (selectedMonth) {
        document.getElementById("monthInput").value = selectedMonth;
    }

    document.getElementById("account").addEventListener("change", function () {
        if (this.value === "logout") {
            logout();
        }
    });

    displayCategories();
    refreshUI();
});

// ===================================CHỨC NĂNG=========================================

// A =======selecMonth============//
// Chọn tháng
function chooseMonth() {
    selectedMonth = document.getElementById("monthInput").value;
    localStorage.setItem("selectedMonth", selectedMonth);
    if (!monthlyCategories.find(m => m.month === selectedMonth)) {
        monthlyCategories.push({
            id: monthlyCategories.length + 1,
            month: selectedMonth,
            categories: [],
            amount: 0
        });
    }
    saveToLocalStorage();
    refreshUI();
}

// B ==========input New Budget=========//
// Lưu ngân sách
function storeBudget() {
    let input = document.getElementById("budgetInput");
    let valueString = input.value;
    let numberString = "";
    for (let i = 0; i < valueString.length; i++) {
        let char = valueString[i];
        if (char >= "0" && char <= "9") {
            numberString += char;
        }
    }
    let budget = parseInt(numberString);

    if (!selectedMonth) {
        showNotification("Vui lòng chọn tháng trước!");
        return;
    }
    if (isNaN(budget) || budget <= 0) {
        showNotification("Vui lòng nhập số tiền hợp lệ!");
        return;
    }

    let monthData = monthlyCategories.find(m => m.month === selectedMonth);
    if (monthData) {
        monthData.amount = budget;
    }

    saveToLocalStorage();
    refreshUI();
    input.value = "";
    showNotification("Ngân sách đã được lưu thành công!");
}

// C - số dư 


// D  ==================== QUẢN LÝ DANH MỤC =======================
// D.1: Hiển thị danh mục
function displayCategories() {
    let categoryList = document.getElementById("categoryList");
    let currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
    if (!currentMonthData) {
        categoryList.innerHTML = "";
        return;
    }

    categoryList.innerHTML = currentMonthData.categories.map((category, index) => `
        <li>
            <span>${category.name} - Giới hạn: ${category.budget.toLocaleString()} VND</span>
            <div class="btn-group">
                <button class="edit-btn" onclick="updateCategory(${index})">Sửa</button>
                <button class="delete-btn" onclick="removeCategory(${index})">Xóa</button>
            </div>
        </li>
    `).join("");
    displayCategoryOptions();
}

//D.2: Hiển thị tùy chọn danh mục
function displayCategoryOptions() {
    let expenseCategory = document.getElementById("expenseCategory");
    let currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
    if (!currentMonthData) {
        expenseCategory.innerHTML = "<option value=''>Chọn danh mục</option>";
        return;
    }

    expenseCategory.innerHTML = "<option value=''>Chọn danh mục</option>" +
        currentMonthData.categories.map(category => `<option value='${category.id}'>${category.name}</option>`).join("");
}

// D.3: Thêm danh mục
function createCategory() {
    let categoryName = document.getElementById("categoryName").value.trim();
    let categoryLimit = parseInt(document.getElementById("categoryLimit").value.trim());
    if (!categoryName || isNaN(categoryLimit) || categoryLimit <= 0) {
        showNotification("Vui lòng nhập đầy đủ và hợp lệ!");
        return;
    }

    let currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
    if (!currentMonthData) {
        showNotification("Vui lòng chọn tháng trước!");
        return;
    }

    let newId = currentMonthData.categories.length > 0
        ? Math.max(...currentMonthData.categories.map(c => c.id)) + 1
        : 1;

    currentMonthData.categories.push({ id: newId, name: categoryName, budget: categoryLimit });
    saveToLocalStorage();
    displayCategories();
    document.getElementById("categoryName").value = "";
    document.getElementById("categoryLimit").value = "";
    showNotification("Đã thêm danh mục thành công!");
}

//D4: Sửa danh mục
function updateCategory(index) {
    let currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
    if (!currentMonthData) return;

    let tenMoi = prompt("Nhập tên danh mục mới:", currentMonthData.categories[index].name);
    let gioiHanMoi = prompt("Nhập giới hạn mới (VND):", currentMonthData.categories[index].budget);
    if (tenMoi && gioiHanMoi) {
        let giaTriGioiHan = parseInt(gioiHanMoi);
        if (isNaN(giaTriGioiHan) || giaTriGioiHan <= 0) {
            showNotification("Giới hạn không hợp lệ!");
            return;
        }
        currentMonthData.categories[index] = {
            id: currentMonthData.categories[index].id,
            name: tenMoi.trim(),
            budget: giaTriGioiHan
        };
        saveToLocalStorage();
        displayCategories();
        showNotification("Đã sửa danh mục thành công!");
    }
}

//D5:  Xóa danh mục
function removeCategory(index) {
    if (confirm("Bạn có chắc muốn xóa danh mục này?")) {
        let currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
        if (currentMonthData) {
            currentMonthData.categories.splice(index, 1);
            saveToLocalStorage();
            displayCategories();
            showNotification("Đã xóa danh mục thành công!");
        }
    }
}

// E =========================== THÊM GIAO DỊCH ===============================
//E1 - thêm giao dịch 
function createExpense() {
    let rawAmount = document.getElementById("expenseAmount").value;
    let amount = parseInt(rawAmount);

    if (isNaN(amount)) {
        amount = 0;
    }

    if (amount < 0) {
        amount = -amount;
    }

    let categoryId = parseInt(document.getElementById("expenseCategory").value);
    let note = document.getElementById("expenseNote").value.trim();

    if (!selectedMonth) {
        showNotification("Vui lòng chọn tháng trước!");
        return;
    }

    if (isNaN(amount) || amount <= 0 || isNaN(categoryId) || note === "") {
        showNotification("Vui lòng điền đầy đủ thông tin hợp lệ!");
        return;
    }

    let currentMonthData = null;
    for (let i = 0; i < monthlyCategories.length; i++) {
        if (monthlyCategories[i].month === selectedMonth) {
            currentMonthData = monthlyCategories[i];
            break;
        }
    }

    if (currentMonthData.amount === 0) {
        showNotification("Vui lòng thiết lập ngân sách trước!");
        return;
    }

    let newTransaction = {
        id: Date.now(),
        userId: 1,
        month: selectedMonth,
        categoryId: categoryId,
        amount: amount,
        note: note,
        date: new Date().toLocaleDateString("vi-VN")
    };
    transactions.push(newTransaction);

    let report = null;
    for (let i = 0; i < monthlyReports.length; i++) {
        if (monthlyReports[i].month === selectedMonth && monthlyReports[i].userId === 1) {
            report = monthlyReports[i];
            break;
        }
    }

    if (report === null) {
        report = {
            userId: 1,
            month: selectedMonth,
            totalAmount: 0,
            details: []
        };
        monthlyReports.push(report);
    }

    report.details.push({
        categoryId: categoryId,
        amount: amount
    });

    report.totalAmount += amount;

    currentMonthData.amount -= amount;

    saveToLocalStorage();
    refreshUI();

    document.getElementById("expenseAmount").value = "";
    document.getElementById("expenseNote").value = "";

    showNotification("Đã thêm giao dịch thành công!");
}


// E2 - Hiển thị giao dịch
function displayTransactions() {
    let currentMonthData = null;
    for (let i = 0; i < monthlyCategories.length; i++) {
        if (monthlyCategories[i].month === selectedMonth) {
            currentMonthData = monthlyCategories[i];
            break;
        }
    }

    let transactionList = document.getElementById("transactionList");

    if (currentMonthData === null) {
        transactionList.innerHTML = "";
        return;
    }

    let filteredTransactions = [];
    for (let i = 0; i < transactions.length; i++) {
        let t = transactions[i];
        if (t.month === selectedMonth) {
            if (searchKeyword === "" || t.date.toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1) {
                filteredTransactions.push(t);
            }
        }
    }

    if (sortOrder === "asc") {
        filteredTransactions.sort(function (a, b) {
            return a.amount - b.amount;
        });
    } else {
        filteredTransactions.sort(function (a, b) {
            return b.amount - a.amount;
        });
    }

    let totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    let start = (currentPage - 1) * itemsPerPage;
    let end = currentPage * itemsPerPage;
    let paginatedTransactions = filteredTransactions.slice(start, end);

    let html = "";
    for (let i = 0; i < paginatedTransactions.length; i++) {
        let expense = paginatedTransactions[i];
        let category = null;
        for (let j = 0; j < currentMonthData.categories.length; j++) {
            if (currentMonthData.categories[j].id === expense.categoryId) {
                category = currentMonthData.categories[j];
                break;
            }
        }

        let name = category ? category.name : "Không xác định";
        let hienSoTien = expense.amount;
        if (hienSoTien < 0) {
            hienSoTien = -hienSoTien;
        }

        let ghiChu = expense.note ? " - " + expense.note : "";

        html += "<li><span>" + name + ghiChu + ": " + hienSoTien.toLocaleString() + " VND</span>" +
            "<button class='delete-btn' onclick='removeExpense(" + expense.id + ")'>Xóa</button></li>";

    }

    transactionList.innerHTML = html;
    document.getElementById("pageNumbers").textContent = currentPage + "/" + (totalPages || 1);
}

//E3 -  Xóa giao dịch
function removeExpense(id) {
    let currentMonthData = null;
    for (let i = 0; i < monthlyCategories.length; i++) {
        if (monthlyCategories[i].month === selectedMonth) {
            currentMonthData = monthlyCategories[i];
            break;
        }
    }

    let expense = null;
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].id === id) {
            expense = transactions[i];
            break;
        }
    }

    if (expense === null) return;

    transactions = transactions.filter(function (t) {
        return t.id !== id;
    });

    for (let i = 0; i < monthlyReports.length; i++) {
        let report = monthlyReports[i];
        if (report.month === selectedMonth && report.userId === 1) {
            report.details = report.details.filter(function (d) {
                return d.categoryId !== expense.categoryId || d.amount !== expense.amount;
            });
            report.totalAmount -= expense.amount;
            break;
        }
    }

    currentMonthData.amount += expense.amount;

    saveToLocalStorage();
    refreshUI();
    showNotification("Đã xóa giao dịch thành công!");
}


//E4 -  Tìm kiếm giao dịch
function filterTransactions() {
    searchKeyword = document.getElementById("searchInput").value;
    displayTransactions();
}


//E5 -  Sắp xếp giao dịch
function sortTransactionsByAmount() {
    if (sortOrder === "asc") {
        sortOrder = "desc";
    } else {
        sortOrder = "asc";
    }
    displayTransactions();
}


// //  - --Phân trang
// function previousPage() {
//     if (currentPage > 1) {
//         currentPage--;
//         displayTransactions();
//     }
// }

// function nextPage() {
//     let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
//     let filteredTransactions = transactions.filter(t => t.month === selectedMonth);
//     let totalPages = Math.ceil(filteredTransactions.length / itemsPerPage) || 1;
//     if (currentPage < totalPages) {
//         currentPage++;
//         displayTransactions();
//     }
// }

// F Hiển thị thống kê
function displayStats() {
    let statsBody = document.getElementById("statsBody");
    statsBody.innerHTML = monthlyCategories.map(data => {
        let report = monthlyReports.find(r => r.month === data.month && r.userId === 1);
        let totalExpenses = report ? report.totalAmount : 0;
        let totalBudget = data.categories.reduce((sum, c) => sum + c.budget, 0);
        return `
            <tr>
                <td>${data.month}</td>
                <td>${totalExpenses.toLocaleString()} VND</td>
                <td>${totalBudget.toLocaleString()} VND</td>
                <td class="${data.amount >= 0 ? 'status-ok' : 'status-over'}">
                    ${data.amount >= 0 ? 'Đạt ✅' : 'Không đạt ❌'}
                </td>
            </tr>
        `;
    }).join("");
}




// ============================ E N D =====================================
// Đăng xuất
function logout() {
    Swal.fire({
        title: "Bạn có chắc muốn thoát?",
        text: "Bạn sẽ không thể hoàn tác điều này!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Vâng, tôi muốn thoát!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Đã thoát account thành công!!",
                text: "Tài khoản của bạn đã được đăng xuất",
                icon: "success",
            }).then(() => {
                window.location.href = "login.html";
            });
        }
        document.getElementById("account").value = "user";
    });
}

// Hiển thị thông báo snackbar 
function showNotification(message) {
    let snackbar = document.getElementById("snackbar");
    snackbar.textContent = message;
    snackbar.className = "show";
    setTimeout(() => snackbar.className = snackbar.className.replace("show", ""), 3000);
}