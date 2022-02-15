import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { SignUp } from ".";

import { StateContext } from "config/store";

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

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
  let history;

  const renderSignUp = () => {
    history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <StateContext.Provider value={{ dispatch: mockDispatch }}>
        <BrowserRouter history={history}>
          <SignUp />
        </BrowserRouter>
      </StateContext.Provider>
    );
  };

  it("should show welcome title", () => {
    renderSignUp();

    expect(
      screen.getByRole("heading", { label: "Welcome!" })
    ).toBeInTheDocument();
    expect(screen.getByText("Let's create your account")).toBeInTheDocument();
  });

  it("should have a SignUp form", () => {
    renderSignUp();

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { label: "Sign Up" })
    ).toBeInTheDocument();
  });

  it("should have a link to login page", () => {
    renderSignUp();

    expect(screen.getByRole("link", { label: "Log in" })).toBeInTheDocument();
    expect(screen.getByRole("link", { label: "Log in" })).toHaveProperty(
      "href",
      "http://localhost/"
    );
  });

  it("should display form validation errors", async () => {
    renderSignUp();

    userEvent.type(screen.getByLabelText("Email"), "celinetest.com");
    userEvent.type(screen.getByLabelText("Password"), "abc45");
    userEvent.click(screen.getByRole("button", { label: "Sign Up" }));

    await waitFor(() => {
      expect(screen.getByText("Email invalid")).toBeInTheDocument();
      expect(screen.getByText("Username required")).toBeInTheDocument();
      expect(screen.getByText("Password invalid")).toBeInTheDocument();
    });
  });

  it("should log in the user and redirect when successful", async () => {
    renderSignUp();

    userEvent.type(screen.getByLabelText("Email"), "celine@test.com");
    userEvent.type(screen.getByLabelText("Username"), "Celine");
    userEvent.type(screen.getByLabelText("Password"), "abcd12345");
    userEvent.click(screen.getByRole("button", { label: "Sign up" }));

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
      rest.post("http://localhost:3000/users/sign-up", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderSignUp();

    userEvent.type(screen.getByLabelText("Email"), "celine@test.com");
    userEvent.type(screen.getByLabelText("Username"), "Celine");
    userEvent.type(screen.getByLabelText("Password"), "abcd12345");
    userEvent.click(screen.getByRole("button", { label: "Sign up" }));

    await waitFor(() => {
      expect(screen.getByText("Oops something went wrong")).toBeInTheDocument();
    });
  });
});
