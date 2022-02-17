import { screen, waitFor } from "@testing-library/react";
import { Route } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { customRender } from "utils/testing";
import { WithAuthentication } from ".";

const mockDispatch = jest.fn();

const server = setupServer(
  rest.post("http://localhost:3000/users/validate-session", (req, res, ctx) => {
    return res(
      ctx.json({
        fullDecodedToken: {
          uid: "1",
          name: "Celine",
          email: "celine@test.com",
          idToken: "z5z4z7z8z9",
        },
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

describe("WithAuthentication", () => {
  const params = {
    location: "/",
    path: "/",
    store: {
      user: {},
    },
    dispatch: mockDispatch,
  };

  it("should use sessionStorage to log in the user", async () => {
    window.sessionStorage.setItem("idToken", "z5z4z7z8z9");
    const { history } = customRender(<WithAuthentication />, params);

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

    await waitFor(() => {});
  });

  describe("when landing on an user page", () => {
    it("should redirect when there is no idToken in sessionStorage", async () => {
      window.sessionStorage.setItem("idToken", "");
      const { history } = customRender(<WithAuthentication />, {
        ...params,
        location: "/user/tickets",
        path: "/user/tickets",
      });

      await waitFor(() => {
        expect(history.location.pathname).toBe("/");
      });

      await waitFor(() => {});
    });

    it("should redirect when idToken is not valid", async () => {
      server.use(
        rest.post(
          "http://localhost:3000/users/validate-session",
          (req, res, ctx) => {
            return res(ctx.status(400));
          }
        )
      );

      window.sessionStorage.setItem("idToken", "z5z4z7z8z9");
      const { history } = customRender(<WithAuthentication />, {
        ...params,
        location: "/user/tickets",
        path: "/user/tickets",
      });

      await waitFor(() => {
        expect(history.location.pathname).toBe("/");
      });

      await waitFor(() => {});
    });
  });
});
