import { useState, useEffect } from "react";
import type { Filter } from "@/validation/filter-schema";
import type { MovieFormData } from "@/validation/movie-schema";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";

type Movie = MovieFormData & { _id: string };

export function useMovies(filter: Filter | null) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [scrollingLoading, setScrollingLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const buildQuery = (filter: Filter | null) => {
    const params = new URLSearchParams();
    Object.entries(filter || {}).forEach(([key, val]) => {
      if (val) params.append(key, val.toString());
    });
    return `&${params.toString()}`;
  };

  const fetchMovies = async (pageNum = 1, isNewFilter = false) => {
    setLoading(true);
    setScrollingLoading(true);
    try {
      const res = await axiosInstance(
        `/movies?page=${pageNum}${buildQuery(filter)}`
      );
      const newMovies = res.data.data.movies;
      const totalPages = res.data.pages;

      setMovies((prev) => (isNewFilter ? newMovies : [...prev, ...newMovies]));
      setHasMore(pageNum < totalPages);
      setPage(pageNum);
    } finally {
      setLoading(false);
      setScrollingLoading(false);
    }
  };

  const deleteMovie = async (id: string) => {
    setDeleteLoading(true);
    try {
      await axiosInstance.delete(`/movies/${id}`);
      fetchMovies(page, true);
      toast.success("Movie deleted successfully!");
    } finally {
      setDeleteLoading(false);
    }
  };

  const editMovie = async (id: string, data: MovieFormData) => {
    await axiosInstance.patch(`/movies/${id}`, data);
    fetchMovies(page, true);
    toast.success("Movie updated successfully!");
  };

  useEffect(() => {
    fetchMovies(1, true);
  }, [filter]);

  return {
    movies,
    page,
    hasMore,
    loading,
    scrollingLoading,
    deleteLoading,
    fetchMovies,
    deleteMovie,
    editMovie,
  };
}
