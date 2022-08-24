import store from "../store/store";
import config from "./config";
import {
  qi,
  loading,
  sectionAncientShow,
  sectionLevelsShow,
  sectionShuffleShow,
  sectionCardsShow,
  fillTable,
  clickPlayAgainButton
} from '../helpers/helpers';

const game = async () => {
  console.log("HORROR START")
  await loading();
  sectionAncientShow();
  clickPlayAgainButton();

  // SHOW CARD BY ONE
  qi('setForGame').addEventListener('click', (e) => {
    if(e.target.classList.contains('card')) {
      e.target.classList.add('opened');

      if(store.step1Set.length > 0) {
        const [card] = store.step1Set.splice(-1, 1);
        fillTable(store.step1Set, store.step2Set, store.step3Set)
      } else if (store.step2Set.length > 0) {
        const [card] = store.step2Set.splice(-1, 1);
        fillTable(store.step1Set, store.step2Set, store.step3Set)
      } else if (store.step3Set.length > 0) {
        const [card] = store.step3Set.splice(-1, 1);
        fillTable(store.step1Set, store.step2Set, store.step3Set)
      }

      if(store.step3Set.length < 1) {
        qi('buttonPlayAgain').classList.remove('hidden');
      }
    }
  })

  // CLICK SHUFFLE BUTTON
  qi('buttonShuffle').addEventListener('click', () => sectionCardsShow())

  // CLICK LEVEL BUTTON
  qi('levelVeryEasy').addEventListener('click', () => sectionShuffleShow('levelVeryEasy', 1));
  qi('levelEasy').addEventListener('click', () => sectionShuffleShow('levelEasy', 2));
  qi('levelNormal').addEventListener('click', () => sectionShuffleShow('levelNormal', 3));
  qi('levelHard').addEventListener('click', () => sectionShuffleShow('levelHard', 4));
  qi('levelVeryHard').addEventListener('click', () => sectionShuffleShow('levelVeryHard', 5));

  // CLICK ANTIENT BUTTON
  qi('azathoth').addEventListener("click", () => {
    store.currSet = config.antients.azathoth.set;
    sectionLevelsShow('azathoth');
  })
  qi('cthulthu').addEventListener("click", () => {
    store.currSet = config.antients.cthulthu.set;
    sectionLevelsShow('cthulthu');
  })
  qi('iogSothoth').addEventListener("click", () => {
    store.currSet = config.antients.iogSothoth.set;
    sectionLevelsShow('iogSothoth');
  })
  qi('shubNiggurath').addEventListener("click", () => {
    store.currSet = config.antients.shubNiggurath.set;
    sectionLevelsShow('shubNiggurath');
  })
}

export default game;