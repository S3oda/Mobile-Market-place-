const appsPerPage = 6;
let currentPage = 0;

const appData = Array.from({ length: 12 });
const reviewData = [
  { app: "App 1", review: "★★★★☆ Great app!" },
  { app: "App 2", review: "★★★☆☆ Good but needs work." },
  { app: "App 3", review: "★★★★★ Excellent experience!" },
  { app: "App 4", review: "★★☆☆☆ Not what I expected." },
  { app: "App 5", review: "★★★★☆ Very useful." },
  { app: "App 6", review: "★★★☆☆ Decent performance." }
];
const leaderboardData = [
  { user: "UserA", points: 1500 },
  { user: "UserB", points: 1200 },
  { user: "UserC", points: 950 },
  { user: "UserD", points: 870 },
  { user: "UserE", points: 760 }
];
const chatMessages = [];

function renderApps(page) {
  const grid = document.querySelector(".grid");
  grid.innerHTML = "";

  if (page < 2) {
    const start = page * appsPerPage;
    const end = Math.min(start + appsPerPage, appData.length);
    appData.slice(start, end).forEach((_, index) => {
      const card = document.createElement("div");
      card.className = "app-card";
      card.textContent = `App ${start + index + 1}`;
      grid.appendChild(card);
    });
  } else if (page === 2) {
    reviewData.forEach(item => {
      const reviewCard = document.createElement("div");
      reviewCard.className = "review-card";
      reviewCard.innerText = `${item.app} - ${item.review}`;
      grid.appendChild(reviewCard);
    });
  } else if (page === 3) {
    leaderboardData.forEach(entry => {
      const row = document.createElement("div");
      row.className = "leaderboard-row";
      row.textContent = `${entry.user} - ${entry.points} pts`;
      grid.appendChild(row);
    });
  } else {
    renderChat();
  }

  document.getElementById("prevPage").style.display = page > 0 ? "inline-block" : "none";
  document.getElementById("nextPage").style.display = page < 4 ? "inline-block" : "none";
}

function renderChat() {
  const grid = document.querySelector(".grid");
  grid.innerHTML = "";

  const chatBox = document.createElement("div");
  chatBox.className = "chat-box";

  const messageDisplay = document.createElement("div");
  messageDisplay.className = "chat-messages";
  messageDisplay.id = "chatMessages";

  chatMessages.forEach(msg => {
    const msgDiv = document.createElement("div");
    msgDiv.className = "chat-message";
    msgDiv.textContent = msg;
    messageDisplay.appendChild(msgDiv);
  });

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Type your message...";
  input.id = "chatInput";

  const sendBtn = document.createElement("button");
  sendBtn.textContent = "Send";
  sendBtn.onclick = () => {
    const value = input.value.trim();
    if (value) {
      chatMessages.push("You: " + value);
      renderApps(currentPage);
    }
  };

  chatBox.appendChild(messageDisplay);
  chatBox.appendChild(input);
  chatBox.appendChild(sendBtn);
  grid.appendChild(chatBox);
}

document.getElementById("nextPage").addEventListener("click", () => {
  currentPage++;
  renderApps(currentPage);
});

document.getElementById("prevPage").addEventListener("click", () => {
  currentPage--;
  renderApps(currentPage);
});

renderApps(currentPage);
