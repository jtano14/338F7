/* Project B English: floating HOME/F7 shortcut. Hover animation is handled in CSS. */
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
    function update(){link.classList.remove('is-condensed');link.classList.toggle('is-visible',window.scrollY>140);}
    window.addEventListener('scroll',update,{passive:true});
    update();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();
})();
