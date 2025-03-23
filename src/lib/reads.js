import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import {
  db,
} from "./firebase";

export const getSchools = async () => {
  return (await getDocs(query(collection(db, 'schools')))).docs.map(
    (doc) => ({
      ...doc.data(),
      id: doc.id
    })
  );
};

export const getSchoolById = async (schoolId) => {
  return (
    await getDocs(
      query(
        collection(db, 'schools'),
        where('schoolId', '==', schoolId)
      )
    )
  ).docs.map(
    (doc) => ({
      ...doc.data(),
      id: doc.id
    })
  )[0];
};

export const getResidences = async (schoolId) => {
  return (
    await getDocs(
      query(
        collection(db, 'residences'),
        where('schoolId', '==', schoolId)
      )
    )
  ).docs.map(
    (doc) => ({
      ...doc.data(),
      id: doc.id
    })
  );
};

export const userIsAdmin = async (uid) => {
  return (await getDoc(doc(db, 'admins', uid))).exists();
}