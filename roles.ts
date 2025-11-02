/**
 * Configuración de roles de parties
 */

import { RoleConfig } from '@/types/party.types';

/**
 * Códigos de roles por defecto
 */
export const DEFAULT_ROLE_CODES = ['1001', 'Z018', 'Z031', 'Z050'] as const;

/**
 * Configuración de roles con descripción
 */
export const ROLE_CONFIGURATIONS: Record<string, RoleConfig> = {
  '1001': {
    code: '1001',
    text: 'Solicitante',
    required: true,
  },
  'Z018': {
    code: 'Z018',
    text: 'Cliente',
    required: false,
  },
  'Z031': {
    code: 'Z031',
    text: 'Representante Legal',
    required: false,
  },
  'Z050': {
    code: 'Z050',
    text: 'Beneficiario Final',
    required: false,
  },
};

/**
 * Obtener configuración de un rol
 */
export function getRoleConfig(roleCode: string): RoleConfig | undefined {
  return ROLE_CONFIGURATIONS[roleCode];
}

/**
 * Obtener descripción de un rol
 */
export function getRoleText(roleCode: string): string {
  return ROLE_CONFIGURATIONS[roleCode]?.text || roleCode;
}

/**
 * Validar si un rol es válido
 */
export function isValidRole(roleCode: string): boolean {
  return roleCode in ROLE_CONFIGURATIONS;
}
