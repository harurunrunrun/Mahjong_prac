const pair=[
  [20,2],[20,3],[20,4],
  [25,2],[25,3],[25,4],
  [30,1],[30,2],[30,3],[30,4],
  [40,1],[40,2],[40,3],
  [50,1],[50,2],[50,3],
  [60,1],[60,2],[60,3],
  [70,1],[70,2],
  [80,1],[80,2],
  [90,1],[90,2],
  [100,1],[100,2],
  [110,1],[110,2],
];

let doc_hu;
let doc_han;
let doc_oyako;
let doc_tsumoron;
let doc_teninput;
let doc_kekka;
let doc_seikai;
let doc_ac;
let hu;
let han;
let istsumo;
let isoya;
let page;

init();

function init(){
  page=0;
  doc_hu=document.getElementById("hu");
  doc_han=document.getElementById("han");
  doc_oyako=document.getElementById("oyako");
  doc_tsumoron=document.getElementById("tsumoron");
  doc_teninput=document.getElementById("input_text");
  doc_kekka=document.getElementById("kekka");
  doc_seikai=document.getElementById("seikai");
  doc_ac=document.getElementById("ac");
  gen();
}

function gen(){
  let size=pair.length;
  let ind=Math.floor(Math.random()*size);
  hu=pair[ind][0];
  han=pair[ind][1];
  istsumo=true;
  isoya=true;
  if(hu!=20){
    if(Math.random()<0.5){
      istsumo=false;
    }
  }
  if(Math.random()<0.75){
    isoya=false;
  }
  doc_teninput.value="";
  doc_ac.textContent="";
  doc_hu.textContent=hu;
  doc_han.textContent=han;
  if(isoya){
    doc_oyako.textContent="親";
  }else{
    doc_oyako.textContent="子";
  }
  if(istsumo){
    doc_tsumoron.textContent="ツモ";
    if(isoya){
      doc_teninput.placeholder="1000";
      doc_ac.textContent="オール";
    }else{
      doc_teninput.placeholder="300,500";
    }
  }else{
    doc_tsumoron.textContent="ロン";
    doc_teninput.placeholder="800";
  }
  doc_kekka.textContent="";
  doc_seikai.textContent="";
}

function calc_kiso(){
  let kiso=hu;
  for(let i=0;i<han+2;i++){
    kiso*=2;
  }
  return kiso;
}

function trans(x){
  if(x%100==0){
    return x;
  }else{
    return Math.floor(x/100)*100+100;
  }
}

function calc(){
  page=1;
  let kiso=calc_kiso();
  if(isoya){
    if(istsumo){
      let ten=trans(kiso*2);
      if(ten==doc_teninput.value){
        doc_kekka.textContent="正解";
      }else{
        doc_kekka.textContent="不正解";
        doc_seikai.textContent=ten.toString(10)+" オール";
      }
    }else{
      let ten=trans(kiso*6);
      if(ten==doc_teninput.value){
        doc_kekka.textContent="正解";
      }else{
        doc_kekka.textContent="不正解";
        doc_seikai.textContent=ten.toString(10);
      }
    }
  }else{
    if(istsumo){
      let ten1=trans(kiso);
      let ten2=trans(kiso*2);
      let input_array=doc_teninput.value.split(",");
      if(ten1==input_array[0] && ten2==input_array[1]){
        doc_kekka.textContent="正解";
      }else{
        doc_kekka.textContent="不正解";
        doc_seikai.textContent=ten1.toString(10)+","+ten2.toString(10);
      }
    }else{
      let ten=trans(kiso*4);
      if(ten==doc_teninput.value){
        doc_kekka.textContent="正解";
      }else{
        doc_kekka.textContent="不正解";
        doc_seikai.textContent=ten.toString(10);
      }
    }
  }  
}

function Enter(){
  if(page==0){
    if(doc_teninput.value!=""){
      calc();
    }
  }else{
    init();
  }
}

window.document.onkeydown=function(e){
  if(e.key=="Enter"){
    Enter();
  }
}
