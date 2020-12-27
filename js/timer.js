const selects = document.querySelectorAll(".set-time")

const minutesContainer = document.getElementById("minutes")
const secondsContainer = document.getElementById("seconds")

const startButton = document.getElementById("start")
const restartButton = document.getElementById("restart")
const stopButton = document.getElementById("stop")
const replayButton = document.getElementById("replay")
const stopAlarmButton = document.getElementById("stop-alarm")


const controlsContainer = document.querySelector(".controls")

const loadAudio = (src, loop = false) => {
    const audio = new Audio()
    audio.src = src
    audio.loop = loop

    return () => {
    	audio.play()
    	return audio
    }
}

const formatTimeUnit = unit => unit <= 10 ? `0${unit}` : unit

const timer = {

	minutesContainer,

	secondsContainer,

	interval: null,

	objectAlarmAudio: null,

	alarm: loadAudio("media/despertador.mp3", true),

	ticTac: loadAudio("media/tic-tac.mp3"),

	clearLoopAlarm: function () {
		this.objectAlarmAudio.loop = false

		this.manipulateDisplayElement(stopAlarmButton, "none")
	},

	getValuesUnits: of => {
		const [ { value:min }, { value:sec } ] = selects

		return of === "display"
			? [+minutesContainer.innerText, +secondsContainer.innerText]
			: [+min, +sec]
	},

	insertUnitInYourDisplay: (unitContainer, value) => 
		unitContainer.innerHTML = formatTimeUnit(value),

	unitHTMLDisplay: unitContainer => +unitContainer.innerHTML,

	finaly: function () {
		this.stop(this.interval)
		this.objectAlarmAudio = this.alarm()

		this.manipulateDisplayElement(controlsContainer, "none")
		this.manipulateDisplayElement(stopAlarmButton, "flex")
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
				this.finaly()
				return 0
			}
			this.ticTac()
			seconds -= 1

			return seconds
		}
	},

	createInterval: (startTimer, decrementSeconds) => setInterval( startTimer, 1000),

	clearDisplay: function () {
		this.insertUnitInYourDisplay(minutesContainer, 0)
		this.insertUnitInYourDisplay(secondsContainer, 0)
	},

	start: function (of) {
		const [minutes, seconds] = this.getValuesUnits(of)

		if ( minutes === 0 && seconds === 0 ) {
			alert("Não pode iniciar do 0(zero).")
			return false
		}

		this.insertUnitInYourDisplay(minutesContainer, minutes)
		this.insertUnitInYourDisplay(secondsContainer, seconds)

		const decrementSeconds = this.decrementUnit(seconds)

		const startTimer = () =>
			this.insertUnitInYourDisplay(this.secondsContainer, decrementSeconds(minutes))

		this.interval = this.createInterval(startTimer, decrementSeconds)

		return true
	},

	stop: interval => clearInterval(interval),

	restart: function (interval) {
		this.stop(interval)
		this.clearDisplay()
	},

	manipulateDisplayElement: (element, styleDisplay ) => {

		if ( styleDisplay === "none" ) {
			element.style.display = "none"
			return
		}
		if ( styleDisplay === "flex" ) {
			element.style.display = "flex"
			return
		}
	},

	pressStartButton: function () {
		const timerIsOn = this.start()

		if ( timerIsOn ) {
			this.manipulateDisplayElement(controlsContainer, "flex")
		}
	},

	pressRestartButton: function () {
		this.restart(this.interval)

		this.manipulateDisplayElement(stopButton, "flex")
		this.manipulateDisplayElement(replayButton, "none")

		this.manipulateDisplayElement(controlsContainer, "none")
	},

	pressStopButton: function () {
		this.stop(this.interval)

		this.manipulateDisplayElement(stopButton, "none")
		this.manipulateDisplayElement(replayButton, "flex")
	},

	pressReplayButton: function () {
		this.start("display")

		this.manipulateDisplayElement(stopButton, "flex")
		this.manipulateDisplayElement(replayButton, "none")
	}
}