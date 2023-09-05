import { Color } from "../models/Piece/Piece";

export const opposite = (color: Color) => (color === Color.WHITE ? Color.BLACK : Color.WHITE);
