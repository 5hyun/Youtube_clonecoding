import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";
import { Route } from "react-router-dom";
import SearchHeader from "../SearchHeader";
import { withRouter } from "../../tests/utils";

describe("SearchHeader", () => {
  // 스냅샷 테스트
  it("renders correctly ", () => {
    const component = renderer.create(
      withRouter(<Route path="/" element={<SearchHeader />} />)
    );
    // 스냅샷 테스트를 통해 잘 만들어지는지 확인
    expect(component.toJSON()).toMatchSnapshot();
  });

  // "bts" 값이 제대로 들어있는지 테스트
  it("renders with keyword correctly", async () => {
    render(
      withRouter(<Route path="/:keyword" element={<SearchHeader />} />, "/bts")
    );
    expect(screen.getByDisplayValue("bts")).toBeInTheDocument();
  });

  // 사용자가 입력 폼에 단어 입력하고 검색 누른 후 검색하는 키워드도 같이 가져가는지 테스트
  it("navigates to results page on search button click", () => {
    const searchKeyword = "fake-keyword";

    render(
      withRouter(
        <>
          <Route path={"/home"} element={<SearchHeader />} />
          <Route
            path={`/videos/${searchKeyword}`}
            element={<p>{`Search result for ${searchKeyword}`}</p>}
          />
        </>,
        "/home"
      )
    );

    const searchButton = screen.getByRole("button");
    const searchInput = screen.getByRole("textbox");

    userEvent.type(searchInput, searchKeyword);
    userEvent.click(searchButton);

    expect(
      screen.getByText(`Search result for ${searchKeyword}`)
    ).toBeInTheDocument();
  });
});
