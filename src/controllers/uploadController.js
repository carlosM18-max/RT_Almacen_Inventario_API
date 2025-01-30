const uploadPolicy = (req, res, next) => {
    console.log(req.file);  // Esto te mostrará el archivo subido en el backend
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    // Lógica para procesar el archivo
    res.status(200).json({ message: 'File uploaded successfully' });
};

export { uploadPolicy };
