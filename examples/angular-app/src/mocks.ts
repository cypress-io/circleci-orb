import { http } from "msw";
import { setupWorker } from "msw/browser";

export const handlers = [
  http.post<{ username: string; password: string }>(
    "/auth",
    async ({ request }) => {
      const { username, password } = (await request.json()) as {
        username: string;
        password: string;
      };
      if (username === "testuser" && password === "testpassword") {
        return Response.json(
          { message: "Authenticated" },
          {
            status: 200,
          }
        );
      } else {
        return Response.json(
          { message: "Bad username or password" },
          {
            status: 401,
          }
        );
      }
    }
  ),
];

export const worker = setupWorker(...handlers);
