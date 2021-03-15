export default function createUser() {
	db.collection("users").insertOne({
		userName: "eva",
		userPassword: "hoi",
		email: "evaspoor@hotmail.com",
		household: "Rosendahl"
	}, (err) => {
		console.log(err)
	})
}