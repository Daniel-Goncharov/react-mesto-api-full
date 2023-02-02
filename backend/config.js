const { DB = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const { JWT_SECRET = 'dev-secret' } = process.env;

module.exports = {
  DB,
  JWT_SECRET,
};
