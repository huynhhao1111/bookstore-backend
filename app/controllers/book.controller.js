const BookService = require("../services/book.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body?.masach) {
        return next(new ApiError(400, "MaSach can not be empty"));
    }

    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the book")
        );
    }
};
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const bookService = new BookService(MongoDB.client);
        const { tensach } = req.query;
        if (tensach) {
            documents = await bookService.findByName(tensach);
        } else {
            documents = await bookService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    
    return res.send(documents);
};
exports.findOne = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Book not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                'Error retrieving book with id=${req.params.id}'
            )
        );
    }
};
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const bookService = new BookService(MongoDB.client);
        const id = req?.params?.id;
        const document = await bookService.update(id, req?.body);
        console.log(document);
        if (document===null) {
            return next(new ApiError(404, "Book not found"));
        }
        return res.send({message: "Book was updated successfully"});
    } catch (error) {
        return next(
            new ApiError(500, `Error updating Book with id=${req.params.id}`)
        );
    }
};
exports.delete = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.delete(req.params.id);
        if(!document) {
            return next(new ApiError(404, "Book not found"));
        }
        return res.send({ message: "Book was deleted successfully"});
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete Book with id=${req.params.id}`
            )
        );
    }

};

exports.deleteAll = async (_req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const deletedCount = await bookService.deleteAll();
        return res.send({ message: `${deletedCount} Sách đã được xóa thành công`,});
    } catch (error) {
        return next(
            new ApiError(
                500,
                "Lỗi xảy ra khi xóa tất cả sách"
            )
        );
    }

};