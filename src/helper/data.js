import calendar from '@app/assets/data/calendar.json';
import _ from 'lodash';
import moment from 'moment';

export const data = calendar.map((item, index) => ({ ...item, key: index }));

export const getSMonthList = () => {
  const chunkList = _.chunk(
    data.filter((item) => item.dekan_day !== 'Nwt'),
    30,
  );
  const mList = [];
  mList.push({ key: -1, nickname: '', isSection: true, s_year: 420 });
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
    if (key !== '423') {
      mList.push({ key: items[0].key + 1, nickname: '', isSection: true, s_year: items[0].s_year + 1 });
    }
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

export const getTodayMonthKey = () => {
  const month = getSMonthList().find((item) => item.from_month === moment().format('MMMM') && item.year === moment().format('YYYY'));
  if (month) {
    return month.key;
  }
  return false;
};

export const getSDayObjectFromGDay = (day, month, year) => {
  console.log(day, month, year);
  return data.find((item) => item.day === Number(day) && item.month === month && item.year === Number(year)) || {};
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

export const HELP_TEXT = [
  {
    section: 'Understanding the Calendar',
    content:
      'The Sidereal Calendar is the calendar that was used during the times of the Pharaohs in Kemet. This is humanity’s oldest calendar, yet it is still in use today as the most astronomically accurate calendar in human history.\n' +
      'Throughout the world, many cultures have been forced to use the Gregorian calendar because of colonization. The Sidereal Calendar gives us a link to humanity’s original culture while providing accurate time division. It unites all of humanity as one people, while giving all of us a reference in time and space that is not based on socio-religious or political events.\n' +
      'All calculations of the calendar are based on the Great Heliacal Rising of the Sirius Star. The Sidereal Calendar is therefore astronomically based, and as a result, entirely scientific. The Great Heliacal Rising of the Sirius star occurs every 1461 years. That interval of 1461 years is what we call 1 Great Year, or Year of the Gods. We are now in year 420 of that 1461-year cycle.\n' +
      'Our Ancestors were well aware of the fact that after four years of 365 days; Sirius rises on the second day of that year, after 8 years, on the third day of that year, after 12 years on the fourth day and so on. The intervals are compensated for by adding one day to every four years of 365 days. So, the seasonal year is made of 12 months of 30 days plus a thirteenth month of five days which becomes six days every four years.  And this system will be self-repetitive after a new heliacal rising.\n' +
      'After 1,460 years, an additional year is added for astronomic observance. It absorbs all surpluses. During this period all necessary adjustments will be made to find the exact moment for a new start.  A new 1st of Tehuti of year one will thus start independently at an astronomically perfect moment.',
  },
  {
    section: 'Month (Mesoot)',
    content:
      'Each month is governed by a Divinity; you may find information on this divinity by clicking on the hieroglyphics to the right of the month’s name in monthly view. Under the information of the Divinity for each month, you will find the Divinities characteristics along with any taboos for the people born under the gods of that given month.',
  },
  {
    section: 'Dekan (week)',
    content:
      'Each week is 10 days long, has a name and is governed by divinities. You will see this information in the monthly view by clicking on any given day.',
  },
  {
    section: 'Holy Days',
    content:
      'You will find various holy days on the agenda view for each month, if you click on ??? you will find more information instructing you on how to observe the holy day.',
  },
];

export const HOLY_DATA = {
  Default: 'Normal Day',
  "New Year's Day":
    'The first of Tehuti is the first day of the Sidereal Calendar. Because the Earth does not rotate around the sun at a constant speed, measuring time based on this rotation gives an incorrect measurement. The Sidereal Calendar is based on the Sirius star and the Orion constellation and uses the exact cycle of the Heliacal rising as the basis for its time division. This makes it the only calendar that is astronomically correct. This day is well-indicated for spiritual initiations.',
  'Day of Rest': 'Rest day',
  'Ancestral Holy Day':
    'On the fifth day of every dekan individuals do their ablutions (spiritual purification) and zemzem (daily spiritual activities) directing their wishes and food offerings to their dead relatives and Ancestors.',
  'Divine Holy Day':
    'On the ninth day of every dekan individuals do their ablutions (spiritual purification) and zemzem (daily spiritual activities) directing their wishes and incense offerings to their Ancestors who take them to the Divine World.  On this day public zemzem ceremonies are held at The Earth Center locations around the globe.',
  'Fish Day':
    'Fish day is the day everyone eats fish as a symbol of the equality of all humans in the eyes of Gods.  One is not to kill or eat land animals. Today one should eat fish and give it to family, friends, neighbors and passers-by.',
  'Day of Tehuti':
    'This is the most spiritual day for humanity. Today is the celebration of human moral and intellectual qualities.  This is the day humanity decided to make themselves different from other species through the quality of their civilization.  To celebrate, one eats fruit dipped in honey after repeating, “Maat is sweet, Maat is our light.  The truth is sweet, the truth is our path.  Justice is sweet, justice is our path.  Goodness is sweet, goodness is our path.”',
  'Charm of Aishat':
    'To protect her son Heru and to face the persecutions of Seth (the jealous God who killed her husband, Wsr), the Goddess Aishat (Isis) called on her magical powers.  This is the day people show their power and ability for good magic.  It is the most favorable day for invocations of  cosmic powers.',
  'Sunstick Day':
    'This is the day chosen for the celebration of the lowest sunlight.  This is the day that the Earth is most distant from the sun.  This is a period of carnivals, fire dances, and sun ceremonies.',
  'Death of Wsr':
    'Wsr is the God that dies every year to judge the dead.  He is the sovereign of the World of the Dead who resurrects every year for the redemption of humanity.  It is by copying this unique historic and spiritual principle that modern religions have based their prophets.  The death and resurrection of Wsr contains historic proof that dates over 35,000 years ago.  This is a day of mourning and one fasts today (no food, drink, smoking, sex, etc. from sunrise to sunset) while spending time for lamentation and prayers before breaking the fast.',
  'Embalmment of Wsr':
    'This day is celebrated with a night of prayer and lamentation. One is preparing for a period of fasting that comes in three days.',
  'Beginning of Fasting (10 days)':
    'One will not eat or drink, smoke or have sex etc. from sunrise to sunset for ten days.  The last day of fasting is Tepia 6th. This is a time for purification of the body and soul, and a time to remind ourselves that we have not forgotten the land of the dead.',
  'Mourning For Wsr': 'This a day of mourning for Wsr - a day of prayers and lamentations.',
  '(Last day of Fasting)': 'Last day of Fasting.',
  'End of Fast Feast (all day)': 'Celebrate this morning with a feast!',
  'Death of Master Naba':
    'This is a day spent in mourning the death of Prophet Neb Naba. Members of The Earth Center worldwide come together to commemorate him with a group Zemzem (prayer and meditation ceremony) followed by breaking of the fast.',
  'Birthday of Wsr': 'These are the birthdays of five Gods. They are celebrated with a festival that will precede the beginning of the year.',
  'Birthday of Heru Ur': 'These are the birthdays of five Gods. They are celebrated with a festival that will precede the beginning of the year.',
  'Birthday of Seth': 'These are the birthdays of five Gods. They are celebrated with a festival that will precede the beginning of the year.',
  'Birthday of Aishat': 'These are the birthdays of five Gods. They are celebrated with a festival that will precede the beginning of the year.',
  'Birthday of Nebfest': 'These are the birthdays of five Gods. They are celebrated with a festival that will precede the beginning of the year.',
  'World Renewal Day': 'Only occurs once every 4 years(an added "6th" day to the month of NWT, our leap year)',
};
