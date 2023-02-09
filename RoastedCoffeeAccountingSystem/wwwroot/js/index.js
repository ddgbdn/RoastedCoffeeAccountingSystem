async function getCoffee() {
    const response = await fetch("/api/GreenCoffee", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response.ok) {
        const coffee = await response.json();
        const rows = document.getElementById("coffeeTable");
        coffee.forEach(c => rows.prepend(rowC(c)));
    }
    else
        console.log(await response.json());

};

async function getCoffeeById(id) {
    const response = await fetch(`/api/GreenCoffee/${id}`, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response.ok) {
        const coffee = await response.json();
        Object.keys(coffee).forEach(key =>
            document.querySelector(`#greenCoffee-form input[name='${key}']`).value = coffee[key]
        );
    }
    else
        console.log(await response.json());
} a

async function createCoffee(coffee) {
    var response = await fetch("/api/GreenCoffee", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(coffee)
    });

    if (response.ok)
        document.getElementById("coffeeTable").prepend(rowC(await response.json()));
    else
        console.log(await response.json());

    getOptions();
    resetCoffeeForm();
}

async function updateCoffee(coffee) {
    var response = await fetch(`/api/GreenCoffee/${coffee.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(coffee)
    });

    if (response.ok) {
        document.querySelector(`#coffeeTable tr[data-rowid='${coffee.id}']`).replaceWith(rowC(coffee));
    }
    else
        console.log(await response.json());

    getOptions();
    resetCoffeeForm();
}

async function deleteCoffee(id) {
    const response = await fetch(`/api/GreenCoffee/${id}`, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });

    if (response.ok)
        document.querySelector(`#coffeeTable tr[data-rowid='${id}']`).remove();
    else
        console.log(await response.json());

    getOptions();
}

function rowC(coffee) {
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", coffee.id);

    const varietyTd = document.createElement("td");
    varietyTd.append(coffee.variety);
    tr.append(varietyTd);

    const countryTd = document.createElement("td");
    countryTd.append(coffee.country);
    tr.append(countryTd);

    const regionTd = document.createElement("td");
    regionTd.append(coffee.region ?? coffee.country);
    tr.append(regionTd);

    const weightTd = document.createElement("td");
    weightTd.append(coffee.weight);
    tr.append(weightTd);

    const buttonsTd = document.createElement("td");
    buttonsTd.className = "d-block gap-2"

    const editBtn = document.createElement("button");
    const eImg = document.createElement("img");
    eImg.src = "../img/pencil-square.svg";
    editBtn.append(eImg);
    editBtn.addEventListener("click", () => getCoffeeById(coffee.id));
    editBtn.className = "btn btn-light btn-sm me-2 editBtn";
    buttonsTd.append(editBtn);
    tr.append(buttonsTd);

    const deleteBtn = document.createElement("button");
    const dImg = document.createElement("img");
    dImg.src = "../img/trash.svg"
    deleteBtn.append(dImg);
    deleteBtn.addEventListener("click", () => deleteCoffee(coffee.id));
    deleteBtn.className = "btn btn-light btn-sm me-2 deleteBtn";
    buttonsTd.append(deleteBtn);
    tr.append(buttonsTd);

    return tr;
}

(async function () {
    const formEl = document.getElementById("greenCoffee-form");
    formEl.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(formEl);
        let coffee = {};
        formData.forEach((value, key) => {
            coffee[key] = key === "weight" ? parseFloat(value, 10) : value;
        });

        if (coffee.id === "") {
            delete coffee.id;
            await createCoffee(coffee);
        }
        else {
            coffee.id = parseInt(coffee.id, 10);
            await updateCoffee(coffee);
        }

        resetCoffeeForm();
    })
})()

function resetCoffeeForm() {
    document.getElementById("greenCoffee-form").reset();
    document.getElementById("cid").value = "";
}

async function getRoastings() {
    const response = await fetch("/api/Roastings", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response.ok) {
        const roastings = await response.json();
        const rows = document.getElementById("roastingsTable");
        roastings.forEach(r => rows.prepend(rowR(r)));
    }
    else
        console.log(await response.json());
}

