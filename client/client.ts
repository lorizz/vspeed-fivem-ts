import registerEvents from "services/event.service";
import registerNuiCallbacks from "services/nui.service";
import { PlayerService } from "services/player.service";
import registerScenes from "services/scene.service";
import { Utils } from "utils";

const disabledControls = [1, 2, 7, 12, 13, 14, 15, 16, 17, 19, 21, 22, 23, 24, 25, 27, 74, 75, 80];

registerEvents();
registerNuiCallbacks();
registerScenes();

RegisterCommand("posinfo", async (source: number, args: string[], rawCommand: string) => {
  const playerPed = PlayerPedId()
  const [x, y, z] = GetEntityCoords(playerPed, true)
  const h = GetEntityHeading(playerPed)
}, false);

RegisterCommand("suicide", async (source: number, args: string[], rawCommand: string) => {
  SetEntityHealth(PlayerPedId(), 0);
}, false);

// RegisterCommand("spawncar", async (source: number, args: string[], rawCommand: string) => {
//   const [model] = args;
//   console.log(model);
//   const player = PlayerPedId();
//   const vehicle = await createVehicle(model);
//   SetPedIntoVehicle(player, vehicle, -1);
//   SetVehicleRadioEnabled(vehicle, false);
//   SetEntityInvincible(vehicle, true);
//   SetVehicleGravityAmount(vehicle, 20);
// }, false);

// Always running
setTick(() => {
  // disable controls UNCOMMENT!!!!!!!!!!!!!!
  // for(const dc of disabledControls) DisableControlAction(2, dc, true);
  HideHudAndRadarThisFrame();
  HideHudNotificationsThisFrame();
  SetPedDensityMultiplierThisFrame(0);
  SetVehicleDensityMultiplierThisFrame(0);
  if (PlayerService.getCurrentDimension() == "freeroam") {
    const vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
    if (vehicle > 0) {
      const vehicleCoordinates = GetEntityCoords(vehicle, true);
      const vehicleHeading = GetEntityHeading(vehicle);
      SendNuiMessage(JSON.stringify({
        action: "updatePosAndRot",
        data: {
          coordinates: [vehicleCoordinates[0], vehicleCoordinates[1]],
          heading: vehicleHeading
        }
      }));
    }
  }
});

setTick(async () => {
  await Utils.Delay(10);
  if (PlayerService.getCurrentDimension() == "freeroam") {
    const vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
    if (vehicle > 0) {
      // TODO edit on the front end the action
      SendNuiMessage(JSON.stringify({
        action: "accelSound",
        data: {
          rpms: GetVehicleCurrentRpm(vehicle),
        }
      }));
      // SendNuiMessage(JSON.stringify({
      //   action: "decelSound",
      //   data: {
      //     rpms: GetVehicleCurrentRpm(vehicle),
      //   }
      // }));
    }
  }
});

// Base setup of player (now in dev)

// RegisterNuiCallbackType("clientcore:initGarage");
// on("__cfx_nui:clientcore:initGarage", (data: any, cb: any) => {
//   cb("Initialized garage");
//   createInitScene();
// });
