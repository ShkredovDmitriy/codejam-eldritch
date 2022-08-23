import config from "./config";
import { qi, qs, qa, arrayShuffle, fillTable } from '../helpers/helpers';

let currLevel = 1;

let currSet = [];

let greenSet = [];
let brownSet = [];
let blueSet = [];

let step1Set = [];
let step2Set = [];
let step3Set = [];

let globSet = [];

const game = async () => {
  console.log("START")
  await loading();
  showAncient();
  selectAncient();
  selectLevel();
  shuffleByClick();


  qi('cardSet').addEventListener('click', () => {
    if(step1Set.length > 0) {
      const [a] = step1Set.splice(0, 1);
      console.log('A', a)
      qi('cardCurrent').src = './images/' + a.url;
      fillTable(step1Set, step2Set, step3Set)
    } else if (step2Set.length > 0) {
      const [a] = step2Set.splice(0, 1);
      console.log('A', a)
      qi('cardCurrent').src = './images/' + a.url;
      fillTable(step1Set, step2Set, step3Set)
    } else if (step3Set.length > 0) {
      const [a] = step3Set.splice(0, 1);
      console.log('A', a)
      qi('cardCurrent').src = './images/' + a.url;
      fillTable(step1Set, step2Set, step3Set)
    }
  })

}

// HELPERS
function shuffleByClick() {
  qi('shuffleCards').addEventListener('click', () => {

    const { green, brown, blue } = config.cards;

    const greenEasy = green.easy.map(url => ({type: 'green', level: 'easy', url: url}));
    const greenNormal = green.normal.map(url => ({type: 'green', level: 'normal', url: url}));
    const greenHard = green.hard.map(url=> ({type: 'green', level: 'hard', url: url}));

    const brownEasy = brown.easy.map(url=> ({type: 'brown', level: 'easy', url: url}));
    const brownNormal = brown.normal.map(url=> ({type: 'brown', level: 'normal', url: url}));
    const brownHard = brown.hard.map(url=> ({type: 'brown', level: 'hard', url: url}));

    const blueEasy = blue.easy.map(url=> ({type: 'blue', level: 'easy', url: url}));
    const blueNormal = blue.normal.map(url=> ({type: 'blue', level: 'normal', url: url}));
    const blueHard = blue.hard.map(url=> ({type: 'blue', level: 'hard', url: url}));

    const greenSum = currSet[0][0] + currSet[1][0] + currSet[2][0];
    const brownSum = currSet[0][1] + currSet[1][1] + currSet[2][1];
    const blueSum = currSet[0][2] + currSet[1][2] + currSet[2][2];

    if(currLevel == 1) {
      greenSet = arrayShuffle([...greenEasy, ...greenNormal].slice(0, greenSum))
      brownSet = arrayShuffle([...brownEasy, ...brownNormal].slice(0, brownSum))
      blueSet = arrayShuffle([...blueEasy, ...blueNormal].slice(0, blueSum))
    }

    console.log('greenSet', greenSet);
    console.log('brownSet', brownSet);
    console.log('blueSet', blueSet);


    step1Set = [...greenSet.splice(0, currSet[0][0]), ...brownSet.splice(0, currSet[0][1]), ...blueSet.splice(0, currSet[0][2])];
    step2Set = [...greenSet.splice(0, currSet[1][0]), ...brownSet.splice(0, currSet[1][1]), ...blueSet.splice(0, currSet[1][2])];
    step3Set = [...greenSet.splice(0, currSet[2][0]), ...brownSet.splice(0, currSet[2][1]), ...blueSet.splice(0, currSet[2][2])];

    globSet = [...step3Set, ...step2Set, ...step1Set];


    console.log('step1Set', step1Set);
    console.log('step2Set', step2Set);
    console.log('step3Set', step3Set);

    fillTable(step1Set, step2Set, step3Set)


    // CARDS
    qi('cardSet').src = './images/cardBack.png';


  })
}

function selectLevel () {
  qi('levelVeryEasy').addEventListener('click', ()=> {
    qa('.level__button').forEach(el => el.classList.remove('active'));
    qi('levelVeryEasy').classList.add('active');
    qi('shuffleCards').classList.remove('hidden');
    currLevel = 1;
  })
  qi('levelEasy').addEventListener('click', ()=> {
    qa('.level__button').forEach(el => el.classList.remove('active'));
    qi('levelEasy').classList.add('active')
    qi('shuffleCards').classList.remove('hidden');
    currLevel = 2;
  })
  qi('levelNormal').addEventListener('click', ()=> {
    qa('.level__button').forEach(el => el.classList.remove('active'));
    qi('levelNormal').classList.add('active')
    qi('shuffleCards').classList.remove('hidden');
    currLevel = 3;
  })
  qi('levelHard').addEventListener('click', ()=> {
    qa('.level__button').forEach(el => el.classList.remove('active'));
    qi('levelHard').classList.add('active')
    qi('shuffleCards').classList.remove('hidden');
    currLevel = 4;
  })
  qi('levelVeryHard').addEventListener('click', ()=> {
    qa('.level__button').forEach(el => el.classList.remove('active'));
    qi('levelVeryHard').classList.add('active')
    qi('shuffleCards').classList.remove('hidden');
    currLevel = 5;
  })
}

function showLevels(){
  qi('levelVeryEasy').classList.remove('hidden');
  setTimeout(() => qi('levelEasy').classList.remove('hidden'), 300);
  setTimeout(() => qi('levelNormal').classList.remove('hidden'), 500);
  setTimeout(() => qi('levelHard').classList.remove('hidden'), 700)
  setTimeout(() => qi('levelVeryHard').classList.remove('hidden'), 900);
}

function selectAncient() {
  qi('azathoth').addEventListener("click", () => {
    qa('.button__ancient').forEach(el => el.classList.remove('active'));
    qi('azathoth').classList.add('active');
    currSet = config.antients.azathoth.set;
    showLevels();
  })
  qi('cthulthu').addEventListener("click", () => {
    qa('.button__ancient').forEach(el => el.classList.remove('active'));
    qi('cthulthu').classList.add('active');
    currSet = config.antients.cthulthu.set;
    showLevels();
  })
  qi('iogSothoth').addEventListener("click", () => {
    qa('.button__ancient').forEach(el => el.classList.remove('active'));
    qi('iogSothoth').classList.add('active');
    currSet = config.antients.iogSothoth.set;
    showLevels();
  })
  qi('shubNiggurath').addEventListener("click", () => {
    qa('.button__ancient').forEach(el => el.classList.remove('active'));
    qi('shubNiggurath').classList.add('active');
    currSet = config.antients.shubNiggurath.set;
    showLevels();
  })
}

function showAncient() {
  setTimeout(()=> qi('azathoth').classList.add('visible'), 1000);
  setTimeout(()=> qi('cthulthu').classList.add('visible'), 1300);
  setTimeout(()=> qi('iogSothoth').classList.add('visible'), 1600);
  setTimeout(()=> qi('shubNiggurath').classList.add('visible'), 1900);
}

function loading() {
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
            loaderHide()
            resolve()
          }
        }, 500)
      })
      img.src = './images/' + src;
    })
  })
}

function loaderHide() {
  setTimeout(()=> qs('.preloader').classList.remove('visible'), 1000)
  setTimeout(()=> qs('.preloader').classList.remove('block'), 1300)
}

export default game;