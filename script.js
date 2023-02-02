const form = document.querySelector("form")

form.addEventListener("submit", (e) => {
	e.preventDefault()
	console.log(e)

	let name = document.getElementById("name").value
	let birthDate = document.getElementById("birth-date").value

	let formData = {
		name: name,
		birthDate: birthDate,
	}

	console.log({ name, birthDate })
})
