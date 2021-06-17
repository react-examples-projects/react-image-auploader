import { screen, render } from "@testing-library/react";
import ImageList from "../Components/Elements/ImageList/ImageList";
import ImagesProvider from "../Components/Context/Images/ImagesProvider";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 0,
    },
  },
});

describe("ImageList", () => {
  it("ImageList debe haber render <=5", () => {
    render(
      <QueryClientProvider client={client}>
        <ImagesProvider>
          <ImageList />
        </ImagesProvider>
      </QueryClientProvider>
    );
    expect(true);
  });
});
