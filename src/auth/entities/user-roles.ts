export const USER_ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

export type UserRoles = (keyof typeof USER_ROLES)[];
