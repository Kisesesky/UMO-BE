export class SearchPlacesDto {
  query: string;
}

export class DirectionsDto {
  origin: string;
  destination: string;
  mode: 'TRANSIT' | 'CAR' | 'WALK';
}

export class SearchAddressDto {
  query: string;
}
