const db = require('../db/index.js');

const questionAnswers = async (input) => {
  try {
    const data = input;
    const answers = [];

    for (let i = 0; i < data.length; i += 1) {
      answers.push(db.listAnswers(data[i].question_id));
    }

    const allAnswers = await Promise.all(answers);
    for (let i = 0; i < data.length; i += 1) {
      data[i].answers = allAnswers[i];
    }

    return data;
  } catch (error) {
    return error;
  }
};

const questionPhotos = async (input) => {
  try {
    const data = input;

    for (let j = 0; j < data.length; j += 1) {
      const photos = [];

      for (let i = 0; i < data[j].answers.length; i += 1) {
        photos.push(db.listPhotos(data[j].answers[i].answer_id));
      }

      const allPhotos = await Promise.all(photos);
      for (let i = 0; i < data[j].answers.length; i += 1) {
        data[j].answers[i].photos = allPhotos[i];
      }
    }
    return data;
  } catch (error) {
    return error;
  }
};

const questionShaper = (input, id) => {
  const data = input;
  const final = {};

  for (let i = 0; i < data.length; i += 1) {
    if (data[i].question_reported === 0) {
      data[i].question_reported = false;
    } else if (data[i].question_reported === 1) {
      data[i].question_reported = true;
    }

    const shapedAnswers = {};
    for (let j = 0; j < data[i].answers.length; j += 1) {
      if (data[i].answers[j].answer_reported === 0) {
        data[i].answers[j].answer_reported = false;
      } else if (data[i].answers[j].answer_reported === 1) {
        data[i].answers[j].answer_reported = true;
      }
      shapedAnswers[data[i].answers[j].answer_id] = data[i].answers[j];
    }
    data[i].answers = shapedAnswers;
  }

  final.product_id = id;
  final.results = data;

  const string = JSON.stringify(final);
  const alter1 = string.replace(/question_reported/g, 'reported');
  const alter2 = alter1.replace(/answer_id/g, 'id');
  const alter3 = alter2.replace(/answer_body/g, 'body');
  const alter4 = alter3.replace(/answer_date/g, 'date');
  const alter5 = alter4.replace(/answer_helpfulness/g, 'helpfulness');
  const alter6 = alter5.replace(/photo_id/g, 'id');
  const alter7 = alter6.replace(/photo_url/g, 'url');
  const alter8 = alter7.replace(/answer_reported/g, 'reported');
  const finalResult = JSON.parse(alter8);

  return finalResult;
};

const answerPhotos = async (input) => {
  try {
    const data = input;
    const photos = [];

    for (let i = 0; i < data.length; i += 1) {
      photos.push(db.listPhotos(data[i].answer_id));
    }

    const allPhotos = await Promise.all(photos);
    for (let i = 0; i < data.length; i += 1) {
      data[i].photos = allPhotos[i];
    }

    return data;
  } catch (error) {
    return error;
  }
};

const answerShaper = (input, id, page, count) => {
  const data = input;
  const final = {};

  for (let i = 0; i < data.length; i += 1) {
    if (data[i].answer_reported === 0) {
      data[i].answer_reported = false;
    } else if (data[i].answer_reported === 1) {
      data[i].answer_reported = true;
    }
  }

  final.question = id;
  final.page = page;
  final.count = count;
  final.results = data;

  const string = JSON.stringify(final);
  const alter3 = string.replace(/answer_body/g, 'body');
  const alter4 = alter3.replace(/answer_date/g, 'date');
  const alter5 = alter4.replace(/answer_helpfulness/g, 'helpfulness');
  const alter6 = alter5.replace(/photo_id/g, 'id');
  const alter7 = alter6.replace(/photo_url/g, 'url');
  const alter8 = alter7.replace(/answer_reported/g, 'reported');
  const finalResult = JSON.parse(alter8);

  return finalResult;
};

const photoPoster = async (answer_id, photos) => {
  try {
    const promises = [];
    for (let i = 0; i < photos.length; i += 1) {
      promises.push(db.addPhotos(answer_id, photos[i]));
    }
    const resolve = await Promise.all(promises);
    return 'Photo: Submitted';
  } catch (error) {
    return error;
  }
};

module.exports = {
  questionAnswers,
  questionPhotos,
  questionShaper,
  answerPhotos,
  answerShaper,
  photoPoster,
};
