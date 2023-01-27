async function getCoffee() {
    const response = await fetch("/api/GreenCoffee", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response.ok) {
        const coffee = await response.json();
        const rows = document.getElementById("coffeeTable");
        coffee.forEach(c => rows.append(row(c)));
    }
    else {
        const error = await response.json();
        console.log(error);
    }
};

async function getCoffeeById(id) {
    const response = await fetch(`/api/GreenCoffee/${id}`, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response.ok) {
        const coffee = await response.json();
        coffee.forEach((key, value) => {
            document.getElementsByName(key).value = value;
        });
    }
    else {
        const error = await response.json();
        console.log(error);
    }
}

async function createCoffee(coffee) {
    var response = await fetch("/api/GreenCoffee", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(coffee)
    });

    if (response.ok) {
        const coffee = await response.json();
        document.getElementById("coffeeTable").append(row(coffee));
    }
    else {
        const error = await response.json();
        console.log(error);
    }
}

async function updateCoffee(coffee) {
    var response = await fetch("/api/GreenCoffee", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(coffee)
    });

    if (response.ok) {
        const coffee = response.json();
        document.querySelector(`tr[data-rowid='${coffee.id}']`);
    }
    else {
        const error = response.json();
        console.log(error);
    }
}

async function deleteCoffee(id) {
    const response = await fetch(`/api/GreenCoffee/${id}`, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });

    if (response.ok) {
        const coffee = response.json();
        document.querySelector(`tr[data-rowid='${coffee.id}']`).remove();
    }
    else {
        const error = response.json();
        console.log(error);
    }
}

function row(coffee) {
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", coffee.id);

    const varietyTd = document.createElement("td");
    varietyTd.append(coffee.variety);
    tr.append(varietyTd);

    const countryTd = document.createElement("td");
    countryTd.append(coffee.country);
    tr.append(countryTd);

    const regionTd = document.createElement("td");
    regionTd.append(coffee.region ?? "");
    tr.append(regionTd);

    const weightTd = document.createElement("td");
    weightTd.append(coffee.weight);
    tr.append(weightTd);

    const buttonsTd = document.createElement("td");
    const editBtn = document.createElement("button");
    editBtn.append("Modify");
    editBtn.addEventListener("click", () => getCoffeeById(coffee.id));
    buttonsTd.append(editBtn);
    tr.append(buttonsTd);

    const deleteBtn = document.createElement("button");
    deleteBtn.append("Delete");
    deleteBtn.addEventListener("click", () => deleteCoffee(coffee.id));
    buttonsTd.append(deleteBtn);
    tr.append(buttonsTd);

    return tr;
}

const formEl = document.getElementById("form");
formEl.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(formEl);
    let coffee = {};
    formData.forEach((value, key) => {
        coffee[key] = key === "weight" ? parseInt(value, 10) : value;
    });

    if (coffee.id === "") {
        delete coffee.id;
        await createCoffee(coffee);
    }
    else {
        coffee.id = parseInt(coffee.id, 10);
        await updateCoffee(coffee);
    }
})

getCoffee();