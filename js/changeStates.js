// Change Valve state
function changeValveState(valve) {
    switch (valve) {
        case "valve1":
            if (valve1) {
                $("#valve1").removeClass("btn-success");
                $("#valve1").addClass("btn-danger");
                valve1 = false;
                console.log("Valve 1 desligada.");
            } else {
                $("#valve1").removeClass("btn-danger");
                $("#valve1").addClass("btn-success");
                valve1 = true;
                console.log("Valve 1 ligada.");
            }
            break;
        case "valve2":
            if (valve2) {
                $("#valve2").removeClass("btn-success");
                $("#valve2").addClass("btn-danger");
                valve2 = false;
                console.log("Valve 2 desligada.");
            } else {
                $("#valve2").removeClass("btn-danger");
                $("#valve2").addClass("btn-success");
                valve2 = true;
                console.log("Valve 2 ligada.");
            }
            break;
        case "valve3":
            if (valve3) {
                $("#valve3").removeClass("btn-success");
                $("#valve3").addClass("btn-danger");
                valve3 = false;
                console.log("Valve 3 desligada.");
            } else {
                $("#valve3").removeClass("btn-danger");
                $("#valve3").addClass("btn-success");
                valve3 = true;
                console.log("Valve 3 ligada.");
            }
            break;
        case "valve4":
            if (valve4) {
                $("#valve4").removeClass("btn-success");
                $("#valve4").addClass("btn-danger");
                valve4 = false;
                console.log("Valve 4 desligada.");
            } else {
                $("#valve4").removeClass("btn-danger");
                $("#valve4").addClass("btn-success");
                valve4 = true;
                console.log("Valve 4 ligada.");
            }
            break;
    }
    //console.log("---");
}

// Change Pump state
function changePumpState() {
    if (pump == true) {
        $("#pump").removeClass("btn-success");
        $("#pump").addClass("btn-danger");
        pump = false;
        console.log("Pump desligada.");
    } else {
        $("#pump").removeClass("btn-danger");
        $("#pump").addClass("btn-success");
        pump = true;
        console.log("Pump ligada.");
    }
    //console.log("---");
}

// Change Agua state
function changeAguaState() {
    if (agua == true) {
        $("#agua").removeClass("btn-primary");
        $("#agua").addClass("btn-info");
        agua = false;
        console.log("Agua desligada.");
    } else {
        $("#agua").removeClass("btn-info");
        $("#agua").addClass("btn-primary");
        agua = true;
        console.log("Agua ligada.");
    }
    //console.log("---");
}

// Change Agua state
function changeTanqueState(tanque) {
    switch (tanque) {
        case "tanqueB":
            if (tanqueB) {
                $("#tanqueB").removeClass("btn-primary");
                $("#tanqueB").addClass("btn-info");
                tanqueB = false;
                console.log("TanqueB vazio.");
            } else {
                $("#tanqueB").removeClass("btn-info");
                $("#tanqueB").addClass("btn-primary");
                tanqueB = true;
                console.log("TanqueB cheio.");
            }
            break;
        case "tanqueC":
            if (tanqueC) {
                $("#tanqueC").removeClass("btn-primary");
                $("#tanqueC").addClass("btn-info");
                tanqueC = false;
                console.log("TanqueC vazio.");
            } else {
                $("#tanqueC").removeClass("btn-info");
                $("#tanqueC").addClass("btn-primary");
                tanqueC = true;
                console.log("TanqueC cheio.");
            }
            break;
    }
    //console.log("---");
}

// Change Chuva state
function changeChuvaState() {
    if (chuva == true) {
        $("#chuva").removeClass("btn-primary");
        $("#chuva").addClass("btn-info");
        chuva = false;
        console.log("Chuva desligada.");
    } else {
        $("#chuva").removeClass("btn-info");
        $("#chuva").addClass("btn-primary");
        chuva = true;
        console.log("Chuva ligada.");
    }
    //console.log("---");
}