import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SquarePen, Trash2 } from "lucide-react";
import MovieDialog from "./MovieDialog";
import { useEffect, useState } from "react";
import type { MovieFormData } from "@/validation/movie-schema";
import axiosInstance from "@/lib/axios";
import Loading from "../ui/Loading";
import type { Filter } from "@/validation/filter-schema";

const MovieTable = ({ filter }: { filter: Filter | null }) => {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [movies, setMovies] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editData, setEditData] = useState<
    (MovieFormData & { _id: string }) | null
  >(null);

  const buildQuery = (filter: Filter | null) => {
    if (!filter) return "";
    const queryParams = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (value) queryParams.append(key, value.toString());
    });
    return `?${queryParams.toString()}`;
  };

  const handleEdit = (data: MovieFormData & { _id: string }) => {
    setEditData(data);
    setOpen(true);
  };

  const handleDelete = async (_id: string) => {
    setDeleteLoading(true);
    try {
      await axiosInstance.delete(`/movies/${_id}`);
      handleFetchMovies();
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleFetchMovies = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance(`/movies${buildQuery(filter)}`);
      setMovies(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchMovies();
  }, [filter]);

  const onEditSubmit = async (data: MovieFormData) => {
    try {
      await axiosInstance.patch(`/movies/${editData?._id}`, data);
      handleFetchMovies();
      setOpen(false);
      setEditData(null);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading || deleteLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loading />;
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableCaption>A list of your favorite movies</TableCaption>
        <TableHeader className="bg-muted text-muted-foreground font-bold">
          <TableRow>
            <TableHead className="w-[300px]">Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Director</TableHead>
            <TableHead className="text-center">Budget</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Year/Time</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movies?.data?.movies?.map(
            (movie: MovieFormData & { _id: string }) => (
              <TableRow key={movie._id}>
                <TableCell className="font-medium">{movie.title}</TableCell>
                <TableCell>{movie.type}</TableCell>
                <TableCell>{movie.director}</TableCell>
                <TableCell className="text-center">${movie.budget}</TableCell>
                <TableCell>{movie.location}</TableCell>
                <TableCell>{movie.year}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Trash2
                    onClick={() => handleDelete(movie._id)}
                    size={20}
                    className="text-red-600 cursor-pointer"
                  />
                  <SquarePen
                    size={20}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onClick={() => handleEdit(movie as any)}
                    className="text-blue-600 cursor-pointer"
                  />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>

      <MovieDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={onEditSubmit}
        initialData={editData}
      />
    </>
  );
};

export default MovieTable;
