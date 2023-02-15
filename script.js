const form = document.querySelector("form")
const pessoas = []
let listaPessoas = document.getElementById("listaPessoas")
let tBody = document.createElement("tbody")
listaPessoas.appendChild(tBody)

const pessoasStorage = JSON.parse(localStorage.getItem("pessoas")) || []

listarPessoas(pessoasStorage)

form.addEventListener("submit", (e) => {
	e.preventDefault()

	let name = document.getElementById("name").value
	let birthDate = document.getElementById("birth-date").value

	let formData = {
		name: name,
		birthDate: birthDate,
	}

	pessoas.push(formData)
	const pessoasAtualizadas = [...pessoas, formData]
	console.log(pessoas)
	localStorage.setItem("pessoas", JSON.stringify(pessoas))
	const pessoasStorage = JSON.parse(localStorage.getItem("pessoas")) || []

	listarPessoas(pessoasStorage)
})

function listarPessoas(pessoas) {
	if (tBody.hasChildNodes()) {
		tBody.innerHTML = ""
	}
	pessoas.map((p) => {
		let tr = document.createElement("tr")
		let tdName = document.createElement("td")
		let tdDate = document.createElement("td")
		tdName.innerText = p.name
		tdDate.innerText = p.birthDate
		tr.appendChild(tdName)
		tr.appendChild(tdDate)
		tBody.appendChild(tr)
	})
}
