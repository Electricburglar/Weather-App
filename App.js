import * as React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import { Constants } from 'expo';
import Weather from './Weather';

const API_KEY = '';

export default class App extends React.Component {
  state = {
    isLoaded: false,
    error: null,
    temperature: null,
    name: null
  };
  
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.getWeather(position.coords.latitude, position.coords.longitude)
      },
      error => {
        this.setState({
          error: error
        });
      }
    );
  }

  getWeather = (lat, long) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}`)
    .then(response => response.json())
    .then(json => {
      this.setState({
        isLoaded: true,
        temperature: json.main.temp,
        name: json.weather[0].main
      });
    });
  }

  render() {
    const { isLoaded, error, temperature, name } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        {isLoaded ? (
          <Weather name={name} temp={Math.floor(temperature - 273.15)} />
        ) : (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Getting the Weather</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    backgroundColor: 'transparent',
  },
  loading: {
    flex: 1,
    backgroundColor: '#FDF6AA',
    justifyContent: 'flex-end',
    paddingLeft: 25,
  },
  loadingText: {
    fontSize: 38,
    marginBottom: 24,
  },
});
