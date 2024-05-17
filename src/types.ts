export type LoginFormData = {
    email: string
    password: string
}

// export type Error = {
//     message: string
// }

export enum VanType {
    Simple,
    Luxury,
    Rugged,
}

export type Van = {
    id: string
    type: string
    name: string
    imageUrl: string
    price: number
    hostId?: number
    description?: string
}

export type VanParams = {
    id: string
}
