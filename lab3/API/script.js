const tableBody = document.getElementById("products-tbody");
const filterInput = document.getElementById("filter-input");
const sortSelect = document.getElementById("sort-select");

let allProducts = [];
let originalOrder = [];

async function fetchProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    allProducts = data.products.slice(0, 30);
    originalOrder = [...allProducts];

    displayProducts(allProducts);
  } catch (error) {
    console.error("Nie udało się pobrać produktów:", error);
    tableBody.innerHTML = `<tr><td colspan="3">Wystąpił błąd podczas ładowania danych.</td></tr>`;
  }
}

function displayProducts(products) {
  tableBody.innerHTML = "";

  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td><img src="${product.thumbnail}" alt="Zdjęcie produktu ${product.title}"></td>
            <td>${product.title}</td>
            <td>${product.description}</td>
        `;
    tableBody.appendChild(row);
  });
}

function applyFiltersAndSorting() {
  let modifiedProducts = [...originalOrder];
  const filterValue = filterInput.value.toLowerCase();
  const sortValue = sortSelect.value;

  if (filterValue) {
    modifiedProducts = modifiedProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(filterValue) ||
        product.description.toLowerCase().includes(filterValue)
    );
  }

  if (sortValue === "asc") {
    modifiedProducts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortValue === "desc") {
    modifiedProducts.sort((a, b) => b.title.localeCompare(a.title));
  }

  displayProducts(modifiedProducts);
}

filterInput.addEventListener("input", applyFiltersAndSorting);
sortSelect.addEventListener("change", applyFiltersAndSorting);

fetchProducts();
