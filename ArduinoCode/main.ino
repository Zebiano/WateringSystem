/*
  PINs in use:

  D2: TX
  D3: RX
  D4: Relay 1 (Valve 1)
  D5: Relay 2 (Valve 2)
  D6: Relay 3 (Valve 3)
  D7: Relay 4 (Valve 4)
  D8: Relay 5 (Valve 5: Water)
  D9: Relay 6 (minusController)
  D10: Relay 7 (minusArduino)
  D11: Relay 8
  D12: sftWater
  D13: sftRain
  ---
  A0: hrdBoia
  A2: sftValve1
  A3: sftValve2
  A4: sftValve3
  A5: sftValve4
*/

// Variables
bool hrdValve1 = false;
bool hrdValve2 = false;
bool hrdValve3 = false;
bool hrdValve4 = false;
bool hrdBoia = false;
bool hrdWater = false;
bool hrdMinusController = true;
bool hrdMinusArduino = false;

bool sftValve1 = false;
bool sftValve2 = false;
bool sftValve3 = false;
bool sftValve4 = false;
bool sftWater = false;
bool sftRain = false;

#define BLYNK_PRINT Serial

#include <ESP8266_Lib.h>
#include <BlynkSimpleShieldEsp8266.h>

// You should get Auth Token in the Blynk App.
// Go to the Project Settings (nut icon).
char auth[] = "50cc198faae14a129f57ccc6f903346a";

// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "WifiSSID";
char pass[] = "Password";

// or Software Serial on Uno, Nano...
#include <SoftwareSerial.h>
SoftwareSerial EspSerial(2, 3); // RX, TX

// Your ESP8266 baud rate:
#define ESP8266_BAUD 9600

ESP8266 wifi(&EspSerial);

BlynkTimer timer;

// This function sends Arduino's up time every second to Virtual Pin (5).
// In the app, Widget's reading frequency should be set to PUSH. This means
// that you define how often to send data to Blynk App.
void myTimerEvent()
{
  // You can send any value at any time.
  // Please don't send more that 10 values per second.
  Blynk.virtualWrite(V5, millis() / 1000);

  //pln("---");

  // Get States
  getHrdBoiaState(); // Hardware Boia
  getHrdWaterState(); // Hardware Water
  getSftWaterState(); // Software Water
  getSftRainState(); // Software Rain
  getHrdMinusControllerState(); // Hardware Minus Controller
  getHrdMinusArduinoState(); // Hardware Minus Arduino
  getHrdValveState(4); // Hardware Valve 1
  getHrdValveState(5); // Hardware Valve 2
  getHrdValveState(6); // Hardware Valve 3
  getHrdValveState(7); // Hardware Valve 4
  getSftValveState(16); // Software Valve 1
  getSftValveState(17); // Software Valve 2
  getSftValveState(18); // Software Valve 3
  getSftValveState(19); // Software Valve 4

  if (hrdBoia == false) {
    if (hrdMinusController == true || hrdMinusArduino == true) {
      setHrdMinusController(false);
      setHrdMinusArduino(false);
    }

    if (hrdValve1 == true || hrdValve2 == true || hrdValve3 == true || hrdValve4 == true) {
      setHrdValve(4, false);
      setHrdValve(5, false);
      setHrdValve(6, false);
      setHrdValve(7, false);
    }

    if (sftRain == false) {
      if (hrdWater == false) {
        setHrdWater(true);
        //sendInfo("Tank empty. Water on.");
      }
    } else {
      if (hrdWater == true) {
        setHrdWater(false);
        //sendInfo("Tank empty. It's raining. Water off.");
      }
    }
  } else {
    if (sftValve1 == true || sftValve2 == true || sftValve3 == true || sftValve4 == true) {
      setHrdMinusController(false);
      setHrdMinusArduino(true);
      //sendInfo("Tank full. Arduino controls valves.");

      // Valve 1
      if (sftValve1 == true && hrdValve1 == false) {
        setHrdValve(4, true);
      } else if (sftValve1 == false && hrdValve1 == true) {
        setHrdValve(4, false);
      }

      // Valve 2
      if (sftValve2 == true && hrdValve2 == false) {
        setHrdValve(5, true);
      } else if (sftValve2 == false && hrdValve2 == true) {
        setHrdValve(5, false);
      }

      // Valve 3
      if (sftValve3 == true && hrdValve3 == false) {
        setHrdValve(6, true);
      } else if (sftValve3 == false && hrdValve3 == true) {
        setHrdValve(6, false);
      }

      // Valve 4
      if (sftValve4 == true && hrdValve4 == false) {
        setHrdValve(7, true);
      } else if (sftValve4 == false && hrdValve4 == true) {
        setHrdValve(7, false);
      }
    } else {
      setHrdMinusController(true);
      setHrdMinusArduino(false);
      //sendInfo("Tank full. Controller controls valves.");

      // Valve 1
      if (sftValve1 == false && hrdValve1 == true) {
        setHrdValve(4, false);
      }

      // Valve 2
      if (sftValve2 == false && hrdValve2 == true) {
        setHrdValve(5, false);
      }

      // Valve 3
      if (sftValve3 == false && hrdValve3 == true) {
        setHrdValve(6, false);
      }

      // Valve 4
      if (sftValve4 == false && hrdValve4 == true) {
        setHrdValve(7, false);
      }
    }

    if (sftRain == true) {
      if (hrdWater == true) {
        setHrdWater(false);
      }
    } else {
      if (sftWater == true && hrdWater == false) {
        setHrdWater(true);
        //sendInfo("Tank full. Water still on!");
      } else if (sftWater == false && hrdWater == true) {
        setHrdWater(false);
      }
    }
  }
}

