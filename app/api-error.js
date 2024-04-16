class ApiError extends Error{
    constructor(statusCode, message){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ApiError;

// class ApiError extends Error {
//     constructor(statusCode, message) {
//         super(message); // Gọi hàm khởi tạo của lớp cha và truyền message vào

//         this.statusCode = statusCode; // Gán statusCode vào thuộc tính của instance
//         this.name = 'ApiError'; // Đặt tên cho instance là 'ApiError'
//     }
// }

module.exports = ApiError;