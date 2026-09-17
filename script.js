let orders = loadOrders();

function createOrder() {
    let product = prompt("Enter product name:");
    let required = Number(prompt("Enter required quantity:"));

    if (!product || required <= 0) {
        alert("Invalid input");
        return;
    }

    orders.push({
        id: Date.now(),
        product: product,
        required: required,
        completed: 0,
        status: "In Progress"
    });

    saveOrders(orders);
    displayOrders();
}

function updateProduction(id) {
    let order = orders.find(o => o.id === id);

    order.completed += 100;

    if (order.completed >= order.required) {
        order.completed = order.required;
        order.status = "Completed";
    }

    saveOrders(orders);
    displayOrders();
}

function displayOrders() {
    let box = document.getElementById("orders");
    box.innerHTML = "";

    orders.forEach(order => {
        let remaining = order.required - order.completed;
        let progress = Math.round(
            (order.completed / order.required) * 100
        );

        box.innerHTML += `
            <div class="card">
                <h3>${order.product}</h3>
                <p>Required: ${order.required}</p>
                <p>Completed: ${order.completed}</p>
                <p>Remaining: ${remaining}</p>
                <p>Progress: ${progress}%</p>
                <p>Status: ${order.status}</p>

                ${order.status !== "Completed"
                    ? `<button onclick="updateProduction(${order.id})">
                        Update Production
                       </button>`
                    : ""}
            </div>
        `;
    });

    document.getElementById("totalOrders").textContent = orders.length;

    document.getElementById("inProgress").textContent =
        orders.filter(o => o.status === "In Progress").length;

    document.getElementById("completed").textContent =
        orders.filter(o => o.status === "Completed").length;
}

displayOrders();
