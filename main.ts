input.onButtonPressed(Button.A, function () {
    music.stopAllSounds()
    outputMode += 1
    if (outputMode > nModes) {
        outputMode = 1
    }
})
input.onButtonPressed(Button.B, function () {
    music.stopAllSounds()
    outputMode += -1
    if (outputMode < 1) {
        outputMode = nModes
    }
})
let nModes = 0
let outputMode = 0
basic.showLeds(`
    . # . # .
    . . . . .
    . . # . .
    # . . . #
    . # # # .
    `)
let outputVariable = 512
outputMode = 1
nModes = 3
basic.forever(function () {
    outputVariable = pins.analogReadPin(AnalogPin.P1)
    if (outputMode == 1) {
        basic.showLeds(`
            . # . # .
            . . . . .
            . . # . .
            # . . . #
            . # # # .
            `)
        pins.servoWritePin(AnalogPin.P0, Math.constrain(Math.map(outputVariable, 0, 1023, 0, 180), 0, 180))
    } else if (outputMode == 2) {
        basic.showLeds(`
            . # # # #
            . # . . #
            . # . . #
            # # . # #
            # # . # #
            `)
        music.playTone(Math.map(outputVariable, 0, 1023, 131, 988), music.beat(BeatFraction.Whole))
    } else {
        led.plotBarGraph(
        outputVariable,
        1024
        )
    }
    serial.writeValue("x", outputVariable)
})
