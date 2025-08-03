import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
};

const DeleteDialog = ({ isOpen, onClose, onConfirm, isLoading }: Props) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your movie.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button
            className="cursor-pointer"
            disabled={isLoading}
            onClick={onClose}
          >
            Cancel
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            className="cursor-pointer"
            variant="destructive"
            disabled={isLoading}
            onClick={onConfirm}
          >
            Delete
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default DeleteDialog;
