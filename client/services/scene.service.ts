export const garageCams: number[] = [];

export default function registerScenes() {
  const cameraStart = CreateCam("DEFAULT_SCRIPTED_CAMERA", true);
  SetCamCoord(cameraStart, -325.19, -730.5, 33.56);
  SetCamRot(cameraStart, 0, 0, 170, 2);
  SetCamFov(cameraStart, 30);

  const cameraEnd = CreateCam("DEFAULT_SCRIPTED_CAMERA", false);
  SetCamCoord(cameraEnd, -330.19, -759.5, 33.56);
  SetCamRot(cameraEnd, 0, -20, 160, 2);
  SetCamFov(cameraEnd, 50);

  RenderScriptCams(true, false, 0, true, false);
  garageCams.push(cameraStart, cameraEnd);
}

export const initGarageScene = () => {
  SetCamActiveWithInterp(garageCams[1], garageCams[0], 1300, 1, 1);
}