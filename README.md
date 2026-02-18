# Soar

School Management API.

**API Docs**
Swagger UI: `http://localhost:8000/api-docs`

**Base URL**
`http://localhost:8000`

**Auth**
Bearer token in `Authorization` header.
Example:
`Authorization: Bearer <token>`

**Environment Example**
Create `.env` with:
```
PORT=8000
MONGO_URI=mongodb://localhost:27017/soar
ACCESS_TOKEN_SECRET=change_me
JWT_TOKEN_VALIDITY=7d
SERVICE_NAME=soar
BASE_URL=http://localhost:8000
```

**Routes**

**User Auth** (`/v1/auth`)
| Method | Path | Description |
|---|---|---|
| POST | `/v1/auth/register` | Register user |
| POST | `/v1/auth/login` | Login user |
| POST | `/v1/auth/logout` | Logout user |
| POST | `/v1/auth/forgot-password` | Request reset OTP |
| POST | `/v1/auth/reset-password` | Reset password |
| POST | `/v1/auth/change-password` | Change password |

**Admin Auth** (`/v1/admin/auth`)
| Method | Path | Description |
|---|---|---|
| GET | `/v1/admin/auth/profile` | Get admin profile |
| POST | `/v1/admin/auth/register` | Register admin |
| POST | `/v1/admin/auth/login` | Admin login |
| GET | `/v1/admin/auth/logout` | Admin logout |
| POST | `/v1/admin/auth/reset-password` | Reset admin password |

**School** (`/v1/school`)
| Method | Path | Description |
|---|---|---|
| POST | `/v1/school` | Create school |
| GET | `/v1/school` | Get schools |
| GET | `/v1/school/{schoolId}` | Get school by id |
| PUT | `/v1/school/{schoolId}` | Update school |
| DELETE | `/v1/school/{schoolId}` | Delete school |

**Classroom** (`/v1/classroom`)
| Method | Path | Description |
|---|---|---|
| POST | `/v1/classroom` | Create classroom |
| GET | `/v1/classroom/{schoolId}` | Get classrooms by school |
| GET | `/v1/classroom/classroom/{classroomId}` | Get classroom by id |
| PUT | `/v1/classroom/classroom/{classroomId}` | Update classroom |
| DELETE | `/v1/classroom/classroom/{classroomId}` | Delete classroom |

**Student** (`/v1/student`)
| Method | Path | Description |
|---|---|---|
| POST | `/v1/student` | Create student |
| GET | `/v1/student/{schoolId}` | Get students by school |
| GET | `/v1/student/student/{studentId}` | Get student by id |
| PUT | `/v1/student/student/{studentId}` | Update student |
| DELETE | `/v1/student/student/{studentId}` | Delete student |
| POST | `/v1/student/student/{studentId}/enroll` | Enroll student |
| POST | `/v1/student/student/{studentId}/transfer` | Transfer student |

**Role** (`/v1/role`)
| Method | Path | Description |
|---|---|---|
| POST | `/v1/role` | Create role |
| GET | `/v1/role` | Get roles |
| GET | `/v1/role/{roleId}` | Get role by id |
| PUT | `/v1/role/{roleId}` | Update role |
| DELETE | `/v1/role/{roleId}` | Delete role |

**Permission** (`/v1/permission`)
| Method | Path | Description |
|---|---|---|
| POST | `/v1/permission` | Create permission |
| GET | `/v1/permission` | Get permissions |
| GET | `/v1/permission/{permissionId}` | Get permission by id |
| PUT | `/v1/permission/{permissionId}` | Update permission |
| DELETE | `/v1/permission/{permissionId}` | Delete permission |
