const mongoose = require('mongoose')

const destinationSchema = new mongoose.Schema({
    airport: {type: String,
        enum:['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
    },
    arrival: {
        type: Date
    }
})

function defaultDate() {
    let defaultDate = new Date()
    return defaultDate.setFullYear(defaultDate.getFullYear() + 1)
}

const flightSchema = new mongoose.Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United']
    },
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: 'DEN'
    },
    flightNo: {
        type: Number,
        min: 10,
        max: 9999
    },
    departs:{
        type: Date,
        default: defaultDate()
    },
    destinations: [destinationSchema]
})

module.exports = mongoose.model('Flight', flightSchema)