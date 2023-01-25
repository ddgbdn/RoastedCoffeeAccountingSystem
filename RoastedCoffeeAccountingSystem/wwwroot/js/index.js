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
};



function row(coffee) {
    const tr = document.createElement("tr");
    tr.setAttribute("coffee-rowid", coffee.id);

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
    buttonsTd.append(editBtn);
    tr.append(buttonsTd);

    const deleteBtn = document.createElement("button");
    deleteBtn.append("Delete");
    buttonsTd.append(deleteBtn);
    tr.append(buttonsTd);

    return tr;
}

getCoffee();