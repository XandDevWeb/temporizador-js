
const selects = document.querySelectorAll(".set-time")
const startButton = document.getElementById("start")

const minutesContainer = document.getElementById("minutes")
const secondsContainer = document.getElementById("seconds")

//############### Incluir os options dinamicamente ###############

const fillSelects = selects => {

	const reducerOptions = (accumulator, _, index) =>
		accumulator + `<option value="${index}">${index}</option>`

	const options = () => Array(60)
		.fill("")
		.reduce( reducerOptions, "" )

	const insertOptions = select => select.innerHTML = options()

	selects.forEach( insertOptions )
}

const invocateFillSelects = () => fillSelects( selects )

//############### Regra de negócio do Temporizador ###############

const getValuesUnits = () => {
	const [ { value:min }, { value:sec } ] = selects

	return [+min, +sec]
}

//const decrementUnit = unit => unit !== 0 ? --unit : "00"

const insertUnitInYourDisplay = (unitContainer, value) => unitContainer.innerHTML = `${value}`

const unitHTMLDisplay = unitContainer => +unitContainer.innerHTML

const decrementUnit = seconds =>
	()=> {
			if ( seconds === 0 )
			{
				if ( unitHTMLDisplay(minutesContainer) > 0 )
				{
					insertUnitInYourDisplay( minutesContainer, ( unitHTMLDisplay(minutesContainer) - 1 ) )

					seconds = 59
					return 59
				}

				return 0
			}

			seconds -= 1
			return seconds
		}

const start = () => {
	const [minutes, seconds] = getValuesUnits()

	insertUnitInYourDisplay(minutesContainer, minutes)
	insertUnitInYourDisplay(secondsContainer, seconds)

	const decrementSeconds = decrementUnit(seconds)

	setInterval(() => {
		insertUnitInYourDisplay(secondsContainer, decrementSeconds(minutes))

	}, 1000)

}

//########################### Eventos ############################

window.addEventListener("load", invocateFillSelects )

startButton.addEventListener("click", start)