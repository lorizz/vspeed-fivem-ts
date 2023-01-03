import { Utils } from "utils";

export const createVehicle = async (model: string, x: number, y: number, z: number, h: number, isNetwork: boolean = true, setInVehicle: boolean = true) => {
  let vehicle: number = -1;
  if (!IsModelInCdimage(model) || !IsModelAVehicle(model)) return;

  RequestModel(model);
  while (!HasModelLoaded) await Utils.Delay(100);
  vehicle = CreateVehicle(model, x, y, z, h, isNetwork, false);
  while (!DoesEntityExist(vehicle)) await Utils.Delay(100);
  if (setInVehicle) SetPedIntoVehicle(PlayerPedId(), vehicle, -1);
  await Utils.Delay(100);
  SetVehicleRadioEnabled(vehicle, false);
  // SetVehicleGravityAmount(vehicle, 90);
  // add all flags here

  SetEntityAsNoLongerNeeded(vehicle);
  SetModelAsNoLongerNeeded(model);
  return vehicle;
}