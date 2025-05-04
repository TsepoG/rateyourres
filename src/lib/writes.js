import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

import {
  db,
} from "./firebase";

import {
  residenceExists,
  reviewExists,
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

export const setReview = async (review) => {

  const docExists = await reviewExists(review?.residenceId, review?.schoolId, review?.userId);

  if (docExists.length > 0) {

    return await updateDoc(doc(db, 'reviews', docExists[0].id), {
      comment: review?.comment,
      rating: review?.rating,
    });
  }

  return await addDoc(collection(db, 'reviews'),{
    comment: review?.comment,
    date: Timestamp.now(),
    rating: review?.rating,
    residenceId: review?.residenceId,
    residenceName: review?.residenceName,
    schoolId: review?.schoolId,
    schoolName: review?.schoolName,
    uid: review?.userId
  });
}