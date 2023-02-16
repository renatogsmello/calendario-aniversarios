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

	pessoas.push(formData)
	localStorage.setItem(formData.id, JSON.stringify({ name, birthDate }))

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
		tdName.innerHTML = `<input class="border-none bg-cyan-200 text-cyan-800 text-lg" id="${pessoaKey}${pessoaStorage.name}" type="text" value="${pessoaStorage.name}" readonly/>`
		tdDate.innerHTML = `<input class="border-none bg-cyan-200 text-cyan-800 text-lg" id="${pessoaKey}${pessoaStorage.birthDate}" type="date" value="${pessoaStorage.birthDate}" readonly/>`
		tdEditButton.innerHTML = `<button class="bg-cyan-700 px-4 py-1 rounded text-cyan-100" id="${pessoaKey}Editar" type="button" onclick="edit(${pessoaKey})">Editar</button>`
		tdRemoveButton.innerHTML = `<button class="bg-red-700 px-4 py-1 rounded text-red-100 mx-4" type="button" onclick="remove(${pessoaKey})">Deletar</button>`
		tdUpdateButton.innerHTML = `<button class="bg-gray-200 px-4 py-1 rounded" id="${pessoaKey}Atualizar" type="button" onclick="update(${pessoaKey})" disabled="true">Atualizar</button>`
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
