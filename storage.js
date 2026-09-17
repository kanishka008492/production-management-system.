function saveOrders(orders) {
    localStorage.setItem("productionOrders", JSON.stringify(orders));
}

function loadOrders() {
    const savedOrders = localStorage.getItem("productionOrders");

    if (savedOrders) {
        return JSON.parse(savedOrders);
    }

    return [];
}
