const errorHandler = (error, req, res, next) => {
    if (error) {
        console.error('error:', error);
        return res.status(500).json({
            status: 500,
            message: 'Internal server error.',
            error: error.message
        });
    }
    next(error);
};

const error = {
    errorHandler,
};

module.exports = error;