const subCountInput = document.getElementById("subCount");
const generateBtn = document.getElementById("generate");
const container = document.getElementById("subjects-container");
const actionButtons = document.getElementById("action-buttons");
const calcBtn = document.getElementById("calculate");
const resetBtn = document.getElementById("reset");
const resultSection = document.getElementById("result-section");
const finalScore = document.getElementById("final-score");
const scoreMessage = document.getElementById("score-message");


generateBtn.addEventListener("click", () => {
    const count = Number(subCountInput.value);

    if (!count || count <= 0 || count > 15) {
        shake(subCountInput);
        subCountInput.style.borderColor = "#ef4444";
        return;
    }

    subCountInput.style.borderColor = "transparent";
    container.innerHTML = "";
    resultSection.classList.remove("active");

    for (let i = 1; i <= count; i++) {
        const row = document.createElement("div");
        row.className = "subject-card";
        row.style.animationDelay = `${i * 0.05}s`;

        row.innerHTML = `
            <span class="card-number">${i}</span>
            <div class="input-wrapper">
                <label>Grade Point</label>
                <input type="number" class="grade-point" min="0" max="10">
            </div>
            <div class="input-wrapper">
                <label>Credits</label>
                <input type="number" class="credit" min="1" max="10">
            </div>
        `;
        container.appendChild(row);
    }

    actionButtons.classList.add("visible");
});

function shake(element) {
    element.animate([
        { transform: "translateX(0)" },
        { transform: "translateX(-5px)" },
        { transform: "translateX(5px)" },
        { transform: "translateX(0)" }
    ], { duration: 300 });
}