// Setup
void setup()
{
  // Debug console
  Serial.begin(9600);

  // Set ESP8266 baud rate
  EspSerial.begin(ESP8266_BAUD);
  delay(10);

  Blynk.begin(auth, wifi, ssid, pass);
  // You can also specify server:
  //Blynk.begin(auth, wifi, ssid, pass, "blynk-cloud.com", 80);
  //Blynk.begin(auth, wifi, sssid, pass, IPAddress(192,168,1,100), 8080);

  // Setup a function to be called every second
  timer.setInterval(5000L, myTimerEvent);

  // PINs
  pinMode(4, OUTPUT); // Valve 1
  pinMode(5, OUTPUT); // Valve 2
  pinMode(6, OUTPUT); // Valve 3
  pinMode(7, OUTPUT); // Valve 4
  pinMode(8, OUTPUT); // Hardware Water
  pinMode(9, OUTPUT); // Hardware Minus Controller
  pinMode(10, OUTPUT); // Hardware Minus Arduino
  pinMode(A0, INPUT_PULLUP); // Boia
}

// Loop
void loop()
{
  Blynk.run();
  timer.run(); // Initiates BlynkTimer
}

/* --- Functions --- */
/* -- Get -- */
/* - Hardware - */
// Hardware Boia
void getHrdBoiaState() {
  if (digitalRead(A0) == LOW) {
    // Send notification if tank changed value
    if (hrdBoia == false) {
      sendNotification("Tank is Full!");
      sendInfo("Tank is Full!");
    }
    hrdBoia = true;
    //pln("Tank is Full!");
  } else {
    // Send notification if tank changed value
    if (hrdBoia == true) {
      sendNotification("Tank is Empty!");
      sendInfo("Tank is Empty!");
    }
    hrdBoia = false;
    //pln("Tank is Empty!");
  }
}

// Hardware Water
void getHrdWaterState() {
  if (digitalRead(8) == LOW) {
    hrdWater = false;
    //pln("D8: Relay 5 (Valve 5: Water) is Off!");
  } else {
    hrdWater = true;
    //pln("D8: Relay 5 (Valve 5: Water) is On!");
  }
}

// Hardware Minus Controller
void getHrdMinusControllerState() {
  if (digitalRead(9) == LOW) {
    hrdMinusController = false;
    //pln("D9: Relay 6 (minusController) is Off!");
  } else {
    hrdMinusController = true;
    //pln("D9: Relay 6 (minusController) is On!");
  }
}

// Hardware Minus Arduino
void getHrdMinusArduinoState() {
  if (digitalRead(10) == LOW) {
    hrdMinusArduino = false;
    //pln("D10: Relay 7 (minusArduino) is Off!");
  } else {
    hrdMinusArduino = true;
    //pln("D10: Relay 7 (minusArduino) is On!");
  }
}

