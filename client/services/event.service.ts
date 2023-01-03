import { Utils } from "utils";
import { PlayerSpawned } from "../../common/types";
import { PlayerService } from "./player.service";
import { createVehicle } from "./vehicle.service";

export default function registerEvents() {
  on("playerSpawned", async (spawnInfo: PlayerSpawned) => {
    SetNuiFocus(true, false);
    PlayerService.setCurrentDimension("local");
    SetEntityCoords(PlayerPedId(), -331.19, -764.5, 33.96, true, false, false, false);
    NetworkConcealPlayer(PlayerId(), true, false);

    await createVehicle("skyline", -331.19, -764.5, 33.96, 40, false, true);

    await Utils.Delay(2000);
    SendNuiMessage(JSON.stringify({
      action: "gameLoaded",
      data: true
    }));
  });
}