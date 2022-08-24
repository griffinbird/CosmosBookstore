import  MongoClient  from 'mongodb';

const DB_NAME = 'cosmosbookstore';

const db = {
    _dbClient: null,
    _cosmos: null,
    connect: async function(url) {
        // Use connection pool size of 10 by default
        const client = await MongoClient.connect(url, {
            poolSize: 10,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        var pattern = 'mongodb.net'
        var str_pos = url.indexOf(pattern);
        if (str_pos > -1) {
            console.log('Connected to Mongo Atlas')
            this._cosmos = false
        } else {
            console.log('Connected to Cosmos DB Mongo API');
            this._cosmos = true
        };
        this._dbClient = client;
    },
    getIsCosmos: function() {
      return this._cosmos == true  
    },
    getConnection: function() {
        if (!this._dbClient) {
            console.log('You need to call .connect() first!');
            process.exit(1);
        }
        return this._dbClient.db(DB_NAME);
    }
}
export default db
export {db}