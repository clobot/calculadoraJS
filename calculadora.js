function Calculadora() {
    this.numActual = "";
    this.numAnterior = "";
    this.operador = "";
    this.resultado = "";
    
    this.numNeg = function() {      // solo funciona para el número Actual
        if (document.getElementById("viewer").innerHTML.toString() == this.numActual) {
            if (this.numActual.includes("-")) {
                this.numActual = this.numActual.substring(1);
            } else {
                this.numActual = "-" + this.numActual;
            }
            document.getElementById("viewer").style.color = "#c97874";
            document.getElementById("viewer").innerHTML = this.numActual;
        }
    }
    
    this.agregarNumero = function (num) {
        // console.log(num);
        if (num === "."){                               // comportamiento del punto decimal:
            if (!this.numActual){                       // se agrega cero a la izq si no hay números antes
                num = "0.";
            } else if (this.numActual.includes(".")){   // el punto solo se puede escribir una vez
                num = "";
            }
        } else if (!this.numActual){
            this.numActual = num;
        } else {
            this.numActual += num;
        }
        document.getElementById("viewer").style.color = "#c97874";
        document.getElementById("viewer").innerHTML = this.numActual;
        // console.log("numA = " + this.numActual);
    };

    this.agregarOperador = function (op) {
        // console.log(op);
        if (!this.numAnterior && !this.numActual) {
            // console.log("nada-nada")
            op = "";
        } else if (this.numAnterior.length > 0 && !this.numActual) {    // solo cambia el operador
            // console.log("Anterior-nada")
            this.operador = op;
        } else if (!this.numAnterior && this.numActual.length > 0) {    // después del primer número (cdo solo existe numActual)
            // console.log("nada-Actual")
            this.numAnterior = this.numActual;
            this.numActual = "";
        } else if (this.numAnterior.length > 0 && this.numActual.length > 0) {  // para continuar/concatenar operaciones
            // console.log("Anterior-Actual")
            this.calcular();
            if (!this.verificarError()) {
                // console.log("no hay error");
                this.numActual = this.resultado;
                this.agregarOperador(op);
            } else {
                console.log("hay un error");
            }
        }
        this.operador = op;
        if (op.length > 0) {
            document.getElementById("viewer").style.color = "#c97874";
            document.getElementById("viewer").innerHTML = this.operador;
        }
        // console.log("operador = " + this.operador);
        // console.log("n1 = " + this.numAnterior + " | op = " + this.operador + " | n2 = " + this.numActual + " | res = " + this.resultado);
    };
   
    this.calcular = function () {
        // console.log("ant = " + this.numAnterior);
        // console.log("ops = " + this.operador);
        // console.log("act = " + this.numActual);
        let res;
        switch (this.operador) {
            case '+':
                res = parseFloat(this.numAnterior) + parseFloat(this.numActual);
                break;
            case '-':
                res = this.numAnterior - this.numActual;
                break;
            case '*':
                res = this.numAnterior * this.numActual;
                break;
            case '/':
                res = this.numAnterior / this.numActual;
                break;
        }
        this.resultado = res.toString();    // resultado como número no me permitía concatenar operaciones, pero como string se solucionó
        this.numActual = "";
        this.numAnterior = "";
        this.operador = "";
        // console.log("res = " + this.resultado);
    };
    
    this.verificarError = function() {
        if (this.resultado === "Infinity" || this.resultado === "NaN") {
            let element = document.getElementById('calculator');
            element.classList.add('broken');
            
            let fix = document.getElementById('fix');
            let button = document.createElement('button');
            button.setAttribute('type', 'submit');
            button.setAttribute('id', 'fix-button');
            button.innerHTML = 'REPARAR';
            button.onclick = function() {
                location.reload();
            }
            let info = document.createElement('p');
            info.innerHTML = "Error: No se puede dividir por cero";
            setTimeout(function(){
                fix.appendChild(info);
                fix.appendChild(button);
            }, 1500);
            return true;
        }
        return false;
    };
    
    this.mostrarResultado = function() {
        // console.log("nAnt = " + this.numAnterior + " | op = " + this.operador + " | nAct = " + this.numActual + " | res = " + this.resultado);
        if (!this.numActual  && !this.numAnterior && !this.operador){
            console.log("no hay suficientes datos");
        } else if (this.numActual.length > 0 && this.numAnterior.length > 0 && this.operador.length > 0) {      // "equals" necesita que estén los datos necesarios
            // console.log("hay datos");
            this.calcular();
            this.numActual = this.resultado;
        } else if (!this.numActual && this.numAnterior.length > 0 && this.operador.length > 0){
            // console.log("opera con el mismo numero");
            // console.log("nAnt = " + this.numAnterior + " | op = " + this.operador + " | nAct = " + this.numActual + " | res = " + this.resultado);
            this.numActual = this.numAnterior;
            this.calcular();
        } 

        if (this.resultado.length > 0) {
            if (!this.verificarError()) {
                // console.log("no hay error");
                document.getElementById("viewer").style.color = "green";
            } else {
                // console.log("hay un error");
                document.getElementById("viewer").style.color = "#c97874";
            }
            document.getElementById("viewer").innerHTML = this.resultado;
        }
    };

    this.resetear = function () {
        this.numActual = "";
        this.numAnterior = "";
        this.operador = "";
        this.resultado = "";
        document.getElementById("viewer").innerHTML = "0";
        document.getElementById("viewer").style.color = "#c97874";
    };
}

calculadora = new Calculadora();

// document.getElementById("clear").addEventListener("click", function() { calculadora.resetear(); });
// document.getElementById("equals").addEventListener("click", function() { calculadora.mostrarResultado(); });
document.getElementById("clear").addEventListener("click", () => calculadora.resetear());
document.getElementById("equals").addEventListener("click", () => calculadora.mostrarResultado());

let nums = document.getElementsByClassName("numero");
// for(i=0; i<nums.length; i++){
//     nums[i].addEventListener("click", function(){
//         calculadora.agregarNumero(this.innerHTML);
//     });
// }
for (let i = 0; i < nums.length; i++) {
    nums[i].addEventListener("click", () => calculadora.agregarNumero(nums[i].innerHTML));
}

let ops = document.getElementsByClassName("ops");
// for(i=0; i<ops.length; i++){
//     ops[i].addEventListener("click", function(){
//         calculadora.agregarOperador(this.innerHTML);
//     });
// }
for (let i = 0; i < ops.length; i++) {
    ops[i].addEventListener("click", () => calculadora.agregarOperador(ops[i].innerHTML));
}

let vwr = document.getElementById("viewer");
vwr.addEventListener("click", () => calculadora.numNeg());