import {
  getUserCreationsService,
  getPublishedCreationsService,
  toggleLikeService,
} from "../services/user.service.js";
import { success, error } from "../utils/responseHandler.js";

export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();
    const data = await getUserCreationsService(userId);
    success(res, data);
  } catch (err) {
    error(res, err);
  }
};

export const getPublishedCreations = async (req, res) => {
  try {
    const data = await getPublishedCreationsService();
    success(res, data);
  } catch (err) {
    error(res, err);
  }
};

export const toggleLikeCreation = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { creationId } = req.params;

    const likes = await toggleLikeService(userId, creationId);
    success(res, likes);
  } catch (err) {
    error(res, err);
  }
};