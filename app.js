
const pizarra = document.getElementsByClassName('row')[1]
const formulario = document.getElementById('formulario')
const numerosRandoms = []
const checkbox = document.getElementsByClassName('form-check-input')

class UI {
    checkboxs = []
    divicion = new Divicion()
    constructor() {
        this.checarBX()
    }
    dibujar({divisor,dividendo,resultado,resto}) {
        // console.log({divisor,dividendo,resultado,resto})
        const columna = this.crearEtiqueta('div',null,'col-sm-12 mb-3 border border-1 d-flex justify-content-between')
        const div1 = this.crearEtiqueta('div')
        const div2 = this.crearEtiqueta('div')
        const elementoHijo = this.crearEtiqueta('button',`${dividendo}/${divisor}`,'btn btn-primary')
        div1.appendChild(elementoHijo)
        const elementoHermano = this.crearEtiqueta('h3',`= ${resultado}`,'visually-hidden')
        div2.appendChild(elementoHermano)
        columna.appendChild(div1)
        columna.appendChild(div2)
        return columna
    }
    repetir(repeticion){
        this.repetirDivicion()
        this.divicion.shuffleArray(this.divicion.divicion)
        const fragmento = document.createDocumentFragment()
        for(let i = 0;i <repeticion;i++){
            console.log(this.divicion.divicion[i])
            const elemento = this.dibujar(this.divicion.divicion[i])
            fragmento.appendChild(elemento)
        }
        return fragmento
    }
    checarBX(){
        for (const c of checkbox) {
            if(c.checked){
                this.checkboxs.push(Number(c.value))
            }
        }
    }
    crearEtiqueta(etiqueta, texto = null, clase = '') {
        const elemento = document.createElement(etiqueta)
        elemento.innerText = texto
        elemento.className = clase
        return elemento
    }
    repetirDivicion() {
        this.checkboxs.forEach((value)=>{
            this.divicion.entre(value)
        })
    }
}
class Divicion {
    constructor() {}
    divicion = []
    entre(x) {
        let i = 0
        while(i<100){
            const divisor = x
            const dividendo = Math.floor(Math.random() *  1000) + 1
            const resultado = dividendo/divisor //cociente
            const resto = dividendo%divisor //residuo
            if(resto == 0){
                // console.log({divisor,dividendo,resultado,resto})
                this.divicion.push({divisor,dividendo,resultado,resto})
                i++ 
            }
        }
        return this.divicion
    }
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp; // Intercambia elementos
        }
        return array;
    }
}
/* const columna = new UI()
const sas = columna.repetir(12)
pizarra.appendChild(sas) */
pizarra.addEventListener('click',(e)=>{
    if(e.target.tagName == 'DIV'){
        const resultado = e.target.children[1].children[0]
        resultado.className = ''
    }
})
formulario.addEventListener('submit',(e)=>{
    e.preventDefault()
    pizarra.innerHTML = ''
    const columna = new UI()
    const diviciones = columna.repetir(100)
    pizarra.appendChild(diviciones)
})
