function showLogin() {
    document.getElementById("loginForm").classList.remove("hidden");
    document.getElementById("registerForm").classList.add("hidden");
}

function showRegister() {
    document.getElementById("registerForm").classList.remove("hidden");
    document.getElementById("loginForm").classList.add("hidden");
}

document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const user = {
        name: document.getElementById("regName").value,
        email: document.getElementById("regEmail").value,
        password: document.getElementById("regPassword").value
    };

    localStorage.setItem("qarjyUser", JSON.stringify(user));

    document.getElementById("message").textContent =
        "Тіркелу сәтті аяқталды! Енді жүйеге кіріңіз.";

    showLogin();
});

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("qarjyUser"));

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (user && user.email === email && user.password === password) {
        sessionStorage.setItem("qarjyLoggedIn", "yes");
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("message").textContent =
            "Email немесе құпиясөз қате!";
    }
});
