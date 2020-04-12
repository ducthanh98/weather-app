const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        index: true,
        unique: true
    },
    password: String,
    cities: Array
})

userSchema.statics = {
    findByUsername(username) {
        return this.findOne({ username })
    },
    updateCityById(id, city) {
        return this.findByIdAndUpdate(id, { $push: { cities: city } })
    },
    deleteCityById(id, city) {
        return this.findByIdAndUpdate(id, { $pull: { cities: city } })
    }
}

module.exports = mongoose.model('user', userSchema);