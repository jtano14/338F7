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
    // Back to Top is shared by English and Japanese pages.
    var topButton=document.createElement('button');
    topButton.type='button';
    topButton.className='flux7-back-to-top';
    var japanese=(document.documentElement.lang||'').toLowerCase().startsWith('ja') || location.pathname.startsWith('/ja/');
    topButton.setAttribute('aria-label',japanese?'ページの先頭へ戻る':'Back to top');
    topButton.setAttribute('title',japanese?'ページの先頭へ戻る':'Back to top');
    topButton.innerHTML='<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(topButton);
    topButton.addEventListener('click',function(){
      var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({top:0,behavior:reduced?'instant':'smooth'});
    });
    function updateTop(){topButton.classList.toggle('is-visible',window.scrollY>400);}
    window.addEventListener('scroll',updateTop,{passive:true});
    updateTop();
    window.addEventListener('scroll',update,{passive:true});
    update();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();
})();
