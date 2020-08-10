import calendar from '@app/assets/data/calendar.json';
import _ from 'lodash';
export const data = calendar.map((item, index) => ({ ...item, key: index }));

export const getSMonthList = () => {
  const chunkList = _.chunk(
    data.filter((item) => item.dekan_day !== 'Nwt'),
    30,
  );
  const mList = [];
  chunkList.forEach((items) => {
    const item = {
      key: items[0].key,
      from_month: items[0].month,
      to_month: items[items.length - 1].month,
      from_day: items[0].day,
      to_day: items[items.length - 1].day,
      s_month: items[items.length - 1].s_month,
      year: items[items.length - 1].year,
      s_year: items[items.length - 1].s_year,
    };
    mList.push(item);
  });
  const nwtList = data.filter((item) => item.dekan_day === 'Nwt');
  const filteredNwtList = _.groupBy(nwtList, (item) => item.s_year);
  Object.keys(filteredNwtList).forEach((key) => {
    const items = filteredNwtList[key];
    const item = {
      key: items[0].key,
      from_month: items[0].month,
      to_month: items[items.length - 1].month,
      from_day: items[0].day,
      to_day: items[items.length - 1].day,
      s_month: items[items.length - 1].s_month,
      year: items[items.length - 1].year,
      s_year: items[items.length - 1].s_year,
    };
    mList.push(item);
  });
  return _.sortBy(mList, (item) => item.key);
};

export const getMonthByName = (month, year) => {
  return _.sortBy(
    data.filter((item) => item.s_month === month && item.s_year === year),
    (item) => item.key,
  );
};

export const getSDayObject = (s_day, s_month, s_year) => {
  return data.find((item) => item.s_day === s_day && item.s_month === s_month && item.s_year === s_year);
};

