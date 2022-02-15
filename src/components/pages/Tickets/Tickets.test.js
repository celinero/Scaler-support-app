import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Tickets } from ".";

import { StateContext } from "config/store";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Tickets", () => {
  let history;

  const renderTickets = ({ user, tickets } = {}) => {
    history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <StateContext.Provider
        value={{
          store: {
            user: user || { role: "user", displayName: "Celine" },
            tickets: tickets || [],
          },
        }}
      >
        <BrowserRouter history={history}>
          <Tickets />
        </BrowserRouter>
      </StateContext.Provider>
    );
  };

  it("should show intro block", () => {
    renderTickets();

    expect(
      screen.getByRole("heading", { name: "Hi Celine" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("You have 0 active support ticket.")
    ).toBeInTheDocument();
  });

  it("should have a link to create a new ticket", () => {
    renderTickets();

    expect(
      screen.getByRole("link", { name: "Create a new ticket" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Create a new ticket" })
    ).toHaveProperty("href", "http://localhost/user/tickets/new");
  });

  describe("when x tickets", () => {
    beforeEach(() => {
      renderTickets({
        tickets: [
          {
            _id: "1",
            ticketSubject: "lorem ipsum",
            ticketResolved: false,
            ticketSeen: true,
            ticketMessages: [{}],
          },
          {
            _id: "2",
            ticketSubject: "dolor si amet",
            ticketResolved: false,
            ticketSeen: false,
            ticketMessages: [{}],
          },
          {
            _id: "3",
            ticketSubject: "consectetur adipiscing elit",
            ticketResolved: true,
            ticketSeen: true,
            ticketMessages: [{}],
          },
        ],
      });
    });

    it("should show active tickets", () => {
      expect(
        screen.getByText("You have 2 active support tickets.")
      ).toBeInTheDocument();
      expect(screen.getByText("Active tickets")).toBeInTheDocument();
      expect(screen.getByText("Lorem ipsum")).toBeInTheDocument();
      expect(screen.getByText("Dolor si amet")).toBeInTheDocument();
    });

    it("should show solved tickets", () => {
      expect(screen.getByText("Solved tickets")).toBeInTheDocument();
      expect(
        screen.getByText("Consectetur adipiscing elit")
      ).toBeInTheDocument();
    });

    it("should show 'not seen' notification", () => {
      expect(screen.getByTestId("2--not-seen")).toBeInTheDocument();
    });

    it("should go to ticket page when clicking on a ticket card", async () => {
      expect(screen.getByRole("link", { name: /Lorem ipsum/ })).toHaveProperty(
        "href",
        "http://localhost/user/tickets/1"
      );

      userEvent.click(screen.getByRole("link", { name: /Lorem ipsum/ }));

      expect(mockNavigate).toHaveBeenCalledWith("/user/tickets/1");
    });
  });

  describe("when user is admin", () => {
    it("should not have a link to create a new ticket", () => {
      renderTickets({ user: { role: "admin", displayName: "Celine" } });

      expect(
        screen.queryByRole("link", { name: "Create a new ticket" })
      ).not.toBeInTheDocument();
    });

    it("should show 'require action' notification", () => {
      renderTickets({
        user: { role: "admin", displayName: "Celine" },
        tickets: [
          {
            _id: "1",
            ticketSubject: "lorem ipsum",
            ticketResolved: false,
            ticketSeen: true,
            ticketMessages: [{ ticketUserRole: "user" }],
          },
        ],
      });

      expect(screen.getByTestId("1--require-action")).toBeInTheDocument();
    });
  });
});
