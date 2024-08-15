export interface ICache {
  state: 'pending' | 'fulfilled' | 'rejected'
  value: any
}
