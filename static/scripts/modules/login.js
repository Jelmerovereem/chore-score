import { userNameInput, userPasswordInput } from "../utils/loginUtils.js";
import { postFetch } from "../modules/fetches.js";

export default function login() {
	if (checkForm()) {
		let userInputs = {
			userName: userNameInput.value,
			userPassword: userPasswordInput.value
		}
		postFetch("/checkLogin", userInputs)
		.then(data => {
			if (data.status === "ok") {
				localStorage.setItem("userName", userNameInput.value)
				window.location.pathname = "/";
			} else {
				alert(data.message)
			}
		})
	}
}

function checkForm() {
	if (userNameInput.value === "") {
		alert("Vul je voornaam in!");
		return false;
	} else if (userPasswordInput.value === "") {
		alert("Vul je wachtwoord in!");
		return false;
	} else {
		return true;
	}
}