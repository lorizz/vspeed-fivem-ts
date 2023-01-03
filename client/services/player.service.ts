export namespace PlayerService {
  let currentDimension: string = null;

  export const setCurrentDimension = (dim: string) => {
    emitNet("servercore:setPlayerDimension", dim);
    currentDimension = dim;
  };

  export const getCurrentDimension = () => {
    return currentDimension;
  }
};