// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const storage = multer.diskStorage({
//   destination: function (req, _file, cb) {
//     cb(null, path.join(__dirname, "../public/uploads"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 20 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
//     if (!allowedTypes.includes(file.mimetype)) {
//       return cb(new Error('Tipo de archivo no permitido'), false);
//     }
//     cb(null, true);
//   },
// });

// const storageUser = multer.diskStorage({
//   destination: function (req, _file, cb) {
//     cb(null, path.join(__dirname, "../public/users"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const uploadUser = multer({
//   storage: storageUser, limits: { fileSize: 20 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
//     if (!allowedTypes.includes(file.mimetype)) {
//       return cb(new Error('Tipo de archivo no permitido'), false);
//     }
//     cb(null, true);
//   },
// });

// const storageDeliveries = multer.diskStorage({
//   destination: function (req, _file, cb) {
//     cb(null, path.join(__dirname, "../public/deliveries"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const uploadDelivery = multer({
//   storage: storageDeliveries,
//   limits: { fileSize: 20 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
//     if (!allowedTypes.includes(file.mimetype)) {
//       return cb(new Error('Tipo de archivo no permitido'), false);
//     }
//     cb(null, true);
//   },
// });

// export { upload, uploadUser, uploadDelivery };