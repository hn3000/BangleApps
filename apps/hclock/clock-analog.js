(function(){
  g.clear();
  const p = Math.PI/2;
  const PRad = Math.PI/180;
  const rHour = 80;
  const rMin = 105;
  const rSec = 105;
  const rInner = -1;
  const cx = 120;
  const cy = 135;
  
  let intervalRefSec = null;
  
  let minuteDate = new Date();
  let secondDate = new Date();
  
  function seconds(angle, r) {
    /*
    const a = angle*PRad;
    const x = cx+Math.sin(a)*r;
    const y = cy-Math.cos(a)*r;
    g.fillRect(x-1,y-1,x+1,y+1);
    */
   hand(angle, -1, r, 1);
  }
  function hand(angle, r1,r2, w) {
    const a = angle*PRad;
    const dx = Math.sin(a);
    const dy = -Math.cos(a);
    const r3 = w || 4;

    g.fillPoly([
      cx+dx*r1-dy*r3, cy+dy*r1+dx*r3,
      cx+dx*r1+dy*r3, cy+dy*r1-dx*r3,
      cx+dx*r2+dy*r3, cy+dy*r2-dx*r3,
      cx+dx*r2-dy*r3, cy+dy*r2+dx*r3
    ]);

  }
  
  function drawAll() {
    g.clear();
    secondDate = minuteDate = new Date();

    // draw hands
    onSecond();

    g.setColor(1,1,1);

  }
  
  function onSecond() {
    const nextDate = new Date();
    g.setColor(0,0,0);
    seconds(360*secondDate.getSeconds()/60, rSec);
    secondDate = nextDate;
    if (secondDate.getMinutes() != minuteDate.getMinutes()) {
      const hours = minuteDate.getHours();
      const mins = minuteDate.getMinutes();
      hand(30*hours+mins/2, rInner, rHour);
      hand(6*mins, rInner, rMin);
      minuteDate = nextDate;
    }

    g.setColor(1,1,1);
    const hours = minuteDate.getHours();
    const mins = minuteDate.getMinutes();
    hand(30*hours+mins/2, rInner, rHour);
    hand(6*mins, rInner, rMin);

    g.setColor(0.3,0.3,0.6);
    hand(0, 100, 120, 5);
    hand(90, 95, 105, 5);
    hand(180, 95, 105, 5);
    hand(270, 95, 105, 5);

    g.setColor(1,0,0);
    seconds(360*secondDate.getSeconds()/60, rSec);

    g.setColor(1,1,1);
  }
  
  function onMinute() {
    g.setColor(0,0,0);
    minuteDate = new Date();

    g.setColor(1,1,1);
    onSecond();
/*
    hand(360*minuteDate.getHours()/12, rInner, rHour);
    hand(360*minuteDate.getMinutes()/60, rInner, rMin);
*/

  }

  function clearTimers() {
    if(intervalRefSec) {clearInterval(intervalRefSec);}
  }

  function startTimers() {
    minuteDate = new Date();
    secondDate = new Date();
    intervalRefSec = setInterval(onSecond,1000);
    drawAll();
  }

  startTimers();

  Bangle.on('lcdPower',function(on) {
    if (on) {
      g.clear();
      startTimers();
    }else {
      clearTimers();
    }
  });

})();
