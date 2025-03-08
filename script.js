let correctWord = "GRAVITY"; // Change this on Monday when finalizing

let teams = [];

document.getElementById("jumbleForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let teamName = document.getElementById("teamName").value.trim();
    let answer = document.getElementById("answer").value.trim().toUpperCase();
    let result = document.getElementById("result");

    if (!teamName || !answer) return;

    let sortedAnswer = answer.split('').sort().join('');
    let sortedCorrect = correctWord.split('').sort().join('');

    if (teams.length >= 25) {
        result.innerHTML = "<span class='incorrect'>Selection limit reached!</span>";
        return;
    }

    if (answer === correctWord) {
        result.innerHTML = "<span class='correct'>✅ Correct! You move to the next round.</span>";
        teams.push({ teamName, answer, exact: true, time: Date.now() });
    } else if (sortedAnswer === sortedCorrect) {
        result.innerHTML = "<span class='partially-correct'>⚠ Correct letters but wrong order!</span>";
        teams.push({ teamName, answer, exact: false, time: Date.now() });
    } else {
        result.innerHTML = "<span class='incorrect'>❌ Incorrect answer.</span>";
        return;
    }

    updateLeaderboard();
});

function updateLeaderboard() {
    let leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML = "";
    
    teams.sort((a, b) => b.exact - a.exact || a.time - b.time); // Prioritize exact match, then earliest submission
    
    teams.slice(0, 25).forEach((team, index) => {
        let li = document.createElement("li");
        li.innerHTML = <strong>#${index + 1}</strong> ${team.teamName} - ${team.answer} (${team.exact ? '✅ Exact' : '⚠ Jumbled'});
        leaderboard.appendChild(li);
    });
}
