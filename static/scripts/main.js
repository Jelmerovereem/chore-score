import { loginBtn } from "./utils/loginUtils.js";
import login from "./modules/login.js";
import { imgInput, uploadBtn } from "./utils/profileUtils.js";
import { getFetch, postFetch } from "./modules/fetches.js";
import uploadImg from "./modules/uploadImg.js";
import { allChoresElements, closeModalBtn, imgEl, evidencePicInput, modalSaveBtn } from "./utils/detailRoomUtils.js";
import openModal from "./modules/openChoreModal.js";
import closeChoreModal from "./modules/closeChoreModal.js";
import saveChore from "./modules/saveChore.js";
import triggerNotification from "./modules/sendNotification.js";
import { notificationsLink, amountNotifications } from "./utils/headerUtils.js";

export const triggerNotificationBtn = document.querySelector(".notificationBtn");

if (triggerNotificationBtn) {
	triggerNotificationBtn.addEventListener("click", triggerNotification);
}

if (loginBtn) loginBtn.addEventListener("click", login);

if (imgInput && uploadImg) imgInput.addEventListener("change", async () => {
	const imgUrl = await uploadImg(imgInput.files[0]);
	const uploadedImage = await postFetch("/changePic", JSON.stringify({imgUrl}));
	uploadedImage.status === "ok" ? window.location.reload() : console.err("Niet gelukt");
});

if (allChoresElements && openModal) {
	allChoresElements.forEach((chore) => {
		chore.addEventListener("click", openModal);
	})
}

if (closeModalBtn) closeModalBtn.addEventListener("click", closeChoreModal);
if (evidencePicInput) evidencePicInput.addEventListener("change", async () => {
	const imgUrl = await uploadImg(evidencePicInput.files[0]);
	imgEl.src = imgUrl;
})

if (modalSaveBtn) modalSaveBtn.addEventListener("click", async () => {
	const choreData = await saveChore();
	if (choreData) {
		const savedChore = await postFetch("/saveChore", JSON.stringify(choreData));
		console.log(savedChore);
		if (savedChore.status === "ok") {
			alert("Klus is opgeslagen!")
			closeChoreModal();
		}
	}
});

if (notificationsLink) {
	getFetch("/getNotifications").then(response => {
		const thisUser = localStorage.getItem("userName") || "";
		if (response.status === "ok") {
			const seenNotifications = JSON.parse(localStorage.getItem("seenNotifications")) || [];
			let notSeenCounter = 0;
			response.notifications.forEach(notification => {
				notification.id = notification.id.toString();
				if (!seenNotifications.includes(notification.id) && notification.mainUser !== thisUser) {
					notSeenCounter++;
				}
			})
			amountNotifications.textContent = notSeenCounter;
		} else {
			if (thisUser === "jelmer") {
				alert(`Notificaties ophalen is mislukt. ${response.msg}`)
				console.log(response)
			}	
		}
	})
}