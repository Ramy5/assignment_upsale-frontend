import { useState } from "react";
import HomeContent from "./components/home/HomeContent";
import { Button } from "./components/ui/button";
import MovieDialog from "./components/home/MovieDialog";
import type { MovieFormData } from "./validation/movie-schema";
import axiosInstance from "./lib/axios";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchMovies = async () => {
    try {
      await axiosInstance(`/movies`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (data: MovieFormData) => {
    setIsLoading(true);
    try {
      await axiosInstance.post("/movies", data);
      handleFetchMovies();
      toast.success("Movie added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add movie.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="p-8 space-y-8">
        <Button onClick={() => setOpen(true)} className="cursor-pointer">
          Add New Favorite Movie
        </Button>

        <HomeContent />
      </div>

      <MovieDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
}

export default App;
