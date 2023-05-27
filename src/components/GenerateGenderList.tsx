// const countryListAllIsoData = [
//   { value: "female", name: "Female" },
//   { value: "male", name: "Male" },
//   { value: "other", name: "Other" },
// ];

import { useTranslate } from "@refinedev/core";

export default function GenerateGenderList() {
  const t = useTranslate();
  // return <>segseg</>;
  return [
    { id: 1, value: "female", name: t("gender.female") },
    { id: 2, value: "male", name: t("gender.male") },
    { id: 3, value: "other", name: t("gender.other") },
  ];
}

// export default genderList;
