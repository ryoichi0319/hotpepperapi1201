import React from "react";
import {PrefCategory} from "@/data/prefecture"

const SelectLargeServiceArea = ({large_service_area}:{large_service_area: string | undefined}) => {
  return (
    <select>
      {PrefCategory.map((category, index) => (
        <option key={index} value={large_service_area}>
          {category.category_name}
        </option>
      ))}
    </select>
  );
};

export default SelectLargeServiceArea;