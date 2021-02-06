export type WeatherUnits = 'standard' | 'metric' | 'imperial';

export interface IWeatherRespond {
  coord: ICoordination;
  weather: IWeather[];
  base: string;
  main: IMainForecast;
  visibility: number;
  wind: IWind;
  clouds: IClouds;
  dt: number;
  sys: ISky;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ICoordination {
  lon: number;
  lat: number;
}

export interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IMainForecast {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface IWind {
  speed: number;
  deg: number;
}

export interface IClouds {
  all: number;
}

export interface ISky {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface ICityReadyData {
  data: ICityRequestData;
  index: number;
}

export interface ICityRequestData {
  city: string;
  units: WeatherUnits;
}
