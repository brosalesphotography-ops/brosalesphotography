document.documentElement.classList.add("js-ready");
const nav=document.getElementById("navMenu"), menuBtn=document.getElementById("menuBtn");
menuBtn?.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll("#navMenu a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const modal=document.getElementById("modal"), serviceInput=document.getElementById("service"), form=document.getElementById("quoteForm");
function openQuote(service){serviceInput.value=service;modal.classList.add("open");document.body.style.overflow="hidden";setTimeout(()=>form.querySelector('[name="name"]')?.focus(),80)}
function closeQuote(){modal.classList.remove("open");document.body.style.overflow=""}
document.querySelectorAll(".service").forEach(card=>card.querySelector("button")?.addEventListener("click",()=>openQuote(card.dataset.service)));
document.querySelectorAll("[data-close]").forEach(el=>el.addEventListener("click",closeQuote));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeQuote()});

function buildQuote(){
 const d=new FormData(form);
 return `Hola PALOMITOPTY 👋

Quiero cotizar un evento.

Servicio: ${d.get("service")}
Nombre: ${d.get("name")}
Fecha: ${d.get("date")||"Por confirmar"}
Invitados: ${d.get("guests")||"Por confirmar"}
Lugar: ${d.get("location")||"Por confirmar"}
Detalles: ${d.get("message")||"Ninguno"}

Quedo atento/a a la cotización.`;
}
form.addEventListener("submit",e=>{e.preventDefault();window.open("https://wa.me/50768170937?text="+encodeURIComponent(buildQuote()),"_blank","noopener");closeQuote()});
document.getElementById("emailQuote")?.addEventListener("click",()=>{
 if(!form.reportValidity()) return;
 window.location.href="mailto:palomitopty@gmail.com?subject="+encodeURIComponent("Solicitud de cotización - PALOMITOPTY")+"&body="+encodeURIComponent(buildQuote());
});
document.getElementById("year").textContent=new Date().getFullYear();

const animated=document.querySelectorAll(".service,.section-head,.intro-grid,.experience,.business-content,.gallery-grid,.process-grid,.contact-box");
animated.forEach(x=>x.classList.add("reveal"));
if("IntersectionObserver" in window){
 const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");io.unobserve(entry.target)}}),{threshold:.08,rootMargin:"0px 0px -30px 0px"});
 animated.forEach(x=>io.observe(x));
}else animated.forEach(x=>x.classList.add("visible"));
window.addEventListener("load",()=>setTimeout(()=>animated.forEach(x=>{const r=x.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)x.classList.add("visible")}),120));
