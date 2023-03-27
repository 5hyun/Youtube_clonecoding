import { MemoryRouter, Routes } from "react-router-dom";
import { YoutubeApiContext } from "../context/YoutubeApiContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//  initialEntries 처음 시작하는 경로
export function withRouter(routes, initialEntry = "/") {
  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>{routes}</Routes>
    </MemoryRouter>
  );
}

export function withAllContexts(children, youtube) {
  const testClient = createTestQueryClient();
  return (
    <YoutubeApiContext.Provider value={youtube}>
      <QueryClientProvider client={testClient}>{children}</QueryClientProvider>
    </YoutubeApiContext.Provider>
  );
}

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });
}
