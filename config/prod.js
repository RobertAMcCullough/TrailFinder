//this is committed to git, keys are stored in heroku settings
module.exports = {
    dbURL: process.env.dbURL,
    googleClientID: process.env.googleClientID,
    googleClientSecret: process.env.googleClientSecret,
    cookieKey: process.env.cookieKey,
    facebookAppId: process.env.facebookAppId,
    facebookSecret: process.env.facebookSecret
}