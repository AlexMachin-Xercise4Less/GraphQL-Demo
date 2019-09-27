const express = require('express');
const graphqlHTTP = require('express-graphql');
const MyGraphQLSchema = require('./schema');
const app = express();
const cors = require('cors')


app.use(cors());

app.use(
    '/graphql',
    graphqlHTTP({
        schema: MyGraphQLSchema,
        graphiql: true,
    }),
);


app.listen(5000, () => console.log(`The server has started`));