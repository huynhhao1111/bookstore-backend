const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body?.madocgia) {
        return next(new ApiError(400, "Mã Độc Giả Không được trống"));
    }

    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "Có Lỗi Khi Thêm Độc Giả Mới")
        );
    }
};
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const userService = new UserService(MongoDB.client);
        const { tensach } = req.query;
        if (tensach) {
            documents = await userService.findByName(tensach);
        } else {
            documents = await userService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving user")
        );
    }
    
    return res.send(documents);
};
exports.findOne = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "user not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                'Error retrieving user with id=${req.params.id}'
            )
        );
    }
};
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const userService = new UserService(MongoDB.client);
        const id = req?.params?.id;
        const document = await userService.update(id, req?.body);
        console.log(document);
        if (document===null) {
            return next(new ApiError(404, "User not found"));
        }
        return res.send({message: "User was updated successfully"});
    } catch (error) {
        return next(
            new ApiError(500, `Error updating User with id=${req.params.id}`)
        );
    }
};
exports.delete = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.delete(req.params.id);
        if(!document) {
            return next(new ApiError(404, "user not found"));
        }
        return res.send({ message: "user was deleted successfully"});
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete user with id=${req.params.id}`
            )
        );
    }

};

exports.deleteAll = async (_req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const deletedCount = await userService.deleteAll();
        return res.send({ message: `${deletedCount} User đã được xóa thành công`,});
    } catch (error) {
        return next(
            new ApiError(
                500,
                "Lỗi xảy ra khi xóa tất cả User"
            )
        );
    }
};