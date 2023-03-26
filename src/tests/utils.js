import { MemoryRouter, Routes } from "react-router-dom";

//  initialEntries 처음 시작하는 경로
export function withRouter(routes, initialEntry = "/") {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <Routes>{routes}</Routes>
    </MemoryRouter>
  );
}
