'use strict';

const box = function() {
  return {
    view: vnode => {
      return m('div.box', { style: { width: '250px' } }, [vnode.children]);
    }
  };
};

const radioBtn = function() {
  return {
    view: vnode => {
      return m('div.radio.text-left', [
        m("input[type='radio'][id='ohm'][name='convert'][value='totemp']", {
          name: vnode.attrs.name,
          id: vnode.attrs.id,
          value: vnode.attrs.value,
          onchange: vnode.attrs.callback
        }),
        m('label', { for: vnode.attrs.id }, vnode.attrs.text)
      ]);
    }
  };
};

const input = function() {
  return {
    view: vnode => {
      return m('div.text-left', [
        m('label', { for: vnode.attrs.id }, vnode.attrs.text),
        m("input.text-right[type='text']", {
          id: vnode.attrs.id,
          oninput: vnode.attrs.callback,
          style: { width: '225px' }
        }),
        vnode.attrs.unit === 'toohm'
          ? m('strong.float-right.unit', 'Ω')
          : m('strong.float-right.unit', '℃')
      ]);
    }
  };
};

const coef = function() {
  return {
    view: vnode => {
      return m(
        'div.text-left',
        {
          class: vnode.attrs.class
        },
        [
          m('label', { for: vnode.attrs.id }, vnode.attrs.text),
          m("input[type='text'][disabled]", {
            id: vnode.attrs.id,
            value: vnode.attrs.value,
            style: { width: '224px' }
          }),
          m(
            'div.inline-block',
            {
              title: vnode.attrs.title,
              onclick: vnode.attrs.callback,
              style: { 'vertical-align': '-5px' }
            },
            m(
              "svg.feather.feather-edit-3[xmlns='http://www.w3.org/2000/svg'][width='21'][height='21'][viewBox='0 0 24 24'][fill='none'][stroke='currentColor'][stroke-width='1'][stroke-linecap='round'][stroke-linejoin='round']",
              [
                m("path[d='M12 20h9']"),
                m(
                  "path[d='M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z']"
                )
              ]
            )
          )
        ]
      );
    }
  };
};

// dragable window component ....
const windCtrl = {};

function windHeader() {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0,
    mWindow;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    mWindow.style.top = mWindow.offsetTop - pos2 + 'px';
    mWindow.style.left = mWindow.offsetLeft - pos1 + 'px';
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
  return {
    oncreate: vnode => {
      mWindow = document.querySelector("#win");
      // console.log( mWindow )
    },
    view: vnode => {
      return m("div#winheader.margin-bottom.text-bold",{
       onmousedown : dragMouseDown
      }, windWinTitle )
    }
  };
};

function windContent(newc){

  function coefCancel(e,vnode){
    windWinTitle = "";
    coefInput = "";
    showWin = false;
  }
  
  function newCoref(e){
    newc = parseFloat( e.target.value );
    //console.log( newc )
  }
  return {
    view: (vnode) => {
      return m("div",
      m("input[type='text'].margin-bottom",{
        style:{width:"200px"},
        value: !showWin ? "" : null,
        oninput: newCoref
      }),
      m("div.block",{
        style:{margin: "12px"}
      },[
        m("button.button",{
          style:{"margin-right":"16px"},
          onclick: ()=>{

            if( coefInput ){
              try{

                if( isNaN(newc) ){
                  throw new TypeError("Input is not a number");
                }
                switch(coefInput){
                  case "a-coef": ca = newc;
                  break;
                  case "b-coef": cb = newc;
                  break;
                  case "c-coef": cc = newc;
                  break
                }
              }catch(err){
                alert( err.message )
              }
            }
          }
        },"save"),
        m("button.button",{
          style:{"margin-left":"16px"},
          onclick: coefCancel
        },"cancel"),

      ])
      )
    }
  }
}

function windWin(){

  return {
    view:(vnode)=>{
      return m("div#win",{
        class: showWin ? "" :"hide",
        style:{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -90%)"
        }
      },
      [
        m( windHeader ),
        m( windContent )
      ])
    }
  }
}
