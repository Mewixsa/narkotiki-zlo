async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function checkAdminAccess() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser || currentUser.role !== "admin") {
        alert("У вас нет доступа!");
        window.location.href = "index.html"; // Перенаправление на главную
    } else {
        document.getElementById("adminPanel").style.display = "block";
    }
}

async function addAdmin() {
    const login = document.getElementById("newAdminLogin").value;
    const password = document.getElementById("newAdminPassword").value;

    if (!login || !password) {
        alert("Заполните все поля!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(user => user.login === login)) {
        alert("Такой пользователь уже существует!");
        return;
    }

    const hashedPassword = await hashPassword(password);
    users.push({ login, password: hashedPassword, role: "admin" });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Администратор добавлен!");
    document.getElementById("newAdminLogin").value = "";
    document.getElementById("newAdminPassword").value = "";
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "/index.html";
}

// Проверяем доступ при загрузке
checkAdminAccess();
