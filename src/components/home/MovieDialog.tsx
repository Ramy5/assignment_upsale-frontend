import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { MovieFormData } from "@/validation/movie-schema";
import movieSchema from "@/validation/movie-schema";

type MovieDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: any;
  initialData?: MovieFormData | null;
  isLoading?: boolean;
};

const MovieDialog: React.FC<MovieDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema),
    defaultValues: initialData || {
      title: "",
      type: "movie",
      director: "",
      budget: "",
      location: "",
      duration: "",
      year: "",
      details: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: MovieFormData) => {
    onSubmit(data);
    if (!initialData) {
      reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Movie" : "Add New Movie"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="space-y-4 grid md:grid-cols-2 gap-4 overflow-y-auto max-h-[70vh]">
            <div className="space-y-1">
              <Input placeholder="Title" {...register("title")} />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Select
                defaultValue={initialData?.type || "movie"}
                onValueChange={(value) =>
                  setValue("type", value as "movie" | "tv_show")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="movie">Movie</SelectItem>
                  <SelectItem value="tv_show">TV Show</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-red-500 text-sm">{errors.type.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Input placeholder="Director" {...register("director")} />
              {errors.director && (
                <p className="text-red-500 text-sm">
                  {errors.director.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Input placeholder="Budget" {...register("budget")} />
              {errors.budget && (
                <p className="text-red-500 text-sm">{errors.budget.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Input placeholder="Location" {...register("location")} />
              {errors.location && (
                <p className="text-red-500 text-sm">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Input placeholder="Duration" {...register("duration")} />
              {errors.duration && (
                <p className="text-red-500 text-sm">
                  {errors.duration.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Input placeholder="Year" {...register("year")} />
              {errors.year && (
                <p className="text-red-500 text-sm">{errors.year.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Textarea placeholder="Details" {...register("details")} />
              {errors.details && (
                <p className="text-red-500 text-sm">{errors.details.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-8">
            <Button
              type="button"
              className="cursor-pointer"
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              type="submit"
              className="cursor-pointer"
            >
              {initialData ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MovieDialog;
