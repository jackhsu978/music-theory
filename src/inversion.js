export const invertChord = (notes, invertCount) =>
  notes.slice(invertCount).concat(notes.slice(0, invertCount));
