document.addEventListener("DOMContentLoaded", () => {
  const carCards = document.getElementById("carCards");
  const filterForm = document.getElementById("filterForm");

  const makes = [...new Set(usedCars.map((car) => car.make))];
  const colors = [...new Set(usedCars.map((car) => car.color))];
  populateCheckboxes("makeCheckboxes", makes);
  populateCheckboxes("colorCheckboxes", colors);

  function populateCheckboxes(containerId, options) {
    const container = document.getElementById(containerId);
    options.forEach((option) => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = option;
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(option));
      container.appendChild(label);
    });
  }

  function renderCars(cars) {
    carCards.innerHTML = "";
    if (cars.length === 0) {
      carCards.innerHTML = `<div class="noResults">No cars match the filter criteria. Please try again.</div>`;
      return;
    }
    cars.forEach((car) => {
      const card = document.createElement("div");
      card.className = "carCard";
      card.innerHTML = `
                <img src="${car.image}" alt="${car.make} ${car.model}">
                <h3>${car.make} ${car.model}</h3>
                <p>Year: ${car.year}</p>
                <p>Mileage: ${car.mileage} miles</p>
                <p>Price: $${car.price}</p>
                <p>Color: ${car.color}</p>
            `;
      carCards.appendChild(card);
    });
  }

  document.getElementById("applyFilters").addEventListener("click", () => {
    const minYear = parseInt(filterForm.minYear.value) || 0;
    const maxYear = parseInt(filterForm.maxYear.value) || Infinity;
    const maxMileage = parseInt(filterForm.maxMileage.value) || Infinity;
    const minPrice = parseInt(filterForm.minPrice.value) || 0;
    const maxPrice = parseInt(filterForm.maxPrice.value) || Infinity;

    const selectedMakes = Array.from(
      document.querySelectorAll("#makeCheckboxes input:checked")
    ).map((cb) => cb.value);
    const selectedColors = Array.from(
      document.querySelectorAll("#colorCheckboxes input:checked")
    ).map((cb) => cb.value);

    const filteredCars = usedCars.filter(
      (car) =>
        car.year >= minYear &&
        car.year <= maxYear &&
        car.mileage <= maxMileage &&
        car.price >= minPrice &&
        car.price <= maxPrice &&
        (selectedMakes.length === 0 || selectedMakes.includes(car.make)) &&
        (selectedColors.length === 0 || selectedColors.includes(car.color))
    );

    renderCars(filteredCars);
  });

  renderCars(usedCars);
});
