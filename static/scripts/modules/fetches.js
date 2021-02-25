export { getFetch, postFetch };

function getFetch(url) {
	return fetch(url)
	.then(response => response.ok ? response.json() : console.log(response.ok));
}

function postFetch(url, data) {
	return fetch(url, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data)})
	.then(response => response.ok ? response.json() : console.log(response.ok));
}