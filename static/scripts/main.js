import { loginBtn } from "./utils/loginUtils.js";
import login from "./modules/login.js";
import { imgInput, uploadBtn } from "./utils/profileUtils.js";
import { postFetch } from "./modules/fetches.js";
import uploadImg from "./modules/uploadImg.js";
import { allChoresElements, closeModalBtn, imgEl, evidencePicInput, modalSaveBtn } from "./utils/detailRoomUtils.js";
import openModal from "./modules/openChoreModal.js";
import closeChoreModal from "./modules/closeChoreModal.js";
import saveChore from "./modules/saveChore.js";

if (loginBtn) loginBtn.addEventListener("click", login);

if (imgInput && uploadImg) imgInput.addEventListener("change", async () => {
	const imgUrl = await uploadImg(imgInput.files[0]);
	const uploadedImage = await postFetch("/changePic", JSON.stringify({imgUrl}));
	uploadedImage.status === "ok" ? window.location.reload() : console.err("Niet gelukt");
});

if (allChoresElements && openModal) {
	console.log(allChoresElements)
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
	}
});