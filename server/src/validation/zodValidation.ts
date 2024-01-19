import * as z from 'zod'
import { Role } from '../types/role.enum'

export const emailSchema = z
  .string()
  .email({ message: 'Incorrect email address' })

export const roleSchema = z.enum([Role.Individual, Role.Institution])
