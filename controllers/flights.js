const FlightModel = require('../models/flight')
const TicketModel= require('../models/ticket')

module.exports = {
    index,
    new: newFlights,
    create,
    show
}

async function index(req, res) {
    try {
        const allFlights = await FlightModel.find({})
                                            .sort('departs')
        res.render('flights/index', {
           flights: allFlights
        })
    } catch(err) {
        console.log(err)
    }
}
function newFlights(req, res) {
    const newFlight = new FlightModel()
    const dt = newFlight.departs
    const departsDate = dt.toISOString().slice(0,16)
    res.render('flights/new', {departsDate})
}
function create(req, res) {
    FlightModel.create(req.body)
    .then(function(flight) {
        console.log(flight)
        res.redirect('/flights')
    }).catch((err) => {
        console.log(err);
        res.send('There was and error check the terminal, or log the err object')
    })
}
async function show(req, res) {
    try{
    const oneFlight = await FlightModel.findById(req.params.id)
    const tickets = await TicketModel.find({flight: oneFlight._id})
    console.log(tickets)
    res.render('flights/show', {
            flights: oneFlight,
            destinations: oneFlight.destinations,
            ticket: tickets})
    } catch(err){
        console.log(err)
    }
}