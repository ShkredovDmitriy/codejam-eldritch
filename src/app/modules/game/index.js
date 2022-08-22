import config from "./config";
import { qi, qs, qa } from '../helpers/helpers';

const game = async () => {
  console.log("START")
  await loading();
  showAncient();
  selectAncient();
  selectLevel()
}

// HELPERS
function selectLevel () {
  qi('levelVeryEasy').addEventListener('click', ()=> {
    qa('.level__button').forEach(el => el.classList.remove('active'));
    qi('levelVeryEasy').classList.add('active')
  })
  qi('levelEasy').addEventListener('click', ()=> {
    qa('.level__button').forEach(el => el.classList.remove('active'));
    qi('levelEasy').classList.add('active')
  })
  qi('levelNormal').addEventListener('click', ()=> {
    qa('.level__button').forEach(el => el.classList.remove('active'));
    qi('levelNormal').classList.add('active')
  })
  qi('levelHard').addEventListener('click', ()=> {
    qa('.level__button').forEach(el => el.classList.remove('active'));
    qi('levelHard').classList.add('active')
  })
  qi('levelVeryHard').addEventListener('click', ()=> {
    qa('.level__button').forEach(el => el.classList.remove('active'));
    qi('levelVeryHard').classList.add('active')
  })
}

function showLevels(){
  qi('levelVeryEasy').classList.add('visible');
  setTimeout(() => qi('levelEasy').classList.add('visible'), 300);
  setTimeout(() => qi('levelNormal').classList.add('visible'), 600);
  setTimeout(() => qi('levelHard').classList.add('visible'), 900)
  setTimeout(() => qi('levelVeryHard').classList.add('visible'), 1200);
}

function selectAncient() {
  qi('azathoth').addEventListener("click", () => {
    qa('.button__ancient').forEach(el => el.classList.remove('active'));
    qi('azathoth').classList.add('active');
    showLevels();
  })
  qi('cthulthu').addEventListener("click", () => {
    qa('.button__ancient').forEach(el => el.classList.remove('active'));
    qi('cthulthu').classList.add('active');
    showLevels();
  })
  qi('iogSothoth').addEventListener("click", () => {
    qa('.button__ancient').forEach(el => el.classList.remove('active'));
    qi('iogSothoth').classList.add('active');
    showLevels();
  })
  qi('shubNiggurath').addEventListener("click", () => {
    qa('.button__ancient').forEach(el => el.classList.remove('active'));
    qi('shubNiggurath').classList.add('active');
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
  return new Promise((resolve, reject) => {
    config.images.map(src => {
      const img = new Image();
      img.addEventListener('load', () => {
        setTimeout(()=> {
          load += 2;
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