import { choreModal, choreTitle, modalDatePicker, modalNotes, modalSaveBtn } from "../utils/detailRoomUtils.js";

export default function openModal() {
	choreModal.style.display = "block";
	choreTitle.innerText = this.dataset.chorename;
}