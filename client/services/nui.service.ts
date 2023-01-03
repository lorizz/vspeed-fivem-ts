import { Utils } from "utils";
import { PlayerService } from "./player.service";
import { initGarageScene } from "./scene.service";
import { createVehicle } from "./vehicle.service";

export default function registerNuiCallbacks() {
  RegisterNuiCallbackType("clientcore:initGarage");
  on("__cfx_nui:clientcore:initGarage", async (data: any, cb: any) => {
    await Utils.Delay(300);
    initGarageScene();
    cb({});
  });

  RegisterNuiCallbackType("clientcore:setInFreeroam");
  on("__cfx_nui:clientcore:setInFreeroam", async (data: any, cb: any) => {
    NetworkConcealPlayer(PlayerId(), false, false);
    PlayerService.setCurrentDimension("freeroam");
    await Utils.Delay(1000);
    SetEntityCoords(PlayerPedId(), -6974.14, -636.69, 148.14, true, false, false, false);
    const veh = await createVehicle("skyline", -6974.14, -636.69, 148.14, 12);
    SetVehicleRadioEnabled(veh, false);
    RenderScriptCams(false, false, 0, false, false);
    SetNuiFocus(false, false);
    cb({});
  });
}