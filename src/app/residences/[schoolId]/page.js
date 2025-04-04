import {
  AddResidence,
} from "@/containers/admin/AddResidence";

import {
  getResidences,
  getSchoolById,
} from "@/lib/reads";

import Link from "next/link";

export async function generateMetadata({ params }) {
  
  const {schoolId} = await params;
  const {schoolName} = await getSchoolById(schoolId);

  return {
    title: `${schoolId.toUpperCase()} Residences`,
    description: `${schoolName} Res Reviews`
  };
}

export default async function Page ({ params }) {

  const {schoolId} = await params;
  const school = await getSchoolById(schoolId);
  const residences = await getResidences(schoolId);
  const schoolName = school.schoolName;

  return (
    <div className={'space-y-8'}>
 
      <div className={'space-y-2'}>

        <Link
          className={'block text-sm hover:underline'}
          href={'/'}>

          &#8592; All Schools
        </Link>

        <h1 className={'text-3xl font-bold'}>
          {schoolName} Residences
        </h1>

        <p>
          Browse {residences.length} residence{residences.length !== 1 && <>s</>}
        </p>
      </div>

      <ul>

        {residences.map((residence, index) => {
          return (
            <li 
              key={index}>

              <Link 
                href={`/reviews/${schoolId}/${residence.residenceId}`}
                className={'hover:underline'}>

                {residence.residenceName}
              </Link>
            </li>
          )
        })}
      </ul>

      <AddResidence
        schoolId={schoolId}
        schoolName={schoolName}
      />
    </div>
  );
}