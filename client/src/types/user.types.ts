export type User = {
  userName: string;
  email: string;
  id: string;
  role: "user" | "admin";
  password: string;
};

export type Login = Pick<User, "email" | "password">;
export type Register = Omit<User, "id" | "role">;
