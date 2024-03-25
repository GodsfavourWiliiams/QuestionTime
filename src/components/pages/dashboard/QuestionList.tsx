'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import useDisclosure from '@/hooks/useDisclosure';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import { QuestionTable } from './Table';
import { useCreateQuestions, useGetQuestions } from '@/helpers/api/useQuestion';
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
import { toast } from 'sonner';
import { useEffect } from 'react';
import { Icons } from '@/assets/icons';

export interface OptionsFormData {
  question: string;
  options: {
    option: string;
  }[];
}

const QuestionList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, data: payload, refetch } = useGetQuestions();
  const {
    isLoading: creatingQuestion,
    isError: isQuestionError,
    isSuccess: questionSuccess,
    mutate,
  } = useCreateQuestions();
  const optionsDefaultValues: OptionsFormData = {
    question: '',
    options: [{ option: '' }, { option: '' }, { option: '' }],
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
      mutate(data);
    })();
  };

  const dataArray = payload
    ? Object.keys(payload).map((key) => ({
        id: key,
        ...payload[key],
      }))
    : [];

  useEffect(() => {
    if (questionSuccess) {
      toast.success('Question created successfully');
      refetch();
      form.reset(optionsDefaultValues);
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionSuccess, refetch]);

  useEffect(() => {
    if (isQuestionError) {
      toast.error('Error creating question');
    }
  }, [isQuestionError]);

  return (
    <>
      <div className="flex flex-col gap-6 border py-4 md:py-6 bg-white border-[#F0F5F8] rounded-2xl w-full">
        <div className="flex items-center justify-between text-primary w-full px-4 md:px-6">
          <h1 className="font-semibold text-xl sm:text-2xl">All Questions</h1>
          <Button
            variant="default"
            className="w-fit font-semibold flex items-center gap-1.5 p-3 sm:p-6"
            onClick={onOpen}
          >
            <PlusIcon />
            <p className="hidden sm:block">New Question</p>
          </Button>
        </div>
        <QuestionTable
          isLoading={isLoading}
          data={dataArray ?? []}
          refetch={refetch}
        />
      </div>
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          onClose();
        }}
      >
        <DialogContent
          className="sm:max-w-[500px] h-auto sm:h-fit outline-none"
          data-testid="new_dialog"
        >
          <DialogHeader className="gap-1.5">
            <DialogTitle className="text-lg">
              {' '}
              Create a new question
            </DialogTitle>
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
                  className="rounded-xl p-3.5 text-s w-full text-white h-[52px]"
                  variant="default"
                  disabled={creatingQuestion}
                >
                  {creatingQuestion && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuestionList;
