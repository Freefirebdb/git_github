const people = [
  { name: "Keerthi Kumar", dob: "2004-04-15", role: "Developer" },
  { name: "Ritik Yadav", dob: "2003-04-16", role: "Designer" },
  { name: "Akshara P", dob: "2004-09-10", role: "Coordinator" },
  { name: "Yashasya", dob: "2002-12-20", role: "Event Lead" },
  { name: "Krishna Negi", dob: "2004-04-22", role: "Member" }
];

const today = new Date();

function nextBirthday(dob) {
  const d = new Date(dob);
  let next = new Date(today.getFullYear(), d.getMonth(), d.getDate());
  if (next < today) next.setFullYear(today.getFullYear() + 1);
  return next;
}

/* ---------- UPCOMING CAROUSEL ---------- */

const upcoming = [...people].sort(
  (a, b) => nextBirthday(a.dob) - nextBirthday(b.dob)
);

let index = 0;
const upcomingCard = document.getElementById("upcomingCard");

function renderUpcoming() {
  const p = upcoming[index];
  upcomingCard.innerHTML = `
    <h3>${p.name}</h3>
    <p>${p.role}</p>
    <p>🎂 ${nextBirthday(p.dob).toDateString()}</p>
  `;
}

document.querySelector(".next").onclick = () => {
  index = (index + 1) % upcoming.length;
  renderUpcoming();
};

document.querySelector(".prev").onclick = () => {
  index = (index - 1 + upcoming.length) % upcoming.length;
  renderUpcoming();
};

renderUpcoming();

/* ---------- MONTH FILTER ---------- */

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const monthButtons = document.getElementById("monthButtons");
const monthList = document.getElementById("monthList");

months.forEach((m, i) => {
  const btn = document.createElement("button");
  btn.textContent = m;
  btn.onclick = () => {
    monthList.innerHTML = "";
    people
      .filter(p => new Date(p.dob).getMonth() === i)
      .forEach(p => {
        monthList.innerHTML += `
          <div class="item">
            ${p.name} — ${new Date(p.dob).toDateString()}
          </div>`;
      });
  };
  monthButtons.appendChild(btn);
});


const yearSelect = document.getElementById("yearSelect");
const yearList = document.getElementById("yearList");

[...new Set(people.map(p => new Date(p.dob).getFullYear()))].forEach(y => {
  const opt = document.createElement("option");
  opt.value = y;
  opt.textContent = y;
  yearSelect.appendChild(opt);
});

yearSelect.onchange = () => {
  yearList.innerHTML = "";
  people
    .filter(p => new Date(p.dob).getFullYear() == yearSelect.value)
    .forEach(p => {
      yearList.innerHTML += `
        <div class="item">
          ${p.name} — ${new Date(p.dob).toDateString()}
        </div>`;
    });
};
