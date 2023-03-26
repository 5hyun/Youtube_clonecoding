import { render, screen } from "@testing-library/react";
import { Route, useLocation } from "react-router-dom";
import { formatAgo } from "../../util/date";
import VideoCard from "../VideoCard";
import userEvent from "@testing-library/user-event";
import { fakeVideo as video } from "../../tests/videos";
import { withRouter } from "../../tests/utils";
import renderer from "react-test-renderer";

describe("VideoCard", () => {
  const { title, channelTitle, publishedAt, thumbnails } = video.snippet;

  it("renders grid type correctly", () => {
    const component = renderer.create(
      withRouter(<Route path={"/"} element={<VideoCard video={video} />} />)
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("renders list type correctly", () => {
    const component = renderer.create(
      withRouter(
        <Route path={"/"} element={<VideoCard video={video} type={"list"} />} />
      )
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("renders video item", () => {
    render(
      withRouter(<Route path={"/"} element={<VideoCard video={video} />} />)
    );

    // 이미지 역할을 가지고 있는 html 요소를 가져옴
    const image = screen.getByRole("img");
    expect(image.src).toBe(thumbnails.medium.url);
    expect(image.alt).toBe(title);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(channelTitle)).toBeInTheDocument();
    expect(screen.getByText(formatAgo(publishedAt, "ko"))).toBeInTheDocument();
  });

  it("navigates to detailed video page with video state when clicked", () => {
    // 테스트용 함수 컴포넌트
    function LocationStateDisplay() {
      return <pre>{JSON.stringify(useLocation().state)}</pre>;
    }
    render(
      withRouter(
        <>
          <Route path={"/"} element={<VideoCard video={video} />} />
          {/* 아래 라우터로 이동했을 때 값들이 제대로 왔는지 체크하기 위해 LocationStateDisplay을 만*/}
          <Route
            path={`/videos/watch/${video.id}`}
            element={<LocationStateDisplay />}
          />
        </>
      )
    );

    const card = screen.getByRole("listitem");
    userEvent.click(card);

    expect(screen.getByText(JSON.stringify({ video }))).toBeInTheDocument();
  });
});
