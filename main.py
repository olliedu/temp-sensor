def stop():
    pins.digital_write_pin(DigitalPin.P0, 0)
    pins.digital_write_pin(DigitalPin.P1, 0)
def reversal(speed1: number):
    pins.digital_write_pin(DigitalPin.P0, 0)
    pins.analog_write_pin(AnalogPin.P1, speed1)
def forward(speed2: number):
    pins.digital_write_pin(DigitalPin.P1, 0)
    pins.analog_write_pin(AnalogPin.P0, speed2)
def update_display(display_temp: number):
    lcd1602.put_number(display_temp, 5, 0)
    lcd1602.put_string(" C", 12, 0)
def write_log(log_message: str):
    serial.write_line(log_message)

current_temp = 0
led.enable(False)
lcd1602.set_address(lcd1602.I2C_ADDR.ADDR1)
lcd1602.put_string("Temp:      ", 0, 0)
lcd1602.set_LCD_Show(lcd1602.visibled.VISIBLE)
lcd1602.set_backlight(lcd1602.on_off.ON)

def on_forever():
    global current_temp
    current_temp = DS18B20.ds18b20_temp(DS18B20.ValType.DS18B20_TEMPERATURE_C, DigitalPin.P10)
    write_log("Temp: " + convert_to_text(current_temp) + "C")
    update_display(current_temp)
    if current_temp > 24.85:
        forward(500)
        write_log("Fan Start!")
    else:
        write_log("Fan Stop!")
        stop()
        basic.pause(2000)
basic.forever(on_forever)
