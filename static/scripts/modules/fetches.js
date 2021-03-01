export { getFetch, postFetch, postExternFetch };

function getFetch(url) {
	return fetch(url)
	.then(response => response.ok ? response.json() : console.log(response.ok));
}

function postFetch(url, data) {
	return fetch(url, {method: "POST", headers: {"Content-Type": "application/json"}, body: data})
	.then(response => response.ok ? response.json() : console.log(response));
}

function postExternFetch(url, data) {
	return fetch(url, {method: "POST", body: data})
	.then(response => response.ok ? response.json() : console.log(response));
}