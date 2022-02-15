import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { LogIn } from ".";

import { StateContext } from "config/store";

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

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
  let history;

  const renderLogIn = () => {
    history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <StateContext.Provider value={{ dispatch: mockDispatch }}>
        <BrowserRouter history={history}>
          <LogIn />
        </BrowserRouter>
      </StateContext.Provider>
    );
  };

  it("should show welcome back title", () => {
    renderLogIn();

    expect(
      screen.getByRole("heading", { label: "Welcome back!" })
    ).toBeInTheDocument();
    expect(screen.getByText("Let's log in")).toBeInTheDocument();
  });

  it("should have a login form", () => {
    renderLogIn();

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { label: "Log In" })).toBeInTheDocument();
  });

  it("should have a link to signup page", () => {
    renderLogIn();

    expect(screen.getByRole("link", { label: "Sign up" })).toBeInTheDocument();
    expect(screen.getByRole("link", { label: "Sign up" })).toHaveProperty(
      "href",
      "http://localhost/signup"
    );
  });

  it("should display form validation errors", async () => {
    renderLogIn();

    userEvent.type(screen.getByLabelText("Email"), "celinetest.com");
    userEvent.type(screen.getByLabelText("Password"), "abc45");
    userEvent.click(screen.getByRole("button", { label: "Log In" }));

    await waitFor(() => {
      expect(screen.getByText("Email invalid")).toBeInTheDocument();
      expect(screen.getByText("Password invalid")).toBeInTheDocument();
    });
  });

  it("should log in the user and redirect when successful", async () => {
    renderLogIn();

    userEvent.type(screen.getByLabelText("Email"), "celine@test.com");
    userEvent.type(screen.getByLabelText("Password"), "abcd12345");
    userEvent.click(screen.getByRole("button", { label: "Log In" }));

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

      expect(mockNavigate).toHaveBeenCalledWith("/user/tickets");
    });
  });

  it("should display API error messages when unsuccessful", async () => {
    server.use(
      rest.post("http://localhost:3000/users/sign-in", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderLogIn();

    userEvent.type(screen.getByLabelText("Email"), "celine@test.com");
    userEvent.type(screen.getByLabelText("Password"), "abcd12345");
    userEvent.click(screen.getByRole("button", { label: "Log In" }));

    await waitFor(() => {
      expect(screen.getByText("Oops something went wrong")).toBeInTheDocument();
    });
  });
});