// Hardware Valve
void getHrdValveState(int pin) {
  if (digitalRead(pin) == LOW) {
    switch (pin) {
      case 4:
        hrdValve1 = false;
        //pln("D4: Relay 1 (Valve 1) is Off!");
        break;
      case 5:
        hrdValve2 = false;
        //pln("D5: Relay 2 (Valve 2) is Off!");
        break;
      case 6:
        hrdValve3 = false;
        //pln("D6: Relay 3 (Valve 3) is Off!");
        break;
      case 7:
        hrdValve4 = false;
        //pln("D7: Relay 4 (Valve 4) is Off!");
        break;
    }
  } else {
    switch (pin) {
      case 4:
        hrdValve1 = true;
        //pln("D4: Relay 1 (Valve 1) is On!");
        break;
      case 5:
        hrdValve2 = true;
        //pln("D5: Relay 2 (Valve 2) is On!");
        break;
      case 6:
        hrdValve3 = true;
        //pln("D6: Relay 3 (Valve 3) is On!");
        break;
      case 7:
        hrdValve4 = true;
        //pln("D7: Relay 4 (Valve 4) is On!");
        break;
    }
  }
}

/* - Software - */
// Software Water
void getSftWaterState() {
  if (digitalRead(12) == LOW) {
    sftWater = false;
    //pln("D12: sftWater is Off!");
  } else {
    sftWater = true;
    //pln("D12: sftWater is On!");
  }
}

// Software Rain
void getSftRainState() {
  if (digitalRead(13) == LOW) {
    sftRain = false;
    //pln("D13: Rain is Off!");
  } else {
    sftRain = true;
    //pln("D13: Rain is On!");
  }
}

// Software Valve
void getSftValveState(int pin) {
  if (digitalRead(pin) == LOW) {
    switch (pin) {
      case 16:
        sftValve1 = false;
        //pln("A2: sftValve1 is Off!");
        break;
      case 17:
        sftValve2 = false;
        //pln("A3: sftValve2 is Off!");
        break;
      case 18:
        sftValve3 = false;
        //pln("A4: sftValve3 is Off!");
        break;
      case 19:
        sftValve4 = false;
        //pln("A5: sftValve4 is Off!");
        break;
    }
  } else {
    switch (pin) {
      case 16:
        sftValve1 = true;
        //pln("A2: sftValve1 is On!");
        break;
      case 17:
        sftValve2 = true;
        //pln("A3: sftValve2 is On!");
        break;
      case 18:
        sftValve3 = true;
        //pln("A4: sftValve3 is On!");
        break;
      case 19:
        sftValve4 = true;
        //pln("A5: sftValve4 is On!");
        break;
    }
  }
}

/* -- Set -- */
// Hardware Water
void setHrdWater(bool state) {
  if (state == true) {
    digitalWrite(8, HIGH);
  } else {
    digitalWrite(8, LOW);
  }
  hrdWater = state;
}

// Hardware Minus Controller
void setHrdMinusController(bool state) {
  if (state == true) {
    digitalWrite(9, HIGH);
  } else {
    digitalWrite(9, LOW);
  }
  hrdMinusController = state;
}

// Hardware Minus Arduino
void setHrdMinusArduino(bool state) {
  if (state == true) {
    digitalWrite(10, HIGH);
  } else {
    digitalWrite(10, LOW);
  }
  hrdMinusArduino = state;
}

// Hardware Valve
void setHrdValve(int pin, bool state) {
  if (state == true) {
    digitalWrite(pin, HIGH);
  } else {
    digitalWrite(pin, LOW);
  }

  switch (pin) {
    case 4:
      hrdValve1 = state;
      break;
    case 5:
      hrdValve2 = state;
      break;
    case 6:
      hrdValve3 = state;
      break;
    case 7:
      hrdValve4 = state;
      break;
  }
}

/* -- Blynk -- */
// Send Info
void sendInfo(String info) {
  Blynk.virtualWrite(V2, info);
}

// Send notification
void sendNotification(String msg) {
  Blynk.notify(msg);
}

/* -- Serial -- */
// Write to serial
void pln(String output) {
  Serial.println(output);
}