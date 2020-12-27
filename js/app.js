//############### Incluir os options dinamicamente ###############

const fillSelects = selects => {

	const reducerOptions = (accumulator, _, index) =>
		accumulator + `<option value="${index}">${index}</option>`

	const options = () => Array(60)
		.fill("")
		.reduce( reducerOptions, "" )

	const insertOptions = select => select.innerHTML = options()

	timer.selects.forEach( insertOptions )
}

const invocateFillSelects = () => fillSelects( selects )

//########################### Eventos ############################

window.addEventListener("load", invocateFillSelects )

startButton.addEventListener("click", () => {timer.pressStartButton()} )
replayButton.addEventListener("click", () => {timer.pressReplayButton()})
stopButton.addEventListener("click", () => {timer.pressStopButton()})
restartButton.addEventListener("click", () => {timer.pressRestartButton()})