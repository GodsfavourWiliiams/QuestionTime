import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Icons } from '@/assets/icons';
import useDisclosure from '@/hooks/useDisclosure';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { OptionField } from './optionsForm';
import { OptionsFormData } from './QuestionList';
import { useUpdateQuestion } from '@/helpers/api/useQuestion';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { DeleteDialog } from './DeleteDialog';

interface DataTableRowActionsProps {
  row: any;
  refetch: () => void;
}

export function DataTableRowActions({
  row,
  refetch,
}: DataTableRowActionsProps) {
  const question = row.original;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const {
    isLoading: updatingQuestion,
    isError: isUpdateError,
    isSuccess: updateSuccess,
    mutate: update,
  } = useUpdateQuestion(question?.id ?? '');

  useEffect(() => {
    if (updateSuccess) {
      toast.success('Question updated successfully');
      refetch();
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSuccess, refetch]);

  useEffect(() => {
    if (isUpdateError) {
      toast.error('Error updating question');
    }
  }, [isUpdateError]);

  const optionsDefaultValues: OptionsFormData = {
    question: question?.question ?? '',
    options: question?.options?.map((option: string) => ({ option: option })),
  };
  const form = useForm({
    defaultValues: optionsDefaultValues,
  });

  const {
    formState: { errors },
  } = form;

  const onSubmit = () => {
    form.handleSubmit((data: any) => {
      const optionsArray = data.options.map(
        (item: { option: string }) => item.option
      );
      // Remove the original 'goals' field from the data object
      delete data.options;
      data.options = optionsArray;
      update(data);
    })();
  };

  return (
    <>
      <div className="flex items-center gap-2 justify-end w-full">
        <Button
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          className="flex h-8 w-8 p-0 hover:bg-[#1c3267]/80 bg-[#1c3267]"
        >
          <Icons.EditIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteOpen();
          }}
          className="flex h-8 w-8 p-0 hover:bg-[#E03137]/80 bg-[#E03137] "
        >
          <Icons.DeleteIcon className="w-4 h-4 text-white" />
        </Button>
      </div>
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          onClose();
          form.reset(question);
        }}
      >
        <DialogContent className="sm:max-w-[500px] outline-none">
          <DialogHeader className="gap-1.5">
            <DialogTitle className="text-lg"> Update question</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault(); // Prevent the default form submission
                onSubmit();
              }}
            >
              <FormField
                control={form.control}
                name="question"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    {' '}
                    <FormLabel>Question</FormLabel>
                    <FormControl className="w-full">
                      <Input
                        autoFocus
                        error={!!errors.question}
                        {...field}
                        id="question"
                        placeholder="How may I help you today?"
                        type="text"
                        autoCapitalize="none"
                        autoCorrect="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <OptionField
                control={form.control}
                errors={errors}
                name="options"
              />
              <DialogFooter>
                <Button
                  type="submit"
                  size="lg"
                  className="rounded-xl p-3.5 text-s w-full mt-4 text-white h-[52px]"
                  variant="default"
                  disabled={updatingQuestion}
                >
                  {updatingQuestion && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Update
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <DeleteDialog
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        id={question?.id}
        refetch={refetch}
      />
    </>
  );
}
