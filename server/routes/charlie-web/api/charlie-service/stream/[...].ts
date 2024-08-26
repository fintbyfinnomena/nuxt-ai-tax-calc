import { SERVICE_URL } from "@/server/config/endpoint";
import { errorResponse } from "@/server/utils/http";

export default defineEventHandler(async (event) => {
  if (!event.node.req.url) {
    throw errorResponse(400, "api:charlie invalid url");
  }
  
  const routes = event.node.req.url.split("charlie-web/api/charlie-service/stream");
  const endpoint = routes[routes.length - 1];
  const url = `${SERVICE_URL}/private/api/v1${endpoint}`;
  
  try {
    const headers = await createRequestHeaders(event);

    // TODO: Temporary use - Have to migrate to access token extraction
    const finnoId = getHeader(event, "Finno-User-Id");
    if (finnoId) {
      headers.set("Finno-User-Id", finnoId);
    }

    let body: string | undefined = undefined;
    if (isMethod(event, ["POST", "PATCH", "PUT"])) {
      body = await readBody(event);
    }

    // Fetch the stream response
    const res = await $fetch<ReadableStream>(url, {
      method: event.method,
      headers,
      body,
      responseType: "stream",
    });

    // Directly send the stream response to the client
    return sendStream(event, res);
  } catch (error: unknown) {
    const err = error as AppError;
    console.error(
      `error "${err.statusCode}:${event.method}" api from "/private/api/v1" url : ${url}`
    );
    throw errorResponse(err.statusCode, err.message);
  }
});