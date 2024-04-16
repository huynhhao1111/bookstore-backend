const { ObjectId } = require("mongodb");

class LoanService {
    constructor(client) {
        this.Contact = client.db().collection("loans");
    }
    
}
module.exports = LoanService;