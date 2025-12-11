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


calcBtn.addEventListener("click", () => {

    const grades = document.querySelectorAll(".grade-point");
    const credits = document.querySelectorAll(".credit");

    let totalCredits = 0;
    let totalPoints = 0;
    let foundError = false;

    grades.forEach((gradeInput, index) => {

        const grade = parseFloat(gradeInput.value);      
        const credit = parseFloat(credits[index].value);
        const subjectCard = gradeInput.closest(".subject-card");

        const isGradeInvalid = isNaN(grade) || grade < 0 || grade > 10;
        const isCreditInvalid = isNaN(credit) || credit <= 0;

        if (isGradeInvalid || isCreditInvalid) {
            gradeInput.classList.toggle("error", isGradeInvalid);
            credits[index].classList.toggle("error", isCreditInvalid);
            shake(subjectCard);
            foundError = true;
            return;
        }

        gradeInput.classList.remove("error");
        credits[index].classList.remove("error");

        totalPoints += grade * credit;
        totalCredits += credit;
    });

    if (foundError || totalCredits === 0) return;

    const cgpa = (totalPoints / totalCredits).toFixed(2);
    showResult(cgpa);

    resultSection.scrollIntoView({ behavior: "smooth" });
});


function showResult(score) {
    finalScore.textContent = score;

    if (score >= 9) setMessage("Outstanding Performance! 🌟", "#059669");
    else if (score >= 8) setMessage("Great Job! Keep it up 🚀", "#059669");
    else if (score >= 6) setMessage("Good effort! You can do better 💪", "#d97706", "rgba(245,158,11,0.1)");
    else setMessage("Keep pushing harder! 📚", "#dc2626", "rgba(220,38,38,0.1)");

    resultSection.classList.add("active");
}


function setMessage(text, color, bg = "rgba(16,185,129,0.1)") {
    scoreMessage.textContent = text;
    scoreMessage.style.color = color;
    scoreMessage.style.background = bg;
}


function shake(element) {
    element.animate([
        { transform: "translateX(0)" },
        { transform: "translateX(-5px)" },
        { transform: "translateX(5px)" },
        { transform: "translateX(0)" }
    ], { duration: 300 });
}


resetBtn.addEventListener("click", () => {
    subCountInput.value = "";
    container.innerHTML = "";
    actionButtons.classList.remove("visible");
    resultSection.classList.remove("active");
});
