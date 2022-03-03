import { request } from 'utils'

export const getAll = async (options?: string) => {
  return await request(`reviews/${options}`)
}