import { body, param, validationResult } from 'express-validator';
import { validate as uuidValidate } from 'uuid';

/**
 * Validador de nombre de equipo
 */
export const validarNombreEquipo = body('nombre')
  .trim()
  .notEmpty()
  .withMessage('El nombre del equipo es requerido')
  .isLength({ min: 3, max: 100 })
  .withMessage('El nombre debe tener entre 3 y 100 caracteres');

/**
 * Validador de UUID
 */
export const validarUUID = param('id')
  .custom((value) => {
    if (!uuidValidate(value)) {
      throw new Error('ID debe ser un UUID válido');
    }
    return true;
  });

/**
 * Validador de goles
 */
export const validarGoles = [
  body('golesLocal')
    .isInt({ min: 0 })
    .withMessage('Goles locales debe ser un número entero no negativo'),
  body('golesVisitante')
    .isInt({ min: 0 })
    .withMessage('Goles visitantes debe ser un número entero no negativo'),
];

/**
 * Middleware para manejar errores de validación
 */
export const manejarErroresValidacion = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      exito: false,
      mensaje: 'Error de validación',
      errores: errores.array().map((err) => ({
        campo: err.param,
        mensaje: err.msg,
      })),
    });
  }
  next();
};
