export interface Pokemon {
  id: number;
  name: string;
  korean_name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
      korean_name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
      korean_name: string;
    };
  }>;
  moves: Array<{
    move: {
      name: string;
      korean_name: string;
    };
  }>;
}
