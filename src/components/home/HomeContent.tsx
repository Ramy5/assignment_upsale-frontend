// HomeContent.tsx
import { useState } from "react";
import MovieTable from "./MovieTable";
import TableFilter from "./TableFilter";
import type { Filter } from "@/validation/filter-schema";

const HomeContent = () => {
  const [filter, setFilter] = useState<Filter | null>(null);

  return (
    <div className="space-y-8">
      <TableFilter onFilter={setFilter} />
      <MovieTable filter={filter} />
    </div>
  );
};

export default HomeContent;
