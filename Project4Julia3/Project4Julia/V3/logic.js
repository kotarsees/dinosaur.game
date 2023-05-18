const dinozavr = document.querySelector('.dinozavr');//Блок с динозавром
const dino = document.querySelector('.dino');//Динозавр
const restartBtn = document.querySelector('.restart');//Кнопка "Начать заново"
const pDie = document.querySelector('.gameOver');//Надпись "GameOver"
const road = document.querySelector('.floor');//Дорога
const road2 = document.querySelector('.floor2');//Дорога 2 уровень
const road3 = document.querySelector('.floor3');//Дорога 3 уровень
const clouds = document.getElementsByClassName('cloud1');//Массив облаков на первый уровень
const cloudsL2 = document.getElementsByClassName('cloud2');//Массив облаков на второй уровень
const cloudsL3 = document.getElementsByClassName('cloud3');//Массив облаков на третий уровень
const stones = document.getElementsByClassName('stone');//Массив камней
const scores = document.getElementsByClassName('score1');//Массив цветов на первый уровень
const scoresL2 = document.getElementsByClassName('score2');//Массив цветов на второй уровень
const scoresL3 = document.getElementsByClassName('score3');//Массив цветов на третий уровень
const objs = document.getElementsByClassName('barrier1');//Массив препядствий на первый уровень
const objsL2 = document.getElementsByClassName('barrier2');//Массив препядствий на второй уровень
const objsL3 = document.getElementsByClassName('barrier3');//Массив препядствий на третий уровень
const firstPic = document.querySelector('.firstPic');
const lastPic = document.querySelector('.lastPic');
console.log(dinozavr.offsetLeft, (window.innerWidth - 1500)/2);
var ofset = 186;//Отступ от края
var level = 1; var troy = false;//level - номер уровня; troy - булевая переменная для ограничения динозавра;
var stoper = false; var countSc = 0; var qwerty = [0, 0, 0, 0]; var levelTime = 5;
var stoper2 = false; var stoper3 = false; var seat = true;
var corObjs = [0, 0, 0, 0]; var corStones = [0, 0, 0, 0]; var corScores = [0, 0, 0, 0]; var corScoresL2 = [-100, -100, -100, -100];//Координаты соотвествующих объектов
var setLevel = 1; var countRest = 0; var setLev = 1;
function getRandomInt(max){
  return Math.floor(Math.random()*max);
};//Функция выдающая псевдорандомное число
function mainTimer(){
  if (countSc == 17 && setLevel != 2){//Условие перехода на второй уровень
    level = 2; levelTime = 4.5;
    stoper = true; setLevel = 2;
    setTimeout(mainMove, 3500);
    setTimeout(()=>{
      qwerty = [0, 0, 0, 0];
    }, 1000);
    setTimeout(()=>{
      setRoad2();
      qwerty = [0, 0, 0, 0];
      setLev = 2;
    }, 3500);
  }else if (countSc == 59 && setLevel != 3){//Условие перехода на третий уровеньы
    level = 3; levelTime = 4;
    stoper2 = true; setLevel = 3;
    setTimeout(mainMove, 3000);
    setTimeout(()=>{
      qwerty = [0, 0, 0, 0];
    }, 1000);
    setTimeout(()=>{
      setRoad3();
      qwerty = [0, 0, 0, 0];
      setLev = 3;
    }, 3000);
  }else{
    mainTimerStop();
  }
  setTimeout(collision, 20);//Вызов функции коллизии
};//Главный таймер, проверяется каждые 10мс;
function mainTimerStop(){
  clearTimeout(mainTimer);
};
function mainMove(){
  qwerty = [0, 0, 0, 0];
  if (level == 1){//Запуск первого уровня
    setSettingLevel1();
    moveLevel1()
  }else if (level == 2){//Запуск второго уровня
    setSettingLevel2();
    moveLevel2();
  }else if (level == 3){//Запуск третьего уровня
    setSettingLevel3();
    moveLevel3();
  }else{//Остановка игры
    setStopLevel();
  };
};
function moveDino(event){
  if ((event.code == 'Space' || event.code == 'ArrowUp') && troy && seat){//Нажатие пробела
    dinozavr.style.top = '400px';//Поднятие динозавра вверх
    dino.style.animation = 'dinoRun 0.01s linear';
    dino.style.backgroundImage = 'url(css/images/dinozavr.png)';
    troy = false;
    setTimeout(()=>{
      dinozavr.style.top = '500px';
    }, levelTime*70);
    setTimeout(()=>{
      dino.style.animation = 'dinoRun 0.3s linear infinite';
      troy = true;
    }, levelTime*120);
  };
  if (event.code == 'ArrowDown' && troy){
    dino.style.top = '20px';
    dino.style.animation = 'dinoRunSeat 0.3s linear infinite';
    seat = false;
  };
};
function standUpDino(){
  if (event.code == 'ArrowDown' && !seat){
    dino.style.top = '0px';
    dino.style.animation = 'dinoRun 0.3s linear infinite';
    troy = true; seat = true;
  };
};
function setSettingLevel1(){
  for (var i = 0; i < 5; i++){
    clouds[i].style.animation = 'cloudMove'+(i+1)+' 5s linear infinite';
    clouds[i].style.animationPlayState = 'paused';
  };
  for (var i = 0; i < 4; i++){
    objs[i].style.animation = 'barrierMove'+(i+1)+' 5s linear infinite';
    objs[i].style.animationPlayState = 'paused';;
  };
  for (var i = 0; i < 4; i++){
    scores[i].style.animation = 'scoreMove'+(i+1)+' 5s linear infinite';
    scores[i].style.animationPlayState = 'paused';
  };
};
function setSettingLevel2(){
  for (var i = 0; i < 5; i++){
    cloudsL2[i].style.animation = 'cloudMove'+(i+1)+' 3.5s linear infinite';
    cloudsL2[i].style.animationPlayState = 'paused';
  };
  for (var i = 0; i < 4; i++){
    objsL2[i].style.animation = 'barrierMove'+(i+1)+' 3.5s linear infinite';
    objsL2[i].style.animationPlayState = 'paused';
  };
  for (var i = 0; i < 4; i++){
    scoresL2[i].style.animation = 'scoreMove'+(i+1)+' 3.5s linear infinite';
    scoresL2[i].style.animationPlayState = 'paused';
  };
};
function setSettingLevel3(){
  for (var i = 0; i < 5; i++){
    cloudsL3[i].style.animation = 'cloudMove'+(i+1)+' 3s linear infinite';
    cloudsL3[i].style.animationPlayState = 'paused';
  };
  for (var i = 0; i < 4; i++){
    objsL3[i].style.animation = 'barrierMove'+(i+1)+' 3s linear infinite';
    objsL3[i].style.animationPlayState = 'paused';
  };
  for (var i = 0; i < 4; i++){
    scoresL3[i].style.animation = 'scoreMove'+(i+1)+' 3s linear infinite';
    scoresL3[i].style.animationPlayState = 'paused';
  };
  for (var i = 0; i < 2; i++){
    stones[i].style.animation = 'stoneMove'+(i+1)+' 3s linear infinite';
    stones[i].style.animationPlayState = 'paused';
  };
};
//##############################################################################
function moveLevel1(){
  if (level == 1){
    lastOne(); cloudMoveL1(); objMoveL1(); scoreMoveL1();
    qwerty = [0, 0, 0, 0];
  }else{
    stopLevel1()
  };
};
function lastOne(){
  setTimeout(moveLevel1, 10000);
};
function stopLevel1(){
  clearTimeout(moveLevel1);
};
function cloudMove1(){
  if (!stoper){
    clouds[0].style.animationPlayState = 'running';
    clouds[0].style.top = 50 + getRandomInt(150)+'px';
    setTimeout(()=>{
      clouds[0].style.animationPlayState = 'paused';
    }, 5000);
  };
};
function cloudMove2(){
  if (!stoper){
    clouds[1].style.animationPlayState = 'running';
    clouds[1].style.top = 50 + getRandomInt(150)+'px';
    setTimeout(()=>{
      clouds[1].style.animationPlayState = 'paused';
    }, 5000);
  };
};
function cloudMove3(){
  if (!stoper){
    clouds[2].style.animationPlayState = 'running';
    clouds[2].style.top = 50 + getRandomInt(150)+'px';
    setTimeout(()=>{
      clouds[2].style.animationPlayState = 'paused';
    }, 5000);
  };
};
function cloudMove4(){
  if (!stoper){
    clouds[3].style.animationPlayState = 'running';
    clouds[3].style.top = 50 + getRandomInt(150)+'px';
    setTimeout(()=>{
      clouds[3].style.animationPlayState = 'paused';
    }, 5000);
  };
};
function cloudMove5(){
  if (!stoper){
    clouds[4].style.animationPlayState = 'running';
    clouds[4].style.top = 50 + getRandomInt(150)+'px';
    setTimeout(()=>{
      clouds[4].style.animationPlayState = 'paused';
    }, 5000);
  };
};
function cloudMoveL1(){//Запуск облаков на первом уровне
  setTimeout(cloudMove1, getRandomInt(2000));
  setTimeout(cloudMove2, getRandomInt(4000));
  setTimeout(cloudMove3, 2000+getRandomInt(4000));
  setTimeout(cloudMove4, 4000+getRandomInt(2000));
  setTimeout(cloudMove5, 6000+getRandomInt(2000));
};
function objMove1(){
  if (!stoper){
    objs[0].style.animationPlayState = 'running';
    setTimeout(()=>{
      objs[0].style.animationPlayState = 'paused';
    }, 5000);
  };
};
function objMove2(){
  if (!stoper){
    objs[1].style.animationPlayState = 'running';
    setTimeout(()=>{
      objs[1].style.animationPlayState = 'paused';
    }, 5000);
  };
};
function objMove3(){
  if (!stoper){
    objs[2].style.animationPlayState = 'running';
    setTimeout(()=>{
      objs[2].style.animationPlayState = 'paused';
    }, 5000);
  };
};
function objMove4(){
  if (!stoper){
    objs[3].style.animationPlayState = 'running';
    setTimeout(()=>{
      objs[3].style.animationPlayState = 'paused';
    }, 5000);
  };
};
function objMoveL1(){//Запуск препядствий на первом уровне
  setTimeout(objMove1, getRandomInt(1000));
  setTimeout(objMove2, 2500+getRandomInt(1000));
  setTimeout(objMove3, 5000+getRandomInt(1000));
  setTimeout(objMove4, 7500+getRandomInt(1000));
};
function scoreMove1(){
  if (!stoper){
    scores[0].style.animationPlayState = 'running';
    scores[0].style.zIndex = '10';
    setTimeout(()=>{
      scores[0].style.animationPlayState = 'paused';
    }, 5000);
  };
};
function scoreMove2(){
  if (!stoper){
    scores[1].style.animationPlayState = 'running';
    scores[1].style.zIndex = '10';
    setTimeout(()=>{
      scores[1].style.animationPlayState = 'paused';
    }, 5000);
  };
};
function scoreMove3(){
  if (!stoper){
    scores[2].style.animationPlayState = 'running';
    scores[2].style.zIndex = '10';
    setTimeout(()=>{
      scores[2].style.animationPlayState = 'paused';
    }, 5000);
  };
};
function scoreMove4(){
  if (!stoper){
    scores[3].style.animationPlayState = 'running';
    scores[3].style.zIndex = '10';
    setTimeout(()=>{
      scores[3].style.animationPlayState = 'paused';
    }, 5000);
  };
};
function scoreMoveL1(){//Запуск цветков на первом уровне
  setTimeout(scoreMove1, 1000+getRandomInt(1000));
  setTimeout(scoreMove2, 3500+getRandomInt(1000));
  setTimeout(scoreMove3, 6000+getRandomInt(1000));
  setTimeout(scoreMove4, 8500+getRandomInt(1000));
};
//##############################################################################
function moveLevel2(){
  if (level == 2){
    lastTwo(); cloudMoveL2(); objMoveL2(); scoreMoveL2();
    qwerty = [0, 0, 0, 0];
  }else{
    stopLevel2()
  };
};
function lastTwo(){
  setTimeout(moveLevel2, 8000);
};
function stopLevel2(){
  clearTimeout(moveLevel2);
};
function cloudMove1L2(){
  if (!stoper2){
    cloudsL2[0].style.animationPlayState = 'running';
    cloudsL2[0].style.top = 50 + getRandomInt(150)+'px';
    setTimeout(()=>{
      cloudsL2[0].style.animationPlayState = 'paused';
    }, 3500);
  };
};
function cloudMove2L2(){
  if (!stoper2){
    cloudsL2[1].style.animationPlayState = 'running';
    cloudsL2[1].style.top = 50 + getRandomInt(150)+'px';
    setTimeout(()=>{
      cloudsL2[1].style.animationPlayState = 'paused';
    }, 3500);
  };
};
function cloudMove3L2(){
  if (!stoper2){
    cloudsL2[2].style.animationPlayState = 'running';
    cloudsL2[2].style.top = 50 + getRandomInt(150)+'px';
    setTimeout(()=>{
      cloudsL2[2].style.animationPlayState = 'paused';
    }, 3500);
  };
};
function cloudMove4L2(){
  if (!stoper2){
    cloudsL2[3].style.animationPlayState = 'running';
    cloudsL2[3].style.top = 50 + getRandomInt(150)+'px';
    setTimeout(()=>{
      cloudsL2[3].style.animationPlayState = 'paused';
    }, 3500);
  };
};
function cloudMove5L2(){
  if (!stoper2){
    cloudsL2[4].style.animationPlayState = 'running';
    cloudsL2[4].style.top = 50 + getRandomInt(150)+'px';
    setTimeout(()=>{
      cloudsL2[4].style.animationPlayState = 'paused';
    }, 3500);
  };
};
function cloudMoveL2(){
  setTimeout(cloudMove1L2, getRandomInt(1600));
  setTimeout(cloudMove2L2, getRandomInt(3200));
  setTimeout(cloudMove3L2, 1600+getRandomInt(3200));
  setTimeout(cloudMove4L2, 3200+getRandomInt(1600));
  setTimeout(cloudMove5L2, 4800+getRandomInt(1600));
};
function objMove1L2(){
  if (!stoper2){
    objsL2[0].style.animationPlayState = 'running';
    setTimeout(()=>{
      objsL2[0].style.animationPlayState = 'paused';
    }, 3500);
  };
};
function objMove2L2(){
  if (!stoper2){
    objsL2[1].style.animationPlayState = 'running';
    setTimeout(()=>{
      objsL2[1].style.animationPlayState = 'paused';
    }, 3500);
  };
};
function objMove3L2(){
  if (!stoper2){
    objsL2[2].style.animationPlayState = 'running';
    setTimeout(()=>{
      objsL2[2].style.animationPlayState = 'paused';
    }, 3500);
  };
};
function objMove4L2(){
  if (!stoper2){
    objsL2[3].style.animationPlayState = 'running';
    setTimeout(()=>{
      objsL2[3].style.animationPlayState = 'paused';
    }, 3500);
  };
};
function objMoveL2(){
  setTimeout(objMove1L2, getRandomInt(800));
  setTimeout(objMove2L2, 2000+getRandomInt(800));
  setTimeout(objMove3L2, 4000+getRandomInt(800));
  setTimeout(objMove4L2, 6000+getRandomInt(800));
};
function scoreMove1L2(){
  if (!stoper2){
    scoresL2[0].style.animationPlayState = 'running';
    scoresL2[0].style.zIndex = '10';
    setTimeout(()=>{
      scoresL2[0].style.animationPlayState = 'paused';
    }, 3500);
  };
};
function scoreMove2L2(){
  if (!stoper2){
    scoresL2[1].style.animationPlayState = 'running';
    scoresL2[1].style.zIndex = '10';
    setTimeout(()=>{
      scoresL2[1].style.animationPlayState = 'paused';
    }, 3500);
  };
};
function scoreMove3L2(){
  if (!stoper2){
    scoresL2[2].style.animationPlayState = 'running';
    scoresL2[2].style.zIndex = '10';
    setTimeout(()=>{
      scoresL2[2].style.animationPlayState = 'paused';
    }, 3500);
  };
};
function scoreMove4L2(){
  if (!stoper2){
    scoresL2[3].style.animationPlayState = 'running';
    scoresL2[3].style.zIndex = '10';
    setTimeout(()=>{
      scoresL2[3].style.animationPlayState = 'paused';
    }, 3500);
  };
};
function scoreMoveL2(){
  setTimeout(scoreMove1L2, 800+getRandomInt(800));
  setTimeout(scoreMove2L2, 2800+getRandomInt(800));
  setTimeout(scoreMove3L2, 4800+getRandomInt(800));
  setTimeout(scoreMove4L2, 6800+getRandomInt(800));
};
//##############################################################################
function moveLevel3(){
  if (level == 3){
    lastThree(); cloudMoveL3(); objMoveL3(); scoreMoveL3(); stoneMoveL3();
    qwerty = [0, 0, 0, 0];
  }else{
    stopLevel3()
  };
};
function lastThree(){
  setTimeout(moveLevel3, 6000);
};
function stopLevel3(){
  clearTimeout(moveLevel3);
};
function cloudMove1L3(){
  if (!stoper3){
    cloudsL3[0].style.animationPlayState = 'running';
    cloudsL3[0].style.top = 50 + getRandomInt(150)+'px';
    setTimeout(()=>{
      cloudsL3[0].style.animationPlayState = 'paused';
    }, 3000);
  };
};
function cloudMove2L3(){
  if (!stoper3){
    cloudsL3[1].style.animationPlayState = 'running';
    cloudsL3[1].style.top = 50 + getRandomInt(150)+'px';
    setTimeout(()=>{
      cloudsL3[1].style.animationPlayState = 'paused';
    }, 3000);
  };
};
function cloudMove3L3(){
  if (!stoper3){
    cloudsL3[2].style.animationPlayState = 'running';
    cloudsL3[2].style.top = 50 + getRandomInt(150)+'px';
    setTimeout(()=>{
      cloudsL3[2].style.animationPlayState = 'paused';
    }, 3000);
  };
};
function cloudMove4L3(){
  if (!stoper3){
    cloudsL3[3].style.animationPlayState = 'running';
    cloudsL3[3].style.top = 50 + getRandomInt(150)+'px';
    setTimeout(()=>{
      cloudsL3[3].style.animationPlayState = 'paused';
    }, 3000);
  };
};
function cloudMove5L3(){
  if (!stoper3){
    cloudsL3[4].style.animationPlayState = 'running';
    cloudsL3[4].style.top = 50 + getRandomInt(150)+'px';
    setTimeout(()=>{
      cloudsL3[4].style.animationPlayState = 'paused';
    }, 3000);
  };
};
function cloudMoveL3(){
  setTimeout(cloudMove1L3, getRandomInt(1200));
  setTimeout(cloudMove2L3, getRandomInt(2400));
  setTimeout(cloudMove3L3, 1200+getRandomInt(2400));
  setTimeout(cloudMove4L3, 2400+getRandomInt(1200));
  setTimeout(cloudMove5L3, 3600+getRandomInt(1200));
};
function objMove1L3(){
  if (!stoper3){
    objsL3[0].style.animationPlayState = 'running';
    setTimeout(()=>{
      objsL3[0].style.animationPlayState = 'paused';
    }, 3000);
  };
};
function objMove2L3(){
  if (!stoper3){
    objsL3[1].style.animationPlayState = 'running';
    setTimeout(()=>{
      objsL3[1].style.animationPlayState = 'paused';
    }, 3000);
  };
};
function objMove3L3(){
  if (!stoper3){
    objsL3[2].style.animationPlayState = 'running';
    setTimeout(()=>{
      objsL3[2].style.animationPlayState = 'paused';
    }, 3000);
  };
};
function objMove4L3(){
  if (!stoper3){
    objsL3[3].style.animationPlayState = 'running';
    setTimeout(()=>{
      objsL3[3].style.animationPlayState = 'paused';
    }, 3000);
  };
};
function objMoveL3(){
  setTimeout(objMove1L3, getRandomInt(600));
  setTimeout(objMove2L3, 1500+getRandomInt(600));
  setTimeout(objMove3L3, 3000+getRandomInt(600));
  setTimeout(objMove4L3, 4500+getRandomInt(600));
};
function scoreMove1L3(){
  if (!stoper3){
    scoresL3[0].style.animationPlayState = 'running';
    scoresL3[0].style.zIndex = '10';
    setTimeout(()=>{
      scoresL3[0].style.animationPlayState = 'paused';
    }, 3000);
  };
};
function scoreMove2L3(){
  if (!stoper3){
    scoresL3[1].style.animationPlayState = 'running';
    scoresL3[1].style.zIndex = '10';
    setTimeout(()=>{
      scoresL3[1].style.animationPlayState = 'paused';
    }, 3000);
  };
};
function scoreMove3L3(){
  if (!stoper3){
    scoresL3[2].style.animationPlayState = 'running';
    scoresL3[2].style.zIndex = '10';
    setTimeout(()=>{
      scoresL3[2].style.animationPlayState = 'paused';
    }, 3000);
  };
};
function scoreMove4L3(){
  if (!stoper3){
    scoresL3[3].style.animationPlayState = 'running';
    scoresL3[3].style.zIndex = '10';
    setTimeout(()=>{
      scoresL3[3].style.animationPlayState = 'paused';
    }, 3000);
  };
};
function scoreMoveL3(){
  setTimeout(scoreMove1L3, 600+getRandomInt(600));
  setTimeout(scoreMove2L3, 2100+getRandomInt(600));
  setTimeout(scoreMove3L3, 3600+getRandomInt(600));
  setTimeout(scoreMove4L3, 5100+getRandomInt(600));
};
function stoneMove1L3(){
  if (!stoper3){
    stones[0].style.animationPlayState = 'running';
    stones[0].style.zIndex = '10';
    setTimeout(()=>{
      stones[0].style.animationPlayState = 'paused';
    }, 3000);
  };
};
function stoneMove2L3(){
  if (!stoper3){
    stones[1].style.animationPlayState = 'running';
    stones[1].style.zIndex = '10';
    setTimeout(()=>{
      stones[1].style.animationPlayState = 'paused';
    }, 3000);
  };
};
function stoneMoveL3(){
  setTimeout(stoneMove1L3, 2100+getRandomInt(600));
  setTimeout(stoneMove2L3, 5100+getRandomInt(600));
};
//##############################################################################
function getCoordinats(){
  if (setLev == 1){
    for (var i = 0; i < 4; i++){
      corScores[i] = scores[i].offsetLeft - ofset;
    };
  }else if (setLev == 2){
    for (var i = 0; i < 4; i++){
      corObjs[i] = objsL2[i].offsetLeft - ofset;
      corScores[i] = scoresL2[i].offsetLeft - ofset;
    };
  }else if (setLev == 3){
    for (var i = 0; i < 4; i++){
      corObjs[i] = objsL3[i].offsetLeft - ofset;
      corScores[i] = scoresL3[i].offsetLeft - ofset;
    };
    for (var i = 0; i < 2; i++){
      corStones[i] = stones[i].offsetLeft - ofset;
    };
  }
};//Функция записывающая координаты объектов
function collision(){
  getCoordinats();
  for (var i = 0; i < 4; i++){
    if (corObjs[i] >= 50 && corObjs[i] <= 100  && troy && level != 1){
      if (level == 2){
        halfLose();
      }else if (level == 3){
        lose();
      }
    };
    if (corScores[i] >= -50 && corScores[i] <= 100 && qwerty[i] == 0 && troy){
      countSc += 1;
      qwerty[i] = 1;
      k = i
      setTrueScore();
      scores[i].style.zIndex = -100;
      scoresL2[i].style.zIndex = -100;
      scoresL3[i].style.zIndex = -100;
      setTimeout(()=>{
        qwerty[k] = 0;
      }, 1000)
    };
    if (corStones[i] >= 50 && corStones[i] <= 100 && seat){
      lose();
    }
  };
  mainTimer();
};
//##############################################################################
function lose(){
  dino.style.animation = 'dinoDie 0.3s linear infinite';
  road.style.animationPlayState = 'paused';
  road2.style.animationPlayState = 'paused';
  road3.style.animationPlayState = 'paused';
  stoper2 = true; stoper3 = true; troy = false;
  stopLevel2(); stopLevel3(); mainTimerStop();
  for (var i = 0; i < 4; i++){
    objsL2[i].style.animationPlayState = 'paused';
    objsL3[i].style.animationPlayState = 'paused';
    scoresL2[i].style.animationPlayState = 'paused';
    scoresL3[i].style.animationPlayState = 'paused';
  };
  for (var i = 0; i < 5; i++){
    cloudsL2[i].style.animationPlayState = 'paused';
    cloudsL3[i].style.animationPlayState = 'paused';
  };
  for (var i = 0; i < 2; i++){
    stones[i].style.animationPlayState = 'paused';
  };
  pDie.style.display = 'flex';
  restartBtn.style.display = 'flex';
};
function halfLose(){
  dino.style.animation = 'dinoDie 0.3s linear infinite';
  road.style.animationPlayState = 'paused';
  road2.style.animationPlayState = 'paused';
  road3.style.animationPlayState = 'paused';
  stoper2 = true; stoper3 = true; troy = false;
  stopLevel2(); stopLevel3(); mainTimerStop();
  for (var i = 0; i < 4; i++){
    objsL2[i].style.animationPlayState = 'paused';
    objsL3[i].style.animationPlayState = 'paused';
    scoresL2[i].style.animationPlayState = 'paused';
    scoresL3[i].style.animationPlayState = 'paused';
  };
  for (var i = 0; i < 5; i++){
    cloudsL2[i].style.animationPlayState = 'paused';
    cloudsL3[i].style.animationPlayState = 'paused';
  };
  for (var i = 0; i < 2; i++){
    stones[i].style.animationPlayState = 'paused';
  };
  setTimeout(halfRestart, 500);
}
function halfRestart(){
  dino.style.animation = 'dinoRun 0.3s linear infinite';
  countSc = 0;
  troy = true; stoper = false; stoper2 = false; stoper3 = false;
  level = 1; setLevel = 1; levelTime = 5;
  countRest = 0;
  corScores = [0, 0, 0, 0]; corObjs = [0, 0, 0, 0]; corStones = [0, 0, 0, 0];
  for (var i = 0; i < 5; i ++){
    clouds[i].style.animation = 'rest 0.001s linear';
    cloudsL2[i].style.animation = 'rest 0.001s linear';
    cloudsL3[i].style.animation = 'rest 0.001s linear';
  };
  for (var i = 0; i < 4; i ++){
    objs[i].style.animation = 'rest 0.001s linear';
    objsL2[i].style.animation = 'rest 0.001s linear';
    objsL3[i].style.animation = 'rest 0.001s linear';
    scores[i].style.animation = 'rest 0.001s linear';
    scoresL2[i].style.animation = 'rest 0.001s linear';
    scoresL3[i].style.animation = 'rest 0.001s linear';
  };
  for (var i = 0; i < 2; i ++){
    stones[i].style.animation = 'rest 0.001s linear';
  };
  setRoad1();
  mainMove(); mainTimer();
}
function restart(){
  pDie.style.display = 'none';
  restartBtn.style.display = 'none';
  dino.style.animation = 'dinoRun 0.3s linear infinite';
  countSc = 0;
  troy = true; stoper = false; stoper2 = false; stoper3 = false;
  level = 1; setLevel = 1; levelTime = 5;
  countRest = 0;
  corScores = [0, 0, 0, 0]; corObjs = [0, 0, 0, 0]; corStones = [0, 0, 0, 0];
  for (var i = 0; i < 5; i ++){
    clouds[i].style.animation = 'rest 0.001s linear';
    cloudsL2[i].style.animation = 'rest 0.001s linear';
    cloudsL3[i].style.animation = 'rest 0.001s linear';
  };
  for (var i = 0; i < 4; i ++){
    objs[i].style.animation = 'rest 0.001s linear';
    objsL2[i].style.animation = 'rest 0.001s linear';
    objsL3[i].style.animation = 'rest 0.001s linear';
    scores[i].style.animation = 'rest 0.001s linear';
    scoresL2[i].style.animation = 'rest 0.001s linear';
    scoresL3[i].style.animation = 'rest 0.001s linear';
  };
  for (var i = 0; i < 2; i ++){
    stones[i].style.animation = 'rest 0.001s linear';
  };
  setRoad1();
  mainMove(); mainTimer();
};
function restart1(){
  if (countRest == 0){
    countRest = 1;
    restart();
  }else{

  };
};
function div(val, by){
    return (val - val % by) / by;
};
function setTrueScore(){
  k = div(countSc, 10);
  i = countSc % 10;
  lastPic.style.backgroundImage = 'url(css/images/'+i+'.png)';
  firstPic.style.backgroundImage = 'url(css/images/'+k+'.png)';
};
function setRoad1(){
  road.style.display = 'flex';
  road2.style.display = 'none';
  road3.style.display = 'none';
  road.style.animationPlayState = 'running';
}
function setRoad2(){
  road.style.display = 'none';
  road2.style.display = 'flex';
  road3.style.display = 'none';
  road2.style.animationPlayState = 'running';
}
function setRoad3(){
  road.style.display = 'none';
  road2.style.display = 'none';
  road3.style.display = 'flex';
  road3.style.animationPlayState = 'running';
}
document.onkeydown = moveDino;
document.onkeyup = standUpDino;
restartBtn.onclick = restart1;
