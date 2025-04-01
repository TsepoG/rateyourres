import {
  getSchools,
} from "@/lib/reads";

import {
  AddSchool,
} from "@/containers/admin/AddSchool";

import Link from "next/link";

export default async function Home() {
  const schools = await getSchools();
  return (
    <div 
      className={'space-y-8'}>

      <h1 className={'text-3xl font-medium'}>
        Rate Your University Residence
      </h1>

      <div>

        <p className={'font-medium'}>Select your school</p>

        { schools.map((school, index) => (
            <Link
              className={'block hover:underline'}
              href={`/residences/${school.schoolId}`}
              key={index}>
                
              {school.schoolName}
            </Link>
          ))
        }
      </div>

      <AddSchool/>
    </div>
  );
}
