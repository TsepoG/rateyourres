'use client';

import { 
  signInWithGoogle,
  signOutfromGoogle,
} from "@/lib/firebase";

import {
  useAuth,
} from "@/lib/useAuth";

import Link from "next/link";

export const Header = () => {

  const {user, loading} = useAuth();

  return (
    <div className='py-4 px-8 border-b font-medium flex justify-between'>

      <Link
        href={'/'}>
 
        RateYourRes
      </Link>

      { !loading &&

        <button 
          type='button'
          className='hover:underline'
          onClick={user ? signOutfromGoogle : signInWithGoogle}>

          Log {
            user ? <>Out</> : <>In</>
          }
        </button>
      }
    </div>
  )
}