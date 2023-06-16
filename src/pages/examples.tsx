import { api } from "~/utils/api";

export default function Examples() {
  // Task 1: Display the data from the getAll query in a list,
  //         while it is loading display a loading indicator (i.e. a text saying "Loading...")
  // Task 2: Add a button to each item in the list that will delete the item, by calling,
  // the 'deleteSingle' mutation.
  // Task 3: Implement the 'deleteSingle' mutation, and make sure the list updates when an item is deleted

  // vanillaApi.example.getAll();

  const ctx = api.useContext();

  const getExamplesQuery = api.example.getAll.useQuery();

  const deleteExampleMutation = api.example.deleteSingle.useMutation({
    onSuccess: () => {
      void ctx.example.getAll.invalidate();
    },
  });

  return (
    <div className="p-4">
      {getExamplesQuery.isLoading && <div>Loading...</div>}

      {getExamplesQuery.isFetching && <div>Refetching...</div>}

      {deleteExampleMutation.isLoading && <div>Deleting example...</div>}

      {getExamplesQuery.isSuccess &&
        getExamplesQuery.data.map((example) => (
          <div key={example.id} className="mb-4 rounded-xl bg-gray-200 p-4">
            Example ID: {example.id}
            <button
              className="ml-4 rounded-lg bg-red-500 p-2 text-white"
              onClick={() =>
                deleteExampleMutation.mutate({
                  id: example.id,
                })
              }
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}
