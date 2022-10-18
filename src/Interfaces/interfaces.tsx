export interface UserToLogin {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface Position {
  lat: number;
  lng: number;
}

export interface FilteredPlace {
  id: string;
  pos: Position;
  name: string;
}
