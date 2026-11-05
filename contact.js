// Sends the "Leave me a message" form to eljohncustodio132@gmail.com via FormSubmit
(function(){
  var f=document.getElementById('contactForm');
  if(!f)return;
  var btn=document.getElementById('sendBtn'),msg=document.getElementById('formMsg');
  f.addEventListener('submit',function(ev){
    ev.preventDefault();
    btn.disabled=true;btn.textContent='Sending…';msg.textContent='';
    var data={};new FormData(f).forEach(function(v,k){data[k]=v;});
    fetch('https://formsubmit.co/ajax/eljohncustodio132@gmail.com',{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify(data)
    }).then(function(r){return r.json();}).then(function(j){
      if(j.success==='true'||j.success===true){
        msg.textContent='Thank you! Your message was sent. I will reply soon.';
        f.reset();
      }else{throw new Error(j.message||'failed');}
    }).catch(function(){
      msg.innerHTML='Could not send. Please email me directly at <a href="mailto:eljohncustodio132@gmail.com" style="text-decoration:underline">eljohncustodio132@gmail.com</a>.';
    }).finally(function(){btn.disabled=false;btn.textContent='Send message';});
  });
})();
