const appsPerPage = 6;
let currentPage = 0;

const appData = Array.from({ length: 20 });

function renderApps(page) {
  const grid = document.querySelector(".grid");
  grid.innerHTML = "";

  const start = page * appsPerPage;
  const end = start + appsPerPage;

  appData.slice(start, end).forEach(() => {
    const card = document.createElement("div");
    card.className = "app-card";
    grid.appendChild(card);
  });
}

document.getElementById("nextPage").addEventListener("click", () => {
  currentPage = (currentPage + 1) % Math.ceil(appData.length / appsPerPage);
  renderApps(currentPage);
});

renderApps(currentPage);
