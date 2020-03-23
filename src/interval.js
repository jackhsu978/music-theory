import {
  noteNameToSemitone,
  noteNameToLetter,
  semitoneToNoteNames,
} from "./note";

export const INTERVALS = [2, 3, 4, 5, 6, 7, 8].reduce(
  (map, n) => ({
    ...map,
    ...([4, 5, 8].includes(n)
      ? {
          [`PERFECT_${n}`]: `P${n}`,
        }
      : {
          [`MINOR_${n}`]: `m${n}`,
          [`MAJOR_${n}`]: `M${n}`,
        }),
    [`DIMINISHED_${n}`]: `d${n}`,
    [`AUGMENTED_${n}`]: `A${n}`,
  }),
  { UNISON: "P1" }
);

export const INTERVAL_ORDER = [
  [INTERVALS.UNISON, INTERVALS.DIMINISHED_2],
  [INTERVALS.MINOR_2],
  [INTERVALS.MAJOR_2, INTERVALS.DIMINISHED_3],
  [INTERVALS.MINOR_3, INTERVALS.AUGMENTED_2],
  [INTERVALS.MAJOR_3, INTERVALS.DIMINISHED_4],
  [INTERVALS.PERFECT_4, INTERVALS.AUGMENTED_3],
  [INTERVALS.AUGMENTED_4, INTERVALS.DIMINISHED_5],
  [INTERVALS.PERFECT_5, INTERVALS.DIMINISHED_6],
  [INTERVALS.MINOR_6, INTERVALS.AUGMENTED_5],
  [INTERVALS.MAJOR_6, INTERVALS.DIMINISHED_7],
  [INTERVALS.MINOR_7, INTERVALS.AUGMENTED_6],
  [INTERVALS.MAJOR_7, INTERVALS.DIMINISHED_8],
  [INTERVALS.PERFECT_8],
];

const intervalNameToNumOfSemitones = intervalName =>
  INTERVAL_ORDER.findIndex(names => names.includes(intervalName));

const A_TO_G = "ABCDEFG";
const addLetterDistance = (letter, distance) =>
  A_TO_G.charAt((A_TO_G.indexOf(letter) + distance) % A_TO_G.length);

const intervalNameToNumOfLetterDistance = intervalName =>
  parseInt(intervalName.charAt(1), 10) - 1;

export const addInterval = (noteName, intervalName) => {
  const letter = addLetterDistance(
    noteNameToLetter(noteName),
    intervalNameToNumOfLetterDistance(intervalName)
  );
  return semitoneToNoteNames(
    noteNameToSemitone(noteName) + intervalNameToNumOfSemitones(intervalName)
  ).find(n => noteNameToLetter(n) === letter);
};
