import React from 'react';
import './App.css';
import Logo from './logo.png'
import ApolloClient from 'apollo-boost';
import Launches from './components/Launches';
import {ApolloProvider} from 'react-apollo'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <img
          src={Logo}
          alt="SpaceX"
          style={{ width: 300, display: 'block', margin: 'auto' }}
        />
        <Launches/>
      </div>
    </ApolloProvider>
  );
}

export default App;
