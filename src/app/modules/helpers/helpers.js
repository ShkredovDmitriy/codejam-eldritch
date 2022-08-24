import store from "../store/store";
import config from "../game/config";

export const qi = (id) => document.getElementById(id);
export const qs = (el) => document.querySelector(el);
export const qa = (id) => document.querySelectorAll(id);

export const arrayShuffle = arr => {
  let res = [], tmp = arr;
  for(let i = arr.length; i > 0; i--) {
    const randId = Math.floor(Math.random() * i);
    const randEl = tmp.splice(randId, 1);
    res = [...res, ...randEl]
  }
  return res;
}

export const fillTable = (set1, set2, set3) => {
  const cells = ['step1Green', 'step1Brown', 'step1Blue', 'step2Green', 'step2Brown', 'step2Blue', 'step3Green', 'step3Brown', 'step3Blue'];
  const sets = [set1, set1, set1, set2, set2, set2, set3, set3, set3];
  const types = ['green', 'brown', 'blue', 'green', 'brown', 'blue', 'green', 'brown', 'blue',]
  cells.map((cell, i) => qi(cell).textContent = sets[i].filter(el => el.type === types[i]).length)
}

export const loading = () => {
  let load = 0;
  let step = Math.ceil(100 / config.images.length);
  return new Promise((resolve, reject) => {
    config.images.map(src => {
      const img = new Image();
      img.addEventListener('load', () => {
        setTimeout(()=> {
          load += step;
          if(load < 100) qs('.preloader__counter').textContent = load + '%';
          if(load >= 100) {
            qs('.preloader__counter').textContent = '100%'
            setTimeout(()=> qs('.preloader').classList.remove('visible'), 1000)
            setTimeout(()=> qs('.preloader').classList.remove('block'), 1300)
            setTimeout(() => resolve(), 1300);
          }
        }, 500)
      })
      img.src = './images/' + src;
    })
  })
}

export const sectionAncientShow = () => {
  qa('.button--ancient').forEach(btn => {
    btn.disabled = false;
    btn.classList.remove('active');
  })
  qi('containerAncient').classList.add('block');
  setTimeout(() => qi('containerAncient').classList.add('visible'), 100);
  setTimeout(() => qi('azathoth').classList.add('visible'), 400);
  setTimeout(() => qi('cthulthu').classList.add('visible'), 600);
  setTimeout(() => qi('iogSothoth').classList.add('visible'), 800);
  setTimeout(() => qi('shubNiggurath').classList.add('visible'), 1000);
}


export const sectionLevelsShow = (btnId) => {
  // DISABLE ANTIENT BUTTONS
  qa('.button--ancient').forEach(btn => btn.disabled = true);
  // MAKE CLICKED BUTTON ACTIVE
  qi(btnId).classList.add('active');
  // HIDE ANCIENT
  setTimeout(() => qi('containerAncient').classList.remove('visible'), 300);
  setTimeout(() => qi('containerAncient').classList.remove('block'), 800);
  // CLEAR LEVEL BUTTONS
  qa('.button--level').forEach(btn => {
    btn.disabled = false;
    btn.classList.remove('active');
  })
  // SHOW LEVEL
  setTimeout(() => qi('containerLevel').classList.add('block'), 900);
  setTimeout(() => qi('containerLevel').classList.add('visible'), 1000);
  // SHOW LEVEL BUTTONS
  setTimeout(() => qi('levelVeryEasy').classList.remove('hidden'),  1300);
  setTimeout(() => qi('levelEasy').classList.remove('hidden'), 1500);
  setTimeout(() => qi('levelNormal').classList.remove('hidden'), 1700);
  setTimeout(() => qi('levelHard').classList.remove('hidden'), 1900)
  setTimeout(() => qi('levelVeryHard').classList.remove('hidden'), 2100);
}

export const sectionShuffleShow = (btnId, level) => {
  store.currLevel = level;
  // DISABLE LEVEL BUTTONS
  qa('.button--level').forEach(btn => btn.disabled = true);
  // MAKE CLICKED BUTTON ACTIVE
  qi(btnId).classList.add('active');
  // HIDE LEVELS
  setTimeout(() => qi('containerLevel').classList.remove('visible'), 300);
  setTimeout(() => qi('containerLevel').classList.remove('block'), 900);
  // CLEAR SHUFFLE BUTTON
  qi('buttonShuffle').disabled = false;
  qi('buttonShuffle').classList.remove('active');
  // SHOW SHUFFLE
  setTimeout(() => qi('containerShuffle').classList.add('block'), 1000);
  setTimeout(() => qi('containerShuffle').classList.add('visible'), 1100);
  // SHOW SHUFFLE BUTTONS
  setTimeout(() => qi('buttonShuffle').classList.remove('hidden'),  1300);
 }

 export const sectionCardsShow = () => {
   // DISABLE SHUFFLE BUTTON
   qi('buttonShuffle').classList.add('active');
   qi('buttonShuffle').disabled = true;
   // HIDE SHUFFLE
   setTimeout(() => qi('containerShuffle').classList.remove('visible'), 300);
   setTimeout(() => qi('containerShuffle').classList.remove('block'), 800);
   // SHOW CARDS
   setTimeout(() => qi('containerCards').classList.add('block'), 1000);
   setTimeout(() => qi('containerCards').classList.add('visible'), 1100);
   //
   createSetforGame();
 }


 export const clickPlayAgainButton = () => {
  qi('buttonPlayAgain').addEventListener('click', (e) => {
    // HIDE PLAY AGAIN BUTTON
    setTimeout(() => qi('buttonPlayAgain').classList.add('hidden'), 300);
    // HIDE CARDS
    setTimeout(() => qi('containerCards').classList.remove('visible'), 300);
    setTimeout(() => qi('containerCards').classList.remove('block'), 800);
    // SHOW ANTIENTS
    setTimeout(() => sectionAncientShow(), 900);
    // CLEAR STORE
    store.currLevel = 1;
    store.currSet = [];
    store.greenSet = [];
    store.brownSet = [];
    store.blueSet = [];
    store.step1Set = [];
    store.step2Set = [];
    store.step3Set = [];
    store.globSet = [];
  })
}

