export interface MockUser {
  name: string;
  email: string;
  plan: "Free" | "Pro";
  avatarColor: string;
  initials: string;
}

export const mockUser: MockUser = {
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  plan: "Free",
  avatarColor: "#6d3ae6",
  initials: "AM"
};
