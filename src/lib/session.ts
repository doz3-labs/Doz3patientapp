import { readJson, writeJson } from "./storage";

export type PatientSession = {
  patientId: string;
  fullName: string;
  phone?: string | null;
  abhaId?: string | null;
};

const KEY = "doz3:patientSession";

export function getPatientSession(): PatientSession | null {
  return readJson<PatientSession>(KEY);
}

export function setPatientSession(session: PatientSession) {
  writeJson(KEY, session);
}