// NO EXPORT
function createSetforGame () {

  const { green, brown, blue } = config.cards;

  const greenEasy = arrayShuffle(green.easy.map(url => ({type: 'green', level: 'easy', url: url})))
  const greenNormal = arrayShuffle(green.normal.map(url => ({type: 'green', level: 'normal', url: url})))
  const greenHard = arrayShuffle(green.hard.map(url=> ({type: 'green', level: 'hard', url: url})))

  const brownEasy = arrayShuffle(brown.easy.map(url=> ({type: 'brown', level: 'easy', url: url})))
  const brownNormal = arrayShuffle(brown.normal.map(url=> ({type: 'brown', level: 'normal', url: url})))
  const brownHard = arrayShuffle(brown.hard.map(url=> ({type: 'brown', level: 'hard', url: url})))

  const blueEasy = arrayShuffle(blue.easy.map(url=> ({type: 'blue', level: 'easy', url: url})))
  const blueNormal = arrayShuffle(blue.normal.map(url=> ({type: 'blue', level: 'normal', url: url})))
  const blueHard = arrayShuffle(blue.hard.map(url=> ({type: 'blue', level: 'hard', url: url})))

  const greenSum = store.currSet[0][0] + store.currSet[1][0] + store.currSet[2][0];
  const brownSum = store.currSet[0][1] + store.currSet[1][1] + store.currSet[2][1];
  const blueSum = store.currSet[0][2] + store.currSet[1][2] + store.currSet[2][2];

  if(store.currLevel == 1) {
    store.greenSet = arrayShuffle([...greenEasy, ...greenNormal].slice(0, greenSum))
    store.brownSet = arrayShuffle([...brownEasy, ...brownNormal].slice(0, brownSum))
    store.blueSet = arrayShuffle([...blueEasy, ...blueNormal].slice(0, blueSum))
  }

  if(store.currLevel == 2) {
    store.greenSet = arrayShuffle([...greenEasy, ...greenNormal]).slice(0, greenSum)
    store.brownSet = arrayShuffle([...brownEasy, ...brownNormal]).slice(0, brownSum)
    store.blueSet = arrayShuffle([...blueEasy, ...blueNormal]).slice(0, blueSum)
  }

  if(store.currLevel == 3) {
    store.greenSet = arrayShuffle([...greenEasy, ...greenNormal, ...greenHard]).slice(0, greenSum)
    store.brownSet = arrayShuffle([...brownEasy, ...brownNormal, ...brownHard]).slice(0, brownSum)
    store.blueSet = arrayShuffle([...blueEasy, ...blueNormal, ...blueHard]).slice(0, blueSum)
  }

  if(store.currLevel == 4) {
    store.greenSet = arrayShuffle([...greenNormal, ...greenHard]).slice(0, greenSum)
    store.brownSet = arrayShuffle([...brownNormal, ...brownHard]).slice(0, brownSum)
    store.blueSet = arrayShuffle([...blueNormal, ...blueHard]).slice(0, blueSum)
  }

  if(store.currLevel == 5) {
    store.greenSet = arrayShuffle([...greenHard, ...greenNormal].slice(0, greenSum))
    store.brownSet = arrayShuffle([...brownHard, ...brownNormal].slice(0, brownSum))
    store.blueSet = arrayShuffle([...blueHard, ...blueNormal].slice(0, blueSum))
  }

  // console.log('greenSet', store.greenSet);
  // console.log('brownSet', store.brownSet);
  // console.log('blueSet', store.blueSet);

  store.step1Set = arrayShuffle([...store.greenSet.splice(0, store.currSet[0][0]), ...store.brownSet.splice(0, store.currSet[0][1]), ...store.blueSet.splice(0, store.currSet[0][2])]);
  store.step2Set = arrayShuffle([...store.greenSet.splice(0, store.currSet[1][0]), ...store.brownSet.splice(0, store.currSet[1][1]), ...store.blueSet.splice(0, store.currSet[1][2])]);
  store.step3Set = arrayShuffle([...store.greenSet.splice(0, store.currSet[2][0]), ...store.brownSet.splice(0, store.currSet[2][1]), ...store.blueSet.splice(0, store.currSet[2][2])]);

  store.globSet = [...store.step3Set, ...store.step2Set, ...store.step1Set];

  // console.log('store.step1Set', store.step1Set);
  // console.log('store.step2Set', store.step2Set);
  // console.log('store.step3Set', store.step3Set);

  fillTable(store.step1Set, store.step2Set, store.step3Set);
  setTimeout(() => qi('tableStat').classList.remove('hidden'), 1300);

  qi('setForGame').innerHTML = '';
  store.globSet.map(card => {
    // console.log("card")
    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML = `<img src='./images/${card.url}' alt=''>`
    qi('setForGame').appendChild(div)
  })

  setTimeout(() => qi('setForGame').classList.remove('hidden'), 1500);
}