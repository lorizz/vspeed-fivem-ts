import { createDimension, dimensions, getPlayerDimension, setPlayerDimension } from "services/dimension.service";

on("onResourceStart", (name: string) => {
  if (name != GetCurrentResourceName()) return;
  createDimension("local", true, 0);
  createDimension("freeroam", true, 0);
  // debug dimension
  createDimension("debug");
});

// Events
onNet("servercore:setPlayerDimension", (name: string) => {
  setPlayerDimension(source, name);
});

onNet("servercore:getPlayerDimension", () => {
  getPlayerDimension(source);
})

// Commands
RegisterCommand("getdims", async (source: number, args: string[], rawCommand: string) => {
  console.log(JSON.stringify(dimensions));
}, false);