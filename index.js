const { ApolloServer, gql } = require('apollo-server');
const fetch = require("node-fetch");



const typeDefs = gql`

type Cyptro {
    name: String,
    symbol: String,
    nameid: String,
    rank: Int,
    price_usd:String,
    percent_change_24h: String,
    percent_change_1h: String,
    percent_change_7d: String,
    price_btc: String,
    id: String,
    market_cap_usd: String,
    volume24: String,
    volume24a: String,
    csupply:String,
    tsupply:String,
    msupply:String
  }
  type Query{
    coins: [Cyptro]!
}`;


let dataBit;

fetch("https://api.coinlore.net/api/tickers/")
.then(coins =>  coins.json())
.then(data => {
dataBit = data.data
  console.log(data.data[0])
})



const resolvers = {
    Query: {
      coins: () => dataBit,
    },
  };



  const server = new ApolloServer({ typeDefs, resolvers });


  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });