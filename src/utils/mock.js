const getRandomInt = (max = 10) => {
  return Math.floor(Math.random() * Math.floor(max + 1));
};

const getRandomColor = () => {
  return `rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(
    255,
  )})`;
};

export const mockBloodGlucose = (countDays = 1, countPerDay = 4) => {
  const result = [];
  const today = new Date().getTime();
  for (let i = 0; i < countDays; i++) {
    const timestamp = today - i * 24 * 60 * 60 * 1000;
    for (let j = 0; j < countPerDay; j++) {
      const date = new Date(timestamp);
      date.setHours(getRandomInt(23));
      date.setMinutes(getRandomInt(59));
      result.push({
        end_time: date.getTime(),
        unit: 'mg/dL',
        value: getRandomInt(300),
      });
    }
  }
  return result.reverse();
}

export const fetchBloodPressureDataForDays = () => {
  return fetchBloodPressureData(7, 6);
};

const fetchBloodPressureData = (days, daxPerDay) => {
  return new Promise((resolve) => {
    const data = mockBloodPressure(days, daxPerDay);
    resolve(data);
  });
};

const mockBloodPressure = (countDays = 1, maxPerDay = 2) => {
  const result = [];

  let inc = 0;
  const today = new Date().getTime();

  for (let i = 0; i < countDays; i++) {
    const timestamp = today - i * 24 * 60 * 60 * 1000;
    const countPerDay = getRandomInt(maxPerDay);
    for (let j = 0; j < countPerDay; j++) {
      const date = new Date(timestamp);
      date.setHours(getRandomInt(23));
      date.setMinutes(getRandomInt(59));
      const colors = [getRandomColor(), getRandomColor()];
      result.push({
        color: colors[getRandomInt(1)],
        colors,
        id: [++inc, ++inc],
        time: date.getTime(),
        type: 'blood_pressure',
        unit: 'mmHg',
        value: [getRandomInt(30) + 40, getRandomInt(145) + 75],
      });
    }
  }
  return result;
};
