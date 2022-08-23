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