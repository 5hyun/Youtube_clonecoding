import { render, waitFor, screen } from "@testing-library/react";
import { withAllContexts, withRouter } from "../../tests/utils";
import { Route } from "react-router-dom";
import ChannelInfo from "../ChannelInfo";

describe("ChannelInfo", () => {
  const fakeYoutube = {
    channelImageURL: jest.fn(),
  };

  afterEach(() => fakeYoutube.channelImageURL.mockReset());

  it("renders correctly", async () => {
    fakeYoutube.channelImageURL.mockImplementation(() => "url");
    render(
      withAllContexts(
        withRouter(
          <Route
            path={"/"}
            element={<ChannelInfo id={"id"} name={"channel"} />}
          />
        ),
        fakeYoutube
      )
    );
    await waitFor(() => screen.getByText("channel"));
  });
});
``;
