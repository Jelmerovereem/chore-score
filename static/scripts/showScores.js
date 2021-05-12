const allTotalPoints = [];
const allUserObjects = [];

householdData.forEach((user) => {
	let totalPoints = 0;
	user.finishedChores.forEach((day) => {
		day.todaysChores.forEach((chore) => {
			totalPoints = totalPoints + chore.points++;
		})
	})
	let userObj = {
		userName: user.userName,
		totalPoints
	}
	allTotalPoints.push(totalPoints);
	allUserObjects.push(userObj);
});

allUserObjects.sort((a, b) => b.totalPoints - a.totalPoints);

const highestPoints = Math.max(...allTotalPoints);

allUserObjects.forEach((user) => {
	const percentage = (user.totalPoints / highestPoints) * 100;
	const color = user.userName === userData.userName ? "black" : "";
	const userHtml = `
			<div data-userName="${user.userName}" class="userBar">
				<p class="userName" style="color: ${color};">${user.userName}</p>
				<div class="barContainer" style="width: 100%;">
					<div class="pointsBar" data-points="${user.totalPoints}" style="width: ${percentage}%;"></div>
				</div>
				<p class="userPoints">${user.totalPoints}</p>
			</div>
	`;
	document.querySelector(".scoreList").insertAdjacentHTML("beforeend", userHtml);
})

const yourScoresContainer = document.querySelector(".yourScoreList");

const today = new Date();
const year = today.getFullYear().toString();
userData.finishedChores.forEach(day => {
	const dayYear = day.date.split("-")[0];
	if (year === dayYear) {
		const month = ((today.getMonth()+1) < 10 ? `0${today.getMonth()+1}` : today.getMonth()+1).toString();
		const dayMonth = day.date.split("-")[1];
		if (dayMonth === month) {
			let thisMonthPoints = 0;
			let monthsArray = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
			const thisMonth = monthsArray[today.getMonth()];
			day.todaysChores.forEach(chore => thisMonthPoints = thisMonthPoints + chore.points);
			const monthHtml = `
			<div class="userBar">
				<p>${thisMonth}</p>
				<div class="barContainer" style="width: 100%;">
					<div class="pointsBar" style="width: 100%;"></div>
				</div>
				<p class="userPoints">${thisMonthPoints}</p>
			</div>
			`;
			yourScoresContainer.insertAdjacentHTML("beforeend", monthHtml);
		}
	}
})