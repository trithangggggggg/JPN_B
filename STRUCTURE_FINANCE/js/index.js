// ===========================================================================
// =========== JAVASCRIPT QUẢN LÝ CHI TIÊU ====================================

// Khởi tạo dữ liệu ban đầu 
let monthlyCategories = JSON.parse(localStorage.getItem("monthlyCategories")) || [];
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let monthlyReports = JSON.parse(localStorage.getItem("monthlyReports")) || [];

let selectedMonth = "";
let searchKeyword = "";
let sortOrder = "asc";
let itemsPerPage = 5;
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
    console.log("monthlyCategories:", JSON.parse(localStorage.getItem("monthlyCategories")));
    console.log("transactions:", JSON.parse(localStorage.getItem("transactions")));
    console.log("monthlyReports:", JSON.parse(localStorage.getItem("monthlyReports")));

    let currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
    if (currentMonthData) {
        document.getElementById("remainingAmount").textContent = `${currentMonthData.amount.toLocaleString()} VND`;
    }
    displayCategories();//danh mục 
    displayTransactions();//giao dịch 
    displayStats();//thống kê 
    checkCategoryLimits();// giới hạn 
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

// A - Chọn tháng
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
    currentPage = 1;
    saveToLocalStorage();
    refreshUI();
}

// B - Lưu ngân sách
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

// D - QUẢN LÝ DANH MỤC
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

// D.2: Hiển thị tùy chọn danh mục
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
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Vui lòng nhập đầy đủ và hợp lệ!"
        });
        return;
    }

    let currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
    if (!currentMonthData) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Vui lòng chọn tháng trước!"
        });
        return;
    }

    let maxId = 0;
    for (let i = 0; i < currentMonthData.categories.length; i++) {
        let id = currentMonthData.categories[i].id;
        if (id > maxId) {
            maxId = id;
        }
    }
    let newId = maxId + 1;


    currentMonthData.categories.push({
        id: newId,
        name: categoryName,
        budget: categoryLimit
    });
    saveToLocalStorage();
    displayCategories();
    document.getElementById("categoryName").value = "";
    document.getElementById("categoryLimit").value = "";
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Đã thêm danh mục thành công!",
        showConfirmButton: false,
        timer: 1500
    });
}

