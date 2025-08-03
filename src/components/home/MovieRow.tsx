import { SquarePen, Trash2 } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import type { MovieFormData } from "@/validation/movie-schema";

type Props = {
  movie: MovieFormData & { _id: string };
  onEdit: () => void;
  onDelete: () => void;
  refProp?: (node: HTMLTableRowElement | null) => void;
};

const MovieRow = ({ movie, onEdit, onDelete, refProp }: Props) => (
  <TableRow ref={refProp}>
    <TableCell className="font-medium">{movie.title}</TableCell>
    <TableCell>{movie.type}</TableCell>
    <TableCell>{movie.director}</TableCell>
    <TableCell className="text-center">${movie.budget}</TableCell>
    <TableCell>{movie.location}</TableCell>
    <TableCell>{movie.year}</TableCell>
    <TableCell className="flex items-center gap-2">
      <Trash2
        onClick={onDelete}
        className="text-red-600 cursor-pointer"
        size={20}
      />
      <SquarePen
        onClick={onEdit}
        className="text-blue-600 cursor-pointer"
        size={20}
      />
    </TableCell>
  </TableRow>
);

export default MovieRow;
