const form = document.querySelector("form")
const pessoas = []
let listaPessoas = document.getElementById("listaPessoas")
let tBody = document.createElement("tbody")
listaPessoas.appendChild(tBody)

listarPessoas()

form.addEventListener("submit", (e) => {
	e.preventDefault()

	let name = document.getElementById("name").value
	let birthDate = document.getElementById("birth-date").value
	let formData = {
		id: Math.floor(Math.random() * 200),
		name: name,
		birthDate: birthDate,
	}

	// if (localStorage.length == 0) {
	// 	pessoas.push(formData)
	// 	localStorage.setItem(formData.id, JSON.stringify({ name, birthDate }))
	// }
	// for (let i = 0; i < localStorage.length; i++) {
	// 	const pessoaKey = localStorage.key(i)
	// 	console.log(`formData id: ${formData.id} pessoaKey: ${pessoaKey}`)

	// 	if (pessoaKey == formData.id) {
	// 		localStorage.setItem(pessoaKey, JSON.stringify({ name, birthDate }))
	// 	}
	// }

	pessoas.push(formData)
	localStorage.setItem(formData.id, JSON.stringify({ name, birthDate }))
	// const pessoasStorage = JSON.parse(localStorage.getItem("pessoas")) || []

	listarPessoas()
	form.reset()
})

function listarPessoas() {
	if (tBody.hasChildNodes()) {
		tBody.innerHTML = ""
	}
	for (let i = 0; i < localStorage.length; i++) {
		const pessoaKey = localStorage.key(i)
		const pessoaStorage = JSON.parse(localStorage.getItem(pessoaKey))

		let tr = document.createElement("tr")
		tr.id = pessoaKey
		let tdName = document.createElement("td")
		let tdDate = document.createElement("td")
		let tdEditButton = document.createElement("td")
		let tdRemoveButton = document.createElement("td")
		let tdUpdateButton = document.createElement("td")
		tdName.innerHTML = `<input id="${pessoaKey}${pessoaStorage.name}" type="text" value="${pessoaStorage.name}" readonly/>`
		tdDate.innerHTML = `<input id="${pessoaKey}${pessoaStorage.birthDate}" type="date" value="${pessoaStorage.birthDate}" readonly/>`
		tdEditButton.innerHTML = `<button id="${pessoaKey}Editar" type="button" onclick="edit(${pessoaKey})">Editar</button>`
		tdRemoveButton.innerHTML = `<button  type="button" onclick="remove(${pessoaKey})">Deletar</button>`
		tdUpdateButton.innerHTML = `<button id="${pessoaKey}Atualizar" type="button" onclick="update(${pessoaKey})" disabled="true">Atualizar</button>`
		tr.appendChild(tdName)
		tr.appendChild(tdDate)
		tr.appendChild(tdEditButton)
		tr.appendChild(tdRemoveButton)
		tr.appendChild(tdUpdateButton)
		tBody.appendChild(tr)
	}
}

function edit(id) {
	let tr = document.getElementById(id)

	const pessoaStorage = JSON.parse(localStorage.getItem(id))
	let name = document.getElementById(`${id}${pessoaStorage.name}`)
	let birthDate = document.getElementById(`${id}${pessoaStorage.birthDate}`)
	let editButton = document.getElementById(`${id}Editar`)
	let updateButton = document.getElementById(`${id}Atualizar`)

	name.removeAttribute("readonly")
	birthDate.removeAttribute("readonly")
	editButton.setAttribute("disabled", true)
	updateButton.removeAttribute("disabled")
}

function remove(id) {
	localStorage.removeItem(id)
	listarPessoas()
}

function update(id) {
	const pessoaStorage = JSON.parse(localStorage.getItem(id))
	let name = document.getElementById(`${id}${pessoaStorage.name}`).value
	let birthDate = document.getElementById(`${id}${pessoaStorage.birthDate}`).value

	localStorage.setItem(id, JSON.stringify({ name, birthDate }))

	listarPessoas()
}
