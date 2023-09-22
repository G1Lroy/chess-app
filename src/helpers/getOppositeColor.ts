import { Color } from "../models/Piece/types";

export const opposite = (color: Color): Color => (color === Color.WHITE ? Color.BLACK : Color.WHITE);
