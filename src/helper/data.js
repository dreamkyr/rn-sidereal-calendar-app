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
