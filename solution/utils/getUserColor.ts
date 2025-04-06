import ColorHash from "color-hash";

const colorHash = new ColorHash();
export const getUserColor = (userId: string): string => colorHash.hex(userId);
