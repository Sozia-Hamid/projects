/* ----------- Calculator Logic ----------- */
const exprEl = document.getElementById("expression");
const resultEl = document.getElementById("result");
const historyEl = document.getElementById("history");

let expr = "";
let result = "0";

function safeEval(e) {
  try {
    return Function('"use strict";return ('+ e +')')();
  } catch {
    return "Error";
  }
}

function updateDisplay() {
  exprEl.textContent = expr || "0";
  resultEl.textContent = result;
}

function addHistory(e,r) {
  const div = document.createElement("div");
  div.textContent = `${e} = ${r}`;
  div.onclick = () => {
    expr = e;
    result = r;
    updateDisplay();
  };
  historyEl.prepend(div);
}

document.querySelectorAll(".key").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const v = btn.textContent;
    if(v === "C") { expr=""; result="0"; updateDisplay(); return; }
    if(v === "⌫") { expr = expr.slice(0,-1); updateDisplay(); return; }
    if(v === "=") {
      const r = safeEval(expr);
      result = r;
      addHistory(expr,r);
      expr = String(r);
      updateDisplay();
      return;
    }
    expr += v;
    result = safeEval(expr) || "0";
    updateDisplay();
  });
});
updateDisplay();

/* ----------- Starfield Background ----------- */
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
let stars = [];

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
window.addEventListener("resize", resize);
resize();

function initStars(n=250) {
  stars=[];
  for(let i=0;i<n;i++){
    stars.push({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height,
      r:Math.random()*1.5+0.5,
      s:Math.random()*0.5+0.2
    });
  }
}
initStars();

function drawStars() {
  ctx.fillStyle="rgba(0,0,0,0.4)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  for(const s of stars){
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,2*Math.PI);
    ctx.fillStyle="#fff";
    ctx.shadowBlur=8;
    ctx.shadowColor="#fff";
    ctx.fill();
    s.y+=s.s;
    if(s.y>canvas.height){s.y=0;s.x=Math.random()*canvas.width;}
  }
  requestAnimationFrame(drawStars);
}
drawStars();
