/* === ViralNow/WeirdWorld/TopRank — Shared Interactions === */
document.addEventListener('DOMContentLoaded',function(){
  var t=document.querySelector('.menu-toggle'),n=document.querySelector('.main-nav');
  t&&n&&t.addEventListener('click',function(){n.classList.toggle('mobile-open');t.textContent=n.classList.contains('mobile-open')?'✕':'☰'});
  document.addEventListener('click',function(e){if(t&&n&&!t.contains(e.target)&&!n.contains(e.target)){n.classList.remove('mobile-open');t.textContent='☰'}});
  var b=document.querySelector('.network-btn'),m=document.querySelector('.network-menu');
  b&&m&&(b.addEventListener('click',function(e){e.stopPropagation();m.classList.toggle('show')}),document.addEventListener('click',function(){m.classList.remove('show')}));
  var top=document.querySelector('.back-to-top');
  top&&(window.addEventListener('scroll',function(){top.classList.toggle('visible',window.scrollY>600)}),top.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})}));
  var more=document.querySelector('.btn-load-more'),grid=document.querySelector('.card-grid');
  more&&grid&&more.addEventListener('click',function(){
    if(more.disabled)return;more.disabled=true;more.textContent='Loading...';
    setTimeout(function(){var cards=grid.querySelectorAll('.card');for(var i=0;i<4&&i<cards.length;i++)grid.appendChild(cards[cards.length-1-i].cloneNode(true));more.disabled=false;more.textContent='Load More'},800);
  });
  var close=document.querySelector('.anchor-ad-close'),anchor=document.querySelector('.mobile-anchor-ad');
  close&&anchor&&close.addEventListener('click',function(){anchor.style.display='none'});
  document.querySelectorAll('.share-btn').forEach(function(btn){btn.addEventListener('click',function(){
    var p=btn.dataset.platform,u=encodeURIComponent(location.href),t=encodeURIComponent(document.title);
    if(p==='twitter')window.open('https://twitter.com/intent/tweet?url='+u+'&text='+t,'_blank','width=600,height=400');
    if(p==='copy')navigator.clipboard.writeText(location.href).then(function(){btn.textContent='✓ Copied';setTimeout(function(){btn.textContent='📋 Copy Link'},2000)});
    if(p==='facebook')window.open('https://www.facebook.com/sharer/sharer.php?u='+u,'_blank','width=600,height=400');
  })});
});
