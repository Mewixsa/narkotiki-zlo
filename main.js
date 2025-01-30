var mybutton = document.getElementById("scrollTopBtn");

window.onscroll = function () {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        mybutton.classList.add("show"); 
    } else {
        mybutton.classList.remove("show"); 
    }
};

mybutton.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth" 
    });
}

logbtt = document.getElementById('loginForm');
regbtt = document.getElementById('regForm');

function login_window(){
    regbtt.classList.add("none")
    logbtt.classList.remove("none")
}

function reg_window(){
    logbtt.classList.add("none")
    regbtt.classList.remove("none")
}

// вход на сайт 
// с логином admin пользователь становиться админом
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

document.getElementById("regForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const login = this.querySelectorAll("input[type='text']")[0].value;
    const password = this.querySelectorAll("input[type='password']")[0].value;
    const confirmPassword = this.querySelectorAll("input[type='password']")[1].value;

    if (password !== confirmPassword) {
        alert("Пароли не совпадают!");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(u => u.login === login)) {
        alert("Такой пользователь уже существует!");
        return;
    }

    const hashedPassword = await hashPassword(password);
    const role = login === "admin" ? "admin" : "user";
    users.push({ login, password: hashedPassword, role });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Регистрация успешна! Теперь войдите.");
    login_window();
});

document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const login = this.querySelector("input[type='text']").value;
    const password = this.querySelector("input[type='password']").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const hashedPassword = await hashPassword(password);
    const user = users.find(u => u.login === login && u.password === hashedPassword);

    if (user) {
        alert("Вход выполнен! Роль: " + user.role);
        localStorage.setItem("currentUser", JSON.stringify(user));

        if (user.role === "admin") {
            window.location.href = "/dashboard/dashboard.html";
        } else {
            window.location.href = "user.html"; // Страница для обычных пользователей
        }
    } else {
        alert("Неверный логин или пароль");
    }
});





