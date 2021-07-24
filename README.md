# Automatic garden watering system
This project consists of a Raspberry Pi 4 running Ubuntu server (x64) that is connected to various floaters inside 2 water tanks and to various relays that control solenoid valves. Here's some specific info:
- Valves 1 - 4 are for watering the garden
- Rain is a property set to define that it will or is currently raining for certain conditions to occur
- Tap water can be manually activated or deactivated, equals to Valve 5
- Pump is to manually activate or deactivate it, equals to Valve 6
- Letting water fall back down from tank 2 to 1 is done with Valve 7
- There are 5 floaters, three in the first tank and two in the second

> I suck at design and I don't fancy writing `html`, so if you enjoy doing that feel free to make the frontend of this project prettier! I'd be really thankful :)

GPIO pins are always written in [BCM pin numbers](https://www.raspberrypi.org/documentation/usage/gpio/images/GPIO-Pinout-Diagram-2.png).

## `.env`
Here's an example for the `.env` file:
```
WS_ENV=test
WS_PORT=3000
WS_MANUAL_TIMEOUT=28800000
WS_VALVE1_TIMEOUT=120000
WS_VALVE2_TIMEOUT=120000
WS_VALVE3_TIMEOUT=120000
WS_VALVE4_TIMEOUT=120000
WS_TAPWATER_TIMEOUT=172800000
WS_PUMP_TIMEOUT=1200000
WS_TRANSFER_TIMEOUT=1200000
```

## Default timeouts
| Designation | Time     | `ms`      |
| ----------- | -------- | --------- |
| Valve 1     | 2 mins   | 120000    |
| Valve 2     | 2 mins   | 120000    |
| Valve 3     | 2 mins   | 120000    |
| Valve 4     | 2 mins   | 120000    |
| Tap water   | 48 hours | 172800000 |
| Pump        | 20 mins  | 1200000   |
| Transfer    | 20 mins  | 1200000   |
| Manual mode | 8 hours  | 28800000  |
