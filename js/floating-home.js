/* Project B English: accessible, fixed home shortcut. No external dependencies. */
(function(){
  'use strict';
  function init(){
    if(document.querySelector('.flux7-floating-home'))return;
    var link=document.createElement('a');
    link.className='flux7-floating-home';
    link.href='index.html';
    link.setAttribute('aria-label','Go to FLUX7 homepage');
    link.innerHTML='<span class="flux7-home-word" aria-hidden="true">HOME</span><span class="flux7-home-mark" aria-hidden="true"><span class="flux7-mark-f">F</span><span class="flux7-mark-7">7</span></span>';
    document.body.appendChild(link);
    var timer=null,visible=false;
    function update(){
      var shouldShow=window.scrollY>140;
      if(shouldShow===visible)return;
      visible=shouldShow;
      link.classList.toggle('is-visible',visible);
      if(timer){clearTimeout(timer);timer=null;}
      link.classList.remove('is-condensed');
      if(visible)timer=setTimeout(function(){link.classList.add('is-condensed');},1800);
    }
    window.addEventListener('scroll',update,{passive:true});
    update();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();
})();
