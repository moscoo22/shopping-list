// Get references to elements
const addItemButton = document.getElementById("addItem");
const itemList = document.getElementById("itemList");
const totalElement = document.getElementById("total");

// Initialize data
let items = [];
let total = 0;

// Add event listener for the "Add Item" button
addItemButton.addEventListener("click", addItem);

// Function to add an item to the list
function addItem() {
    // Get input values
    const itemInput = document.getElementById("itemInput");
    const quantityInput = document.getElementById("quantityInput");
    const priceInput = document.getElementById("priceInput");

    const itemName = itemInput.value;
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(priceInput.value);

    // Check for valid inputs
    if (!itemName || isNaN(quantity) || isNaN(price)) {
        return;
    }

    // Calculate item total
    const itemTotal = quantity * price;
    total += itemTotal;

    // Create a new item object
    const newItem = {
        name: itemName,
        quantity: quantity,
        price: price,
        total: itemTotal,
    };

    // Add the new item to the items array
    items.push(newItem);

    // Update the item list and total
    updateItemList();
    updateTotal();

    // Clear input fields
    itemInput.value = "";
    quantityInput.value = "";
    priceInput.value = "";
}

// Function to update the item list in the UI
function updateItemList() {
    itemList.innerHTML = ""; // Clear the existing list

    // Iterate through items and create list items
    items.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
      <span>${item.name} - ${item.quantity} x $${item.price.toFixed(2)}</span>
      <span>$${item.total.toFixed(2)}</span>
      <button class="delete" onclick="deleteItem(${index})">Delete</button>
    `;
        itemList.appendChild(li);
    });
}

// Function to update the total in the UI
function updateTotal() {
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Function to delete an item from the list
function deleteItem(index) {
    // Subtract item total from the total
    total -= items[index].total;

    // Remove the item from the items array
    items.splice(index, 1);

    // Update the item list and total
    updateItemList();
    updateTotal();
}
