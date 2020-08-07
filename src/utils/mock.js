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
        unit: 'mmHg',
        value: getRandomInt(300) + 40,
      });
    }
  }
  return result.reverse();
}

export const mockBloodPressure = (countDays = 1, countPerDay = 4) => {
  const result = [];

  let inc = 0;
  const today = new Date().getTime();

  for (let i = 0; i < countDays; i++) {
    const timestamp = today + i * 24 * 60 * 60 * 1000;
    for (let j = 0; j < countPerDay; j++) {
      const date = new Date(timestamp);
      date.setHours(getRandomInt(23));
      date.setMinutes(getRandomInt(59));
      result.push({
        colors: [getRandomColor(), getRandomColor()],
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
