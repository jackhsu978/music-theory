import { ACCIDENTALS } from "./constants";

export const NOTES = "ABCDEFG".split("").reduce(
  (map, letter) => ({
    ...map,
    [letter]: letter,
    [`${letter}_SHARP`]: `${letter}${ACCIDENTALS.SHARP}`,
    [`${letter}_FLAT`]: `${letter}${ACCIDENTALS.FLAT}`,
    [`${letter}_DOUBLE_SHARP`]: `${letter}${ACCIDENTALS.DOUBLE_SHARP}`,
    [`${letter}_DOUBLE_FLAT`]: `${letter}${ACCIDENTALS.DOUBLE_FLAT}`,
  }),
  {}
);

const getSemitoneGroups = () => {
  const LETTER_TO_SEMITONE = {
    C: 0,
    D: 2,
    E: 4,
    F: 5,
    G: 7,
    A: 9,
    B: 11,
  };
  // group notes by semitone
  const groups = [[], [], [], [], [], [], [], [], [], [], [], []];
  const normalizeIndex = index => (index + groups.length) % groups.length;
  Object.keys(LETTER_TO_SEMITONE).forEach(letter => {
    const index = LETTER_TO_SEMITONE[letter];
    groups[index].push(NOTES[letter]);
    groups[normalizeIndex(index - 2)].push(NOTES[`${letter}_DOUBLE_FLAT`]);
    groups[normalizeIndex(index - 1)].push(NOTES[`${letter}_FLAT`]);
    groups[normalizeIndex(index + 1)].push(NOTES[`${letter}_SHARP`]);
    groups[normalizeIndex(index + 2)].push(NOTES[`${letter}_DOUBLE_SHARP`]);
  });
  return groups;
};

const SEMITONE_GROUPS = getSemitoneGroups();

export const noteNameToSemitone = noteName =>
  SEMITONE_GROUPS.findIndex(names => names.includes(noteName));

export const semitoneToNoteNames = semitone =>
  SEMITONE_GROUPS[semitone % SEMITONE_GROUPS.length];

export const noteNameToLetter = noteName => noteName.charAt(0);

export const enharmonicNotes = noteName =>
  semitoneToNoteNames(noteNameToSemitone(noteName));
