import {
  addDoc,
  collection,
} from "firebase/firestore";

import {
  db,
} from "./firebase";

import {
  residenceExists,
  schoolExists,
} from "./reads";

const cleanString = (str) => {

  return str.toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
}

export const setSchool = async (
  schoolName,
  schoolId
) => {

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

export const setResidence = async (
  residenceName,
  schoolName,
  schoolId
) => {

  const residenceId = cleanString(residenceName);

  if (await residenceExists(residenceId, schoolId)) {
    console.error('Residence already exists.');
    return;
  }

  return await addDoc(collection(db, 'residences'),{
    residenceId: residenceId,
    residenceName: residenceName,
    schoolId: schoolId,
    schoolName: schoolName
  });
}

// Create a function that checks if user doesn't already have a review for this residence in this school
// After create a function to write review into db