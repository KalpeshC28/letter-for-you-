const button=document.getElementById('surprise');
const note=document.getElementById('hidden');
button.addEventListener('click',()=>{
  const open=note.classList.toggle('show');
  button.textContent=open?'a little reminder ♡':'a little secret ♡';
  if(open) note.scrollIntoView({behavior:'smooth',block:'center'});
});

// Reveal each section gently as it enters the viewport.
const revealTargets=document.querySelectorAll('.section,.final-card,.memory-note,.pullquote,.three-words');
revealTargets.forEach(el=>el.classList.add('reveal'));
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}
    });
  },{threshold:.12});
  revealTargets.forEach(el=>observer.observe(el));
}else{
  revealTargets.forEach(el=>el.classList.add('is-visible'));
}

// A few soft floating hearts, never covering the reading experience.
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reducedMotion){
  const makeHeart=()=>{
    const heart=document.createElement('span');
    heart.className='heart-float';
    heart.textContent=Math.random()>.5?'♡':'♥';
    heart.style.left=(5+Math.random()*90)+'vw';
    heart.style.fontSize=(12+Math.random()*15)+'px';
    heart.style.setProperty('--duration',(6+Math.random()*4)+'s');
    heart.style.setProperty('--drift',(-35+Math.random()*70)+'px');
    document.body.appendChild(heart);
    setTimeout(()=>heart.remove(),10500);
  };
  setTimeout(()=>{makeHeart();setInterval(makeHeart,1500);},900);
}