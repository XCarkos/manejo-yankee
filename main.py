basic.show_icon(IconNames.YES)
basic.show_leds("""
    . # # # #
        # # # . #
        # # . # #
        # . . # #
        . # # # .
""")
basic.show_string("HOLA FUNDACION EL NOGAL")
basic.show_icon(IconNames.HEART)

def on_forever():
    pass
basic.forever(on_forever)

console.log('¡Hola!, soy Yankee')  