async function getRoasting(id) {
    const response = await fetch(`/api/Roastings/${id}`, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response.ok) {
        const roasting = await response.json();
        document.querySelector("#roastings-form input[name='id']").value = roasting.id;
        document.getElementById("coffeeid").value = roasting.coffeeId;
        document.getElementById("amount").value = roasting.amount;
    }
}

async function createRoasting(roasting) {
    const response = await fetch("/api/Roastings", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": 'application/json' },
        body: JSON.stringify(roasting)
    });

    if (response.ok) {
        const roasting = await response.json();
        const table = document.querySelector("#roastingsTable");
        table.prepend(rowR(roasting));
    }
    else
        console.log(await response.json());

    resetRoastingsForm();
}

async function updateRoasting(roasting) {
    const response = await fetch(`/api/Roastings/${roasting.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roasting)
    });

    if (response.ok) {
        const roasting = await response.json();
        document.querySelector(`#roastingsTable tr[data-rowid='${roasting.id}']`).replaceWith(rowR(roasting));
    }
    else
        console.log(await response.json());

    resetRoastingsForm();
}

async function deleteRoasting(id) {
    const response = await fetch(`/api/Roastings/${id}`, {
        method: "DELETE",
    });

    if (response.ok)
        document.querySelector(`#roastingsTable tr[data-rowid='${id}']`).remove();
    else
        console.log(await response.json());
}

function rowR(roasting) {
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", roasting.id);

    const coffeeTd = document.createElement("td");
    coffeeTd.append(roasting.coffee.country + " " + roasting.coffee.region);
    tr.append(coffeeTd);

    const amountTd = document.createElement("td");
    amountTd.append(roasting.amount);
    tr.append(amountTd);

    const dateTd = document.createElement("td");
    dateTd.setAttribute("id", "date");
    const date = new Date(roasting.date);
    dateTd.append(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
    tr.append(dateTd);

    const buttonsTd = document.createElement("td");
    buttonsTd.className = "d-block gap-2";

    const editBtn = document.createElement("button");
    const eImg = document.createElement("img");
    eImg.src = "../img/pencil-square.svg";
    editBtn.append(eImg);
    editBtn.addEventListener("click", () => getRoasting(roasting.id));
    editBtn.className = "btn btn-light btn-sm me-2 editBtn";
    buttonsTd.append(editBtn);
    tr.append(buttonsTd);

    const deleteBtn = document.createElement("button");
    const dImg = document.createElement("img");
    dImg.src = "../img/trash.svg"
    deleteBtn.append(dImg);
    deleteBtn.addEventListener("click", () => deleteRoasting(roasting.id));
    deleteBtn.className = "btn btn-light btn-sm me-2";
    buttonsTd.append(deleteBtn);
    tr.append(buttonsTd);

    return tr;
}

function resetRoastingsForm() {
    document.querySelector("#roastings-form input[name='id']").value =
        document.getElementById("coffeeid").value =
        document.getElementById("amount").value = "";
}

function coffeeOption(coffee) {
    const option = document.createElement("option");
    option.append(coffee.country + " " + coffee.region);
    option.setAttribute("value", coffee.id);

    return option;
}

(async function () {
    const form = document.getElementById("roastings-form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        let roasting = {};
        formData.forEach((v, k) => {
            roasting[k] = parseFloat(v, 10);
        });

        if (isNaN(roasting.id)) {
            delete roasting.id
            createRoasting(roasting);
        }
        else {
            updateRoasting(roasting);
        }
    });
    resetRoastingsForm();
})();

async function getOptions() {
    const response = await fetch("/api/GreenCoffee/d", {
        method: "GET",
        headers: { "Accept": "application/json" },
    });

    if (response.ok) {
        const coffees = await response.json();
        const select = document.querySelector("#roastings-form select[name='coffeeid']");
        removeAll(select);
        coffees.forEach(c => select.prepend(coffeeOption(c)));
    }
    else
        console.log(await response.json());
};

function removeAll(selectBox) {
    while (selectBox.options.length > 0)
        selectBox.remove(0);
}

getRoastings();

getOptions();

getCoffee();