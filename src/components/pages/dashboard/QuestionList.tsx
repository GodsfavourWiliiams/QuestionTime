'use client';

import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import useDisclosure from '@/hooks/useDisclosure';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { PlusIcon } from '@radix-ui/react-icons';
import { QuestionTable } from './Table';
// import { zodResolver } from '@hookform/resolvers/zod';

type Props = {};

const QuestionList = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const form = useForm({
    // resolver: zodResolver(),
  });

  const onSubmit = () => {
    onClose();
  };

  return (
    <>
      <div className="flex flex-col gap-6 border py-5 md:py-6 bg-white border-[#F0F5F8] rounded-2xl w-full">
        <div className="flex items-center justify-between text-primary w-full px-5 md:px-6">
          <h1 className="font-semibold text-2xl">All Questions</h1>
          <Button
            variant="default"
            className="w-fit font-semibold flex items-center gap-1.5 p-6"
            onClick={onOpen}
          >
            <PlusIcon />
            New Question
          </Button>
        </div>
        <QuestionTable />
      </div>
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          onClose();
        }}
      >
        <DialogContent className="sm:max-w-[687px] outline-none">
          <DialogHeader className="gap-1.5">
            <DialogTitle className="text-lg">
              {' '}
              Create a new question
            </DialogTitle>
            <DialogDescription className="text-base font-normal text-[#687588]">
              Provide details about your question here.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="flex flex-col gap-4 mt-3"
              onSubmit={(e) => {
                e.preventDefault(); // Prevent the default form submission
                onSubmit();
              }}
            >
              <h1>Body</h1>
              {/* Assuming PaymentForm is a separate component */}
              <DialogFooter>
                <Button
                  type="submit"
                  size="lg"
                  className="rounded-xl p-3.5 text-s w-full mt-4 text-white h-[52px]"
                  variant="default"
                  disabled={false}
                >
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
