import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "./error.js";

const objectId = Joi.string().hex().length(24);

const validatePasswordString = Joi.string()
  .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)
  .min(6)
  .max(100)
  .required()
  .messages({
    "string.pattern.base":
      "Password must contain a capital letter, number, special character & greater than 8 digits.",
  });

const fileSchema = Joi.object({
  fieldname: Joi.string().required(),
  originalname: Joi.string().required(),
  encoding: Joi.string().required(),
  mimetype: Joi.string().required(),
  buffer: Joi.binary().required(),
  size: Joi.number().required(),
});

const validate = (
  schema: any,
  object: any,
  option = { abortEarly: true, allowUnknown: false }
) => {
  const check = schema.validate(object, option);
  if (check.error) {
    throw new ValidationError(check.error.details[0].message);
  }
  return check.value;
};

export function joiValidator(constraint: any, isMiddleware = true): any {
  if (!constraint)
    throw new ValidationError(
      "Kindly supply validation schema to joiValidator"
    );

  if (!isMiddleware) {
    return validate(constraint.schema, constraint.data, constraint.option);
  }
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (constraint.body) {
        req.body = validate(
          constraint.body.schema,
          req.body,
          constraint.body.options
        );
      }
      if (constraint.params)
        req.params = validate(
          constraint.params.schema,
          req.params,
          constraint.params.options
        );
      if (constraint.query)
        req.query = validate(
          constraint.query.schema,
          req.query,
          constraint.query.options
        );
      if (constraint.headers)
        req.headers = validate(
          constraint.headers.schema,
          req.headers,
          constraint.headers.options
        );

      return next();
    } catch (err) {
      next(err);
    }
  };
}

const validator = {
  admin: {
    register: {
      body: {
        schema: Joi.object({
          fullName: Joi.string().trim().required(),
          email: Joi.string().trim().email().required(),
          password: validatePasswordString,
          role: Joi.string().trim().required(),
          roleId: objectId.optional(),
        }),
      },
    },
    login: {
      body: {
        schema: Joi.object({
          email: Joi.string().trim().email().required(),
          password: Joi.string().required(),
        }),
      },
    },
    resetPassword: {
      body: {
        schema: Joi.object({
          email: Joi.string().trim().email().required(),
          password: validatePasswordString,
          otp_token: Joi.string().required(),
        }),
      },
    },
  },
  user: {
    register: {
      body: {
        schema: Joi.object({
          name: Joi.string().trim().required(),
          email: Joi.string().trim().email().required(),
          password: validatePasswordString,
        }),
      },
    },
    login: {
      body: {
        schema: Joi.object({
          email: Joi.string().trim().email().required(),
          password: Joi.string().required(),
        }),
      },
    },
    forgotPassword: {
      body: {
        schema: Joi.object({
          email: Joi.string().trim().email().required(),
        }),
      },
    },
    resetPassword: {
      body: {
        schema: Joi.object({
          email: Joi.string().trim().email().required(),
          code: Joi.string().required(),
          newPassword: validatePasswordString,
        }),
      },
    },
    changePassword: {
      body: {
        schema: Joi.object({
          oldPassword: Joi.string().required(),
          newPassword: validatePasswordString,
        }),
      },
    },
  },
  role: {
    idParam: {
      params: {
        schema: Joi.object({
          roleId: objectId.required(),
        }),
      },
    },
    create: {
      body: {
        schema: Joi.object({
          name: Joi.string().trim().required(),
          permissionIds: Joi.array().items(objectId).optional(),
        }),
      },
    },
    update: {
      body: {
        schema: Joi.object({
          name: Joi.string().trim().required(),
          permissionIds: Joi.array().items(objectId).optional(),
        }),
      },
    },
  },
  permission: {
    idParam: {
      params: {
        schema: Joi.object({
          permissionId: objectId.required(),
        }),
      },
    },
    create: {
      body: {
        schema: Joi.object({
          name: Joi.string().trim().required(),
        }),
      },
    },
    update: {
      body: {
        schema: Joi.object({
          name: Joi.string().trim().required(),
        }),
      },
    },
  },
  school: {
    idParam: {
      params: {
        schema: Joi.object({
          schoolId: objectId.required(),
        }),
      },
    },
    create: {
      body: {
        schema: Joi.object({
          name: Joi.string().trim().required(),
          address: Joi.string().trim().required(),
          email: Joi.string().trim().email().required(),
          phone: Joi.string().trim().required(),
          adminIds: Joi.array().items(objectId).optional(),
        }),
      },
    },
    update: {
      body: {
        schema: Joi.object({
          name: Joi.string().trim().optional(),
          address: Joi.string().trim().optional(),
          email: Joi.string().trim().email().optional(),
          phone: Joi.string().trim().optional(),
          adminIds: Joi.array().items(objectId).optional(),
        }).min(1),
      },
    },
  },
  classroom: {
    schoolParam: {
      params: {
        schema: Joi.object({
          schoolId: objectId.required(),
        }),
      },
    },
    idParam: {
      params: {
        schema: Joi.object({
          classroomId: objectId.required(),
        }),
      },
    },
    create: {
      body: {
        schema: Joi.object({
          name: Joi.string().trim().required(),
          schoolId: objectId.required(),
          capacity: Joi.number().integer().positive().optional(),
        }),
      },
    },
    update: {
      body: {
        schema: Joi.object({
          name: Joi.string().trim().optional(),
          capacity: Joi.number().integer().positive().optional(),
        }).min(1),
      },
    },
  },
  student: {
    schoolParam: {
      params: {
        schema: Joi.object({
          schoolId: objectId.required(),
        }),
      },
    },
    idParam: {
      params: {
        schema: Joi.object({
          studentId: objectId.required(),
        }),
      },
    },
    create: {
      body: {
        schema: Joi.object({
          firstName: Joi.string().trim().required(),
          lastName: Joi.string().trim().required(),
          email: Joi.string().trim().email().required(),
          schoolId: objectId.required(),
          classroomId: objectId.optional(),
          enrolled: Joi.boolean().optional(),
          profile: Joi.object({
            dob: Joi.date().optional(),
            address: Joi.string().trim().optional(),
            guardianName: Joi.string().trim().optional(),
            guardianContact: Joi.string().trim().optional(),
          }).optional(),
        }),
      },
    },
    update: {
      body: {
        schema: Joi.object({
          firstName: Joi.string().trim().optional(),
          lastName: Joi.string().trim().optional(),
          email: Joi.string().trim().email().optional(),
          schoolId: objectId.optional(),
          classroomId: objectId.allow(null).optional(),
          enrolled: Joi.boolean().optional(),
          profile: Joi.object({
            dob: Joi.date().optional(),
            address: Joi.string().trim().optional(),
            guardianName: Joi.string().trim().optional(),
            guardianContact: Joi.string().trim().optional(),
          }).optional(),
        }).min(1),
      },
    },
    enroll: {
      body: {
        schema: Joi.object({
          classroomId: objectId.required(),
        }),
      },
    },
    transfer: {
      body: {
        schema: Joi.object({
          newSchoolId: objectId.required(),
        }),
      },
    },
  },
};

export default validator;
