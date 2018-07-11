/* -- Variables -- */
// Boolean
var valve1 = false;
var valve2 = false;
var valve3 = false;
var valve4 = false;
var pump = false;
var tanqueB = false;
var tanqueC = false;
var agua = false;
var chuva = false;

var cancelAnimate = true;

/* -- jQuery -- */
$(document).ready(function () {
    console.log("Starting system...");
    console.log("---");

    setTimeout(function () {
        animate();
    }, 1000);
});

// Animate
function animate() {
    //console.log("Animate()");

    /* -- Ifs dos tanques -- */
    // Caso ambos os tanques estiverem vazios
    if (tanqueB == false && tanqueC == false) {
        console.log("Ambos os tanques estao vazios!");

        // Desligar todas as valvulas
        valve1 = false;
        valve2 = false;
        valve3 = false;
        valve4 = false;
        console.log("Todas as valvulas foram fechadas.");

        // Se estiver a chover
        if (chuva == true) {
            console.log("Esta a chover.");

            // Caso a agua estiver ligada
            if (agua == true) {
                console.log("Agua desligada ja que esta a chover.");
                agua = false;
                
                /*cancelAnimate = true;
                setTimeout(function () {
                    changeAguaState();
                    cancelAnimate = false;
                    requestAnimationFrame(animate);
                }, 2000);*/
            }

            changeTanqueState("tanqueB");
        }
        // Se nao estiver a chover
        else {
            console.log("Nao esta a chover.");

            // Caso a agua nao estiver ligada
            if (agua == false) {
                console.log("Agua ligada para encher tanqueB.");
                agua = true;
            }

            changeTanqueState("tanqueB");
            changeAguaState();
        }
    }
    // Caso tanqueB estiver cheio e tanqueC vazio
    else if (tanqueB == true && tanqueC == false) {

    }
    // Caso tanqueB estiver vazio e tanqueC cheio
    else if (tanqueB == false && tanqueC == true) {

    }
    // Caso ambos os tanques estiverem cheios
    else if (tanqueB == true && tanqueC == true) {

    }


    /*// Caso ambos os tanques estejam vazios e a agua nao estiver a correr
    if (tanqueB == false && tanqueC == false && agua == false) {
        console.log("Ambos os tanques estao vazios e a agua nao esta a correr. A liga-la...");
        cancelAnimate = false;
        setTimeout(function () {
            changeAguaState();
            cancelAnimate = true;
            requestAnimationFrame(animate);
        }, 2000);
    }

    // Caso ambos os tanques estejam vazios e a agua estiver a correr
    if (tanqueB == false && tanqueC == false && agua == true) {
        cancelAnimate = false;
        setTimeout(function () {
            changeTanqueState("tanqueB");
            console.log("Tanque Baixo cheio!");
            cancelAnimate = true;
            requestAnimationFrame(animate);
        }, 2000);
    }

    // Caso o tanque baixo estiver cheio e o de cima vazio e a agua estiver a correr
    if (tanqueB == true && tanqueC == false && agua == true) {
        cancelAnimate = false;
        setTimeout(function () {
            changeAguaState();
            console.log("Agua desligada.");
            cancelAnimate = true;
            requestAnimationFrame(animate);
        }, 2000);
    }

    // Caso o tanque baixo estiver cheio e o de cima vazio e estiver a chover
    if (tanqueB == true && tanqueC == false && chuva == true && pump == false) {
        cancelAnimate = false;
        setTimeout(function () {
            changePumpState();
            cancelAnimate = true;
            requestAnimationFrame(animate);
        }, 2000);
    }

    // 
    if (tanqueB == true && tanqueC == false && chuva == true && pump == true) {
        cancelAnimate = false;
        setTimeout(function () {
            changeTanqueState("tanqueC");
            cancelAnimate = true;
            requestAnimationFrame(animate);
        }, 2000);
    }

    // 
    if (tanqueB == true && tanqueC == true && chuva == true && pump == true) {
        cancelAnimate = false;
        setTimeout(function () {
            changePumpState();
            cancelAnimate = true;
            requestAnimationFrame(animate);
        }, 2000);
    }

    // 
    if (tanqueB == false && tanqueC == true && agua == false && chuva == false) {
        cancelAnimate = false;
        setTimeout(function () {
            changeAguaState();
            cancelAnimate = true;
            requestAnimationFrame(animate);
        }, 2000);
    }

    // 
    if (valve1 == true && tanqueB == true) {
        cancelAnimate = false;
        setTimeout(function () {
            changePumpState();
            setTimeout(function () {
                changeTanqueState("tanqueB");
                setTimeout(function () {
                    changePumpState();
                    changeValveState("valve1");
                    cancelAnimate = true;
                    requestAnimationFrame(animate);
                }, 2000);
            }, 2000);
        }, 2000);
    }*/

    // Animate or not
    if (cancelAnimate == false) {
        requestAnimationFrame(animate);
    } else {
        cancelAnimationFrame(animate);
    }
};