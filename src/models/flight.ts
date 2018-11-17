// Represents IFlight model
export interface IFlight {
      flightId: string;
      flightName: string;
      flightDepartureDate: string;
      departureCity: string;
      destinationCity: string;
      fair: {
        adult: number,
        child: number,
        infant: number,
        totalFair: number // @TODO: update totalFair based on selected combination.
      };
      arrivalTime: string;
      departureTime: string;
}

