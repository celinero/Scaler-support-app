import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { customRender } from "utils/testing";
import { NewTicket } from ".";

const mockDispatch = jest.fn();

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
  const params = {
    dispatch: mockDispatch,
    store: {
      user: { uid: "1" },
      categories: [{ _id: "1", name: "Bugfix" }],
    },
  };

  it("should show need some help title", () => {
    customRender(<NewTicket />, params);

    expect(
      screen.getByRole("heading", { name: "Need some help?" })
    ).toBeInTheDocument();
    expect(screen.getByText("Create a new support ticket")).toBeInTheDocument();
  });

  it("should have a new ticket form", () => {
    customRender(<NewTicket />, params);

    expect(screen.getByLabelText("Subject")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Add Ticket" })
    ).toBeInTheDocument();
  });

  it("should display form validation errors", async () => {
    customRender(<NewTicket />, params);

    userEvent.click(screen.getByRole("button", { name: "Add Ticket" }));

    await waitFor(() => {
      expect(screen.getByText("Subject required")).toBeInTheDocument();
      expect(screen.getByText("Category required")).toBeInTheDocument();
      expect(screen.getByText("Message required")).toBeInTheDocument();
    });
  });

  it("should refetch tickets and redirect to dashboard when successful", async () => {
    const { history } = customRender(<NewTicket />, params);

    userEvent.type(screen.getByLabelText("Subject"), "Connection issue");
    userEvent.selectOptions(screen.getByLabelText("Category"), ["Bugfix"]);
    userEvent.type(
      screen.getByLabelText("Message"),
      "I can't connect to scaler anymore"
    );
    userEvent.click(screen.getByRole("button", { name: "Add Ticket" }));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "tickets:set",
        data: [], // API would not return an empty array, but we don't need to test that
      });

      expect(history.location.pathname).toBe("/user/tickets");
    });
  });

  it("should display API error messages when unsuccessful", async () => {
    server.use(
      rest.post("http://localhost:3000/tickets", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    customRender(<NewTicket />, params);

    userEvent.type(screen.getByLabelText("Subject"), "Connection issue");
    userEvent.selectOptions(screen.getByLabelText("Category"), ["Bugfix"]);
    userEvent.type(
      screen.getByLabelText("Message"),
      "I can't connect to scaler anymore"
    );
    userEvent.click(screen.getByRole("button", { name: "Add Ticket" }));

    await waitFor(() => {
      expect(screen.getByText("Oops something went wrong")).toBeInTheDocument();
    });
  });
});
