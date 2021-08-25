import * as express from 'express';
/*
    I like classes better, so I turned it into a class.
*/
import ChirpManager from '../chirpstore';
let Chirper = new ChirpManager();

let router = express.Router();

router.get('/:ID?', (request, response) => {
    const id = parseInt(request.params.ID);
    if (isNaN(id)) {
        response.json(Chirper.getAll());
        return;
    }

    const chirp = Chirper.getSingle(id);
    if (chirp === null) {
        response.status(400).json({"message": "No such chirp"});
        return;
    }

    response.json(chirp);
});

router.post('/', (request, response) => {

    if (typeof(request.body.chirp) !== "object") {
        response.status(400).json({"message": "Invalid chirp data"});
        return;
    };

    Chirper.new(request.body.chirp);

    response.status(200).json({"message": "Chirp submitted"});

});

router.put('/:ID', (request, response) => {

    const chirp: {name: String, text: String} = request.body.chirp;
    const id = parseInt(request.params.ID);

    if (isNaN(id)) {
        response.status(400).json({"message": "Invalid id"});
        return;
    };

    if (chirp === undefined || typeof(chirp) !== "object" || typeof chirp.name !== "string" || typeof chirp.text !== "string") {
        response.status(400).json({"message": "Invalid chirp data"});
        return;
    };

    let didWork = Chirper.update(id, chirp);

    if (didWork) response.status(200).json({"message": "Chirp updated"})
    else response.status(400).json({"message": "No such chirp"});

});

router.delete('/:ID', (request, response) => {
    
    const id = parseInt(request.params.ID);

    if (isNaN(id)) {
        response.status(400).json({"message": "Invalid id"});
        return;
    };

    let didWork = Chirper.delete(id);

    if (didWork) response.status(200).json({"message": "Chirp deleted"})
    else response.status(400).json({"message": "No such chirp"});

});


Object.defineProperty(router, 'chirper', {
    value: Chirper,
    writable: false
})
export default router;