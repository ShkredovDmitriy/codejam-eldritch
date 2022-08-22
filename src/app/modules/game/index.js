import config from "./config";
import { qs } from '../helpers/helpers';

const game = () => {
  console.log("START")
  loading()

}

// HELPERS
function loading() {
  let load = 0;
  config.images.map(src => {
    const img = new Image();
    img.addEventListener('load', () => {
      setTimeout(()=> {
        load += 2;
        if(load < 100) qs('.preloader__counter').textContent = load + '%';
        if(load >= 100) {
          qs('.preloader__counter').textContent = '100%'
          loaderHide()
        }
      }, 500)
    })
    img.src = './images/' + src;
  })
}

function loaderHide() {
  setTimeout(()=> qs('.preloader').classList.remove('visible'), 1000)
  setTimeout(()=> qs('.preloader').classList.remove('block'), 1300)
}

export default game;