'use client';

import { PrimaryButton } from "@/components/Button";
import {
  useAuth,
} from "@/lib/useAuth";
import { setReview } from "@/lib/writes";

import {
  useState,
} from "react";

export const WriteReview = ({
    residence,
    school,
}) => {

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const { user } = useAuth();

  const submitReview = async (event) => {

    event.preventDefault();

    if (comment.length === 0 || rating <= 0) {
      console.log('Please Enter both comment and rating!!');
      return;
    }

    if (!user) {
      console.log('User not logged in!!');
      return;
    }

    try {
      
      const revew = {
        comment: comment,
        rating: rating,
        residenceId: residence?.residenceId,
        residenceName: residence?.residenceName,
        schoolId: school?.schoolId,
        schoolName: school?.schoolName,
        userId: user?.uid
      }

      const response = await setReview(revew);
      
      if (!response) {
        console.log('Review submission unsuccessful!!');
        return;
      }

      setComment('');
      setRating(0);

      console.log('Review Submitted Sucessfully!');
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div>

      <form
        onSubmit={submitReview}
        className={'space-y-8'}
        >

        <div className={'space-y-1'}>

          <p
            className={'font-medium'}
            >
              
            Rate the residence
          </p>

          <input
            type={'number'}
            placeholder={'Enter rating 1-5'}
            onChange={(e) => setRating(Number(e.target.value))}
            value={rating}
            min={1}
            max={5}
            className={'w-full border-gray-400 border p-2 rounded'}
          />
        </div>
        
        <div className={'space-y-1'}>

          <p
            className={'font-medium'}
            >
              
            Tell us about your experience
          </p>

          <textarea
            rows={'4'}
            value={comment}
            placeholder={'Write a comment'}
            onChange={(e) => setComment(e.target.value)}
            className={'w-full border-gray-400 border p-2 rounded'}
          />
        </div>

        <PrimaryButton
          buttonType={'submit'}
          onClick={submitReview}>

          Submit Review
        </PrimaryButton>
      </form>
    </div>
  )
}