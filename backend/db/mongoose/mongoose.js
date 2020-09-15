const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(`mongodb://${process.env.DBHOST}`, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
// mongoose.set('useUnifiedTopology', true);

module.exports = {
    mongoose
}