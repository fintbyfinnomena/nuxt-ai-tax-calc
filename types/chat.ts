export {};
declare global {
  interface ChatResponse {
    chat_id: string;
  }

  interface ChatRequestPayload {
    question: string;
  }
}
