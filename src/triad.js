import { INTERVALS, addInterval } from "./interval";

export const TRIAD_QUALITIES = {
  MAJOR: "",
  MINOR: "m",
  DIMINISHED: "o",
  AUGMENTED: "+",
};

export const TRIAD_POSITIONS = { ROOT: "a", FIRST: "b", SECOND: "c" };

const getTriadThirdInterval = quality => {
  switch (quality) {
    case TRIAD_QUALITIES.MINOR:
    case TRIAD_QUALITIES.DIMINISHED:
      return INTERVALS.MINOR_3;
    default:
      return INTERVALS.MAJOR_3;
  }
};

const getTriadFithInterval = quality => {
  switch (quality) {
    case TRIAD_QUALITIES.AUGMENTED:
      return INTERVALS.AUGMENTED_5;
    case TRIAD_QUALITIES.DIMINISHED:
      return INTERVALS.DIMINISHED_5;
    default:
      return INTERVALS.PERFECT_5;
  }
};

export const invertChord = (notes, invertCount) =>
  notes.slice(invertCount).concat(notes.slice(0, invertCount));

export const getTriadChordNotes = (rootNote, quality) => [
  rootNote,
  addInterval(rootNote, getTriadThirdInterval(quality)),
  addInterval(rootNote, getTriadFithInterval(quality)),
];

export const toTriadCase = (noteStr, tiradQuality) =>
  [TRIAD_QUALITIES.MINOR, TRIAD_QUALITIES.DIMINISHED].includes(tiradQuality)
    ? noteStr.toLowerCase()
    : noteStr.toUpperCase();

export const getTriadQualitySymbol = tiradQuality => {
  switch (tiradQuality) {
    case TRIAD_QUALITIES.DIMINISHED:
      return "o";
    case TRIAD_QUALITIES.AUGMENTED:
      return "+";
    default:
      return "";
  }
};

export const parseTriadQuality = chordName => {
  if (chordName.endsWith(getTriadQualitySymbol(TRIAD_QUALITIES.DIMINISHED))) {
    return TRIAD_QUALITIES.DIMINISHED;
  }
  if (chordName.endsWith(getTriadQualitySymbol(TRIAD_QUALITIES.AUGMENTED))) {
    return TRIAD_QUALITIES.AUGMENTED;
  }
  const letter = chordName.charAt(0);
  return letter.toLowerCase() === letter
    ? TRIAD_QUALITIES.MINOR
    : TRIAD_QUALITIES.MAJOR;
};
