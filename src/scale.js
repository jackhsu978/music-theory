import { ACCIDENTALS } from "./constants";
import { INTERVALS, addInterval } from "./interval";
import { enharmonicNotes } from "./note";
import {
  TRIAD_QUALITIES,
  getTriadChordNotes,
  toTriadCase,
  getTriadQualitySymbol,
} from "./triad";

export const SCALE_TYPES = {
  MAJOR: "Major",
  HARMONIC_MINOR: "Harmonic Minor",
};

const SCALE_TYPE_TO_SCALE_NOTES = {
  [SCALE_TYPES.MAJOR]: [
    INTERVALS.UNISON,
    INTERVALS.MAJOR_2,
    INTERVALS.MAJOR_3,
    INTERVALS.PERFECT_4,
    INTERVALS.PERFECT_5,
    INTERVALS.MAJOR_6,
    INTERVALS.MAJOR_7,
  ],
  [SCALE_TYPES.HARMONIC_MINOR]: [
    INTERVALS.UNISON,
    INTERVALS.MAJOR_2,
    INTERVALS.MINOR_3,
    INTERVALS.PERFECT_4,
    INTERVALS.PERFECT_5,
    INTERVALS.MINOR_6,
    INTERVALS.MAJOR_7,
  ],
};

const SCALE_TYPE_TO_TRIAD_QUALITIES = {
  [SCALE_TYPES.MAJOR]: [
    TRIAD_QUALITIES.MAJOR,
    TRIAD_QUALITIES.MINOR,
    TRIAD_QUALITIES.MINOR,
    TRIAD_QUALITIES.MAJOR,
    TRIAD_QUALITIES.MAJOR,
    TRIAD_QUALITIES.MINOR,
    TRIAD_QUALITIES.DIMINISHED,
  ],
  [SCALE_TYPES.HARMONIC_MINOR]: [
    TRIAD_QUALITIES.MINOR,
    TRIAD_QUALITIES.DIMINISHED,
    TRIAD_QUALITIES.AUGMENTED,
    TRIAD_QUALITIES.MINOR,
    TRIAD_QUALITIES.MAJOR,
    TRIAD_QUALITIES.MAJOR,
    TRIAD_QUALITIES.DIMINISHED,
  ],
};

const ROMANS = ["i", "ii", "iii", "iv", "v", "vi", "vii"];

const toRoman = n => ROMANS[n - 1];

export const SCALE_DEGREES = [1, 2, 3, 4, 5, 6, 7];

const getScaleTriadQuality = (scaleType, degree) =>
  SCALE_TYPE_TO_TRIAD_QUALITIES[scaleType][degree - 1];

const getScaleDegreeNote = (scaleType, tonic, degree) =>
  addInterval(tonic, SCALE_TYPE_TO_SCALE_NOTES[scaleType][degree - 1]);

const addTriadQualityToRomanNumeral = (romanNumeral, tiradQuality) =>
  `${toTriadCase(romanNumeral, tiradQuality)}${getTriadQualitySymbol(
    tiradQuality
  )}`;

export const getScaleChordRomanNumeral = (scaleType, degree) =>
  addTriadQualityToRomanNumeral(
    toRoman(degree),
    getScaleTriadQuality(scaleType, degree)
  );

export const getScaleChordName = (scaleType, tonic, degree) => {
  const note = getScaleDegreeNote(scaleType, tonic, degree);
  const quality = getScaleTriadQuality(scaleType, degree);
  return `${toTriadCase(note, quality)}${getTriadQualitySymbol(quality)}`;
};

export const getScaleChordNotes = (scaleType, tonic, degree) =>
  getTriadChordNotes(
    getScaleDegreeNote(scaleType, tonic, degree),
    getScaleTriadQuality(scaleType, degree)
  );

export const getNormalizedTonic = (noteName, scaleType) => {
  if (noteName.length === 1) {
    return noteName;
  }
  return enharmonicNotes(noteName).find(noteName =>
    scaleType === SCALE_TYPES.MAJOR
      ? noteName.endsWith(ACCIDENTALS.FLAT)
      : noteName.endsWith(ACCIDENTALS.SHARP)
  );
};
