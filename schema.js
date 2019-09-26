const { 
    GraphQLObjectType, 
    GraphQLInt, 
    GraphQLString, 
    GraphQLBoolean, 
    GraphQLList, 
    GraphQLSchema, 
    GraphQLNonNull
} = require('graphql');

const axios = require('axios');

const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: {type: GraphQLInt},
        mission_name: {type: GraphQLString},
        launch_year: {type: GraphQLInt}, 
        launch_date_local: {type: GraphQLString},
        launch_success: {type: GraphQLBoolean}, 
        rocket: {type: RocketType},
    })
});

const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: {type: GraphQLString},
        rocket_name: {type: GraphQLString},
        rocket_type: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        launches: {
            type: new GraphQLList(LaunchType), // Returns an array of rockets so GraphQLList utility was used
            async resolve (parent, args) {
                try {
                    const request = await axios.get('https://api.spacexdata.com/v3/launches');
                    const response = request.data;
                    return response;
                } catch(error) {
                    console.log(error);
                }
            }
        },
        launch : {
            type: LaunchType,
            args : {
                flight_number: {type: new GraphQLNonNull(GraphQLInt)}
            },
            async resolve(parent, args) {
                try {
                    const request = await axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`);
                    const response = request.data;
                    return response;
                } catch(error) {
                    console.log(error);
                }
            }
        },
        rockets: {
            type: new GraphQLList(RocketType), // Returns an array of rockets so GraphQLList utility was used
            async resolve (parent, args) {
                try {
                    const request = await axios.get('https://api.spacexdata.com/v3/rockets');
                    const response = request.data;
                    return response;
                } catch(error) {
                    console.log(error);
                }
            }
        },
        rocket : {
            type: RocketType,
            args : {
                rocket_id: {type: new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent, args) {
                try {
                    const request = await axios.get(`https://api.spacexdata.com/v3/rockets/${args.rocket_id}`);
                    const response = request.data;
                    return response;
                } catch(error) {
                    console.log(error);
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})