import {
  addDoc,
  collection,
} from "firebase/firestore";

import {
  db,
} from "./firebase";
import { schoolExists } from "./reads";

const cleanString = (str) => {

  return str.toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
}

export const setSchool = async (schoolName, schoolId) => {

  const schoolID = cleanString(schoolId);

  if (await schoolExists(schoolID)) {
    console.error('School already exists.');
    return;
  }

  return await addDoc(collection(db, 'schools'),{
    schoolId: schoolID,
    schoolName: schoolName
  });
}