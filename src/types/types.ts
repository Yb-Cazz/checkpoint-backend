// Auth
export type LoginData = {
    email: string
    password: string
}

// Meeting
export type CreateMeetingData = {
    visitor_name: string
    visitor_email: string
    visitor_phone: string
    reason: string
    userId: string
};

// Admin Staff
export type CreateStaffData = {
    email: string
}



export type ResetPasswordData = {
    email: string,
    newPassword: string
}

export type FindUniqueUser = {
    userId?: string,
    email?: string
}

export interface OnboardStaffData {
    firstName: string
    lastName: string
    newPassword: string
}

export type Roles = "ADMIN" | "STAFF"