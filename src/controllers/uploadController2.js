import formidable from 'formidable';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadDeliveryFile = (req, res) => {
  const form = formidable({ multiples: false });
  form.uploadDir = path.join(__dirname, '../public/deliveries');
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }

    if (!files.file) {
      return res.status(400).json({
        status: "bad request",
        message: "No file uploaded"
      });
    }

    res.status(201).json({
      status: "created",
      file: files.file
    });
  });
};