export const USER_ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

export type UserRoles = (keyof typeof USER_ROLES)[];
