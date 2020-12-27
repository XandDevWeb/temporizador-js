const selects = document.querySelectorAll(".set-time")

const minutesContainer = document.getElementById("minutes")
const secondsContainer = document.getElementById("seconds")

const startButton = document.getElementById("start")
const restartButton = document.getElementById("restart")
const stopButton = document.getElementById("stop")
const replayButton = document.getElementById("replay")
const stopAlarmButton = document.getElementById("stop-alarm")


const controlsContainer = document.querySelector(".controls")

const timer = {

	selects,

	minutesContainer,

	secondsContainer,

	interval: null,

	objectAlarmAudio: null,

	clearLoopAlarm: function () {
		this.objectAlarmAudio.loop = false
		this.hiddenStopAlarmButton()
	},

	getValuesUnits: function (of) {
		const [ { value:min }, { value:sec } ] = this.selects

		return of === "display"
			? [+minutesContainer.innerText, +secondsContainer.innerText]
			: [+min, +sec]
	},

	insertUnitInYourDisplay: function (unitContainer, value) {
		const time = value <= 10 ? `0${value}` : value
		unitContainer.innerHTML = time
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

				this.stop(this.interval)
				this.objectAlarmAudio = this.alarm()
				this.hiddenControls()
				this.showStopAlarmButton()
				return 0
			}
			
			this.ticTac()

			seconds -= 1
			return seconds
		}
	},

	alarm: function () {
		const alarm = this.alarmAudio()
		alarm.play()

		return alarm
	},

	ticTac: function () {
		this.ticTacAudio().play()
	},

	alarmAudio: function () {
		const alarm = new Audio()
		alarm.src = "media/despertador.mp3"
		alarm.loop = true
		return alarm
	},

	ticTacAudio: function () {
		const ticTac = new Audio()
		ticTac.src = "media/tic-tac.mp3"
		return ticTac
	},

	createInterval: function (startTimer, decrementSeconds) {
		return setInterval( startTimer, 1000)
	},

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

		const startTimer = () => {

			this.insertUnitInYourDisplay(this.secondsContainer, decrementSeconds(minutes))
		}

		this.interval = this.createInterval(startTimer, decrementSeconds)

		return true
	},

	stop: function (interval) {
		clearInterval(interval)
	},

	restart: function (interval) {
		this.stop(interval)
		this.clearDisplay()
	},

	showControls: function () {
		controlsContainer.style.display = "flex"
	},

	showStopAlarmButton: function () {
		stopAlarmButton.style.display = "inline"
	},

	hiddenStopAlarmButton: function () {
		stopAlarmButton.style.display = "none"
	},

	hiddenControls: function () {
		controlsContainer.style.display = "none"
	},

	showStopButton: function () {
		stopButton.style.display = "inline"
		replayButton.style.display = "none"
	},

	hiddenStopButton: function () {
		stopButton.style.display = "none"
		replayButton.style.display = "inline"
	},

	pressStartButton: function () {
		const timerIsOn = this.start()

		if ( timerIsOn ) {
			this.showControls()
		}
	},

	pressRestartButton: function () {
		this.restart(this.interval)
		this.showStopButton()
		this.hiddenControls()

	},

	pressStopButton: function () {
		this.stop(this.interval)
		this.hiddenStopButton()
	},

	pressReplayButton: function () {
		this.start("display")
		this.showStopButton()
	},
}
