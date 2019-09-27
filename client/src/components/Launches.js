import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import LaunchItem from './LaunchItem';

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

export default () => {
    const {loading, error,data} = useQuery(LAUNCHES_QUERY);
    if(loading) return <h1>Loading</h1>;
    if(error) console.log(error);
    console.log(data);

    return (
        <>
            <h4>Launches</h4>
            {data.launches.map(data => {
                return <LaunchItem key={data.flight_number} launch={data}/>
            })}
        </>
    )
}