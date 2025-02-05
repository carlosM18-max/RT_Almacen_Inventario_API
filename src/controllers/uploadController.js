const uploadPolicy = (req, res) => {
    // console.log(req.file);  // Para depuración
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.status(200).json({ message: 'File uploaded successfully' });
};


export { uploadPolicy };
