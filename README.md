# Automatic garden watering system
This project consists of a Raspberry Pi 4 running Ubuntu server (x64) that is connected to various floaters inside 2 water tanks and to various relays that control solenoid valves. Here's some specific info:

- Valves 1 - 4 are for watering the garden
- Rain is a property set to define that it will or is currently raining for certain conditions to occur
- Tap water can be manually activated or deactivated, equals to Valve 5
- Pump is to manually activate or deactivate it, equals to Valve 6
- Letting water fall back down from tank 2 to 1 is done with Valve 7
- There are 5 floaters, three in the first tank and two in the second

GPIO pins are always written in [BCM pin numbers](https://www.raspberrypi.org/documentation/usage/gpio/images/GPIO-Pinout-Diagram-2.png).

## `.env`
Here's an example for the `.env` file:
```
WS_PORT=3000
```
