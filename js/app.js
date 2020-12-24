const reducerOptions = (accumulator, _, index) =>
	accumulator + `<option value="${index}">${index}</option>`

const options = () => Array(60)
	.fill("")
	.reduce( reducerOptions, "" )

const insertOptions = select => select.innerHTML = options()

const fillSelects = selects => selects.forEach( insertOptions )

const invocateFillSelects = () => {
	const selects = document.querySelectorAll(".set-time")
	fillSelects( selects )
}

window.addEventListener("load", invocateFillSelects )