// D.4: Sửa danh mục (ĐÃ SỬA)
function updateCategory(index) {
    let currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
    if (!currentMonthData) return;

    let danhMuc = currentMonthData.categories[index];

    Swal.fire({
        title: 'Sửa danh mục',
        html:
            `<input id="tenMoi" class="swal2-input" placeholder="Tên danh mục" value="${danhMuc.name}">` +
            `<input id="gioiHanMoi" class="swal2-input" placeholder="Giới hạn (VND)" type="number" value="${danhMuc.budget}">`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Lưu',
        cancelButtonText: 'Hủy',
        preConfirm: () => {
            const tenMoi = document.getElementById('tenMoi').value.trim();
            const gioiHanMoi = document.getElementById('gioiHanMoi').value;

            if (!tenMoi || !gioiHanMoi) {
                Swal.showValidationMessage('Vui lòng nhập đầy đủ thông tin');
                return false;
            }

            const soTien = parseInt(gioiHanMoi);
            if (isNaN(soTien) || soTien <= 0) {
                Swal.showValidationMessage('Giới hạn không hợp lệ!');
                return false;
            }

            return { ten: tenMoi, tien: soTien };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { ten, tien } = result.value;

            currentMonthData.categories[index] = {
                id: danhMuc.id,
                name: ten,
                budget: tien
            };
            Swal.fire("Đã lưu!", "Danh mục đã được cập nhật.", "success");
            saveToLocalStorage();
            displayCategories();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Đã sửa danh mục thành công!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
}

// D.5: Xóa danh mục (ĐÃ SỬA)
function removeCategory(index) {
    let currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
    if (!currentMonthData) return;

    const categoryName = currentMonthData.categories[index].name;

    Swal.fire({
        title: "Bạn có chắc?",
        text: `Xóa danh mục "${categoryName}" sẽ xóa toàn bộ giao dịch về "${categoryName}". Bạn có chắc chắn không?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có, xóa ngay!",
        cancelButtonText: "Hủy",
        reverseButtons: true
    }).then((result) => {
        if (!result.isConfirmed) return;

        const categoryId = currentMonthData.categories[index].id;

        transactions = transactions.filter(t =>
            !(t.month === selectedMonth && t.categoryId === categoryId)
        );

        let report = monthlyReports.find(r => r.month === selectedMonth && r.userId === 1);
        if (report) {
            const categoryDetails = report.details.filter(d => d.categoryId === categoryId);
            const totalCategoryAmount = categoryDetails.reduce((sum, d) => sum + d.amount, 0);
            report.totalAmount -= totalCategoryAmount;
            report.details = report.details.filter(d => d.categoryId !== categoryId);
        }

        currentMonthData.categories.splice(index, 1);
        Swal.fire("Đã xóa!", "Danh mục đã bị xóa thành công.", "success");

        saveToLocalStorage();
        displayCategories();
        refreshUI();
        showNotification("Đã xóa danh mục và các giao dịch liên quan thành công!");
    });
}

// E - THÊM VÀ QUẢN LÝ GIAO DỊCH
// E.1 - Thêm giao dịch 
function createExpense() {
    let rawAmount = document.getElementById("expenseAmount").value;
    let amount = parseInt(rawAmount.replace(/[^\d]/g, ''));

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

    let currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
    if (!currentMonthData) {
        showNotification("Không tìm thấy dữ liệu tháng hiện tại!");
        return;
    }

    if (currentMonthData.amount === 0) {
        showNotification("Vui lòng thiết lập ngân sách trước!");
        return;
    }

    let category = currentMonthData.categories.find(c => c.id === categoryId);
    if (!category) {
        showNotification("Danh mục không hợp lệ!");
        return;
    }

    let newId = transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1;

    let today = new Date();
    let yyyy = today.getFullYear();
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let dd = String(today.getDate()).padStart(2, '0');
    let formattedDate = `${yyyy}-${mm}-${dd}`;

    let newTransaction = {
        id: newId,
        date: formattedDate,
        amount: amount,
        description: note,
        categoryId: categoryId,
        monthCategoryId: categoryId,
        month: selectedMonth
    };

    transactions.push(newTransaction);

    let report = monthlyReports.find(r => r.month === selectedMonth && r.userId === 1);

    if (!report) {
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
    document.getElementById("expenseCategory").value = "";
    document.getElementById("expenseNote").value = "";

    Swal.fire({
        title: "Đã thêm",
        text: "Đã thêm giao dịch thành công!",
        icon: "success"
    });
    checkCategoryLimits();
}

// E.2 - Hiển thị giao dịch
function displayTransactions() {
    let transactionList = document.getElementById("transactionList");

    if (!selectedMonth) {
        transactionList.innerHTML = "<li class='no-transaction'>Vui lòng chọn tháng</li>";
        return;
    }

    // console.log("Transactions before filtering:", transactions);
    // console.log("Selected month:", selectedMonth);

    searchKeyword = document.getElementById("searchInput").value.toLowerCase();

    let currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
    let monthPrefix = selectedMonth.split("-")[0] + "-" + selectedMonth.split("-")[1];

    let filteredTransactions = transactions.filter(t => {
        if (t.month === selectedMonth) return true;
        if (t.date && t.date.startsWith(monthPrefix)) return true;
        return false;
    });

    // console.log("Filtered by month:", filteredTransactions);

    if (searchKeyword) {
        filteredTransactions = filteredTransactions.filter(t => {
            const descMatch = t.description && t.description.toLowerCase().includes(searchKeyword);
            let categoryName = "";
            if (currentMonthData) {
                const category = currentMonthData.categories.find(c => c.id === t.categoryId);
                if (category) categoryName = category.name.toLowerCase();
            }
            return descMatch || categoryName.includes(searchKeyword);
        });
    }

    if (sortOrder === "asc") {
        filteredTransactions.sort((a, b) => a.amount - b.amount);
    } else {
        filteredTransactions.sort((a, b) => b.amount - b.amount);
    }

    let totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    if (totalPages === 0) {
        totalPages = 1;
    }

    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredTransactions.length);
    const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);

    if (paginatedTransactions.length === 0) {
        transactionList.innerHTML = "<li class='no-transaction'>Không có giao dịch nào</li>";
    } else {
        let html = "";

        paginatedTransactions.forEach(expense => {
            let categoryName = "Không xác định";
            if (currentMonthData) {
                const category = currentMonthData.categories.find(c => c.id === expense.categoryId);
                if (category) categoryName = category.name;
            }

            html += `
                <li>
                    <span>${categoryName} - ${expense.description}: ${expense.amount.toLocaleString()} VND</span>
                    <button class='delete-btn' onclick='removeExpense(${expense.id})'>Xóa</button>
                </li>
            `;
        });

        transactionList.innerHTML = html;
    }

    updatePagination(totalPages);
}

// Cập nhật nút phân trang
function updatePagination(totalPages) {
    const pagination = document.querySelector(".pagination");

    let paginationHTML = `
        <button class="btn2" onclick="previousPage()" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
    `;
    const maxPage = totalPages;
    for (let i = 1; i <= maxPage; i++) {
        paginationHTML += `<button onclick="goToPage(${i})" ${currentPage === i ? 'class="active"' : ''}>${i}</button>`;
    }

    paginationHTML += `
        <button class="btn2" onclick="nextPage()" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
    `;

    pagination.innerHTML = paginationHTML;
}

// E.3 - Xóa giao dịch
function removeExpense(id) {
    let currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
    if (!currentMonthData) return;

    let expense = transactions.find(t => t.id === id);
    if (!expense) return;

    let category = currentMonthData.categories.find(c => c.id === expense.categoryId);
    let categoryName = category ? category.name : "Không xác định";

    Swal.fire({
        title: "Bạn có chắc?",
        text: `Bạn có muốn xóa giao dịch "${expense.description}" (${expense.amount.toLocaleString()} VND) không?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có, xóa ngay!",
        cancelButtonText: "Hủy",
        reverseButtons: true
    }).then((result) => {
        if (!result.isConfirmed) {
            return;
        }

        transactions = transactions.filter(t => t.id !== id);

        let report = monthlyReports.find(r => r.month === selectedMonth && r.userId === 1);
        if (report) {
            report.details = report.details.filter(d =>
                !(d.categoryId === expense.categoryId && d.amount === expense.amount)
            );
            report.totalAmount -= expense.amount;
        }

        currentMonthData.amount += expense.amount;

        saveToLocalStorage();
        refreshUI();
        showNotification("Đã xóa giao dịch thành công!");

        Swal.fire({
            title: "Đã xóa!",
            text: "Giao dịch đã được xóa thành công.",
            icon: "success"
        });
    });
}

// E.4 - Tìm kiếm giao dịch
function filterTransactions() {
    currentPage = 1;
    displayTransactions();
}

// E.5 - Sắp xếp giao dịch
function sortTransactionsByAmount() {
    sortOrder = sortOrder === "asc" ? "desc" : "asc";
    document.getElementById("sortBtn").textContent = sortOrder === "asc" ? "Sắp xếp theo giá ↑" : "Sắp xếp theo giá ↓";
    displayTransactions();
}

// Phân trang
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayTransactions();
    }
}

function nextPage() {
    let filteredTransactions = transactions.filter(t => {
        if (t.month === selectedMonth) return true;

        let monthPrefix = selectedMonth.split("-")[0] + "-" + selectedMonth.split("-")[1];
        return t.date && t.date.startsWith(monthPrefix);
    });

    if (searchKeyword) {
        let currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
        filteredTransactions = filteredTransactions.filter(t => {
            const descMatch = t.description && t.description.toLowerCase().includes(searchKeyword);

            let categoryName = "";
            if (currentMonthData) {
                const category = currentMonthData.categories.find(c => c.id === t.categoryId);
                if (category) categoryName = category.name.toLowerCase();
            }

            return descMatch || categoryName.includes(searchKeyword);
        });
    }

    let totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    if (totalPages === 0) totalPages = 1;

    if (currentPage < totalPages) {
        currentPage++;
        displayTransactions();
    }
}

function goToPage(page) {
    let filteredTransactions = transactions.filter(t => {
        if (t.month === selectedMonth) return true;

        let monthPrefix = selectedMonth.split("-")[0] + "-" + selectedMonth.split("-")[1];
        return t.date && t.date.startsWith(monthPrefix);
    });

    if (searchKeyword) {
        let currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
        filteredTransactions = filteredTransactions.filter(t => {
            const descMatch = t.description && t.description.toLowerCase().includes(searchKeyword);

            let categoryName = "";
            if (currentMonthData) {
                const category = currentMonthData.categories.find(c => c.id === t.categoryId);
                if (category) categoryName = category.name.toLowerCase();
            }

            return descMatch || categoryName.includes(searchKeyword);
        });
    }

    let totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    if (totalPages === 0) totalPages = 1;

    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        displayTransactions();
    }
}

