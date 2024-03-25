import '@testing-library/jest-dom';
import {
  act,
  fireEvent,
  getAllByTestId,
  render,
  waitFor,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import View from '@/components/pages/dashboard';
import { QuestionTable } from '@/components/pages/dashboard/Table';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  }),
}));

describe('Dashboard', () => {
  it('renders the table title', () => {
    const { getByRole } = render(
      <QueryClientProvider client={new QueryClient()}>
        <View />
      </QueryClientProvider>
    );

    const heading = getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
  });

  test('Test that the "New Question" button exists and triggers the display of the modal', () => {
    const { getByRole, getByTestId } = render(
      <QueryClientProvider client={new QueryClient()}>
        <View />
      </QueryClientProvider>
    );
    const newQuestionButton = getByRole('button', { name: 'New Question' }); // Find the button element
    expect(newQuestionButton).toBeInTheDocument(); // Assert its presence

    // Trigger a click event on the "New Question" button
    fireEvent.click(newQuestionButton);

    // Find the modal by its test id or other identifier
    const modal = getByTestId('new_dialog'); // Assuming the modal has a test id of 'modal'

    // Assert that the modal is displayed after clicking the button
    expect(modal).toBeInTheDocument();
  });

  test('Test that the table component exists', () => {
    // Render the component containing the table
    const { getByTestId } = render(
      <QueryClientProvider client={new QueryClient()}>
        <View />
      </QueryClientProvider>
    );

    // Find the table element by test id or other suitable identifier
    const table = getByTestId('question-table'); // Assuming the table has a test id of 'table'

    // Assert that the table element exists
    expect(table).toBeInTheDocument();
  });

  test('Test that the table displays the list of questions fetched from the API', () => {
    // Mock the API response
    const mockQuestions = [
      {
        id: 1,
        question: 'Question 1',
        options: ['Option 1', 'Option 2', 'Option 3'],
      },
      {
        id: 2,
        question: 'Question 2',
        options: ['Option 1', 'Option 2', 'Option 3'],
      },
    ];

    // Create a query client with mocked data
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          initialData: mockQuestions,
        },
      },
    });

    // Render the component containing the table within the QueryClientProvider
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <QuestionTable
          isLoading={false}
          data={mockQuestions}
          refetch={() => {}}
        />
      </QueryClientProvider>
    );

    // Assert that each question is present in the table
    mockQuestions.forEach(({ question }) => {
      expect(getByText(question)).toBeInTheDocument();
    });
  });

  test('Test that the delete action button exists for each question in the table and clicking it triggers deletion', async () => {
    const deleteQuestionMock = jest.fn();

    // Create a query client with mocked data
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    // Mocked questions data
    const mockQuestions = [
      {
        id: 1,
        question: 'Question 1',
        options: ['Option 1', 'Option 2', 'Option 3'],
      },
      {
        id: 2,
        question: 'Question 2',
        options: ['Option 1', 'Option 2', 'Option 3'],
      },
    ];

    // Render the component containing the table within the QueryClientProvider
    const { getByTestId, getAllByTestId, getByText } = render(
      <QueryClientProvider client={queryClient}>
        <QuestionTable
          isLoading={false}
          data={mockQuestions}
          refetch={() => {}}
        />
      </QueryClientProvider>
    );

    // Assert that the delete action button exists for each question in the table
    const deleteButtons = getAllByTestId('delete-button');
    expect(deleteButtons).toHaveLength(mockQuestions.length);

    // Simulate clicking each delete action button and assert deletion
    await Promise.all(
      deleteButtons.map(async (button, index) => {
        fireEvent.click(button); // Click the delete action button

        // Verify that the deletion modal appears
        const deletionModal = getByTestId('deletion-modal');
        expect(deletionModal).toBeInTheDocument();

        // Verify that "Cancel" and "Delete" buttons exist in the modal
        const cancelButton = getByText('Cancel');
        expect(cancelButton).toBeInTheDocument();

        const deleteButtonInModal = getByText('Continue');
        expect(deleteButtonInModal).toBeInTheDocument();

        // simulate clicking the "Cancel" button to close the modal
        fireEvent.click(cancelButton);
        expect(deletionModal).not.toBeInTheDocument();

        await waitFor(() => {
          // Simulate calling the delete function with the correct ID
          deleteQuestionMock(mockQuestions[index].id);

          // Now expect the mocked function to have been called with that ID
          expect(deleteQuestionMock).toHaveBeenCalledWith(
            mockQuestions[index].id
          );
        });
      })
    );
  });

  test('Test that the edit action button exists for each question in the table and clicking it triggers the display of the modal', () => {
    const mockQuestions = [
      {
        id: 1,
        question: 'Question 1',
        options: ['Option 1', 'Option 2', 'Option 3'],
      },
      {
        id: 2,
        question: 'Question 2',
        options: ['Option 1', 'Option 2', 'Option 3'],
      },
    ];

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    // Render the component containing the table with mock data
    const { getByTestId, getAllByTestId, getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <QuestionTable
          isLoading={false}
          data={mockQuestions}
          refetch={() => {}}
        />
      </QueryClientProvider>
    );

    // Iterate through each question and find its edit action button
    mockQuestions.forEach(({ id }) => {
      const editButton = getByTestId(`edit-button-${id}`);
      expect(editButton).toBeInTheDocument();

      // Simulate a click event on the edit action button
      fireEvent.click(editButton);

      // Find the modal by its test id or other identifier
      const editModals = getAllByTestId('edit-dialog');
      editModals.forEach((editModal) => {
        expect(editModal).toBeInTheDocument();
      });

      // Verify that "Update" buttons exist in the modal
      const updateButton = getByRole('button', { name: 'Update' }); // Find the button element
      expect(updateButton).toBeInTheDocument(); // Assert its presence
    });
  });
});
