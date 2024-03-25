import { Icons } from '@/assets/icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useDeleteQuestion } from '@/helpers/api/useQuestion';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function DeleteDialog({
  isOpen,
  onClose,
  id,
  refetch,
}: {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  refetch: () => void;
}) {
  const {
    isLoading: deletingQuestion,
    isError: isDeleterror,
    isSuccess: deleteSuccess,
    mutate: deleteQuestion,
  } = useDeleteQuestion(id ?? '');

  useEffect(() => {
    if (deleteSuccess) {
      toast.success('Question deleted successfully');
      refetch();
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteSuccess, refetch]);

  useEffect(() => {
    if (isDeleterror) {
      toast.error('Error deleting question');
    }
  }, [isDeleterror]);
  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={() => {
        onClose();
      }}
    >
      <AlertDialogContent data-testid="deletion-modal">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            question and remove it data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deletingQuestion}>
            Cancel
          </AlertDialogCancel>
          <Button
            className="bg-destructive hover:bg-destructive/80"
            disabled={deletingQuestion}
            onClick={() => {
              deleteQuestion(id);
            }}
          >
            {deletingQuestion && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
