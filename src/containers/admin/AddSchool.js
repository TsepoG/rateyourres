'use client';

import {
  useState,
} from "react";

import {
  useAuth,
} from "@/lib/useAuth";

import {
  PrimaryButton,
} from "@/components/Button";

import {
  setSchool,
} from "@/lib/writes";

export const AddSchool = () => {

  const [schoolName, setSchooolName] = useState('');
  const [schoolId, setSchooolId] = useState('');
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return;
  }

  const submitSchool = async (e) => {

    e.preventDefault();

    try {

      if (schoolName.length === 0 || schoolId.length === 0) {
        console.error('Enter both school name and school acronym');
        return;
      }

      await setSchool(schoolName, schoolId);
      setSchooolId('');
      setSchooolName('');
    } catch (err) {
      console.error('Add school: ', err.message);
    }
  }

  return (
    <form 
      onSubmit={submitSchool}
      className={'space-y-2 bg-gray-100 border rounded p-4'}>

      <p className={'font-medium'}>Admin</p>

      <div className={'grid gap-4 justify-items-start'}>
        <input
          name={'schoolName'}
          placeholder={'School Name'}
          value={schoolName}
          className={'border border-gray-400 rounded p-2'}
          onChange={(e) => {setSchooolName(e.target.value);}}
          type={'text'}
        />

        <input
          name={'schoolAcronym'}
          placeholder={'School Acronym (E.g. uct)'}
          value={schoolId}
          className={'border border-gray-400 rounded p-2'}
          onChange={(e) => {setSchooolId(e.target.value);}}
          type={'text'}
        />

        <PrimaryButton
          buttonType={'submit'}
          onClick={submitSchool}>
            
          Add School
        </PrimaryButton>
      </div>
    </form>
  )
}