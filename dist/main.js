(()=>{const e="task.lists";let t=JSON.parse(localStorage.getItem(e))||[];const n=document.querySelector("[data-lists"),l=document.querySelector("[data-new-list-form]"),a=document.querySelector("[data-new-list-input]");function r(){!function(){for(;n.firstChild;)n.removeChild(n.firstChild)}(),t.forEach((e=>{const t=document.createElement("li");t.innerHTML=e.name,n.appendChild(t)}))}l.addEventListener("submit",(n=>{n.preventDefault();const l=a.value,s=t.some((e=>e.name.toUpperCase()===l.toUpperCase()));if(null==l||""===l)return;if(a.value=null,s)return void alert("That list is already included");const i={name:l,id:null,tasks:[]};t.push(i),localStorage.setItem(e,JSON.stringify(t)),r()})),r()})();