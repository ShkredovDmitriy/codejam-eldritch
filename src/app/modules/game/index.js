import config from "./config";
import { qi, qs, qa } from '../helpers/helpers';

let currLevel = 1;

let currSet = [];

let greenSet = [];
let brownSet = [];
let blueSet = [];

let step1Set = [];
let step2Set = [];
let step3Set = [];

const game = async () => {
  console.log("START")
  await loading();
  showAncient();
  selectAncient();
  selectLevel();
  shuffleByClick();
}

// HELPERS
function arrayShuffle(arr) {
  const length = arr.length;
  const res = [];
  let tmp = arr;

 for(let i = length; i > 0; i--) {
  const randId = Math.floor(Math.random() * i);
  const randEl = tmp[randId];
  res.push(randEl);
  tmp[randId] = '';
  tmp = tmp.filter(el => el !== '')

  // console.log('=================');
  // console.log('RANDOM ID', randId);
  // console.log('RANDOM EL', randEl);
  // console.log('RESULT ARRAY', res)
  // console.log('TEMP ARRAY', tmp)
 }
 return res;
}

function shuffleByClick() {
  qi('shiffleCards').addEventListener('click', ()=> {
    if(currLevel == 1) {

      const greenSum = currSet[0][0] + currSet[0][1] + currSet[0][2];
      greenSet = [...config.cards.green.easy, ...config.cards.green.normal].slice(0, greenSum);

      const brownSum = currSet[1][0] + currSet[1][1] + currSet[1][2];
      brownSet = [...config.cards.brown.easy, ...config.cards.brown.normal].slice(0, brownSum);

      const blueSum = currSet[2][0] + currSet[2][1] + currSet[2][2];
      blueSet = [...config.cards.blue.easy, ...config.cards.blue.normal].slice(0, blueSum);

      console.log('greenSet', greenSet);
      console.log('brownSet', brownSet);
      console.log('blueSet', blueSet);

      const suffledGreenSet = arrayShuffle(greenSet);
      const suffledBrownSet = arrayShuffle(brownSet);
      const suffledBlueSet = arrayShuffle(blueSet);

      console.log('suffledGreenSet', suffledGreenSet);
      console.log('suffledBrownSet', suffledBrownSet);
      console.log('suffledBlueSet', suffledBlueSet);

      step1Set[0] = suffledGreenSet.slice(0, currSet[0][0]);
      step1Set[1] = suffledBrownSet.slice(0, currSet[1][0]);
      step1Set[2] = suffledBlueSet.slice(0, currSet[2][0]);

      console.log('step1Set', step1Set);
    }

    qi('step1Green').textContent = currSet[0][0];
    qi('step2Green').textContent = currSet[0][1];
    qi('step3Green').textContent = currSet[0][2];

    qi('step1Brown').textContent = currSet[1][0];
    qi('step2Brown').textContent = currSet[1][1];
    qi('step3Brown').textContent = currSet[1][2];

    qi('step1Blue').textContent = currSet[2][0];
    qi('step2Blue').textContent = currSet[2][1];
    qi('step3Blue').textContent = currSet[2][2];

    // arrayShuffle([1,2,3,4,5,6,7,8,9,10])
  })
}

function selectLevel () {
  qi('levelVeryEasy').addEventListener('click', ()=> {
    qa('.level__button').forEach(el => el.classList.remove('active'));
    qi('levelVeryEasy').classList.add('active');
    qi('shiffleCards').classList.remove('hidden');
    currLevel = 1;
  })
  qi('levelEasy').addEventListener('click', ()=> {
    qa('.level__button').forEach(el => el.classList.remove('active'));
    qi('levelEasy').classList.add('active')
    qi('shiffleCards').classList.remove('hidden');
    currLevel = 2;
  })
  qi('levelNormal').addEventListener('click', ()=> {
    qa('.level__button').forEach(el => el.classList.remove('active'));
    qi('levelNormal').classList.add('active')
    qi('shiffleCards').classList.remove('hidden');
    currLevel = 3;
  })
  qi('levelHard').addEventListener('click', ()=> {
    qa('.level__button').forEach(el => el.classList.remove('active'));
    qi('levelHard').classList.add('active')
    qi('shiffleCards').classList.remove('hidden');
    currLevel = 4;
  })
  qi('levelVeryHard').addEventListener('click', ()=> {
    qa('.level__button').forEach(el => el.classList.remove('active'));
    qi('levelVeryHard').classList.add('active')
    qi('shiffleCards').classList.remove('hidden');
    currLevel = 5;
  })
}

function showLevels(){
  qi('levelVeryEasy').classList.remove('hidden');
  setTimeout(() => qi('levelEasy').classList.remove('hidden'), 300);
  setTimeout(() => qi('levelNormal').classList.remove('hidden'), 600);
  setTimeout(() => qi('levelHard').classList.remove('hidden'), 900)
  setTimeout(() => qi('levelVeryHard').classList.remove('hidden'), 1200);
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
  setTimeout(()=> qi('cthulthu').classList.add('visible'), 1500)
  setTimeout(()=> qi('iogSothoth').classList.add('visible'), 2000)
  setTimeout(()=> qi('shubNiggurath').classList.add('visible'), 2500)
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