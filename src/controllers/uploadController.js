export const uploadPolicy = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: "bad request",
                message: "No file uploaded"
            });
        }

        res.status(201).json({
            status: "created",
            file: req.file
        });
    } catch (error) {
        res.status(500).json({
            status: "servidor no disponible",
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};  