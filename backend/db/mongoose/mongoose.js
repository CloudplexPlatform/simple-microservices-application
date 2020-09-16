const mongoose = require('mongoose');
require('dotenv').config()

// mongoose.connect(`mongodb://${process.env.DBHOST}`, { useNewUrlParser: true });
mongoose.connect(`${process.env.DBHOST}`, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
// mongoose.set('useUnifiedTopology', true);
const db = mongoose.connection;
db.on('error', (e) => {
    console.log(`**MongoError** ${e.message}`)
    console.log(e);
    console.log('ERROR CONNECTING TO MONGO DB :(');
    process.exit();
});
db.once('open', () => {
    console.log(`*MONGO DB RUNNING AT HOST *${process.env.DBHOST},*`);
});

module.exports = {
    mongoose
}