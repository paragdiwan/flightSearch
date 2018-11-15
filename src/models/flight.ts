export interface IFlight {
      flightClass: string;
      flightId: string;
      flightName: string;
      flightDepartureDate: string;
      returnDate?: string;
      departureCity: string;
      destinationCity: string;
      sourceFlightDetails: []; // runtime manipulation.
      destinationFlightDetails: []; // runtime manipulation.
      fair: {
        adult: number,
        child: number,
        infant: number,
        totalFair: number
      };
      passangers: {
        adults: number,
        children: number,
        infants: number
      };
}

