import { screen, waitFor } from "@testing-library/react";
import { Route } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { customRender } from "utils/testing";
import { WithTickets } from ".";

const mockDispatch = jest.fn();

const server = setupServer(
  rest.get("http://localhost:3000/categories", (req, res, ctx) =>
    res(ctx.json([]))
  ),
  rest.get("http://localhost:3000/tickets", (req, res, ctx) =>
    res(ctx.json([]))
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("WithTickets", () => {
  const params = {
    store: { tickets: [] },
    dispatch: mockDispatch,
  };

  it("should get categories and tickets", async () => {
    customRender(<WithTickets />, params);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "categories:set",
        data: [],
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "tickets:set",
        data: [],
      });
    });
  });
});
