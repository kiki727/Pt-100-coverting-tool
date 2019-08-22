'use strict';

let showWin = false, coefInput, windWinTitle="", newc, ca, cb, cc;

const app = document.querySelector('.app');


const converter = function() {

let towhat = "totemp", conVal= "no value to convert";


const showCoefWin = function(){
  return showWin ? "" : "hide";
}


const onRadioChange = function(e){
    let val = e.target.value;
    towhat = val;
    document.querySelector("#data-convert").dispatchEvent(new Event("input"));
}

const inputVal = function(e){
    let convres;
    let prtvalue = e.target.value;

    let prtunits = towhat;

    let coefA = document.querySelector('#a-coef').value;
    let coefB = document.querySelector('#b-coef').value;
    let coefC = document.querySelector('#c-coef').value;
    
    try {
        convres = PlatTerm.convert(prtunits,prtvalue,coefA,coefB,coefC);

        let txt = prtunits === "toohm" ? "℃" : "Ω";

        conVal = parseFloat(convres).toFixed(3) + " " + txt;

    } catch(err) {

       if ( prtvalue === '' ){
        conVal = "no value to convert";
    } else {
        conVal = err.message;
    }
        
    }
}


return {
    oninit:(vnode)=>{ 
        if( defaultCoef ){
            ca = defaultCoef.a;
            cb = defaultCoef.b;
            cc = defaultCoef.c;
        }
    },
    oncreate:(vnode)=>{
        // init stuff . . .
        document.querySelector("#ohm").checked = true;
        towhat = document.querySelector('input[name="convert"]:checked').value;
    },
    onupdate:(vnode)=>{
       
    },
    view: vnode => {
      return m('div', [
        m('h3.text-bold', 'Pt-100 Convert tool'),
        m(box, [
          m(radioBtn, {
            id: 'ohm',
            name: 'convert',
            value: 'totemp',
            callback: onRadioChange,
            text: m.trust('Convert to <strong> &ohm;</strong>')
          }),
          m(radioBtn, {
            id: 'temp',
            name: 'convert',
            value: 'toohm',
            callback: onRadioChange,
            text: m.trust('Convert to <strong>&deg;C</strong>')
          }),

          m.trust('<hr>'),

          m('div.text-left', [
            m("label[for='output']", 'Output value:'),
            m("h4[id='output']", conVal )
          ]),

          m.trust('<hr>'),

          m(input, {
              id: "data-convert",
              text: "Input value: ",
              unit: towhat,
              callback: inputVal
          } ),

        m.trust('<hr>')
        ]),
        m(box,
         [
            m(coef,{
                id:"a-coef",
                value: ca,
                text:"A coefficient ",
                title: "Insert new A coefficient",
                callback: (e)=>{ 
                  showWin = true; 
                  windWinTitle = "A coefficient";
                  coefInput = "a-coef";
                }
            }),
            m(coef,{
                id:"b-coef",
                value: cb,
                text:"B coefficient ",
                title: "Insert new B coefficient",
                callback: (e)=>{ 
                  showWin = true;
                  windWinTitle = "B coefficient";
                  coefInput = "b-coef";
                }
            }),
            m(coef,{
                class:"margin-bottom",
                id:"c-coef",
                value: cc,
                text:"C coefficient ",
                title: "Insert new C coefficient",
                callback: ( e )=>{ 
                  showWin = true;
                  coefInput = "c-coef";
                  windWinTitle = "C coefficient";
                  console.log( coefInput )
                }
            }),
            m.trust('<hr>'),
            m("button.button",{
              onclick:(e)=>{
                if( defaultCoef ){
                  ca = defaultCoef.a;
                  cb = defaultCoef.b;
                  cc = defaultCoef.c;
              }
              }
            },"set to default all coefficients"),
            m.trust('<hr>'),

        ]),



      ]);

      
    }
  };
};


m.mount( document.querySelector("#window"),windWin(newc));
m.mount(app, converter);