// Kiểm tra giới hạn danh mục và hiển thị cảnh báo
function checkCategoryLimits() {
    const tb = document.getElementById("thongbao");
    tb.style.display = "none";

    if (!selectedMonth) return;

    const currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
    if (!currentMonthData || !currentMonthData.categories.length) return;

    const report = monthlyReports.find(r => r.month === selectedMonth && r.userId === 1);
    if (!report) return;

    for (let i = 0; i < currentMonthData.categories.length; i++) {
        const category = currentMonthData.categories[i];
        let categoryExpenses = 0;

        report.details.forEach(detail => {
            if (detail.categoryId === category.id) {
                categoryExpenses += detail.amount;
            }
        });

        if (categoryExpenses > category.budget) {
            tb.innerHTML = `Danh mục "${category.name}" đã vượt giới hạn: ${categoryExpenses.toLocaleString()} / ${category.budget.toLocaleString()} VND`;
            tb.style.display = "block";
            tb.style.color = "red";
            return;
        }
    }
}

// F - Hiển thị thống kê
function displayStats() {
    let statsBody = document.getElementById("statsBody");
    statsBody.innerHTML = monthlyCategories.map(data => {
        let report = monthlyReports.find(r => r.month === data.month && r.userId === 1);
        let totalExpenses = report ? report.totalAmount : 0;

        let initialBudget = data.amount + totalExpenses;

        return `
            <tr>
                <td>${data.month}</td>
                <td>${totalExpenses.toLocaleString()} VND</td>
                <td>${initialBudget.toLocaleString()} VND</td>
                <td class="${data.amount >= 0 ? 'status-ok' : 'status-over'}">
                    ${data.amount >= 0 ? 'Đạt ✅' : 'Không đạt ❌'}
                </td>
            </tr>
        `;
    }).join("");
}

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

// Reset dữ liệu
function resetData() {
    if (confirm("Bạn có chắc muốn xóa tất cả dữ liệu không?")) {
        localStorage.removeItem("monthlyCategories");
        localStorage.removeItem("transactions");
        localStorage.removeItem("monthlyReports");
        localStorage.removeItem("selectedMonth");

        monthlyCategories = [];
        transactions = [];
        monthlyReports = [];
        selectedMonth = "";

        document.getElementById("monthInput").value = "";
        document.getElementById("remainingAmount").textContent = "0 VND";

        location.reload();
        showNotification("Đã xóa tất cả dữ liệu thành công!");
    }
}

// Hiển thị thông báo snackbar 
function showNotification(message) {
    let snackbar = document.getElementById("snackbar");
    snackbar.textContent = message;
    snackbar.className = "show";
    setTimeout(() => snackbar.className = snackbar.className.replace("show", ""), 3000);
}