function stop() {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 0)
}

function reversal(speed1: number) {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.analogWritePin(AnalogPin.P1, speed1)
}

function forward(speed2: number) {
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.analogWritePin(AnalogPin.P0, speed2)
}

function update_display(display_temp: number) {
    lcd1602.putNumber(display_temp, 5, 0)
    lcd1602.putString(" C", 12, 0)
}

function write_log(log_message: string) {
    serial.writeLine(log_message)
}

let current_temp = 0
led.enable(false)
lcd1602.setAddress(lcd1602.I2C_ADDR.addr1)
lcd1602.putString("Temp:      ", 0, 0)
lcd1602.set_LCD_Show(lcd1602.visibled.visible)
lcd1602.set_backlight(lcd1602.on_off.on)
basic.forever(function on_forever() {
    
    current_temp = DS18B20.Ds18b20Temp(DS18B20.ValType.DS18B20_temperature_C, DigitalPin.P10)
    write_log("Temp: " + convertToText(current_temp) + "C")
    update_display(current_temp)
    if (current_temp > 24.85) {
        forward(500)
        write_log("Fan Start!")
    } else {
        write_log("Fan Stop!")
        stop()
        basic.pause(2000)
    }
    
})
