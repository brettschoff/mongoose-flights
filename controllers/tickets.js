const TicketModel = require('../models/ticket')
const FlightModel = require('../models/flight')

module.exports = {
    new: newTicket,
    create,
    delete: deleteTicket
}

async function newTicket(req , res) {
    const flight = await FlightModel.findById(req.params.id)
        res.render('tickets/new', {
            flights: flight
        })
}
async function create(req, res) {
    console.log(req.params.id)
     try {
        const flightId = await FlightModel.findById(req.params.id)
        console.log(flightId._id)
        req.body.flight = flightId._id
        TicketModel.create(req.body)
        console.log(req.body)
        res.redirect(`/flights/${req.params.id}`)
     } catch(err) {
        console.log(err)
     }
}
async function deleteTicket(req, res) {
    try {
        await TicketModel.findByIdAndDelete(req.params.id)
        res.redirect('/flights/')
        
    } catch(err) {
        console.log(err)
        res.send(err)
    }
}
