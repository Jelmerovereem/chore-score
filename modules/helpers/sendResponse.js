export default function sendResponse(req, res, data) {
	res.setHeader("Content-Type", "application/json");
	res.send(JSON.stringify(data));
}