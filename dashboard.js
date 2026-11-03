if (sessionStorage.getItem("qarjyLoggedIn") !== "yes") {
    window.location.href = "login.html";
}

let wallets = JSON.parse(localStorage.getItem("wallets")) || {
    Kaspi: 125000,
    Halyk: 85000,
    cash: 15000
};

let transactions = JSON.parse(
    localStorage.getItem("transactions")
) || [];

const formatMoney = n => "₸ " + n.toLocaleString("kk-KZ");

function render() {
    let income = 0;
    let expense = 0;

    transactions.forEach(t => {
        if (t.type === "income") income += t.amount;
        else expense += t.amount;
    });

    const balance = Object.values(wallets)
        .reduce((a, b) => a + b, 0);

    document.getElementById("balance").textContent = formatMoney(balance);
    document.getElementById("income").textContent = formatMoney(income);
    document.getElementById("expense").textContent = formatMoney(expense);

    document.getElementById("kaspi").textContent = formatMoney(wallets.Kaspi);
    document.getElementById("halyk").textContent = formatMoney(wallets.Halyk);
    document.getElementById("cash").textContent = formatMoney(wallets.cash);

    document.getElementById("transactions").innerHTML =
        transactions.slice().reverse().map(t =>
            `<p>${t.category} — ${t.description || "Операция"}:
            ${t.type === "income" ? "+" : "-"} ${formatMoney(t.amount)}</p>`
        ).join("");

    let percent = Math.min(100, expense / 200000 * 100);

    document.getElementById("budget").textContent =
        Math.round(percent) + "% жұмсалды";

    document.getElementById("progress").value = percent;
}

document.getElementById("transactionForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const type = document.getElementById("type").value;
    const amount = Number(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const wallet = document.getElementById("wallet").value;
    const description = document.getElementById("description").value;

    if (!Number.isFinite(amount) || amount <= 0) return;

    const walletKey = wallet === "Қолма-қол" ? "cash" : wallet;

    if (type === "expense" && wallets[walletKey] < amount) {
        alert("Әмиянда қаражат жеткіліксіз!");
        return;
    }

    transactions.push({
        type,
        amount,
        category,
        wallet,
        description,
        date: new Date().toLocaleDateString("kk-KZ")
    });

    wallets[walletKey] += type === "income" ? amount : -amount;

    localStorage.setItem("wallets", JSON.stringify(wallets));
    localStorage.setItem("transactions", JSON.stringify(transactions));

    render();
    this.reset();
});

function logout() {
    sessionStorage.removeItem("qarjyLoggedIn");
    window.location.href = "index.html";
}

render();
