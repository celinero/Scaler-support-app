import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { NewTicket } from ".";

import { StateContext } from "config/store";

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const server = setupServer(
  rest.post("http://localhost:3000/tickets", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get("http://localhost:3000/tickets", (req, res, ctx) => {
    return res(ctx.json([]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("NewTicket", () => {
  let history;

  const renderNewTicket = (
    user = { uid: "1" },
    categories = [{ _id: "1", name: "Bugfix" }]
  ) => {
    history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <StateContext.Provider
        value={{ store: { user, categories }, dispatch: mockDispatch }}
      >
        <BrowserRouter history={history}>
          <NewTicket />
        </BrowserRouter>
      </StateContext.Provider>
    );
  };

  it("should show need some help title", () => {
    renderNewTicket();

    expect(
      screen.getByRole("heading", { label: "Need some help?" })
    ).toBeInTheDocument();
    expect(screen.getByText("Create a new support ticket")).toBeInTheDocument();
  });

  it("should have a new ticket form", () => {
    renderNewTicket();

    expect(screen.getByLabelText("Subject")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { label: "Add Ticket" })
    ).toBeInTheDocument();
  });

  it("should display form validation errors", async () => {
    renderNewTicket();

    userEvent.click(screen.getByRole("button", { label: "Add Ticket" }));

    await waitFor(() => {
      expect(screen.getByText("Subject required")).toBeInTheDocument();
      expect(screen.getByText("Category required")).toBeInTheDocument();
      expect(screen.getByText("Message required")).toBeInTheDocument();
    });
  });

  it("should refetch tickets and redirect to dashboard when successful", async () => {
    renderNewTicket();

    userEvent.type(screen.getByLabelText("Subject"), "Connection issue");
    userEvent.selectOptions(screen.getByLabelText("Category"), ["Bugfix"]);
    userEvent.type(
      screen.getByLabelText("Message"),
      "I can't connect to scaler anymore"
    );
    userEvent.click(screen.getByRole("button", { label: "Add Ticket" }));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "tickets:set",
        data: [], // API would not return an empty array, but we don't need to test that
      });

      expect(mockNavigate).toHaveBeenCalledWith("/user/tickets");
    });
  });

  it("should display API error messages when unsuccessful", async () => {
    server.use(
      rest.post("http://localhost:3000/tickets", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderNewTicket();

    userEvent.type(screen.getByLabelText("Subject"), "Connection issue");
    userEvent.selectOptions(screen.getByLabelText("Category"), ["Bugfix"]);
    userEvent.type(
      screen.getByLabelText("Message"),
      "I can't connect to scaler anymore"
    );
    userEvent.click(screen.getByRole("button", { label: "Add Ticket" }));

    await waitFor(() => {
      expect(screen.getByText("Oops something went wrong")).toBeInTheDocument();
    });
  });
});
