const moment = require('moment');



function timestampPlugin(schema, options) {

    schema.add({ createdAt: Date, updatedAt: Date })
     
    schema.pre('save', function(next) {
        const now = moment();
        this.updatedAt = now;
        if (!this.createdAt) {
            this.createdAt = now;
        }
        next();
    });
}




module.exports = timestampPlugin;
