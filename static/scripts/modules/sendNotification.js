import { triggerNotificationBtn } from "../main.js";
import { postFetch } from "../modules/fetches.js";

const publicVapidKey = "BEeCYxP6aQId0f0CBInEsf42853JknEK3UB4b4s4ZgyY_Zevtaca--MdW_FinxR5TbaewGhZkLb1zfT6XFaPHjM";

function urlBase64ToUint8Array(base64String) {
	const padding = "=".repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}

	return outputArray;
}

export default async function triggerNotification() {
	if ("serviceWorker" in navigator) {
		const register = await navigator.serviceWorker.register("../scripts/modules/sw.js", {
			scope: "/scripts/modules/"
		});

		console.log(register)

		const subscription = await register.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
		});

		await postFetch("/sendPush", JSON.stringify(subscription));

		/*await fetch("/sendPush", {
			method: "POST",
			body: JSON.stringify(subscription),
			headers: {
				"Content-Type": "application/json",
			},
		});*/
	} else {
		console.error("Service workers are not supported in this browser");
	}
}