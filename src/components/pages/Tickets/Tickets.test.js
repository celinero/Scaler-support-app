import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { customRender } from "utils/testing";
import { Tickets } from ".";

describe("Tickets", () => {
  const params = {
    store: {
      user: { role: "user", displayName: "Celine" },
      tickets: [],
    },
  };

  it("should show intro block", () => {
    customRender(<Tickets />, params);

    expect(
      screen.getByRole("heading", { name: "Hi Celine" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("You have 0 active support ticket.")
    ).toBeInTheDocument();
  });

  it("should have a link to create a new ticket", () => {
    const { history } = customRender(<Tickets />, params);

    const createLink = screen.getByRole("link", {
      name: "Create a new ticket",
    });

    expect(createLink).toBeInTheDocument();
    expect(createLink).toHaveProperty(
      "href",
      "http://localhost/user/tickets/new"
    );

    userEvent.click(createLink);

    expect(history.location.pathname).toBe("/user/tickets/new");
  });

  describe("when x tickets", () => {
    const newParams = JSON.parse(JSON.stringify(params));
    newParams.store.tickets = [
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
    ];

    it("should show active tickets", () => {
      customRender(<Tickets />, newParams);

      expect(
        screen.getByText("You have 2 active support tickets.")
      ).toBeInTheDocument();
      expect(screen.getByText("Active tickets")).toBeInTheDocument();
      expect(screen.getByText("Lorem ipsum")).toBeInTheDocument();
      expect(screen.getByText("Dolor si amet")).toBeInTheDocument();
    });

    it("should show solved tickets", () => {
      customRender(<Tickets />, newParams);

      expect(screen.getByText("Solved tickets")).toBeInTheDocument();
      expect(
        screen.getByText("Consectetur adipiscing elit")
      ).toBeInTheDocument();
    });

    it("should show 'not seen' notification", () => {
      customRender(<Tickets />, newParams);

      expect(screen.getByTestId("2--not-seen")).toBeInTheDocument();
    });

    it("should go to ticket page when clicking on a ticket card", () => {
      const { history } = customRender(<Tickets />, newParams);

      const linkCard = screen.getByRole("link", { name: /Lorem ipsum/ });

      expect(linkCard).toBeInTheDocument();
      expect(linkCard).toHaveProperty(
        "href",
        "http://localhost/user/tickets/1"
      );

      userEvent.click(linkCard);

      expect(history.location.pathname).toBe("/user/tickets/1");
    });
  });

  describe("when user is admin", () => {
    const newParams = JSON.parse(JSON.stringify(params));
    newParams.store.user.role = "admin";

    it("should not have a link to create a new ticket", () => {
      customRender(<Tickets />, newParams);

      expect(
        screen.queryByRole("link", { name: "Create a new ticket" })
      ).not.toBeInTheDocument();
    });

    it("should show 'require action' notification", () => {
      newParams.store.tickets = [
        {
          _id: "1",
          ticketSubject: "lorem ipsum",
          ticketResolved: false,
          ticketSeen: true,
          ticketMessages: [{ ticketUserRole: "user" }],
        },
      ];

      customRender(<Tickets />, newParams);

      expect(screen.getByTestId("1--require-action")).toBeInTheDocument();
    });
  });
});
