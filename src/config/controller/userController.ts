import { NextFunction, Request, Response } from "express";

import {
  getUser,
  updateUser,
  deleteUser,
  findAllPromoters,
  updateSuperUserById,
  deletePromoter,
  findAllSubAdminUsers,
  getStaff,
} from "@/services/userService";

import { compare, compareNewPasswordWithOldPassword } from "@/utils/security";
import { getHashPasswordByUserId } from "@/services/userService";
import StatusCodes from "@/utils/statusCode";
import { CustomError } from "@/middlewares/error";
import { toClass } from "@/utils/modelMapper";
import { StaffResponse } from "@/dto/userDto";

export const getUserMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user = await getUser(res.locals.user_id);
    res.status(StatusCodes.OK).json(user);
  } catch (error: any) {
    next(error);
  }
};

export const patchUserMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user = await updateUser(res.locals.user_id, req.body);
    res.status(StatusCodes.OK).json(user);
  } catch (error: any) {
    next(error);
  }
};

export const patchPasswordMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // In case of changing password
    const { old_password, password } = req.body;
    if (!old_password || !password) {
      throw new CustomError("PASSWORD_IS_REQUIRED", StatusCodes.BAD_REQUEST);
    }
    if (old_password) {
      const oldHashPassword = await getHashPasswordByUserId(res.locals.user_id);
      await compare(old_password, oldHashPassword);
      await compareNewPasswordWithOldPassword(password, oldHashPassword);
    }
    let user = await updateUser(res.locals.user_id, req.body);
    return res.status(StatusCodes.OK).json({ message: "Change password successfully", user });
  } catch (error: any) {
    next(error);
  }
};

export const deleteUserMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user = await deleteUser(res.locals.user_id);
    res.status(StatusCodes.OK).json(user);
  } catch (error: any) {
    next(error);
  }
};

export const getAllPromoters = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const promoters = await findAllPromoters();
    res.status(StatusCodes.OK).json(promoters);
  } catch (error: any) {
    next(error);
  }
};

export const deletePromoterById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await deletePromoter(id);
    res.status(StatusCodes.OK).json(user);
  } catch (error: any) {
    next(error);
  }
};

export const deleteAdminUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await deleteUser(id);
    res.status(StatusCodes.OK).json(user);
  } catch (error: any) {
    next(error);
  }
};

export const patchSuperUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await updateSuperUserById(id, req.body);
    res.status(StatusCodes.OK).json(user);
  } catch (error: any) {
    next(error);
  }
};

export const getAllAdminUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await findAllSubAdminUsers();
    res.status(StatusCodes.OK).json(user);
  } catch (error: any) {
    next(error);
  }
};

export const getStaffMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let staff = await getStaff(res.locals.email);
    if (staff) {
      res.status(StatusCodes.OK).json(toClass(StaffResponse, staff));
    }
    throw new CustomError("NOT_FOUND_STAFF", StatusCodes.NOT_FOUND);
  } catch (error: any) {
    next(error);
  }
};
