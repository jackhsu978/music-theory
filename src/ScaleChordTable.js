import React, { Fragment, useState } from "react";
import Select from "./Select";
import { NOTES } from "./note";
import {
  getScaleChordRomanNumeral,
  getScaleChordName,
  getScaleChordNotes,
  getNormalizedTonic,
  SCALE_DEGREES,
  SCALE_TYPES,
} from "./scale";
import {
  invertChord,
  parseTriadQuality,
  getTriadQualitySymbol,
  TRIAD_QUALITIES,
} from "./triad";

const SCALE_TONIC_OPTIONS = [
  { value: NOTES.C, label: `${NOTES.C}` },
  { value: NOTES.D_FLAT, label: `${NOTES.D_FLAT}/${NOTES.C_SHARP}` },
  { value: NOTES.D, label: `${NOTES.D}` },
  { value: NOTES.E_FLAT, label: `${NOTES.E_FLAT}/${NOTES.D_SHARP}` },
  { value: NOTES.E, label: `${NOTES.E}` },
  { value: NOTES.F, label: `${NOTES.F}` },
  { value: NOTES.G_FLAT, label: `${NOTES.G_FLAT}/${NOTES.F_SHARP}` },
  { value: NOTES.G, label: `${NOTES.G}` },
  { value: NOTES.A_FLAT, label: `${NOTES.A_FLAT}/${NOTES.G_SHARP}` },
  { value: NOTES.A, label: `${NOTES.A}` },
  { value: NOTES.B_FLAT, label: `${NOTES.B_FLAT}/${NOTES.A_SHARP}` },
  { value: NOTES.B, label: `${NOTES.B}` },
];

const SCALE_TYPE_OPTIONS = [
  { value: SCALE_TYPES.MAJOR, label: SCALE_TYPES.MAJOR },
  { value: SCALE_TYPES.HARMONIC_MINOR, label: SCALE_TYPES.HARMONIC_MINOR },
];

const INVERSION_OPTIONS = [
  { value: 0, label: "Root position (a)" },
  { value: 1, label: "1st inversion (b)" },
  { value: 2, label: "2nd inversion (c)" },
];

function ScaleSelector({ scaleTonic, setScaleTonic, scaleType, setScaleType }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ padding: 4, width: 100 }}>
        <Select
          value={scaleTonic}
          options={SCALE_TONIC_OPTIONS}
          setValue={setScaleTonic}
        />
      </div>
      <div style={{ padding: 4, width: 200 }}>
        <Select
          value={scaleType}
          options={SCALE_TYPE_OPTIONS}
          setValue={setScaleType}
        />
      </div>
    </div>
  );
}

function Chord({ value }) {
  const quality = parseTriadQuality(value);
  const shouldSup = [
    TRIAD_QUALITIES.DIMINISHED,
    TRIAD_QUALITIES.AUGMENTED,
  ].includes(quality);
  return (
    <span>
      {shouldSup ? (
        <Fragment>
          {value.substr(0, value.length - 1)}
          <sup>{getTriadQualitySymbol(quality)}</sup>
        </Fragment>
      ) : (
        value
      )}
    </span>
  );
}

export default function ChordTable() {
  const [scaleTonic, setScaleTonic] = useState(NOTES.C);
  const [scaleType, setScaleType] = useState(SCALE_TYPES.MAJOR);
  const [inversion, setInversion] = useState(0);
  const normalizedScaleTonic = getNormalizedTonic(scaleTonic, scaleType);
  return (
    <table cellPadding={8}>
      <thead>
        <tr>
          <th colSpan={6}>
            <ScaleSelector
              scaleTonic={scaleTonic}
              scaleType={scaleType}
              setScaleTonic={setScaleTonic}
              setScaleType={setScaleType}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Degree</th>
          <th>Roman</th>
          <th>Chord</th>
          <td colSpan={3} style={{ width: 180 }}>
            <Select
              value={inversion}
              options={INVERSION_OPTIONS}
              setValue={setInversion}
            />
          </td>
        </tr>
        {SCALE_DEGREES.map(degree => {
          return (
            <tr key={degree}>
              <th>{degree}</th>
              <td>
                <Chord value={getScaleChordRomanNumeral(scaleType, degree)} />
              </td>
              <td>
                <Chord
                  value={getScaleChordName(
                    scaleType,
                    normalizedScaleTonic,
                    degree
                  )}
                />
              </td>
              <Fragment>
                {invertChord(
                  getScaleChordNotes(scaleType, normalizedScaleTonic, degree),
                  inversion
                ).map(note => (
                  <td key={note}>{note}</td>
                ))}
              </Fragment>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
