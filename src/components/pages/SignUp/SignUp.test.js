import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { customRender } from "utils/testing";
import { SignUp } from ".";

const mockDispatch = jest.fn();

const server = setupServer(
  rest.post("http://localhost:3000/users/sign-up", (req, res, ctx) => {
    return res(
      ctx.json({
        uid: "1",
        displayName: "Celine",
        email: "celine@test.com",
        idToken: "z5z4z7z8z9",
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("SignUp", () => {
  const params = {
    dispatch: mockDispatch,
  };

  it("should show welcome title", () => {
    customRender(<SignUp />, params);

    expect(
      screen.getByRole("heading", { name: "Welcome!" })
    ).toBeInTheDocument();
    expect(screen.getByText("Let's create your account")).toBeInTheDocument();
  });

  it("should have a SignUp form", () => {
    customRender(<SignUp />, params);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument();
  });

  it("should have a link to login page", () => {
    customRender(<SignUp />, params);

    expect(screen.getByRole("link", { name: "Log in" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Log in" })).toHaveProperty(
      "href",
      "http://localhost/"
    );
  });

  it("should display form validation errors", async () => {
    customRender(<SignUp />, params);

    userEvent.type(screen.getByLabelText("Email"), "celinetest.com");
    userEvent.type(screen.getByLabelText("Password"), "abc45");
    userEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    await waitFor(() => {
      expect(screen.getByText("Email invalid")).toBeInTheDocument();
      expect(screen.getByText("Username required")).toBeInTheDocument();
      expect(screen.getByText("Password invalid")).toBeInTheDocument();
    });
  });

  it("should log in the user and redirect when successful", async () => {
    const { history } = customRender(<SignUp />, params);

    userEvent.type(screen.getByLabelText("Email"), "celine@test.com");
    userEvent.type(screen.getByLabelText("Username"), "Celine");
    userEvent.type(screen.getByLabelText("Password"), "abcd12345");
    userEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "user:login",
        data: {
          uid: "1",
          displayName: "Celine",
          email: "celine@test.com",
          idToken: "z5z4z7z8z9",
          role: "user",
        },
      });

      expect(history.location.pathname).toBe("/user/tickets");
    });
  });

  it("should display API error messages when unsuccessful", async () => {
    server.use(
      rest.post("http://localhost:3000/users/sign-up", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    customRender(<SignUp />, params);

    userEvent.type(screen.getByLabelText("Email"), "celine@test.com");
    userEvent.type(screen.getByLabelText("Username"), "Celine");
    userEvent.type(screen.getByLabelText("Password"), "abcd12345");
    userEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    await waitFor(() => {
      expect(screen.getByText("Oops something went wrong")).toBeInTheDocument();
    });
  });
});
