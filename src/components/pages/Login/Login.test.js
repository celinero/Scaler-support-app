import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { customRender } from "utils/testing";
import { LogIn } from ".";

const mockDispatch = jest.fn();

const server = setupServer(
  rest.post("http://localhost:3000/users/sign-in", (req, res, ctx) => {
    return res(
      ctx.json({
        uid: "1",
        displayName: "Celine",
        email: "celine@test.com",
        idToken: "z5z4z7z8z9",
      })
    );
  }),
  rest.get("http://localhost:3000/users/1", (req, res, ctx) => {
    return res(
      ctx.json({
        role: "user",
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Login", () => {
  const params = {
    dispatch: mockDispatch,
  };

  it("should show welcome back title", () => {
    customRender(<LogIn />, params);

    expect(
      screen.getByRole("heading", { name: "Welcome back!" })
    ).toBeInTheDocument();
    expect(screen.getByText("Let's log in")).toBeInTheDocument();
  });

  it("should have a login form", () => {
    customRender(<LogIn />, params);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log In" })).toBeInTheDocument();
  });

  it("should have a link to signup page", () => {
    customRender(<LogIn />, params);

    expect(screen.getByRole("link", { name: "Sign up" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign up" })).toHaveProperty(
      "href",
      "http://localhost/signup"
    );
  });

  it("should display form validation errors", async () => {
    customRender(<LogIn />, params);

    userEvent.type(screen.getByLabelText("Email"), "celinetest.com");
    userEvent.type(screen.getByLabelText("Password"), "abc45");
    userEvent.click(screen.getByRole("button", { name: "Log In" }));

    await waitFor(() => {
      expect(screen.getByText("Email invalid")).toBeInTheDocument();
      expect(screen.getByText("Password invalid")).toBeInTheDocument();
    });
  });

  it("should log in the user and redirect when successful", async () => {
    const { history } = customRender(<LogIn />, params);

    userEvent.type(screen.getByLabelText("Email"), "celine@test.com");
    userEvent.type(screen.getByLabelText("Password"), "abcd12345");
    userEvent.click(screen.getByRole("button", { name: "Log In" }));

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
      rest.post("http://localhost:3000/users/sign-in", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    customRender(<LogIn />, params);

    userEvent.type(screen.getByLabelText("Email"), "celine@test.com");
    userEvent.type(screen.getByLabelText("Password"), "abcd12345");
    userEvent.click(screen.getByRole("button", { name: "Log In" }));

    await waitFor(() => {
      expect(screen.getByText("Oops something went wrong")).toBeInTheDocument();
    });
  });
});
