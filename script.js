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
		id: Math.floor(Math.random() * 200),
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
		tr.id = p.id
		let tdName = document.createElement("td")
		let tdDate = document.createElement("td")
		let tdButton = document.createElement("td")
		tdName.innerHTML = p.name
		tdDate.innerText = p.birthDate
		tdButton.innerHTML = `<button type="button" onclick="edit(${p.id})">Editar</button>`
		tr.appendChild(tdName)
		tr.appendChild(tdDate)
		tr.appendChild(tdButton)
		tBody.appendChild(tr)
	})
}

function edit(id) {
	let tr = document.getElementById(id)
	let name = document.getElementById("name")
	let birthDate = document.getElementById("birth-date")
	const pessoasStorage = JSON.parse(localStorage.getItem("pessoas"))

	pessoasStorage.map((p) => {
		if (p.id == id) {
			name.value = p.name
			birthDate.value = p.birthDate
		}
	})
	console.log(tr)
}
