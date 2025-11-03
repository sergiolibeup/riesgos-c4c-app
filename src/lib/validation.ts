/**
 * Validaciones para formularios de conexión y configuración
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Valida el formato de tenant
 * Debe ser alfanumérico, sin espacios, típicamente formato: my362429
 */
export function validateTenant(tenant: string): ValidationResult {
  if (!tenant || tenant.trim() === '') {
    return {
      isValid: false,
      error: 'El tenant es obligatorio'
    };
  }

  // Remover espacios
  const trimmed = tenant.trim();

  // Validar formato: solo letras, números, guiones
  const tenantRegex = /^[a-zA-Z0-9-]+$/;
  if (!tenantRegex.test(trimmed)) {
    return {
      isValid: false,
      error: 'El tenant solo puede contener letras, números y guiones'
    };
  }

  // Longitud razonable
  if (trimmed.length < 3 || trimmed.length > 50) {
    return {
      isValid: false,
      error: 'El tenant debe tener entre 3 y 50 caracteres'
    };
  }

  return { isValid: true };
}

/**
 * Valida username (no vacío)
 */
export function validateUsername(username: string): ValidationResult {
  if (!username || username.trim() === '') {
    return {
      isValid: false,
      error: 'El usuario es obligatorio'
    };
  }

  return { isValid: true };
}

/**
 * Valida password (no vacío)
 */
export function validatePassword(password: string): ValidationResult {
  if (!password || password.trim() === '') {
    return {
      isValid: false,
      error: 'La contraseña es obligatoria'
    };
  }

  return { isValid: true };
}

/**
 * Valida credenciales completas
 */
export function validateCredentials(
  tenant: string,
  username: string,
  password: string
): ValidationResult {
  const tenantValidation = validateTenant(tenant);
  if (!tenantValidation.isValid) {
    return tenantValidation;
  }

  const usernameValidation = validateUsername(username);
  if (!usernameValidation.isValid) {
    return usernameValidation;
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    return passwordValidation;
  }

  return { isValid: true };
}

/**
 * Valida ID de oportunidad
 */
export function validateOpportunityId(oppId: string): ValidationResult {
  if (!oppId || oppId.trim() === '') {
    return {
      isValid: false,
      error: 'El ID de oportunidad es obligatorio'
    };
  }

  // Típicamente son numéricos, pero pueden tener formato alfanumérico
  const trimmed = oppId.trim();
  if (trimmed.length === 0) {
    return {
      isValid: false,
      error: 'El ID de oportunidad no puede estar vacío'
    };
  }

  return { isValid: true };
}

/**
 * Valida formato de rol (código)
 */
export function validateRoleCode(roleCode: string): ValidationResult {
  if (!roleCode || roleCode.trim() === '') {
    return {
      isValid: false,
      error: 'El código de rol no puede estar vacío'
    };
  }

  const trimmed = roleCode.trim();
  
  // Roles típicamente son alfanuméricos (ej: "1001", "Z018")
  const roleRegex = /^[A-Z0-9]+$/;
  if (!roleRegex.test(trimmed)) {
    return {
      isValid: false,
      error: 'El rol debe ser alfanumérico en mayúsculas'
    };
  }

  return { isValid: true };
}

/**
 * Valida nombre de colección OData
 */
export function validateCollectionName(collectionName: string): ValidationResult {
  if (!collectionName || collectionName.trim() === '') {
    return {
      isValid: false,
      error: 'El nombre de colección no puede estar vacío'
    };
  }

  // Las colecciones suelen terminar en "Collection"
  const trimmed = collectionName.trim();
  if (!trimmed.endsWith('Collection')) {
    return {
      isValid: false,
      error: 'El nombre de colección debe terminar en "Collection"'
    };
  }

  return { isValid: true };
}
