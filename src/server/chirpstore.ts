interface Chirp {
    text: String,
    name: String
}

export default class ChirpManager
{

    #chirps: { nextid: number, [index: number]: Chirp};
    #fs;

    constructor()
    {

        this.#fs = require('fs');

        this.#chirps = { "0": {name: "Generic Chirper", text:"Cheep! Cheep!"}, nextid: 1 };
        if (this.#fs.existsSync('chirps.json'))
        {
            this.#chirps = JSON.parse(this.#fs.readFileSync('chirps.json'));
        }

    };

    getAll()
    {
        return Object.assign({}, this.#chirps); //create a copy and return it
    };

    getSingle(id: number)
    {
        if (this.#chirps[id] === undefined) return null;
        return Object.assign({}, this.#chirps[id]); //create a copy and return it
    };

    new(chirp: Chirp)
    {
        if (typeof chirp !== "object" || typeof chirp.text !== "string" || typeof chirp.name !== "string") return false;
        this.#chirps[this.#chirps.nextid++] = {text: chirp.text, name: chirp.name}
        this.write();
    };

    update(id: number, chirp: Chirp)
    {
        if (this.#chirps[id] !== undefined || typeof chirp.text !== "string" || typeof chirp.name !== "string")
        {
            this.#chirps[id] = {text: chirp.text, name: chirp.name};
            this.write();
            return true;
        };
        return false;
    };

    delete(id: number)
    {

        if (this.#chirps[id] !== undefined)
        {
            delete this.#chirps[id];
            this.write();
            return true;
        };

        return false;
    };

    write()
    {
        this.#fs.writeFileSync('chirps.json', JSON.stringify(this.#chirps));
    };

};