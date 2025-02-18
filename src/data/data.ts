import board from '../img/main/board.webp';
import color from '../img/main/color.webp';
import combinations from '../img/main/combinations.webp';
import introduction from '../img/main/introduction.webp';
import memory from '../img/main/memory.webp';
import placing from '../img/main/placing.webp';
import board_mob from '../img/main/board_mob.webp';
import color_mob from '../img/main/color_mob.webp';
import combinations_mob from '../img/main/combinations_mob.webp';
import introduction_mob from '../img/main/introduction_mob.webp';
import memory_mob from '../img/main/memory_mob.webp';
import placing_mob from '../img/main/placing_mob.webp';

export const navItems = [{ label: 'Header.about', href: '#about' }];

export const mainPageGeometry = [
  {
    img: memory,
    imgMob: memory_mob,
    header: 'MainPage.memory.header',
    description: 'MainPage.memory.description',
    time: '10-15 ',
  },
  {
    img: board,
    imgMob: board_mob,
    header: 'MainPage.board.header',
    description: 'MainPage.board.description',
    time: '8-12 ',
  },
];

export const mainPageVideo = [
  {
    img: introduction,
    imgMob: introduction_mob,
    header: 'MainPage.introduction.header',
    description: 'MainPage.introduction.description',
    time: '10-15 ',
    descriptionFull: 'MainPage.introduction.descriptionFull',
    quests: [
      'MainPage.introduction.quests.first',
      'MainPage.introduction.quests.second',
      'MainPage.introduction.quests.third',
      'MainPage.introduction.quests.fourth',
    ],
  },
  {
    img: color,
    imgMob: color_mob,
    header: 'MainPage.color.header',
    description: 'MainPage.color.description',
    time: '8-12 ',
    descriptionFull: 'MainPage.color.descriptionFull',
    quests: [
      'MainPage.color.quests.first',
      'MainPage.color.quests.second',
      'MainPage.color.quests.third',
      'MainPage.color.quests.fourth',
    ],
  },
  {
    img: placing,
    imgMob: placing_mob,
    header: 'MainPage.placing.header',
    description: 'MainPage.placing.description',
    time: '12-15 ',
    descriptionFull: 'MainPage.placing.descriptionFull',
    quests: [
      'MainPage.placing.quests.first',
      'MainPage.placing.quests.second',
      'MainPage.placing.quests.third',
    ],
  },
  {
    img: combinations,
    imgMob: combinations_mob,
    header: 'MainPage.combinations.header',
    description: 'MainPage.combinations.description',
    time: '10-12 ',
    descriptionFull: 'MainPage.combinations.descriptionFull',
    quests: [
      'MainPage.combinations.quests.first',
      'MainPage.combinations.quests.second',
      'MainPage.combinations.quests.third',
    ],
  },
];
