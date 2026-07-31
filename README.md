# Automatic garden watering system <!-- omit in toc -->

## Table of contents <!-- omit in toc -->

- [General](#general)
- [Running](#running)
  - [Production](#production)
  - [Testing without RPI](#testing-without-rpi)
- [`.env`](#env)
- [Timeouts](#timeouts)
- [Debugging](#debugging)
- [Installing from scratch](#installing-from-scratch)

## General

This project consists of a Raspberry Pi 4 that is connected to various floaters inside 2 water tanks and to various relays that control solenoid valves. Here's some specific info:
- Valves 1 - 4, 8 and 9 are for watering the garden
- Rain is a property set to define that it will or is currently raining for certain conditions to occur
- Tap water can be manually activated or deactivated, equals to Valve 5
- Pump is to manually activate or deactivate it, equals to Valve 6
- Letting water fall back down from tank 2 to 1 is done with Valve 7
- There are 5 floaters, three in the first tank and two in the second

GPIO pins are always written in [BCM pin numbers](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#gpio-and-the-40-pin-header).

![RPIO pins](image.png)

GPIO pins also have a default state when booting the PI, which affects the temporary state of a relay switch until this project is running, which overwrites the default states to the desired ones. [Here's a good read about it](https://roboticsbackend.com/raspberry-pi-gpios-default-state/), as well as the [technical file](https://www.raspberrypi.org/app/uploads/2012/02/BCM2835-ARM-Peripherals.pdf#page=102). In short:
> HIGH for GPIOs up to 8, and LOW for GPIOs starting from 9.

On top of this, certain GPIO pins have special functions, and its best to not use those. So, after chatting with an AI, here are the supposed ideal GPIO pins:

| Function            | GPIO Pin | Notes               | Physical Pin |
| ------------------- | -------- | ------------------- | ------------ |
| Floater 1           | GPIO 4   | Input with pull-up  | Pin 7        |
| Floater 2           | GPIO 17  | Input with pull-up  | Pin 11       |
| Floater 3           | GPIO 27  | Input with pull-up  | Pin 13       |
| Floater 4           | GPIO 22  | Input with pull-up  | Pin 15       |
| Floater 5           | GPIO 5   | Input with pull-up  | Pin 29       |
| Valve 1             | GPIO 26  | Output, default LOW | Pin 37       |
| Valve 2             | GPIO 18  | Output, default LOW | Pin 12       |
| Valve 3             | GPIO 23  | Output, default LOW | Pin 16       |
| Valve 4             | GPIO 24  | Output, default LOW | Pin 18       |
| Tap water           | GPIO 6   | Output, default LOW | Pin 31       |
| Pump water up       | GPIO 13  | Output, default LOW | Pin 33       |
| Transfer water down | GPIO 19  | Output, default LOW | Pin 35       |
| Valve 8             | GPIO 25  | Output, default LOW | Pin 22       |
| Valve 9             | GPIO 20  | Output, default LOW | Pin 38       |

## Running

### Production

Make sure the `.env` file is set to `prod`.

**You need to run this with `root`.** Else GPIO access won't be granted. I've configured [`pm2`](https://pm2.keymetrics.io/) to start the process on startup with sudo:

```shell
sudo -s
pm2 startup
pm2 start main.js --name "Watering System" --watch
pm2 save
```

### Testing without RPI

Copy the `.env` file example below as is, execute `npm i` and then `npm run start`. Requires `sudo apt-get install build-essential`.

## `.env`

Here's an example for the `.env` file:

```env
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
WS_VALVE8_TIMEOUT=120000
WS_VALVE9_TIMEOUT=120000
```

## Timeouts

| Designation | Time     | `ms`      |
| ----------- | -------- | --------- |
| Manual mode | 8 hours  | 28800000  |
| Valve 1     | 2 mins   | 120000    |
| Valve 2     | 2 mins   | 120000    |
| Valve 3     | 2 mins   | 120000    |
| Valve 4     | 2 mins   | 120000    |
| Tap water   | 48 hours | 172800000 |
| Pump        | 20 mins  | 1200000   |
| Transfer    | 20 mins  | 1200000   |
| Valve 8     | 2 mins   | 120000    |
| Valve 9     | 2 mins   | 120000    |

## Debugging

The PI sends a 3.3V current from the GPIO pins and is capable of measuring if a circuit is closed or not when the other end connects to Ground. The voltage is so minimal that you do not feel it on your hands, so it's safe to work with it. You should therefore be able to check the various connections of the floaters circuit for 3.3V (not the circuit after the relays, which is connected to 24V), and whenever a voltage doesn't make sense, you'd be closer to the source of the problem.

## Installing from scratch

I had to create this guide, because I've lost too many hours trying to set things up from scratch more than once before. So here they are:

1. Use a RPI 4.
2. Use the Raspberry Pi Imager to create a bootable RPI micro SD card. Install the "Raspberry Pi OS Lite (64-bit)" image, based on "Debian Trixie".
3. Log into it, and first run `sudo apt get update` and `sudo apt get upgrade --yes`.
4. Install necessary tools: `sudo apt install --yes git`
5. Install [`nvm`](https://github.com/nvm-sh/nvm#installing-and-updating):
   1. Install Node version 16: `nvm install lts/gallium`
   2. Allow Node to be run in sudo (npm pigpio package requires sudo):
      ```sh
      n=$(which node)
      n=${n%/bin/node}
      chmod -R 755 $n/bin/* 
      sudo cp -r $n/{bin,lib,share} /usr/local 
      ```
6. Install pigpio (which requires some magic). GitHub user [s-k-tttttttt](https://github.com/s-k-tttttttt) made a [great guide and script on how to set this up](https://github.com/joan2937/pigpio/issues/632) (big thanks!), so I will basically copy-paste their steps into here:
   1. `sudo apt-get --yes --allow-change-held-packages install --no-install-recommends python3-setuptools python3-full`
   2. `wget https://github.com/joan2937/pigpio/archive/refs/tags/v79.tar.gz`
   3. `tar zxf v79.tar.gz`
   4. `cd pigpio-79`
   5. `make`
   6. `sudo make install`
   7. `sudo ldconfig`
   8. TODO: I think from this point on, it should be enough. Test by running `pigpiod -v`. If a version comes out, you're good to go, and skip the rest of these sub-steps. You don't want the `pigpiod` service to be running, because the pigpio npm package will already be making that job, and refuse to start in case a daemon is already running.
   9. ---------------
   10. `sudo systemctl daemon-reload`
   11. Copy-paste this into your terminal (not into a file, it will create a new file for you):
        ```sh
        DOLLAR="\$"

        cat << EOF > config_pigpiod_service.sh
        #! /bin/bash
        PIGPIOD_SERVICE="/lib/systemd/system/pigpiod.service"

        if [[ ! -f "${DOLLAR}{PIGPIOD_SERVICE}" ]] ; then

          # The configuration of pigpiod appears to be different on 32 bit and 64 bit systems
          # pigpiod must be run with -t0 on a 64 bit system, and -t1 on a 32 bit system.
          # The 32 bit behaviour contradicts what is documented in the pigpiod web documentation ;-(
          ARCH=${DOLLAR}(uname -m)

          if [[ "${DOLLAR}{ARCH}" == "aarch64" ]] ; then
            T_COMMAND="-t0"
          elif [[ "${DOLLAR}{ARCH}" == "armv7l" ]] ; then
            T_COMMAND="-t1"
          elif [[ "${DOLLAR}{ARCH}" == "armv6l" ]] ; then
            T_COMMAND="-t1"
          else
            echo "uname -m returns '${DOLLAR}{ARCH}' which is an unexpected value. Time to debug..."
            echo
            echo "I have not seen armv8 on my Pi3, but I believe this might happen if running"
            echo "64 bits. I am not sure whether pigpiod requires -t0 or -t1 in this case."
            echo "You'll need to experiment."
            echo
            echo "I believe armv6 is a possibility on a Pi2 or earlier?"
            echo "I guess use same settings as for armv6l?"
            exit 1
          fi

          # We are going to overwrite the systemd configuration file for pigpiod
          # because we are going to change the launch options
          cat << END > "${DOLLAR}{PIGPIOD_SERVICE}"
        [Unit]
        Description=Daemon required to control GPIO pins via pigpio

        [Service]
        Type=forking
        ExecStart=/usr/local/bin/pigpiod -l -s10 ${DOLLAR}{T_COMMAND} -x0xFFFFFFF
        Restart=always
        ExecStop=/bin/systemctl kill pigpiod

        [Install]
        WantedBy=multi-user.target
        END
        else
          echo "${DOLLAR}{PIGPIOD_SERVICE} already exists. I refuse to change it."
        fi
        EOF

        chmod 755 config_pigpiod_service.sh
        ```
   12. Execute the newly created file: `sudo ./config_pigpiod_service.sh`.
   13. Start the daemon: `sudo systemctl enable --now pigpiod.service`.
   14. You can validate your installation was successful by running `pigpiod -v`.
7. Clone this repository.
8. `cd` into it and create a `.env` file with `prod`.
9. `npm i`.
10. Run `sudo node main.js` to check if everything works as expected.
11. Install `pm2`: `sudo npm i -g pm2`.
12. Start with `pm2`: `sudo pm2 start main.js --name "Watering System" --watch`.
13. Then make it run on boot: `sudo pm2 startup && sudo pm2 save`.
