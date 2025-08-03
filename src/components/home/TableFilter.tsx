// TableFilter.tsx
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import filterSchema, { type Filter } from "@/validation/filter-schema";

type Props = {
  onFilter: (data: Filter) => void;
};

const TableFilter = ({ onFilter }: Props) => {
  const { register, handleSubmit, setValue, watch } = useForm<Filter>({
    resolver: zodResolver(filterSchema),
  });

  const onSubmit = (data: Filter) => {
    onFilter(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 items-center gap-4"
    >
      <Input {...register("title")} placeholder="Title" />

      <Select
        onValueChange={(value) => {
          setValue("type", value);
        }}
        defaultValue={watch("type")}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Movie Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="movie">Movie</SelectItem>
          <SelectItem value="tv_show">TV Show</SelectItem>
        </SelectContent>
      </Select>

      <Input {...register("director")} placeholder="Director" />
      <Input {...register("budget")} placeholder="Budget" />
      <Input {...register("year")} placeholder="Year" />

      <Button type="submit" className="cursor-pointer">
        Filter
      </Button>
    </form>
  );
};

export default TableFilter;
