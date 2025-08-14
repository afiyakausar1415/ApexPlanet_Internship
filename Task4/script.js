// Navigation
function showSection(id) {
    document.querySelectorAll('.content-section').forEach(sec => sec.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

// To-Do List
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";
    tasks.forEach((task, index) => {
        list.innerHTML += `<li>${task} <button onclick="deleteTask(${index})">❌</button></li>`;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const task = document.getElementById("taskInput").value;
    if (task.trim() !== "") {
        tasks.push(task);
        document.getElementById("taskInput").value = "";
        displayTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}
displayTasks();

// Products
let products = [
    { name: "Laptop", category: "electronics", price: 50000, rating: 4.5 },
    { name: "Shirt", category: "fashion", price: 1000, rating: 4.0 },
    { name: "Phone", category: "electronics", price: 30000, rating: 4.8 },
    { name: "Shoes", category: "fashion", price: 2000, rating: 4.3 }
];

function displayProducts(list) {
    document.getElementById("productList").innerHTML =
        list.map(p => `
            <div class="card">
                <h3>${p.name}</h3>
                <p>₹${p.price}</p>
                <p>⭐ ${p.rating}</p>
                <small>${p.category}</small>
            </div>
        `).join("");
}

function filterProducts() {
    let category = document.getElementById("filter").value;
    let filtered = category === "all" ? products : products.filter(p => p.category === category);
    displayProducts(filtered);
}

function sortProducts() {
    let sortType = document.getElementById("sort").value;
    let sorted = [...products].sort((a, b) => sortType === "price" ? a.price - b.price : b.rating - a.rating);
    displayProducts(sorted);
}

displayProducts(products);
