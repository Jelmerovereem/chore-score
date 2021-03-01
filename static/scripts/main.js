import { loginBtn } from "./utils/loginUtils.js";
import login from "./modules/login.js";
import { imgInput, uploadBtn } from "./utils/profileUtils.js";
import changePic from "./modules/uploadImg.js";
import { allChoresElements, closeModalBtn } from "./utils/detailRoomUtils.js";
import openModal from "./modules/openChoreModal.js";
import closeChoreModal from "./modules/closeChoreModal.js";

if (loginBtn) loginBtn.addEventListener("click", login);

if (imgInput && changePic) imgInput.addEventListener("change", changePic);

if (allChoresElements && openModal) {
	console.log(allChoresElements)
	allChoresElements.forEach((chore) => {
		chore.addEventListener("click", openModal);
	})
}

if (closeModalBtn) closeModalBtn.addEventListener("click", closeChoreModal);