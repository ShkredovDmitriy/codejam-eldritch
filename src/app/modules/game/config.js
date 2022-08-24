const blueCards = {
  easy: [
    'blue3.png',
    'blue4.png',
    'blue5.png',
    'blue10.png',
  ],
  normal: [
    'blue7.png',
    'blue9.png',
    'blue11.png',
    'blue12.png',
  ], hard: [
    'blue1.png',
    'blue2.png',
    'blue6.png',
    'blue8.png'
  ]
};

const brownCards = {
  easy: [
    'brown11.png',
    'brown12.png',
    'brown13.png',
    'brown14.png',
    'brown21.png',
  ],
  normal: [
    'brown1.png',
    'brown2.png',
    'brown3.png',
    'brown4.png',
    'brown5.png',
    'brown15.png',
    'brown16.png',
    'brown17.png',
    'brown18.png',
    'brown19.png',
    'brown20.png',
  ], hard: [
    'brown6.png',
    'brown7.png',
    'brown8.png',
    'brown9.png',
    'brown10.png',
  ]
};

const greenCards = {
  easy: [
    'green1.png',
    'green12.png',
    'green16.png',
    'green17.png',
    'green18.png',
  ],
  normal: [
    'green7.png',
    'green8.png',
    'green9.png',
    'green10.png',
    'green11.png',
    'green13.png',
    'green14.png',
    'green15.png',

  ], hard: [
    'green2.png',
    'green3.png',
    'green4.png',
    'green5.png',
    'green6.png',
  ]
};

const config = {
  antients: {
    azathoth: {
      set: [[1, 2, 1], [2, 3, 1], [2, 4, 0]]
    },
    cthulthu: {
      set: [[0, 2, 2], [1, 3, 0], [3, 4, 0]]
    },
    iogSothoth: {
      set:  [[0, 2, 1], [2, 3, 1], [3, 4, 0]]
    },
    shubNiggurath: {
      set: [[1, 2, 1], [3, 2, 1], [2, 4, 0]]
    }
  },
  cards: {
    green: greenCards,
    brown: brownCards,
    blue: blueCards,
  },
  images: [
    // BACKGROUND
    'background-desktop.jpg',
    'background-main.png',
    'lighting-left.svg',
    'lighting-right.svg',
    // ANTIENTS
    'Azathoth.png',
    'Cthulthu.png',
    'IogSothoth.png',
    'ShubNiggurath.png',
    // CARD BACK
    'cardBack.png',
    // GREEN CARDS
    ...greenCards.easy,
    ...greenCards.normal,
    ...greenCards.hard,
    // BROWN CARDS
    ...brownCards.easy,
    ...brownCards.normal,
    ...brownCards.hard,
    // BLUE CARDS
    ...blueCards.easy,
    ...blueCards.normal,
    ...blueCards.hard,
  ],
}

export default config;