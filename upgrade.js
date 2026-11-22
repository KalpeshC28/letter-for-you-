
// Opening note and soft falling petals for Prachi's upgraded letter.
const welcome=document.getElementById('welcome-screen');
const openLetter=document.getElementById('open-letter');
if(welcome&&openLetter){
  openLetter.addEventListener('click',()=>{
    const backgroundSong=document.getElementById('background-song');
    if(backgroundSong){backgroundSong.loop=true;backgroundSong.play().catch(()=>{});}
    welcome.classList.add('is-opening');
    document.body.classList.add('letter-open');
    window.setTimeout(()=>welcome.remove(),1000);
  });
}
const prefersLessMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const petalLayer=document.getElementById('petal-layer');
if(petalLayer&&!prefersLessMotion){
  const makePetal=()=>{
    const petal=document.createElement('span');
    petal.className='petal';
    petal.textContent=Math.random()>.5?'✿':'❀';
    petal.style.left=(Math.random()*100)+'vw';
    petal.style.fontSize=(11+Math.random()*12)+'px';
    petal.style.setProperty('--fall',(10+Math.random()*8)+'s');
    petal.style.setProperty('--side',(-65+Math.random()*130)+'px');
    petalLayer.appendChild(petal);
    window.setTimeout(()=>petal.remove(),19000);
  };
  window.setTimeout(()=>{makePetal();window.setInterval(makePetal,2300);},1600);
}