export const SMONTH_DATA = {
  Tehuti: {
    nickname: 'THOTH',
    key: 0,
    godTitle: 'Goddess governing the month',
    godName: 'Aishat',
    description:
      'Aishat is a Goddess of Love. She is the wife of Wsr (Osiris), the God of the Dead, and the mother of Heru (Horus).\n' +
      'Aishat is seen as the greatest example of a loving and faithful wife and mother. Her love for Her husband was so ' +
      'strong that She used her magical power to resurrect Wsr after He died. Aishat is worshipped worldwide under ' +
      'diverse names and is the Goddess on which modern religions have based their feminine models. She is also ' +
      'known as Isis, Aset and Asseta. As humans, Aishat is considered our mother and first maternal Ancestor. She is ' +
      'our role model for motherhood, love and family devotion.\n' +
      'Sacred animals for those born in this month include: monkey, cow, hawk, vulture, ibis, catfish, scorpion, turtle and ' +
      'Sacred Bulls. One is forbidden to consume or kill these animals.',
  },
  Penipt: {
    nickname: 'FAUFEGA',
    key: 1,
    godName: 'Mahata',
    description:
      'Mahata is the Goddess of the elements of cosmic harmony: truth, justice, and moral integrity.\n' +
      'She is connected to the entire existence of the Universe and is not limited to the constraints of ' +
      'human ethics. She is a crucial Goddess to the deceased reaching paradise. Mahata brings the ' +
      'newly arrived souls to the judgment hall of Ra and Wsr (Osiris). Mahata is associated with the ' +
      '“Negative Confessions”, as She is the Goddess of truth and justice. Mahata is often associated ' +
      'with the Goddesses Renenet and Meshkenet (birth Goddesses) ' +
      'and the Goddess Seshat (writing Goddess).\n' +
      'Sacred animals for those born in this month include: cow, hawk, Sacred Bull, ram, vulture, ' +
      'catfish, and cobra. One is forbidden to consume or kill these animals.',
  },
  Ateeri: {
    nickname: 'IKTHER',
    key: 2,
    godName: 'Serket',
    description:
      'Serket rules over the month of Ateeri. Selket (Serket) is the scorpion Goddess who ' +
      'watches over a dangerous twist in the pathway of the Underworld. Her powers and ' +
      'protection can be used to heal vemonous bites. Sereky (Serket) often accompanied ' +
      'Aishat in Her wanderings.\n' +
      'Sacred animals for those born in this month include: snake, scorpion, cow, vulture, ' +
      'catfish, rabbit, and Sacred Bull. One is forbidden to consume or kill these animals.',
  },
  Kairika: {
    nickname: 'KHUIAKH',
    key: 3,
    godName: 'Naita',
    description:
      'Naita is seen as the Divine Mother of Gods. She is a Warrior Goddess. She was worshipped by the ' +
      'Greeks as Athena or Minerva. The protection and wisdom She gives to Gods and humans makes ' +
      'Her popular. She guards the mummified internal organs of the dead with Aishat, Nephtys and ' +
      'Serket. Naita is seen as a Goddess of strong sexual qualities and is sometimes called the ' +
      'mistress of the primordial waters.\n' +
      'Sacred animals for those born in this month include: lion, vulture, frog, toad, catfish and Sacred ' +
      'Bull. One is forbidden to consume or kill these animals.',
  },
  Tepia: {
    nickname: 'TYBI',
    key: 4,
    godName: 'Inipu (Anubis)',
    description:
      'Inipu is the God of cemetaries and embalming. He makes certain that the heart of the ' +
      'deceased is weighed fairly and guides those who have passed the test of the Underworld.\n' +
      'Before Wsr, Inipu was the judge of the dead. It was Inipu who embalmed Wsr after He ' +
      'was killed by Seth. He is organized and authoritarian, and He governs the entering of the ' +
      'underground world as well as life after death.\n' +
      'Sacred animals for those born in this month include: jackal, dog, cat, vulture, catfish, and ' +
      'Sacred Bull. One is forbidden to consume or kill these animals.',
  },
  "M'Khir": {
    nickname: 'MECHIR',
    key: 5,
    godName: 'Heru (Horus)',
    description:
      'Heru is the God born from Aishat (Isis) and Wsr (Osiris). A warrior God, He fights ' +
      'Seth, the God who killed Wsr. He is a protector of Gods and humans. Heru is the ' +
      'God with whom all humans identify. Because Heru was born premature, He can ' +
      'be seen as fragile, and as humans, we identify with Him in this aspect. Those who ' +
      'fight for justice and the rightings of wrongs are living in the image of Heru.\n' +
      'Sacred animals for those born in this month include: deer, hawk, shrew, vulture, ' +
      'catfish, cobra and Sacred Bull.',
  },
  'Pen Imenhotep': {
    nickname: 'FAAMEN-T',
    key: 6,
    godName: 'Taouret (Theouris)',
    description:
      'Taouret is a Goddess of fertility and one who gives life. She also protects humans ' +
      'from evil. She is a universal mother and a Goddess of the sky. Her long breasts ' +
      'symbolize Her role as a protectress of childbirth. She is protective but can also be disagreeable.\n' +
      'Sacred animals for those born in this month include: hippopotamus, lion, croco' +
      'dile, vulture, and Sacred Bull. One is forbidden to consume or kill these animals.',
  },
  'Pen Renut': {
    nickname: 'FAARMUTET',
    key: 7,
    godName: 'Imin (Amon)',
    description:
      'Imin is an invisible, self-created God. He is a warrior God and is important in keeping ' +
      'Divine Order. He protects Gods with His shadow. Imin is very discreet but is active and ' +
      'virile at the same time. He is very high on the hierarchy of Gods but will come to the battle' +
      'fied to fight when the Divine Order is threatened. In the beginning, it was Imin who fought ' +
      'and destroyed the enemies of the Divine Order.\n' +
      'Sacred animals for those born in this month include: Sacred Bull, ram, cow, vulture and ' +
      'cobra. One is forbidden to consume or kill these animals.',
  },
  Kpekhan: {
    nickname: 'PACHON',
    key: 8,
    godName: 'Hetheru (Hathor)',
    description:
      'Hetheru is the Universal Cow Goddess and is connected with healing and childbirth.\n' +
      'She determines the destiny of a child at birth. Hetheru is a warrior Goddess and is ' +
      'represented as a woman with bull horns on Her head with a solar disk between them.\n' +
      'She is worshipped on Earth as the holy white cow. She is the wife of Heru.\n' +
      'Sacred animals for those born in this month include: monkey, bull, all cows, vulture, ' +
      'catfish, and Sacred Bull. One is forbidden to consume or kill these animals.',
  },
  Peninit: {
    nickname: 'PAYHINI',
    key: 9,
    godName: 'Nefertmu (Nefertoum)',
    description:
      'Nefertmu is a creator God who is also self-created. He symbolizes the creation of the ' +
      'world and is shown coming out of a lotus flower. He is one of the oldest Gods from the pri' +
      'mordial waters. He has opened the doors of the first Ennead. Nefertmu’s characteristics ' +
      'always include looking for a new way of going about life. He is comfortable with diversity.\n' +
      'Sacred animals for those born in this month include: snake, vulture, catfish, and Sacred ' +
      'Bull. One is forbidden to consume or kill these animals.',
  },
  'Heb Senseni': {
    nickname: 'EPIPHI',
    key: 10,
    godName: 'Sebik (Sebek)',
    description:
      'Sebik is a creator God who protects humans from evil. He is one of the Gods who has worked for the ' +
      'stability of the Universe. Sebik is the God of water and is personified as a crocodile. He is sometimes ' +
      'considered the personfication of death. Although He has a destructive side, Sebik is also a life-giver.\n ' +
      'He helps and protects people from poverty and sickness.\n' +
      'Sacred animals for those born in this month include: cobra, lion, crocodile, vulture, ' +
      'catfish and Sacred Bull. One is forbidden to consume or kill these animals.',
  },
  'Mesut Re': {
    nickname: 'MESORI',
    key: 11,
    godName: 'Hakru (Akeru)',
    description:
      'Hakru is one of the Great Goddesses working for the stability of the Universe.\n' +
      'She provides good and pleasant things as Bastet. When angered, She brings ' +
      'disease and destruction as Sekmet. While in Her temple, She stays Herself; it is ' +
      'when She leaves Her temple that She takes the form of either Bastet or Sekmet.\n' +
      'Sacred animals for those born in this month include: lion, panther, cat, vulture and ' +
      'Sacred Bull. One is forbidden to consume or kill these animals.',
  },
  Nwt: {
    nickname: 'NOUT',
    key: 12,
    godName: 'Nwt (Nout)',
    description:
      'Nwt, the Sky Goddess, is the mother of Wsr, Heru Ur, Seth, Aishat & Nephtys.\n' +
      'She keeps the forces of chaos from breaking through the sky and destroying the world. Nwt is ' +
      'represented as the personification of the sky, a woman carrying a pot of water on Her head, or in the form of a cow.\n' +
      'She is the granddaughter of Ra and the wife of Geb.',
  },
};
