module.exports = {
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'A hard to guess string',
  MONGO_URI: process.env.MONGO_URI || 'localhost/couponSchema2',
  MONGO_URI_LAB: process.env.MONGO_URI || 'mongodb://thisweek:Orderly123@ds037262.mongolab.com:37262/hawaiiqpons',
  FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || 'Facebook App Secret',
  GOOGLE_SECRET: process.env.GOOGLE_SECRET || 'pNHqiYYojPush7H5V1ZE-lx1'
};