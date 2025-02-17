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
  },
  {
    img: color,
    imgMob: color_mob,
    header: 'MainPage.color.header',
    description: 'MainPage.color.description',
    time: '8-12 ',
  },
  {
    img: placing,
    imgMob: placing_mob,
    header: 'MainPage.placing.header',
    description: 'MainPage.placing.description',
    time: '12-15 ',
  },
  {
    img: combinations,
    imgMob: combinations_mob,
    header: 'MainPage.combinations.header',
    description: 'MainPage.combinations.description',
    time: '10-12 ',
  },
];
