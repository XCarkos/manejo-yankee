function EvitarObjUltrasonido () {
    if (mbit_Sensor.Ultrasonic(DigitalPin.P14, DigitalPin.P15) < 20 && mbit_Sensor.Ultrasonic(DigitalPin.P14, DigitalPin.P15) > 0) {
        mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_SpinLeft, 100)
        basic.pause(400)
    } else {
        mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_Run, 150)
    }
}
radio.onReceivedString(function (receivedString) {
    signal = receivedString
    if (signal.compare("B1") == 0) {
        modo = 0
    } else if (signal.compare("B2") == 0) {
        modo = 1
    } else if (signal.compare("B3") == 0) {
        modo = 2
    } else if (signal.compare("B4") == 0) {
        modo = 3
    }
    if (modo == 1) {
        if (signal.compare("F") == 0) {
            mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_Run, 110)
        } else if (signal.compare("B") == 0) {
            mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_Back, 110)
        } else if (signal.compare("R") == 0) {
            mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_Right, 110)
        } else if (signal.compare("L") == 0) {
            mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_Left, 110)
        } else if (signal.compare("0") == 0) {
            mbit_Robot.CarCtrl(mbit_Robot.CarState.Car_Stop)
        }
    }
})
function EvitarObjInfrarojo () {
    if (mbit_Robot.Avoid_Sensor(mbit_Robot.enAvoidState.OBSTACLE)) {
        mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_SpinLeft, 100)
        basic.pause(500)
    } else {
        mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_Run, 150)
    }
}
function ModoSeguimiento () {
    if (mbit_Robot.Line_Sensor(mbit_Robot.enPos.LeftState, mbit_Robot.enLineState.White) && mbit_Robot.Line_Sensor(mbit_Robot.enPos.RightState, mbit_Robot.enLineState.White)) {
        mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_Run, 60)
    } else if (mbit_Robot.Line_Sensor(mbit_Robot.enPos.LeftState, mbit_Robot.enLineState.White) && mbit_Robot.Line_Sensor(mbit_Robot.enPos.RightState, mbit_Robot.enLineState.Black)) {
        mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_SpinRight, 90)
    } else if (mbit_Robot.Line_Sensor(mbit_Robot.enPos.LeftState, mbit_Robot.enLineState.Black) && mbit_Robot.Line_Sensor(mbit_Robot.enPos.RightState, mbit_Robot.enLineState.White)) {
        mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_SpinLeft, 90)
    } else {
        mbit_Robot.CarCtrl(mbit_Robot.CarState.Car_Stop)
    }
}
let signal = ""
let modo = 0
basic.showIcon(IconNames.Yes)
basic.showLeds(`
    . . . . .
    . # # # .
    . # # # .
    . . # . .
    . . . . .
    `)
radio.setGroup(1)
radio.setTransmitPower(7)
basic.showIcon(IconNames.Heart)
modo = 3
basic.forever(function () {
    if (modo == 0) {
        ModoSeguimiento()
    } else if (modo == 2) {
        EvitarObjInfrarojo()
    } else if (modo == 3) {
        EvitarObjUltrasonido()
    }
})
