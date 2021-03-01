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