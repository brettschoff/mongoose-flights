const FlightModel = require('../models/flight')

module.exports = {
    create
}
function create (req, res) {
    console.log(req.body)
    FlightModel.findById(req.params.id)
               .then(function(flightDocument) {
                flightDocument.destinations.push(req.body)
                flightDocument.save()
                              .then(function(){
                                res.redirect(`/flights/${req.params.id}`)
                              })
               })
}
