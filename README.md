# Flight search engine

This application is developed in Angular 6 using Rx Observables. Cross component communication is done via 'subject' observable.

The application is a simple flight search based on the criteria defined by end user. 

## Installation

> Run **npm install** & then **npm serve**

## Backend 
Used firebase to create `flight API`. This is configured in the environment settings.

## Build status

[![CircleCI](https://circleci.com/gh/paragdiwan/flightSearch.svg?style=svg)](https://circleci.com/gh/paragdiwan/flightSearch)

## Things could have been better
1. In mobile view, once search is completed, scroll user to the `search result` section
2. More code coverage
3. Autocomplete while typing `departure/destination` city.
4. Search via city code. Presently search happens with full city name.


## How to test with test data

- Departure city: **Kolkatta**
- Arrival city: **Delhi**
- Departure date: **17/12/2018**
- Return date: **24/12/2018**

## API URL
https://temp-81194.firebaseio.com/listing/flights.json



