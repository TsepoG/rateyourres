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
import { setResidence } from "@/lib/writes";

export const AddResidence = ({
  schoolId,
  schoolName
}) => {
  
  const [residenceName, setResidenceName] = useState('');
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return;
  }

  const submitResidence = async (e) => {

    e.preventDefault();

    try {

      if (
        residenceName.length === 0 ||
        schoolName.length === 0 ||
        schoolId.length === 0
      ) {
        console.error('School name and residence name are required');
        return;
      }

      await setResidence(residenceName, schoolName, schoolId);
      setResidenceName('')
    } catch(err) {
      console.error('Add residence: ', err.message);
    }
  }

  return (
    <form 
      className={'space-y-2 bg-gray-100 border rounded p-4'}
      onSubmit={submitResidence}>

      <p className={'font-medium'}>Admin</p>

      <div className={'grid gap-4 justify-items-start'}>

        <input
          name={'schoolName'}
          type={'text'}
          className={'border border-gray-400 rounded p-2'}
          value={schoolName}
          readOnly
        />

        <input
          name={'residenceName'}
          type={'text'}
          className={'border border-gray-400 rounded p-2'}
          value={residenceName}
          placeholder={'Residence Name'}
          onChange={(e) => setResidenceName(e.target.value)}
        />

        <PrimaryButton
          onClick={submitResidence}
          buttonType={'submit'}>

          Add Residence
        </PrimaryButton>
      </div>
    </form>
  )
}