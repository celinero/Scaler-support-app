import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Ticket } from ".";

import { customRender } from "utils/testing";

const mockDispatch = jest.fn();

const server = setupServer(
  rest.post("http://localhost:3000/tickets/1/message", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.put("http://localhost:3000/tickets/1", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get("http://localhost:3000/tickets", (req, res, ctx) => {
    return res(ctx.json([]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Ticket", () => {
  const params = {
    location: "/user/tickets/1",
    path: "/user/tickets/:id",
    store: {
      user: { uid: "1" },
      tickets: [
        {
          _id: 1,
          ticketUserID: "1",
          ticketSubject: "lorem ipsum",
          ticketResolved: false,
          ticketSeen: true,
          ticketCategoryName: "Bugfix",
          ticketSubject: "Connection not working",
          ticketMessages: [
            {
              ticketUserDisplayname: "Celine",
              ticketDate: 1644903108638,
              ticketUserRole: "user",
              ticketMessage: "lorem ipsum dolor si amet",
            },
          ],
        },
      ],
    },
    dispatch: mockDispatch,
  };

  it("should display ticket informations", () => {
    customRender(<Ticket />, params);

    expect(screen.getByText("Bugfix")).toBeInTheDocument();
    expect(screen.getByText("Connection not working")).toBeInTheDocument();

    expect(screen.getByText("Celine")).toBeInTheDocument();
    expect(screen.getByText(/user/)).toBeInTheDocument();
    expect(screen.getByText(/2\/15\/2022, 04:31 PM/)).toBeInTheDocument();
    expect(screen.getByText("lorem ipsum dolor si amet")).toBeInTheDocument();
  });

  it("should have a back link", () => {
    const { history } = customRender(<Ticket />, params);

    const backLink = screen.getByRole("link", { name: "Back" });

    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveProperty("href", "http://localhost/user/tickets");

    userEvent.click(backLink);
    expect(history.location.pathname).toBe("/user/tickets");
  });

  it("should have a solve button", async () => {
    const { history } = customRender(<Ticket />, params);

    const solveButton = screen.getByRole("button", { name: "Solve" });

    expect(solveButton).toBeInTheDocument();
    userEvent.click(solveButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "tickets:set",
        data: [],
      });
      expect(history.location.pathname).toBe("/user/tickets");
    });
  });

  it("should have a Reopen button", async () => {
    // deep clone object params to avoid it mutates
    const newParams = JSON.parse(JSON.stringify(params));
    // mutate newParams that only exist in this scope
    newParams.store.tickets[0].ticketResolved = true;
    newParams.dispatch = mockDispatch;

    const { history } = customRender(<Ticket />, newParams);

    const reopenButton = screen.getByRole("button", { name: "Reopen" });

    expect(reopenButton).toBeInTheDocument();
    userEvent.click(reopenButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "tickets:set",
        data: [],
      });
      expect(history.location.pathname).toBe("/user/tickets");
    });
  });

  it("should update the ticket to seen when relevant", async () => {
    const newParams = JSON.parse(JSON.stringify(params));
    newParams.store.tickets[0].ticketSeen = false;
    newParams.dispatch = mockDispatch;

    customRender(<Ticket />, newParams);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "tickets:set",
        data: [],
      });
    });
  });

  it("should have a add message form", () => {
    customRender(<Ticket />, params);

    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Message" })
    ).toBeInTheDocument();
  });

  it("should display form validation", async () => {
    customRender(<Ticket />, params);

    userEvent.click(screen.getByRole("button", { name: "Add Message" }));

    await waitFor(() => {
      expect(screen.getByText("Message required")).toBeInTheDocument();
    });
  });

  it("should update tickets when successful", async () => {
    customRender(<Ticket />, params);

    userEvent.type(screen.getByLabelText("Message"), "blabla");
    userEvent.click(screen.getByRole("button", { name: "Add Message" }));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "tickets:set",
        data: [],
      });
    });
  });

  it("should display API error messages when unsuccessful", async () => {
    server.use(
      rest.post("http://localhost:3000/tickets/1/message", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    customRender(<Ticket />, params);

    userEvent.type(screen.getByLabelText("Message"), "blabla");
    userEvent.click(screen.getByRole("button", { name: "Add Message" }));

    await waitFor(() => {
      expect(screen.getByText("Oops something went wrong")).toBeInTheDocument();
    });
  });
});
