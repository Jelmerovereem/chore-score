import { room, points, choreTitle, modalDatePicker, imgEl, modalNotes } from "../utils/detailRoomUtils.js";

export default function saveChore() {
	if (choreTitle.innerText === "") {
		alert("Geen chore..")
	}

	if (modalDatePicker.value === "") {
		alert("Je hebt nog geen datum ingevoerd!")
	}

	if (imgEl.src === "") {
		alert("Je hebt nog geen bewijs foto ingevoerd")
	}

	if (choreTitle.innerText != "" && modalDatePicker.value != "" && imgEl.src != "") {
		const roomName = room.innerText;
		const amountPoints = parseInt(points.innerText);
		const choreName = choreTitle.innerText;
		const dateAndTime = modalDatePicker.value;
		const evidencePicUrl = imgEl.src;
		const notes = modalNotes.value;
		const data = {
			room: roomName, points: amountPoints, choreName, dateAndTime, evidencePicUrl, notes
		}
		return data;
	}
}