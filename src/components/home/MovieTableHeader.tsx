import { TableHead, TableRow } from "@/components/ui/table";

const MovieTableHeader = () => (
  <TableRow className="bg-muted text-muted-foreground font-bold">
    <TableHead className="w-[300px]">Title</TableHead>
    <TableHead>Type</TableHead>
    <TableHead>Director</TableHead>
    <TableHead className="text-center">Budget</TableHead>
    <TableHead>Location</TableHead>
    <TableHead>Year/Time</TableHead>
    <TableHead>Actions</TableHead>
  </TableRow>
);

export default MovieTableHeader;
