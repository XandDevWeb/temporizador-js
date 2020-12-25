const timer = {

	selects: document.querySelectorAll(".set-time"),

	startButton: document.getElementById("start"),

	minutesContainer: document.getElementById("minutes"),

	secondsContainer: document.getElementById("seconds"),

	interval: 0,

	getValuesUnits: function () {
		const [ { value:min }, { value:sec } ] = this.selects

		return [+min, +sec]
	},

	insertUnitInYourDisplay: function (unitContainer, value) {
		unitContainer.innerHTML = `${value}`
	},

	unitHTMLDisplay: function (unitContainer) {
		return +unitContainer.innerHTML
	},

	decrementUnit: function (seconds) {
		return () => {

			const minutesHTMLDisplay = this.unitHTMLDisplay(this.minutesContainer)
			const minutesHTMLDisplayBiggerThenZero =
				minutesHTMLDisplay > 0

			if ( seconds === 0 )
			{
				if ( minutesHTMLDisplayBiggerThenZero )
				{
					this.insertUnitInYourDisplay( this.minutesContainer, ( minutesHTMLDisplay - 1 ) )

					seconds = 59
					return 59
				}

				clearInterval(this.interval)
				return 0
			}
			
			seconds -= 1
			return seconds
		}
	},

	start: function () {
		const [minutes, seconds] = this.getValuesUnits()

		if ( minutes === 0 && seconds === 0 ) {
			alert("Não pode iniciar do 0(zero).")
			return
		}

		this.insertUnitInYourDisplay(minutesContainer, minutes)
		this.insertUnitInYourDisplay(secondsContainer, seconds)

		const decrementSeconds = this.decrementUnit(seconds)

		const startTimer = () => {

			this.insertUnitInYourDisplay(this.secondsContainer, decrementSeconds(minutes))
		}

		this.interval = setInterval( startTimer, 1000)
	}
}
