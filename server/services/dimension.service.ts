import { Dimension } from "../../common/types";

export const dimensions: Dimension[] = [];

export const createDimension = (name: string, ghostMode?: boolean, trafficIntensity?: number) => {
  const dimensionByName = dimensions.find((d) => d.name == name);
  if (dimensionByName) throw new Error("dimension-already-exists");
  for(let i = 0; i < 63; i++) {
    const dimensionByNumber = dimensions.find((d) => d.number == i);
    if (!dimensionByNumber) {
      dimensions.push({
        name,
        number: i,
        players: [],
        ghostMode: ghostMode ?? false,
        trafficIntensity: trafficIntensity ?? 1.0,
      });
      return;
    }
  }
  throw new Error("no-dimension-slot-remaining");
}

export const setPlayerDimension = (player: number, name: string) => {
  const dimension = dimensions.find((d) => d.name == name);
  if (!dimension) throw new Error("dimension-not-found");
  if (dimension.players.includes(player)) throw new Error("player-already-in-dimension");
  dimension.players.push(player);
  SetPlayerRoutingBucket(`${player}`, dimension.number);
}

export const getPlayerDimension = (player: number) => {
  const dimension = dimensions.find((d) => d.players.includes(player));
  if (!dimension) throw new Error("player-not-in-any-dimension");
}