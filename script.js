let orders = loadOrders();

function createOrder() {
    const product = prompt("Enter product name:");
    const required = Number(prompt("Enter required quantity:"));

    if (!product || !required || required <= 0) {
        alert("Please enter valid details.");
        return;
    }

    const order = {
        id: Date.now(),
        product: product,
        required: required,
        completed: 0,
        status: "In Progress"
    };

    orders.push(order);
    saveOrders(orders);
    displayOrders();
}

function displayOrders() {
    const ordersDiv = document.getElementById("orders");

    ordersDiv.innerHTML = "";

    orders.forEach(order => {
        const remaining = order.required - order.completed;
        const progress = Math.round(
            (order.completed / order.required) * 100
        );

        ordersDiv.innerHTML += `
            <div class="card">
                <h3>${order.product}</h3>
                <p>Required: ${order.required}</p>
                <p>Completed: ${order.completed}</p>
                <p>Remaining: ${remaining}</p>
                <p>Progress: ${progress}%</p>
                <p>Status: ${order.status}</p>
            </div>
        `;
    });

    updateDashboard();
}

function updateDashboard() {
    document.getElementById("totalOrders").textContent = orders.length;

    document.getElementById("inProgress").textContent =
        orders.filter(order => order.status === "In Progress").length;

    document.getElementById("completed").textContent =
        orders.filter(order => order.status === "Completed").length;

    document.getElementById("overdue").textContent = 0;
}

displayOrders();
