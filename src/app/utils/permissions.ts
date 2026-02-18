export const PERMISSIONS = {
  ADMIN: {
    CREATE: "admin:create",
    READ: "admin:read",
    LOGOUT: "admin:logout",
  },
  USER: {
    LOGOUT: "user:logout",
    CHANGE_PASSWORD: "user:change-password",
  },
  ROLE: {
    CREATE: "role:create",
    READ: "role:read",
    UPDATE: "role:update",
    DELETE: "role:delete",
  },
  PERMISSION: {
    CREATE: "permission:create",
    READ: "permission:read",
    UPDATE: "permission:update",
    DELETE: "permission:delete",
  },
  SCHOOL: {
    CREATE: "school:create",
    READ: "school:read",
    UPDATE: "school:update",
    DELETE: "school:delete",
  },
  CLASSROOM: {
    CREATE: "classroom:create",
    READ: "classroom:read",
    UPDATE: "classroom:update",
    DELETE: "classroom:delete",
  },
  STUDENT: {
    CREATE: "student:create",
    READ: "student:read",
    UPDATE: "student:update",
    DELETE: "student:delete",
    ENROLL: "student:enroll",
    TRANSFER: "student:transfer",
  },
} as const;
