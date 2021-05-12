const allNotifications = document.querySelectorAll(".notification");

allNotifications.forEach(notification => {
	const notificationId = notification.dataset.notificationId;
	const seenNotifications = JSON.parse(localStorage.getItem("seenNotifications")) || [];
	if (!seenNotifications.includes(notificationId)) {
		seenNotifications.push(notificationId);
	}
	localStorage.setItem("seenNotifications", JSON.stringify(seenNotifications));
})