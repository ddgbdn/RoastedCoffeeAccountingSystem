async function getCoffee() {
    console.log("getcoffee")
    const response = await fetch("https://localhost:7292/api/GreenCoffee", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response.ok) {
        const coffee = await response.json();
        const rows = document.getElementById("green-coffee");
        coffee.forEach(c => rows.append(row(c)));
    }
}

async function createCoffee(varietyInput, countryInput, regionInput, weightInput) {

    const response = await fetch("https://localhost:7292/api/GreenCoffee", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            variety: varietyInput,
            country: countryInput,
            region: regionInput,
            weight: parseInt(weightInput, 10)
        })
    });
    if (response.ok === true) {
        const coffee = await response.json();
        document.getElementById("green-coffee").append(row(coffee));
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}

function row(coffee) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", coffee.id);

    const id = document.createElement("td");
    id.append(coffee.id);
    tr.append(id);

    const varietyTd = document.createElement("td");
    varietyTd.append(coffee.variety);
    tr.append(varietyTd);

    const countryTd = document.createElement("td");
    countryTd.append(coffee.country);
    tr.append(countryTd);

    const regionTd = document.createElement("td");
    regionTd.append(coffee.region);
    tr.append(regionTd);

    const linksTd = document.createElement("td");

    const editLink = document.createElement("button");
    editLink.classList.add("btn", "btn-outline-warning")
    editLink.append("Change");
    editLink.addEventListener("click", async () => await getUser(user.id));
    linksTd.append(editLink);

    const removeLink = document.createElement("button");
    removeLink.className = "btn btn-outline-danger";    
    removeLink.append("Delete");
    removeLink.addEventListener("click", async () => await deleteUser(user.id));

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}

document.getElementById("saveBtn").addEventListener("click", async () => {
    console.log("Save event added");
    const id = document.getElementById("idInput").value
    const variety = document.getElementById("varietyInput").value;
    const country = document.getElementById("countryInput").value;
    const region = document.getElementById("regionInput").value;
    const weight = document.getElementById("weightInput").value;
    if (id === "") 
        await createCoffee(variety, country, region, weight);    
    else
        await editUser(id, name, age);
    reset();
});

function reset() {
    console.log("reset is called");
    document.getElementById("varietyInput").value = "";
    document.getElementById("countryInput").value = "";
    document.getElementById("regionInput").value = "";
    document.getElementById("weightInput").value = "";
}

getCoffee()