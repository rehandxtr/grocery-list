vegetableNameArray = [];
quantityArray = [];
unitPriceArray = [];

function editRow(no) {
    document.getElementById("error").innerHTML = "";
    document.getElementById("message").innerHTML = "";
    document.getElementById("edit_button" + no).style.display = "none";
    document.getElementById("save_button" + no).style.display = "block";
    document.getElementById("row" + no).style.backgroundColor = "#ff0000";
    document.getElementById("DeleteButton" + no).style.display = "none";

    var editVegetable = document.getElementById("vegetableRow" + no);
    var editQuantity = document.getElementById("quantityRow" + no);
    var editUnitPrice = document.getElementById("unitPriceRow" + no);

    var newVegetable = editVegetable.innerHTML;
    var newQuantity = editQuantity.innerHTML;
    var newUnitPrice = editUnitPrice.innerHTML;

    editVegetable.innerHTML =
        "<input type='text' id='editedVegetable" +
        no +
        "' value='" +
        newVegetable +
        "'>";
    editQuantity.innerHTML =
        "<input type='number' step='.01'  required min='0' oninput='validity.valid||(value='');'  id='editedQuantity" +
        no +
        "' value='" +
        newQuantity +
        "'>";
    editUnitPrice.innerHTML =
        "<input type='number' step='.01'  required min='0' oninput='validity.valid||(value='');'   id='editedUnitPrice" +
        no +
        "' value='" +
        newUnitPrice +
        "'>";
}

function saveRow(no) {
    document.getElementById("error").innerHTML = "";
    var editedVegetable = document.getElementById("editedVegetable" + no).value;
    var editedQuantity = document.getElementById("editedQuantity" + no).value;
    var editedUnitPrice = document.getElementById("editedUnitPrice" + no).value;

    if (
        editedVegetable === "" ||
        editedQuantity === "" ||
        editedUnitPrice === "" ||
        editedQuantity < 0 ||
        editedUnitPrice < 0
    ) {
        document.getElementById("error").innerHTML = "Wrong Attribute entered";
    } else {
        document.getElementById(
            "vegetableRow" + no
        ).innerHTML = editedVegetable;
        document.getElementById("quantityRow" + no).innerHTML = editedQuantity;
        document.getElementById(
            "unitPriceRow" + no
        ).innerHTML = editedUnitPrice;

        vegetableNameArray[no] = editedVegetable;
        quantityArray[no] = editedQuantity;
        unitPriceArray[no] = editedUnitPrice;

        document.getElementById("edit_button" + no).style.display = "block";
        document.getElementById("save_button" + no).style.display = "none";
        displayCart();
        document.getElementById("message").innerHTML =
            "Row " + no + 1 + " edited Sucessfully";
    }
}
function deleteRow(no) {
    document.getElementById("message").innerHTML =
        "Row " + no + 1 + " DELETED Sucessfully";
    vegetableNameArray.splice(no, 1);
    quantityArray.splice(no, 1);
    unitPriceArray.splice(no, 1);
    displayCart();
}

function add_row() {
    var getVegetable = document.getElementById("getVegetable").value;
    var getQuantity = document.getElementById("getQuantity").value;
    var getUnitPrice = document.getElementById("getUnitPrice").value;

    if (getVegetable === "" || getQuantity === "" || getUnitPrice === "") {
        document.getElementById("message").innerHTML = "Empty Value";
    } else if (getQuantity < "0" || getUnitPrice < "0") {
        document.getElementById("error").innerHTML =
            "Negative quantity or Price detected";
    } else {
        vegetableNameArray.push(getVegetable);
        quantityArray.push(getQuantity);
        unitPriceArray.push(getUnitPrice);
        displayCart();
        document.getElementById("error").innerHTML = "";
        document.getElementById("message").innerHTML = "";
    }
    document.getElementById("getVegetable").value = "";
    document.getElementById("getQuantity").value = "";
    document.getElementById("getUnitPrice").value = "";
}
function displayCart() {
    cartdata =
        "<table align='center' cellspacing=2 cellpadding=5 id='data_table' border=1><tr><td>Vegetable Name</td><td>Quantity</td><td>Price</td><th>Total</th><th>Action</th></tr>";

    total = 0;

    for (i = 0; i < vegetableNameArray.length; i++) {
        total += quantityArray[i] * unitPriceArray[i];
        cartdata +=
            "<tr id='row" +
            i +
            "'><td id='vegetableRow" +
            i +
            "'>" +
            vegetableNameArray[i] +
            "</td><td id='quantityRow" +
            i +
            "'>" +
            quantityArray[i] +
            "</td><td id='unitPriceRow" +
            i +
            "'>" +
            unitPriceArray[i] +
            "</td><td>" +
            quantityArray[i] * unitPriceArray[i] +
            "</td><td><button id='edit_button" +
            i +
            "' onclick='editRow(" +
            i +
            ")'><i class='fa fa-pencil-square-o ico edit'   aria-hidden='true'></i></button> <button style='display:none;' id='save_button" +
            i +
            "' onclick='saveRow(" +
            i +
            ")'><i class='fa fa-save ico save'  ></i></button> <button id='DeleteButton" +
            i +
            "'onclick='deleteRow(" +
            i +
            ")'><i class='fa fa-trash ico del'   aria-hidden='true'></i></button></td></tr>";
    }

    cartdata +=
        "<tr><td  colspan='3' align='right'>Grand Total</td><td >" +
        total +
        "</td></tr></table>";
    document.getElementById("cart").innerHTML = cartdata;
}
/*
 */
