/* Stop-motion hero: the portrait turns from front to back in choppy, hand-animated steps.
   Past the halfway point the "back" photo (BS) takes over, so the turn lands on that picture. */
(function(){var el=document.getElementById('pose');if(!el||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var FS=el.src,BS="img/eljohn-back.png",pre=new Image();pre.src=BS;
var OUT=' drop-shadow(2px 0 0 #fff) drop-shadow(-2px 0 0 #fff) drop-shadow(0 2px 0 #fff) drop-shadow(0 -2px 0 #fff)',
ang=[22,48,75,102,130,157,180],S=170,seq=[[0,3200]];
ang.forEach(function(a){seq.push([a,S])});seq[seq.length-1][1]=2600;
ang.slice(0,-1).reverse().concat([0]).forEach(function(a){seq.push([a,S])});
var i=0;function j(n){return (Math.random()*2-1)*n}
function step(){var f=seq[i++%seq.length],a=f[0],back=a>90,r=back?a-180:a;
el.src=back?BS:FS;
el.style.filter='grayscale(.1)'+OUT;
el.style.transform='perspective(900px) rotateY('+r+'deg)'+(a%180?' translate('+j(1.5).toFixed(1)+'px,'+j(1.5).toFixed(1)+'px) rotate('+j(.6).toFixed(2)+'deg)':'');
setTimeout(step,f[1])}
step()})();
