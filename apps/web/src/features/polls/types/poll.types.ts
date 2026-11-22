export interface CreatePollPayload {
  title: string;
  pollType: "single" | "multiple";
  closeAt: string;
  options: {name: string}[];
  suggestionsEnabled: boolean;
}
