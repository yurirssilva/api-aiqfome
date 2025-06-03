import { User } from "../entites/User";

export type UserPublicDTO = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export function sanitizeUser(user: User): UserPublicDTO {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}