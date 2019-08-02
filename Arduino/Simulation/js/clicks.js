// Valve 1
$("#valve1").click(function () {
    changeValveState("valve1");
});

// Valve 2
$("#valve2").click(function () {
    changeValveState("valve2");
});

// Valve 3
$("#valve3").click(function () {
    changeValveState("valve3");
});

// Valve 4
$("#valve4").click(function () {
    changeValveState("valve4");
});

// Pump
$("#pump").click(function () {
    changePumpState();
});

// Tanque Baixo
$("#tanqueB").click(function () {
    changePumpState("tanqueB");
});

// Tanque Cima
$("#tanqueC").click(function () {
    changePumpState("tanqueC");
});

// Chuva
$("#chuva").click(function () {
    changeChuvaState();
});