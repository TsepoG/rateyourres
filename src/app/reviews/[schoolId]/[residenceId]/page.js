import {
  getResidenceById,
  getReviews,
} from "@/lib/reads";

import Link from "next/link";

export async function generateMetadata({ params }) {
  
  const { schoolId, residenceId } = await params;
  const residence = await getResidenceById(schoolId, residenceId);
  const residenceName = residence.residenceName;

  return {
    title: `${residenceName} Reviews`
  };
}

export default async function Page ({ params }) {

  const { schoolId, residenceId } = await params;
  const residence = await getResidenceById(schoolId, residenceId);
  const residenceName = residence.residenceName;
  const reviews = await getReviews(residenceId);

  return (
    <div className={'space-y-8'}>

      <div className={'space-y-2'}>

        <Link
          className={'block text-sm hover:underline'}
          href={`/residences/${residence.schoolId}`}>

          &#8592; {residence.schoolName} Residences
        </Link>

        <h1 className={'text-3xl font-bold'}>{residenceName} Reviews</h1>
      </div>
      
      <div className={'space-y-4'}>

        {reviews.map((review, index) => {
          return (
            <div key={index}>
              <p>School : {review.schoolName}</p>
              <p>Residence : {review.residenceName}</p>
              <p>Comment : {review.comment}</p>
              <p>Rate : {review.rating}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
}