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
  },
  Ateeri: {
    nickname: 'IKTHER',
  },
  Kairika: {
    nickname: 'KHUIAKH',
  },
  Tepia: {
    nickname: 'TYBI',
  },
  "M'Khir": {
    nickname: 'MECHIR',
  },
  'Pen Imenhotep': {
    nickname: 'FAAMEN-T',
  },
  'Pen Renut': {
    nickname: 'FAARMUTET',
  },
  Kpekhan: {
    nickname: 'PACHON',
  },
  Peninit: {
    nickname: 'PAYHINI',
  },
  'Heb Senseni': {
    nickname: 'EPIPHI',
  },
  'Mesut Re': {
    nickname: 'MESORI',
  },
  Nwt: {
    nickname: 'NOUT',
  },
};
