let orders = loadOrders();

function createOrder() {
    let product = prompt("Product:");
    let required = Number(prompt("Quantity:"));
    let deadline = prompt("Deadline (YYYY-MM-DD):");

    if (!product || required <= 0 || !deadline) {
        alert("Invalid input");
        return;
    }

    orders.push({
        id: Date.now(),
        product: product,
        required: required,
        completed: 0,
        deadline: deadline
    });

    saveOrders(orders);
    displayOrders();
}

function updateProduction(i) {
    orders[i].completed += 100;

    if (orders[i].completed >= orders[i].required) {
        orders[i].completed = orders[i].required;
    }

    saveOrders(orders);
    displayOrders();
}

function displayOrders() {
    let progressBox = document.getElementById("inProgressOrders");
    let completedBox = document.getElementById("completedOrders");

    progressBox.innerHTML = "";
    completedBox.innerHTML = "";

    orders.forEach((o, i) => {
        let remaining = o.required - o.completed;
        let progress = Math.round(o.completed / o.required * 100);

        let status = "In Progress";

        if (progress == 100) {
            status = "Completed";
        } else if (new Date(o.deadline) < new Date()) {
            status = "Overdue";
        }

        let order = `
            <div class="card">
                <h3>${o.product}</h3>
                <p>Required: ${o.required}</p>
                <p>Completed: ${o.completed}</p>
                <p>Remaining: ${remaining}</p>
                <p>Progress: ${progress}%</p>
                <p>Deadline: ${o.deadline}</p>
                <p>Status: ${status}</p>

                ${progress < 100 ?
                `<button onclick="updateProduction(${i})">
                    Update Production
                </button>` : ""}
            </div>
        `;

        if (progress == 100) {
            completedBox.innerHTML += order;
        } else {
            progressBox.innerHTML += order;
        }
    });

    document.getElementById("totalOrders").textContent = orders.length;

    document.getElementById("inProgress").textContent =
        orders.filter(o => o.completed < o.required).length;

    document.getElementById("completed").textContent =
        orders.filter(o => o.completed >= o.required).length;

    document.getElementById("overdue").textContent =
        orders.filter(o =>
            o.completed < o.required &&
            new Date(o.deadline) < new Date()
        ).length;
}

displayOrders();
