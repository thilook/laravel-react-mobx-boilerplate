import moment from 'moment';

const dateFormat = (date, toFormat) => moment(date).format(toFormat);

export default { dateFormat };
