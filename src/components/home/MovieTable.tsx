import { Table, TableBody, TableHeader } from "@/components/ui/table";
import MovieDialog from "./MovieDialog";
import MovieRow from "./MovieRow";
import MovieTableHeader from "./MovieTableHeader";
import DeleteDialog from "./DeleteDialog";
import Loading from "../ui/Loading";
import { useEffect, useState } from "react";
import type { Filter } from "@/validation/filter-schema";
import type { MovieFormData } from "@/validation/movie-schema";
import { useMovies } from "@/hooks/useMovies";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

type Props = {
  filter: Filter | null;
  reloadKey: number;
};

const MovieTable = ({ filter, reloadKey }: Props) => {
  const {
    movies,
    hasMore,
    page,
    loading,
    scrollingLoading,
    deleteLoading,
    fetchMovies,
    deleteMovie,
    editMovie,
  } = useMovies(filter);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editData, setEditData] = useState<
    (MovieFormData & { _id: string }) | null
  >(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleEdit = (movie: MovieFormData & { _id: string }) => {
    setEditData(movie);
    setEditDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteMovie(deleteId);
    setDeleteDialogOpen(false);
    setDeleteId(null);
  };

  const lastRowRef = useInfiniteScroll(() => {
    if (hasMore) fetchMovies(page + 1);
  }, [hasMore, page]);

  const onEditSubmit = async (data: MovieFormData) => {
    if (editData?._id) {
      await editMovie(editData._id, data);
      setEditDialogOpen(false);
      setEditData(null);
    }
  };

  useEffect(() => {
    fetchMovies(1, true);
  }, [reloadKey]);

  if (loading && (!scrollingLoading || !deleteLoading)) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <MovieTableHeader />
        </TableHeader>
        <TableBody>
          {(!loading || scrollingLoading || deleteLoading) &&
          movies.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-4">
                There are no movies to show at the moment
              </td>
            </tr>
          ) : (
            movies.map(
              (movie: MovieFormData & { _id: string }, index: number) => {
                const isLast = index === movies.length - 1;
                return (
                  <MovieRow
                    key={movie._id}
                    movie={movie}
                    onEdit={() => handleEdit(movie)}
                    onDelete={() => {
                      setDeleteId(movie._id);
                      setDeleteDialogOpen(true);
                    }}
                    refProp={isLast ? lastRowRef : undefined}
                  />
                );
              }
            )
          )}
        </TableBody>
      </Table>

      {scrollingLoading && (
        <div className="flex justify-center items-center py-4">
          <Loading />
        </div>
      )}

      <MovieDialog
        isOpen={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSubmit={onEditSubmit}
        initialData={editData}
      />

      <DeleteDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        isLoading={deleteLoading}
      />
    </>
  );
};

export default MovieTable;
