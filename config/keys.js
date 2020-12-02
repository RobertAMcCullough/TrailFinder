//determines if project is running in development or production
if(process.env.NODE_ENV === 'production'){ //this is in heroku/AWS
    module.exports = require('./prod')
}else{
    module.exports = require('./dev')
}